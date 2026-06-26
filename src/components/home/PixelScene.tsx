"use client";

import { useEffect, useRef } from "react";

const GREEN_TINT = 0x86efac;

const BG_LAYERS = [
  { src: "/pixel/bg/Sky.png", speed: 0.04 },
  { src: "/pixel/bg/Buildings%204.png", speed: 0.08 },
  { src: "/pixel/bg/Buildings%203.png", speed: 0.14 },
  { src: "/pixel/bg/Buildings%202.png", speed: 0.22 },
  { src: "/pixel/bg/Buildings%201.png", speed: 0.32 },
  { src: "/pixel/bg/Lights.png", speed: 0.38 },
  { src: "/pixel/bg/Shade%202.png", speed: 0.18 },
  { src: "/pixel/bg/Shade%203.png", speed: 0.28 },
];

const GHOST_IDLE_FRAMES = Array.from(
  { length: 9 },
  (_, i) => `/pixel/ghost/idle/sprite_${i}.png`,
);
const GHOST_DEAD_FRAMES = Array.from(
  { length: 5 },
  (_, i) => `/pixel/ghost/dead/sprite_${i}.png`,
);
const GHOST_ATTACK_FRAMES = Array.from(
  { length: 7 },
  (_, i) => `/pixel/ghost/attack/sprite_${i}.png`,
);

// 더블클릭 판정 임계값
const DBL_TAP_MS = 350;
const DBL_TAP_DIST = 40;

// 이동 보간 계수(낮을수록 느림) / 애니메이션 속도(낮을수록 느림)
const MOVE_LERP = 0.05;
const DEAD_ANIM_SPEED = 0.12;
const ATTACK_ANIM_SPEED = 0.2;
// dead/attack 1회 재생 종료 후 idle 루프로 복귀하기까지 대기 시간
const REVERT_DELAY_MS = 1000;
// dead 후 idle로 복귀할 때 투명→정상 밝기로 떠오르는 페이드인 시간
const FADE_IN_MS = 700;

