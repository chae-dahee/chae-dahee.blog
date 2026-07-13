"use client";

import { useEffect, useState, type ReactNode } from "react";

interface PostTocVisibilityProps {
  bodyTocId: string;
  postSlug: string;
  children: ReactNode;
}

export default function PostTocVisibility({
  bodyTocId,
  postSlug,
  children,
}: PostTocVisibilityProps) {
  const [isBodyTocVisible, setIsBodyTocVisible] = useState(true);

  useEffect(() => {
    const bodyTocHeading = document.getElementById(bodyTocId);

    if (!bodyTocHeading) {
      setIsBodyTocVisible(false);
      return;
    }

    const targets = [bodyTocHeading];
    const bodyTocList = bodyTocHeading.nextElementSibling;

    if (bodyTocList?.matches("ul, ol")) {
      targets.push(bodyTocList as HTMLElement);
    }

    const visibilityByTarget = new Map<Element, boolean>(
      targets.map((target) => [target, false])
    );
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        visibilityByTarget.set(entry.target, entry.isIntersecting);
      }

      setIsBodyTocVisible(
        Array.from(visibilityByTarget.values()).some(Boolean)
      );
    });

    targets.forEach((target) => observer.observe(target));

    return () => observer.disconnect();
  }, [bodyTocId, postSlug]);

  return (
    <div
      className={`transition-opacity duration-300 motion-reduce:transition-none ${
        isBodyTocVisible ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      aria-hidden={isBodyTocVisible}
      inert={isBodyTocVisible || undefined}
    >
      {children}
    </div>
  );
}
