import { Link, useLocation } from "wouter";
import { Calculator, PieChart, BookOpen, Library, Settings } from "lucide-react";
import { useAppContext } from "@/context/AppContext";

export function BottomNav() {
  const [location] = useLocation();
  const { isSpanish } = useAppContext();

  const navItems = [
    { href: "/", icon: Calculator, label: isSpanish ? "Calcular" : "Calc" },
    { href: "/results", icon: PieChart, label: isSpanish ? "Resultados" : "Results" },
    { href: "/ingredients", icon: Library, label: isSpanish ? "Ingredientes" : "Ingredients" },
    { href: "/recipes", icon: BookOpen, label: isSpanish ? "Recetas" : "Recipes" },
    { href: "/settings", icon: Settings, label: isSpanish ? "Ajustes" : "Settings" },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-md border-t border-[#EBE5D9] pb-safe z-50 shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.05)]">
      <div className="max-w-3xl mx-auto flex justify-around items-center px-2 sm:px-6 h-16">
        {navItems.map((item) => {
          const isActive = location === item.href || (location === "" && item.href === "/");
          return (
            <Link key={item.href} href={item.href} className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-all duration-200 ${isActive ? 'text-[#C8A97E]' : 'text-[#A39589] hover:text-[#8C7A6B]'}`}>
              <div className={`p-1.5 rounded-xl transition-all duration-200 ${isActive ? 'bg-[#C8A97E]/10' : 'bg-transparent'}`}>
                <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span className={`text-[10px] font-semibold tracking-wide ${isActive ? 'text-[#2C1E16]' : ''}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}