export function BakerHat({ className, size = 32 }: { className?: string, size?: number | string }) {
  return (
    <img 
      src="/assets/header-icon.png" 
      alt="CakeNutz Icon" 
      width={size} 
      height={size} 
      className={`object-contain ${className || ''}`}
    />
  );
}