export default function PixelScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let cancelled = false;
    let app: any = null; // PixiJS Application; dynamically imported, typed at runtime
    let onResize: (() => void) | null = null;
    let revertTimer: ReturnType<typeof setTimeout> | null = null;

    const run = async () => {
      const PIXI = await import("pixi.js");
      if (cancelled) return;

      const W = container.clientWidth || window.innerWidth;
      const H = container.clientHeight || window.innerHeight;

      app = new PIXI.Application();
      await app.init({
        width: W,
        height: H,
        background: 0x111827, // = colors.bg (#111827)
        antialias: false,
        roundPixels: true,
      });

      if (cancelled) {
        app.destroy(true);
        return;
      }

      container.appendChild(app.canvas as HTMLCanvasElement);
      (app.canvas as HTMLCanvasElement).style.cssText =
        "width:100%;height:100%;display:block;";

      const bgTextures: import("pixi.js").Texture[] = await Promise.all(
        BG_LAYERS.map((l) => PIXI.Assets.load(l.src)),
      );
      const loadFrames = (urls: string[]) =>
        Promise.all(urls.map((url) => PIXI.Assets.load(url))) as Promise<
          import("pixi.js").Texture[]
        >;
      const [idleTextures, deadTextures, attackTextures] = await Promise.all([
        loadFrames(GHOST_IDLE_FRAMES),
        loadFrames(GHOST_DEAD_FRAMES),
        loadFrames(GHOST_ATTACK_FRAMES),
      ]);

      if (cancelled) {
        app.destroy(true);
        return;
      }

      // Background parallax layers
      const bgSprites = bgTextures.map((texture, i) => {
        texture.source.scaleMode = "nearest";
        const scale = H / texture.height;
        const sprite = new PIXI.TilingSprite({ texture, width: W, height: H });
        sprite.tileScale.set(scale);
        if (!BG_LAYERS[i].src.includes("Lights")) sprite.tint = GREEN_TINT;
        app.stage.addChild(sprite);
        return { sprite, texture };
      });

      // Ghost animated sprite
      [idleTextures, deadTextures, attackTextures].forEach((set) =>
        set.forEach((t) => {
          t.source.scaleMode = "nearest";
        }),
      );
      const ghost = new PIXI.AnimatedSprite(idleTextures);
      ghost.animationSpeed = prefersReducedMotion ? 0 : 0.12;
      ghost.scale.set(-4, 4);
      ghost.anchor.set(0.5);
      ghost.x = W * 0.3;
      ghost.y = H * 0.45;
      ghost.play();
      app.stage.addChild(ghost);

      // 애니메이션 상태 전환: idle은 루프, dead/attack은 1회 재생 후 일정 시간 뒤 idle 복귀
      // fadeT: idle 페이드인 진행도(0=투명, 1=정상). 티커가 매 프레임 알파를 계산.
      let fadeT = 1;
      const clearRevert = () => {
        if (revertTimer) {
          clearTimeout(revertTimer);
          revertTimer = null;
        }
      };
      const playIdle = (fadeIn = false) => {
        clearRevert();
        ghost.textures = idleTextures;
        ghost.loop = true;
        ghost.animationSpeed = prefersReducedMotion ? 0 : 0.12;
        ghost.onComplete = undefined;
        ghost.gotoAndPlay(0);
        if (fadeIn && !prefersReducedMotion) {
          fadeT = 0; // 투명에서 시작 → 티커가 정상 밝기까지 끌어올림
          ghost.alpha = 0;
        }
      };
      const playOnce = (
        textures: import("pixi.js").Texture[],
        speed: number,
        fadeInOnRevert = false,
      ) => {
        // reduced-motion에서는 프레임이 진행되지 않아 onComplete가 안 불리므로 연출 생략
        if (prefersReducedMotion) return;
        clearRevert(); // 재트리거 시 이전 복귀 예약 취소
        ghost.textures = textures;
        ghost.loop = false;
        ghost.animationSpeed = speed;
        // 1회 재생 후 마지막 프레임에서 멈춘 채 REVERT_DELAY_MS 대기 → idle 복귀
        ghost.onComplete = () => {
          ghost.stop();
          revertTimer = setTimeout(
            () => playIdle(fadeInOnRevert),
            REVERT_DELAY_MS,
          );
        };
        ghost.gotoAndPlay(0);
      };

      // Click-to-move: ghost glides toward the clicked point
      let baseX = W * 0.3;
      let baseY = H * 0.45;
      let targetX = baseX;
      let targetY = baseY;
      let moved = false;
      let lastTapAt = -Infinity;
      let lastTapX = 0;
      let lastTapY = 0;

      // 유령 클릭 → dead 연출(이동/더블클릭으로 전파 차단)
      ghost.eventMode = "static";
      ghost.cursor = "pointer";
      ghost.on("pointertap", (e: import("pixi.js").FederatedPointerEvent) => {
        e.stopPropagation();
        if (prefersReducedMotion) {
          targetX = e.global.x;
          targetY = e.global.y;
          moved = true;
          baseX = targetX;
          baseY = targetY;
          ghost.x = baseX;
          ghost.y = baseY;
          return;
        }
        playOnce(deadTextures, DEAD_ANIM_SPEED, true);
      });

      // 배경: 단일 클릭 이동 + 더블클릭 시 attack 연출
      app.stage.eventMode = "static";
      app.stage.hitArea = app.screen;
      app.stage.cursor = "pointer";
      app.stage.on(
        "pointertap",
        (e: import("pixi.js").FederatedPointerEvent) => {
          targetX = e.global.x;
          targetY = e.global.y;
          moved = true;
          if (prefersReducedMotion) {
            baseX = targetX;
            baseY = targetY;
            ghost.x = baseX;
            ghost.y = baseY;
          }

          const now = performance.now();
          const isDouble =
            now - lastTapAt <= DBL_TAP_MS &&
            Math.hypot(e.global.x - lastTapX, e.global.y - lastTapY) <=
              DBL_TAP_DIST;
          if (isDouble) {
            playOnce(attackTextures, ATTACK_ANIM_SPEED);
            lastTapAt = -Infinity; // 삼중 클릭 연쇄 방지
          } else {
            lastTapAt = now;
            lastTapX = e.global.x;
            lastTapY = e.global.y;
          }
        },
      );

      // Ticker: parallax scroll + ghost bob/fade
      if (!prefersReducedMotion) {
        let elapsed = 0;
        app.ticker.add((ticker: import("pixi.js").Ticker) => {
          elapsed += ticker.deltaMS;
          BG_LAYERS.forEach(({ speed }, i) => {
            bgSprites[i].sprite.tilePosition.x -= speed;
          });
          baseX += (targetX - baseX) * MOVE_LERP;
          baseY += (targetY - baseY) * MOVE_LERP;
          ghost.x = baseX;
          ghost.y = baseY + Math.sin(elapsed / 900) * 18;
          const baseAlpha = 0.75 + Math.sin(elapsed / 1200) * 0.25;
          if (fadeT < 1) {
            fadeT = Math.min(1, fadeT + ticker.deltaMS / FADE_IN_MS);
            ghost.alpha = baseAlpha * fadeT;
          } else {
            ghost.alpha = baseAlpha;
          }
        });
      }

      // Resize handler
      onResize = () => {
        if (!app || cancelled) return;
        const nW = container.clientWidth;
        const nH = container.clientHeight;
        app.renderer.resize(nW, nH);
        bgSprites.forEach(({ sprite, texture }) => {
          const scale = nH / texture.height;
          sprite.width = nW;
          sprite.height = nH;
          sprite.tileScale.set(scale);
        });
        if (!moved) {
          baseX = targetX = nW * 0.3;
          baseY = targetY = nH * 0.45;
          ghost.x = baseX;
          ghost.y = baseY;
        }
      };
      window.addEventListener("resize", onResize);
    };

    run().catch(console.error);

    return () => {
      cancelled = true;
      if (revertTimer) clearTimeout(revertTimer);
      if (onResize) window.removeEventListener("resize", onResize);
      if (app) app.destroy(true);
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full" aria-hidden="true" />
  );
}
