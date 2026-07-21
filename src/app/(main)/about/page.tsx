import Image from "next/image";
import { blogInfo, career, projects } from "@/data/dummyData";
import { buildMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = buildMetadata({
  title: "About",
  url: "/about",
});

const SKILLS: Record<string, string[]> = {
  Frontend: [
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "TailwindCSS",
    "CSS/SCSS",
  ],
  Backend: ["Node.js", "Spring Boot", "REST API"],
  Tools: ["Git", "Figma", "Vercel", "Unity", "WebSocket"],
};

export default function About() {
  return (
    <div className="max-w-4xl mx-auto space-y-16">
      {/* 프로필 헤더 */}
      <section className="flex flex-col md:flex-row gap-8 items-start">
        <Image
          src={blogInfo.author.avatar}
          alt={blogInfo.author.name}
          width={120}
          height={120}
          className="rounded-full border-2 border-[var(--color-accent)] flex-shrink-0"
        />
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-[var(--color-accent)] mb-1">
            채다희
          </h1>
          <p className="text-[var(--color-secondary)] mb-3">
            {blogInfo.author.role}
          </p>
          <p className="text-sm text-[var(--color-secondary)] leading-relaxed max-w-2xl">
            {blogInfo.author.bio}
          </p>
          <p className="text-sm text-[var(--color-secondary)] mt-2 leading-relaxed max-w-2xl">
            무서운 이야기를 좋아하고, 남들이 두려워하는 것에 호기심을 갖습니다.
            유령이 벽을 통과하듯, 기술적 경계를 넘는 것을 즐기는 개발자입니다.
          </p>
          <div className="flex flex-wrap gap-4 mt-4">
            {blogInfo.social.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[var(--color-secondary)] hover:text-[var(--color-accent)] transition-colors"
              >
                {social.name}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 기술 스택 */}
      <section>
        <h2 className="text-xl font-bold text-[var(--color-accent)] mb-6">
          Tech Stack
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(SKILLS).map(([category, skills]) => (
            <div key={category} className="bg-[var(--color-surface)] p-4">
              <h3 className="text-sm font-bold text-[var(--color-accent)] mb-3">
                {category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs px-2 py-1 bg-[var(--color-bg)] border border-[var(--color-muted)] text-[var(--color-secondary)]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 경험 및 활동 */}
      <section>
        <h2 className="text-xl font-bold text-[var(--color-accent)] mb-6">
          Experience
        </h2>
        <div className="space-y-6">
          {career.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 items-start border-l-2 border-[var(--color-surface)] pl-4"
            >
              {item.logo && (
                <Image
                  src={item.logo}
                  alt={item.organization}
                  width={40}
                  height={40}
                  className="rounded-full object-cover flex-shrink-0 mt-1"
                />
              )}
              <div>
                <div className="flex items-baseline gap-3 flex-wrap">
                  <h3 className="font-bold text-[var(--color-secondary)]">
                    {item.organization}
                  </h3>
                  <span className="text-xs text-[var(--color-muted)]">
                    {item.period}
                  </span>
                </div>
                <p className="text-sm text-[var(--color-accent)] mb-1">
                  {item.role}
                </p>
                <p className="text-sm text-[var(--color-secondary)] leading-relaxed">
                  {item.description}
                </p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {item.skills.map((s) => (
                    <span
                      key={s}
                      className="text-xs px-2 py-0.5 bg-[var(--color-surface)] text-[var(--color-secondary)]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 프로젝트 */}
      <section>
        <h2 className="text-xl font-bold text-[var(--color-accent)] mb-6">
          Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-[var(--color-surface)] overflow-hidden"
            >
              <div className="relative h-44 bg-[var(--color-bg)]">
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="p-4">
                <div className="flex items-baseline justify-between gap-2 mb-1">
                  <h3 className="font-bold text-[var(--color-secondary)]">
                    {project.name}
                  </h3>
                  <span className="text-xs text-[var(--color-muted)] whitespace-nowrap">
                    {project.period}
                  </span>
                </div>
                <p className="text-xs text-[var(--color-accent)] mb-2">
                  {project.role}
                </p>
                <p className="text-sm text-[var(--color-secondary)] leading-relaxed mb-3">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {project.skills.map((s) => (
                    <span
                      key={s}
                      className="text-xs px-2 py-0.5 bg-[var(--color-bg)] border border-[var(--color-muted)] text-[var(--color-secondary)]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[var(--color-accent)] hover:underline"
                  >
                    GitHub →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 라이선스 크레딧 (CC-BY-SA 4.0) */}
      <section className="pt-6 border-t border-[var(--color-surface)]">
        <h2 className="text-sm font-bold text-[var(--color-secondary)] mb-2">
          Credits
        </h2>
        <p className="text-xs text-[var(--color-muted)]">
          Ghost sprite by
          <a
            href="https://opengameart.org/users/pixerat"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-accent)] hover:underline"
          >
            PiXeRaT
          </a>
          (OpenGameArt), licensed under
          <a
            href="https://creativecommons.org/licenses/by-sa/4.0/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-accent)] hover:underline"
          >
            CC BY-SA 4.0
          </a>
          .
        </p>
      </section>
    </div>
  );
}
