export function BakerHat({ className, size = 32 }: { className?: string, size?: number | string }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Hat top */}
      <path d="M30 40
               C25 20, 45 10, 50 25
               C55 10, 75 20, 70 40
               Z"
            fill="#FFD83D"
            stroke="black"
            strokeWidth="4"/>

      {/* Hat base */}
      <rect x="25" y="40" width="50" height="18"
            rx="6"
            fill="#FFD83D"
            stroke="black"
            strokeWidth="4"/>

      {/* Blue stripe */}
      <rect x="25" y="58" width="50" height="6"
            fill="#1E73BE"
            stroke="black"
            strokeWidth="3"/>

      {/* Dollar symbol */}
      <text x="50" y="50"
            fontSize="28"
            textAnchor="middle"
            fontWeight="bold"
            fill="#FF3B30"
            fontFamily="Arial"
            dominantBaseline="central">$</text>
    </svg>
  );
}