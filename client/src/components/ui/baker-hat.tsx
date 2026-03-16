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
      {/* Toque Fluff (Yellow) */}
      <path 
        d="M 28 50 
           C 5 40, 15 10, 35 15 
           C 35 -5, 65 -5, 65 15 
           C 85 10, 95 40, 72 50 
           Z" 
        fill="#FFD83D" 
        stroke="#000000" 
        strokeWidth="6" 
        strokeLinejoin="round"
      />
      
      {/* Hat Base Cylinder (Yellow) */}
      <path 
        d="M 30 50 L 70 50 L 75 75 L 25 75 Z" 
        fill="#FFD83D" 
        stroke="#000000" 
        strokeWidth="6" 
        strokeLinejoin="round"
      />
      
      {/* Blue Accent Stripe */}
      <path 
        d="M 27 65 L 73 65" 
        stroke="#1E73BE" 
        strokeWidth="6" 
        strokeLinecap="round"
      />

      {/* Hat Rim (Yellow) */}
      <rect x="20" y="75" width="60" height="15" rx="6" fill="#FFD83D" stroke="#000000" strokeWidth="6" strokeLinejoin="round" />
      
      {/* Dollar Symbol (Red) inside the hat */}
      <text 
        x="50" 
        y="42" 
        fontFamily="system-ui, -apple-system, sans-serif" 
        fontSize="36" 
        fontWeight="900" 
        fill="#FF3B30" 
        stroke="#000000"
        strokeWidth="2.5"
        textAnchor="middle" 
        dominantBaseline="central"
      >
        $
      </text>
    </svg>
  );
}