"use client";

type NavbarLogoProps = {
  color?: string;
};

export default function NavbarLogo({ color = "#8ea8c4" }: NavbarLogoProps) {
  return (
    <div className="relative flex h-10 w-10 items-center justify-center" aria-hidden="true">
      <svg
        viewBox="0 0 40 40"
        className="h-full w-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.9" />
            <stop offset="100%" stopColor={color} stopOpacity="0.5" />
          </linearGradient>
        </defs>
        <path
          d="M20 2L36 12V28L20 38L4 28V12L20 2Z"
          stroke="url(#logo-gradient)"
          strokeWidth="1.5"
          fill="rgba(20, 26, 50, 0.8)"
        />
        <path
          d="M20 8L30 14V26L20 32L10 26V14L20 8Z"
          stroke={color}
          strokeWidth="1"
          fill="none"
          opacity="0.6"
        />
        <circle cx="20" cy="20" r="3" fill={color} opacity="0.8" />
      </svg>
    </div>
  );
}