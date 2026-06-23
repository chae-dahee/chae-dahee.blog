"use client";

import { useEffect, useRef } from "react";

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

const GHOST_FRAMES = Array.from(
  { length: 9 },
  (_, i) => `/pixel/ghost/sprite_${i}.png`,
);

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
      const ghostTextures: import("pixi.js").Texture[] = await Promise.all(
        GHOST_FRAMES.map((url) => PIXI.Assets.load(url)),
      );

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
        app.stage.addChild(sprite);
        return { sprite, texture };
      });

      // Ghost animated sprite
      ghostTextures.forEach((t) => {
        t.source.scaleMode = "nearest";
      });
      const ghost = new PIXI.AnimatedSprite(ghostTextures);
      ghost.animationSpeed = prefersReducedMotion ? 0 : 0.12;
      ghost.scale.set(-4, 4); // 좌우 반전: x를 음수로 설정
      ghost.anchor.set(0.5);
      ghost.x = W * 0.3;
      ghost.y = H * 0.45;
      ghost.play();
      app.stage.addChild(ghost);

      // Ticker: parallax scroll + ghost bob/fade
      if (!prefersReducedMotion) {
        let elapsed = 0;
        app.ticker.add((ticker: import("pixi.js").Ticker) => {
          elapsed += ticker.deltaMS;
          BG_LAYERS.forEach(({ speed }, i) => {
            bgSprites[i].sprite.tilePosition.x -= speed;
          });
          ghost.y = H * 0.45 + Math.sin(elapsed / 900) * 18;
          ghost.alpha = 0.75 + Math.sin(elapsed / 1200) * 0.25;
        });
      }

      // Resize handler
      onResize = () => {
        if (!app || cancelled) return;
        const nW = container.clientWidth;
        const nH = container.clientHeight;
        app.renderer.resize(nW, nH);
        bgSprites.forEach(({ sprite, texture }, i) => {
          const scale = nH / texture.height;
          sprite.width = nW;
          sprite.height = nH;
          sprite.tileScale.set(scale);
        });
        ghost.x = nW * 0.3;
        ghost.y = nH * 0.45;
      };
      window.addEventListener("resize", onResize);
    };

    run().catch(console.error);

    return () => {
      cancelled = true;
      if (onResize) window.removeEventListener("resize", onResize);
      if (app) app.destroy(true);
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full" aria-hidden="true" />
  );
}
