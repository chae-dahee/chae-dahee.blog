import { GitHubIcon, TwitterIcon, LinkedInIcon } from "@/components/common/icons";

export default function Footer() {
  return (
    <footer className="w-full bg-[var(--color-bg)] text-[var(--color-secondary)] py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* 저작권 */}
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <p className="text-sm">
              © 2026 Chae Dahee&apos;s Tech Blog. All rights reserved.
            </p>
            <p className="text-xs text-[var(--color-secondary)] mt-1">
              Built with Next.js &amp; TailwindCSS
            </p>
            <p className="text-xs text-[var(--color-secondary)] mt-1 opacity-60">
              Ghost sprite by
              <a
                href="https://opengameart.org/users/pixerat"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--color-accent)]"
              >
                PiXeRaT
            </a>
              CC BY-SA 4.0
            </p>
          </div>

          {/* 소셜 링크 */}
          <div className="flex items-center space-x-4">
            <a
              href="https://github.com/chae-dahee"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-secondary)] hover:text-[var(--color-accent)] transition-colors"
              aria-label="GitHub"
            >
              <GitHubIcon className="w-6 h-6" />
            </a>
            <a
              href="https://twitter.com/chae-dahee"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-secondary)] hover:text-[var(--color-accent)] transition-colors"
              aria-label="Twitter"
            >
              <TwitterIcon className="w-6 h-6" />
            </a>
            <a
              href="https://linkedin.com/in/chae-dahee"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-secondary)] hover:text-[var(--color-accent)] transition-colors"
              aria-label="LinkedIn"
            >
              <LinkedInIcon className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
