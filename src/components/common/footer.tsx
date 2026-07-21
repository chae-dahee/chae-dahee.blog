import { GitHubIcon, LinkedInIcon, EmailIcon } from "@/components/common/icons";

export default function Footer() {
  return (
    <footer className="w-full bg-[var(--color-bg)] text-[var(--color-secondary)] py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <p className="text-sm">
              © 2026 닿망징창의 터미널. All rights reserved.
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
              href="https://linkedin.com/in/chae-dahee"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-secondary)] hover:text-[var(--color-accent)] transition-colors"
              aria-label="LinkedIn"
            >
              <LinkedInIcon className="w-6 h-6" />
            </a>
            <a
              href="mailto:chae@dahee.dev"
              className="text-[var(--color-secondary)] hover:text-[var(--color-accent)] transition-colors"
              aria-label="Email"
            >
              <EmailIcon className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
