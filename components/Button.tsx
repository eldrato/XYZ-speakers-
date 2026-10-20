"use client";

import React from "react";
import Link from "next/link";

interface ButtonProps {
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  ariaLabel?: string;
  fullWidth?: boolean;
}

export default function Button({
  variant = "primary",
  size = "md",
  href,
  onClick,
  children,
  className = "",
  type = "button",
  disabled = false,
  ariaLabel,
  fullWidth = false,
}: ButtonProps) {
  const sizeClasses = {
    sm: "px-4 py-2 text-xs",
    md: "px-7 py-3 text-sm",
    lg: "px-9 py-4 text-base",
  }[size];

  const variantClass = variant === "primary" ? "btn-primary" : "btn-secondary";
  const widthClass = fullWidth ? "w-full" : "";
  const disabledClass = disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : "";

  const combinedClasses = `${variantClass} ${sizeClasses} ${widthClass} ${disabledClass} tracking-wide uppercase font-bold text-center inline-flex items-center justify-center gap-2 select-none ${className}`;

  if (href) {
    return (
      <Link href={href} className={combinedClasses} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedClasses}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
