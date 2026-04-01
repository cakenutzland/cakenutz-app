import { useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { 
  Settings as SettingsIcon, 
  Globe,
  Info,
  ChevronRight,
  Share,
  Mail
} from "lucide-react";
import { useAppContext } from "@/context/AppContext";
import { useToast } from "@/hooks/use-toast";
import logo from "../../assets/nutzlabs-logo.png";

export default function SettingsPage() {
  const [, setLocation] = useLocation();
  const { isSpanish, setIsSpanish } = useAppContext();
  const { toast } = useToast();

  const t = {
    title: isSpanish ? "Ajustes" : "Settings",
    subtitle: isSpanish ? "Preferencias" : "Preferences",
    langLabel: isSpanish ? "Idioma" : "Language",
    aboutLabel: isSpanish ? "Acerca de" : "About",
    aboutDesc: isSpanish ? "Versión, privacidad y contacto" : "Version, privacy, and contact",
    shareApp: isSpanish ? "Comparte CakeNutz con otros pasteleros" : "Share CakeNutz with other bakers",
    devTitle: "Developed by NutzLabs",
    devName: "Leo R.C",
    devEmail: "realappsolutions@gmail.com",
    contactBtn: isSpanish ? "Contactar al Desarrollador" : "Contact Developer",
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'CakeNutz: Bakery Cost Calculator',
          text: t.shareApp,
          url: window.location.origin,
        });
      } catch (err) {
        console.log("Share failed:", err);
      }
    } else {
      navigator.clipboard.writeText(window.location.origin);
      toast({
        title: isSpanish ? "Enlace copiado" : "Link copied",
        description: isSpanish ? "Enlace copiado al portapapeles" : "Link copied to clipboard",
        duration: 2000,
      });
    }
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

        {/* Share Prompt */}
        <div className="flex justify-center pt-6 pb-2">
          <button 
            onClick={handleShare}
            className="flex items-center gap-2 text-sm text-[#888888] hover:text-[#1E73BE] transition-colors"
          >
            <Share size={14} />
            <span>{t.shareApp}</span>
          </button>
        </div>

        {/* Developer Signature */}
        <div className="mt-16 pt-12 border-t border-[#F0E5D1]/50 pb-12 flex flex-col items-center justify-center text-center animate-in fade-in duration-500">
          <div className="w-52 h-52 sm:w-60 sm:h-60 rounded-[2.5rem] overflow-hidden mb-10 shadow-2xl border-4 border-white bg-[#1A1A1A] transition-transform hover:scale-105 duration-300 ring-1 ring-[#F0E5D1]/80 opacity-[0.97]">
            <img src={logo} alt="NutzLabs Logo" className="w-full h-full object-cover" />
          </div>
          <p className="text-[11px] font-bold text-[#888888] tracking-widest uppercase mb-1.5">{t.devTitle}</p>
          <p className="text-3xl font-serif font-black text-[#1A1A1A] mb-2 drop-shadow-sm">{t.devName}</p>
          <a href={`mailto:${t.devEmail}`} className="text-sm text-[#1E73BE] hover:text-[#1A1A1A] transition-colors mb-10 inline-block font-medium bg-[#1E73BE]/5 hover:bg-[#1E73BE]/10 px-5 py-2 rounded-full">
            {t.devEmail}
          </a>
          
          <Button 
            variant="outline" 
            onClick={() => window.location.href = `mailto:${t.devEmail}`}
            className="rounded-full border-2 border-[#E6DCCF] text-[#2C2C2C] hover:bg-[#FFF6E6] hover:text-[#1A1A1A] hover:border-[#E6DCCF] h-12 px-8 text-sm font-bold shadow-sm hover:shadow-md transition-all group"
          >
            <Mail size={16} className="mr-2 text-[#888888] group-hover:text-[#1E73BE] transition-colors" />
            {t.contactBtn}
          </Button>
        </div>

      </div>
    </div>
  );
}