import { useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { 
  Settings as SettingsIcon, 
  Globe,
  Info,
  ChevronRight
} from "lucide-react";
import { useAppContext } from "@/context/AppContext";

export default function SettingsPage() {
  const [, setLocation] = useLocation();
  const { isSpanish, setIsSpanish } = useAppContext();

  const t = {
    title: isSpanish ? "Ajustes" : "Settings",
    subtitle: isSpanish ? "Preferencias" : "Preferences",
    langLabel: isSpanish ? "Idioma" : "Language",
    aboutLabel: isSpanish ? "Acerca de la App" : "About App",
    aboutDesc: isSpanish ? "Versión, privacidad y contacto" : "Version, privacy, and contact",
  };

  return (
    <div>
      <div className="bg-white/80 backdrop-blur-md border-b border-[#F0E5D1] sticky top-0 z-20 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-18 flex items-center gap-3">
          <div className="bg-[#FFF6E6] text-[#666666] p-2 rounded-xl border border-[#F0E5D1]">
            <SettingsIcon size={24} />
          </div>
          <div className="flex flex-col">
            <h1 className="text-2xl font-serif font-bold text-[#1A1A1A] tracking-wide leading-none">{t.title}</h1>
            <p className="text-[10px] font-medium text-[#666666] uppercase tracking-[0.2em] mt-1">{t.subtitle}</p>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto p-4 sm:p-6 space-y-4 mt-4">
        
        {/* Language Toggle */}
        <Card className="border-0 shadow-sm bg-white rounded-2xl">
          <CardContent className="p-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#FFF6E6] rounded-lg text-[#666666]">
                <Globe size={18} />
              </div>
              <div>
                <p className="font-semibold text-[#1A1A1A]">{t.langLabel}</p>
                <p className="text-xs text-[#666666]">{isSpanish ? "Español seleccionado" : "English selected"}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 bg-[#FFF6E6] px-3 py-1.5 rounded-full border border-[#F0E5D1]">
              <span className={`text-xs font-bold ${!isSpanish ? 'text-[#1A1A1A]' : 'text-[#888888]'}`}>EN</span>
              <Switch 
                checked={isSpanish} 
                onCheckedChange={setIsSpanish} 
                className="data-[state=checked]:bg-[#1E73BE] data-[state=unchecked]:bg-[#1E73BE] scale-75 origin-center -mx-1"
              />
              <span className={`text-xs font-bold ${isSpanish ? 'text-[#1A1A1A]' : 'text-[#888888]'}`}>ES</span>
            </div>
          </CardContent>
        </Card>

        {/* About App */}
        <Card 
          className="border-0 shadow-sm bg-white rounded-2xl hover:bg-[#FFF6E6]/50 transition-colors cursor-pointer" 
          onClick={() => setLocation('/about')}
        >
          <CardContent className="p-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#FFF6E6] rounded-lg text-[#666666]">
                <Info size={18} />
              </div>
              <div>
                <p className="font-semibold text-[#1A1A1A]">{t.aboutLabel}</p>
                <p className="text-xs text-[#666666]">{t.aboutDesc}</p>
              </div>
            </div>
            <ChevronRight size={20} className="text-[#888888]" />
          </CardContent>
        </Card>

      </div>
    </div>
  );
}