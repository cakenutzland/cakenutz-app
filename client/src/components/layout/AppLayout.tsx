import { BottomNav } from "./BottomNav";

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#FFF6E6] text-[#1A1A1A] font-sans selection:bg-[#1E73BE] selection:text-white flex flex-col">
      <div className="flex-grow pb-20">
        {children}
      </div>
      <BottomNav />
    </div>
  );
}