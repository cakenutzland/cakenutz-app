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
      {/* Bright Yellow Background Circle for playfulness */}
      <circle cx="50" cy="50" r="46" fill="#FFD83D" stroke="#000000" strokeWidth="4" />
      
      {/* Hat Base */}
      <path 
        d="M30 55 L70 55 L75 85 L25 85 Z" 
        fill="#FF3B30" 
        stroke="#000000" 
        strokeWidth="4" 
        strokeLinejoin="round"
      />
      
      {/* Hat Rim (Bottom of base) */}
      <rect x="20" y="75" width="60" height="10" rx="3" fill="#1E73BE" stroke="#000000" strokeWidth="4" />
      
      {/* Chef Hat Puffs (Toque) */}
      <path 
        d="M 28 55 C 10 55, 10 30, 30 30 C 35 10, 65 10, 70 30 C 90 30, 90 55, 72 55 Z" 
        fill="#FFFFFF" 
        stroke="#000000" 
        strokeWidth="4" 
        strokeLinejoin="round"
      />
      
      {/* Detail lines inside the toque for dimension */}
      <path d="M 40 35 Q 45 45 45 55" stroke="#000000" strokeWidth="3" strokeLinecap="round" />
      <path d="M 60 35 Q 55 45 55 55" stroke="#000000" strokeWidth="3" strokeLinecap="round" />
      
      {/* Small decorative circles on the red base */}
      <circle cx="40" cy="65" r="2.5" fill="#FFFFFF" />
      <circle cx="50" cy="65" r="2.5" fill="#FFFFFF" />
      <circle cx="60" cy="65" r="2.5" fill="#FFFFFF" />
    </svg>
  );
}
