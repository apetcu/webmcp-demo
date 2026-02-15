import { Github, Twitter, Instagram } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-white/[0.08] glass">
      <div className="container-default py-8">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          {/* Store name */}
          <div className="flex flex-col items-center sm:items-start gap-2">
            <span className="neon-text text-xl font-bold tracking-wider">
              LUMINA
            </span>
            <p className="text-sm text-white/40">
              &copy; {currentYear} Lumina. All rights reserved.
            </p>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="p-2 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.1] hover:border-purple-500/50 transition-all duration-300"
              aria-label="Twitter"
            >
              <Twitter className="h-4 w-4 text-white/60 hover:text-white transition-colors" />
            </a>
            <a
              href="#"
              className="p-2 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.1] hover:border-purple-500/50 transition-all duration-300"
              aria-label="Instagram"
            >
              <Instagram className="h-4 w-4 text-white/60 hover:text-white transition-colors" />
            </a>
            <a
              href="#"
              className="p-2 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.1] hover:border-purple-500/50 transition-all duration-300"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4 text-white/60 hover:text-white transition-colors" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
