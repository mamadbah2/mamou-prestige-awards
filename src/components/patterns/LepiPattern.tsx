interface LepiPatternProps {
  className?: string;
  opacity?: number;
  color?: string;
}

export function LepiPattern({
  className = "",
  opacity = 0.06,
  color = "#ffffff",
}: LepiPatternProps) {
  return (
    <svg
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="lepi-diamonds"
          x="0"
          y="0"
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
        >
          {/* Diamond / losange motif inspired by Leppi fabric */}
          <path
            d="M20 0 L40 20 L20 40 L0 20 Z"
            fill="none"
            stroke={color}
            strokeWidth="0.8"
            opacity={opacity}
          />
          <path
            d="M20 8 L32 20 L20 32 L8 20 Z"
            fill="none"
            stroke={color}
            strokeWidth="0.5"
            opacity={opacity * 0.7}
          />
          <circle
            cx="20"
            cy="20"
            r="2"
            fill={color}
            opacity={opacity * 0.5}
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#lepi-diamonds)" />
    </svg>
  );
}
