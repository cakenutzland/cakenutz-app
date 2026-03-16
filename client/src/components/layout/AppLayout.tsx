import { BottomNav } from "./BottomNav";
import { useLocation } from "wouter";

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const isLandingPage = location === "/";

  return (
    <div className="min-h-screen bg-[#FFF6E6] text-[#1A1A1A] font-sans selection:bg-[#1E73BE] selection:text-white flex flex-col">
      <div className={`flex-grow ${isLandingPage ? '' : 'pb-20'}`}>
        {children}
      </div>
      {!isLandingPage && <BottomNav />}
    </div>
  );
}