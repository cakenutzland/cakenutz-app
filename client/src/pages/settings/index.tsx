import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { 
  Settings as SettingsIcon, 
  Globe
} from "lucide-react";
import { useAppContext } from "@/context/AppContext";

export default function SettingsPage() {
  const { isSpanish, setIsSpanish } = useAppContext();

  const t = {
    title: isSpanish ? "Ajustes" : "Settings",
    subtitle: isSpanish ? "Preferencias" : "Preferences",
    langLabel: isSpanish ? "Idioma" : "Language",
  };

  return (
    <div>
      <div className="bg-white/80 backdrop-blur-md border-b border-[#EBE5D9] sticky top-0 z-20 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-18 flex items-center gap-3">
          <div className="bg-[#F5F0E6] text-[#8C7A6B] p-2 rounded-xl border border-[#EBE5D9]">
            <SettingsIcon size={24} />
          </div>
          <div className="flex flex-col">
            <h1 className="text-2xl font-serif font-bold text-[#2C1E16] tracking-wide leading-none">{t.title}</h1>
            <p className="text-[10px] font-medium text-[#8C7A6B] uppercase tracking-[0.2em] mt-1">{t.subtitle}</p>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto p-4 sm:p-6 space-y-6 mt-4">
        
        {/* Language Toggle */}
        <Card className="border-0 shadow-sm bg-white rounded-2xl">
          <CardContent className="p-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#F5F0E6] rounded-lg text-[#8C7A6B]">
                <Globe size={18} />
              </div>
              <div>
                <p className="font-semibold text-[#2C1E16]">{t.langLabel}</p>
                <p className="text-xs text-[#8C7A6B]">{isSpanish ? "Español seleccionado" : "English selected"}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 bg-[#FDFBF7] px-3 py-1.5 rounded-full border border-[#EBE5D9]">
              <span className={`text-xs font-bold ${!isSpanish ? 'text-[#2C1E16]' : 'text-[#A39589]'}`}>EN</span>
              <Switch 
                checked={isSpanish} 
                onCheckedChange={setIsSpanish} 
                className="data-[state=checked]:bg-[#C8A97E] data-[state=unchecked]:bg-[#C8A97E] scale-75 origin-center -mx-1"
              />
              <span className={`text-xs font-bold ${isSpanish ? 'text-[#2C1E16]' : 'text-[#A39589]'}`}>ES</span>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}