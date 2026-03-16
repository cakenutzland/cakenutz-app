export function BakerHat({ className, size = 32 }: { className?: string, size?: number | string }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Tall Toque Fluff (Red outline for brand match) */}
      <path 
        d="M 28 45 
           C 5 40, 15 15, 35 22 
           C 35 -5, 65 -5, 65 22 
           C 85 15, 95 40, 72 45 
           Z" 
        fill="#FFD83D" 
        stroke="#000000" 
        strokeWidth="6" 
        strokeLinejoin="round"
      />
      
      {/* Hat Base Cylinder (Yellow) */}
      <path 
        d="M 32 45 L 68 45 L 72 65 L 28 65 Z" 
        fill="#FFD83D" 
        stroke="#000000" 
        strokeWidth="6" 
        strokeLinejoin="round"
      />
      
      {/* Hat Band (Red Accent) */}
      <path 
        d="M 29 55 L 71 55 L 72 65 L 28 65 Z" 
        fill="#FF3B30" 
        stroke="#000000" 
        strokeWidth="6" 
        strokeLinejoin="round"
      />
      
      {/* Hat Rim (Blue Base) */}
      <rect x="20" y="65" width="60" height="14" rx="6" fill="#1E73BE" stroke="#000000" strokeWidth="6" strokeLinejoin="round" />
      
      {/* Dollar Symbol inside the hat */}
      <text 
        x="50" 
        y="42" 
        fontFamily="system-ui, -apple-system, sans-serif" 
        fontSize="30" 
        fontWeight="900" 
        fill="#1A1A1A"
        stroke="#1A1A1A"
        strokeWidth="1"
        textAnchor="middle" 
        dominantBaseline="central"
      >
        $
      </text>
    </svg>
  );
}