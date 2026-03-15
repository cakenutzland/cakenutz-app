import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { 
  Settings as SettingsIcon, 
  Crown,
  Star,
  Zap,
  CloudLightning,
  ChevronRight,
  Globe
} from "lucide-react";
import { useAppContext } from "@/context/AppContext";

export default function SettingsPage() {
  const { isSpanish, setIsSpanish } = useAppContext();

  const t = {
    title: isSpanish ? "Ajustes" : "Settings",
    subtitle: isSpanish ? "Preferencias y Cuenta" : "Preferences & Account",
    langLabel: isSpanish ? "Idioma" : "Language",
    proTitle: isSpanish ? "Mejora a CakeNutz PRO" : "Upgrade to CakeNutz PRO",
    proDesc: isSpanish ? "Desbloquea todo el potencial de tu negocio pastelero." : "Unlock the full potential of your baking business.",
    feat1: isSpanish ? "Sincronización en la nube" : "Cloud Sync Backup",
    feat2: isSpanish ? "Recetas ilimitadas" : "Unlimited Recipes",
    feat3: isSpanish ? "Exportar cotizaciones a PDF" : "Export Quotes to PDF",
    feat4: isSpanish ? "Sin anuncios" : "Ad-free experience",
    upgradeBtn: isSpanish ? "Obtener PRO ($4.99/mes)" : "Get PRO ($4.99/mo)",
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

        {/* PRO Upsell Card */}
        <Card className="border-0 shadow-xl bg-gradient-to-br from-[#2C1E16] to-[#1A1311] text-white rounded-[2rem] overflow-hidden relative mt-8">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#C8A97E] rounded-full mix-blend-screen filter blur-[80px] opacity-20"></div>
          
          <CardContent className="p-8 relative z-10">
            <div className="inline-flex items-center gap-1.5 bg-[#C8A97E]/20 text-[#E3CDAA] px-3 py-1 rounded-full text-xs font-bold tracking-wider border border-[#C8A97E]/30 mb-6">
              <Crown size={14} />
              PREMIUM
            </div>
            
            <h2 className="text-2xl font-serif font-bold mb-2 text-white">{t.proTitle}</h2>
            <p className="text-[#A39589] text-sm mb-8 leading-relaxed max-w-sm">{t.proDesc}</p>
            
            <div className="space-y-4 mb-8">
              {[
                { icon: CloudLightning, text: t.feat1 },
                { icon: Star, text: t.feat2 },
                { icon: Zap, text: t.feat3 },
                { icon: Crown, text: t.feat4 },
              ].map((feat, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="bg-white/10 p-1.5 rounded-md text-[#C8A97E]">
                    <feat.icon size={14} />
                  </div>
                  <span className="text-sm font-medium text-[#EBE5D9]">{feat.text}</span>
                </div>
              ))}
            </div>
            
            <Button className="w-full h-14 rounded-xl bg-gradient-to-r from-[#C8A97E] to-[#A6885D] hover:from-[#A6885D] hover:to-[#8C7A6B] text-white font-bold text-lg shadow-[0_10px_20px_-10px_rgba(200,169,126,0.5)] border-0">
              {t.upgradeBtn}
            </Button>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}