import { BottomNav } from "./BottomNav";
import { useLocation } from "wouter";
import { useState, useEffect } from "react";
import { WifiOff } from "lucide-react";
import { useAppContext } from "@/context/AppContext";

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const isLandingPage = location === "/";
  const { isSpanish } = useAppContext();
  
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#FFF6E6] text-[#1A1A1A] font-sans selection:bg-[#1E73BE] selection:text-white flex flex-col relative">
      
      {isOffline && (
        <div className="bg-[#1A1A1A] text-white text-[11px] font-medium py-2 px-4 flex items-center justify-center gap-2 sticky top-0 z-50">
          <WifiOff size={14} className="text-[#FFD83D]" />
          {isSpanish 
            ? "Modo sin conexión: tus recetas y calculadora siguen disponibles." 
            : "Offline mode: your saved recipes and calculator are still available."}
        </div>
      )}

      <div className={`flex-grow ${isLandingPage ? '' : 'pb-20'}`}>
        {children}
      </div>
      {!isLandingPage && <BottomNav />}
    </div>
  );
}