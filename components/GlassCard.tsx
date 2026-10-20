import React from "react";

interface GlassCardProps {
  title: string;
  description: string;
  tag?: string;
  className?: string;
  floatAnimation?: "a" | "b" | "c" | "none";
  children?: React.ReactNode;
}

export default function GlassCard({
  title,
  description,
  tag,
  className = "",
  floatAnimation = "none",
  children,
}: GlassCardProps) {
  const animClass = {
    a: "animate-float-a",
    b: "animate-float-b",
    c: "animate-float-c",
    none: "",
  }[floatAnimation];

  return (
    <div
      className={`glass-card relative z-10 flex flex-col justify-between max-w-[280px] sm:max-w-[320px] will-change-transform ${animClass} ${className}`}
    >
      <div>
        {tag && (
          <span className="mb-2 inline-block font-mono text-[10px] uppercase tracking-wider text-white/50">
            {tag}
          </span>
        )}
        <h3 className="text-[18px] sm:text-[20px] font-semibold text-white tracking-tight leading-snug">
          {title}
        </h3>
        <p className="mt-1.5 text-[13px] sm:text-[14px] leading-relaxed text-[#8a8a8a]">
          {description}
        </p>
      </div>
      {children && <div className="mt-3">{children}</div>}
    </div>
  );
}
