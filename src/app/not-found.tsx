import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] bg-purple-600/8 rounded-full blur-[120px]" />
      </div>

      <div className="glass-card p-12 sm:p-16 text-center max-w-md w-full relative z-10">
        {/* 404 Text */}
        <h1 className="text-8xl sm:text-9xl font-bold neon-text mb-4">404</h1>

        {/* Subtitle */}
        <h2 className="text-xl sm:text-2xl font-semibold text-white/80 mb-3">
          Page not found
        </h2>
        <p className="text-white/50 mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        {/* Back to Home */}
        <Link
          href="/"
          className="glass-button inline-flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
