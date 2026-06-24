"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { blogInfo } from "@/data/dummyData";

export default function HomeHero() {
  const [typedName, setTypedName] = useState("");
  const fullName = blogInfo.author.name;

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      setTypedName(fullName.slice(0, i + 1));
      i++;
      if (i >= fullName.length) clearInterval(id);
    }, 150);
    return () => clearInterval(id);
  }, [fullName]);

  return (
    <div className="w-full max-w-md md:max-w-none flex-shrink-0">
      <div className="bg-white/55 backdrop-blur-sm border border-gray-200 p-4 md:p-8">
        <div className="flex gap-4 items-center mb-3 md:mb-6">
          <Image
            src={blogInfo.author.avatar}
            alt={blogInfo.author.name}
            width={56}
            height={56}
            className="rounded-full border-2 border-green-700"
          />
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-green-700 flex items-center">
              {typedName}
              <span className="inline-block w-2 h-5 bg-green-700 animate-pulse ml-1" />
            </h1>
            <p className="text-sm text-gray-700">
              {blogInfo.author.role}
            </p>
          </div>
        </div>

        <p className="text-sm text-gray-700 leading-relaxed mb-3">
          {blogInfo.author.bio}
        </p>
        <p className="text-base font-medium text-green-700 mb-6">
          겁 없이 새로운 도전에 뛰어듭니다.
        </p>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/about"
            className="px-4 py-2 bg-green-700 text-white text-sm font-semibold hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700"
          >
            About Me
          </Link>
          <Link
            href="/blog"
            className="px-4 py-2 border border-green-700 text-green-700 text-sm hover:bg-gray-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700"
          >
            Read Blog
          </Link>
        </div>
      </div>
    </div>
  );
}
