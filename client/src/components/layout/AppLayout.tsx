import { BottomNav } from "./BottomNav";

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2C1E16] font-sans selection:bg-[#C8A97E] selection:text-white flex flex-col">
      <div className="flex-grow pb-20">
        {children}
      </div>
      <BottomNav />
    </div>
  );
}