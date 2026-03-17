import { Link, useLocation } from "wouter";
import { Calculator, PieChart, BookOpen, Library, Settings } from "lucide-react";
import { useAppContext } from "@/context/AppContext";

export function BottomNav() {
  const [location] = useLocation();
  const { isSpanish } = useAppContext();

  const navItems = [
    { href: "/calculator", icon: Calculator, label: isSpanish ? "Calcular" : "Calc" },
    { href: "/results", icon: PieChart, label: isSpanish ? "Resultados" : "Results" },
    { href: "/ingredients", icon: Library, label: isSpanish ? "Ingredientes" : "Ingredients" },
    { href: "/recipes", icon: BookOpen, label: isSpanish ? "Recetas" : "Recipes" },
    { href: "/settings", icon: Settings, label: isSpanish ? "Ajustes" : "Settings" },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-md border-t border-[#F0E5D1] pb-safe z-50 shadow-[0_-8px_30px_-15px_rgba(0,0,0,0.1)]">
      <div className="max-w-3xl mx-auto flex justify-around items-end px-2 sm:px-6 h-[68px]">
        {navItems.map((item) => {
          const isActive = location === item.href;
          return (
            <Link key={item.href} href={item.href} className="relative flex flex-col items-center justify-center w-full h-full min-w-[64px] pb-3 pt-2 group">
              {/* Active Indicator Bar */}
              {isActive && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-[3px] bg-[#1E73BE] rounded-b-full"></div>
              )}
              
              <div className={`transition-all duration-300 transform ${isActive ? 'scale-110 text-[#1E73BE] mb-1' : 'text-[#888888] mb-1.5 group-hover:text-[#666666]'}`}>
                <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              
              <span className={`text-[10px] font-semibold tracking-wide transition-all duration-300 ${isActive ? 'text-[#1E73BE]' : 'text-[#888888] group-hover:text-[#666666]'}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}