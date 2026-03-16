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
      {/* Thick Outer Badge Circle */}
      <circle cx="50" cy="50" r="46" fill="#FFD83D" stroke="#000000" strokeWidth="6" />
      
      {/* Inner Decorative Dashed Ring */}
      <circle cx="50" cy="50" r="37" fill="none" stroke="#FF3B30" strokeWidth="3" strokeDasharray="6 6" />
      
      {/* Tall Toque Fluff (White) */}
      <path 
        d="M 28 45 
           C 5 40, 15 15, 35 22 
           C 35 -5, 65 -5, 65 22 
           C 85 15, 95 40, 72 45 
           Z" 
        fill="#FFFFFF" 
        stroke="#000000" 
        strokeWidth="5" 
        strokeLinejoin="round"
      />
      
      {/* Hat Base Cylinder (White) */}
      <path 
        d="M 32 45 L 68 45 L 72 65 L 28 65 Z" 
        fill="#FFFFFF" 
        stroke="#000000" 
        strokeWidth="5" 
        strokeLinejoin="round"
      />
      
      {/* Hat Band (Red Accent) */}
      <path 
        d="M 29 55 L 71 55 L 72 65 L 28 65 Z" 
        fill="#FF3B30" 
        stroke="#000000" 
        strokeWidth="5" 
        strokeLinejoin="round"
      />
      
      {/* Hat Rim (Blue Base) */}
      <rect x="20" y="65" width="60" height="14" rx="6" fill="#1E73BE" stroke="#000000" strokeWidth="5" strokeLinejoin="round" />
      
      {/* Vertical Detail Folds on Cylinder */}
      <path d="M 40 45 L 38 55 M 50 45 L 50 55 M 60 45 L 62 55" stroke="#000000" strokeWidth="3" strokeLinecap="round" />
      
      {/* Playful Detail Lines on Fluff */}
      <path d="M 35 22 Q 40 28 38 35" stroke="#000000" strokeWidth="3" strokeLinecap="round" />
      <path d="M 65 22 Q 60 28 62 35" stroke="#000000" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
