import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  Info, 
  ListChecks, 
  ShieldCheck, 
  Mail, 
  Hash,
  ChevronRight
} from "lucide-react";
import { useAppContext } from "@/context/AppContext";

export default function AboutPage() {
  const [, setLocation] = useLocation();
  const { isSpanish } = useAppContext();

  const t = {
    title: isSpanish ? "Acerca de" : "About",
    subtitle: isSpanish ? "Información de la App" : "App Info",
    back: isSpanish ? "Volver" : "Back",
    appName: "CakeNutz Bake Price Calculator",
    appDesc: isSpanish 
      ? "Calculadora de precios profesional para panaderos y pasteleros."
      : "Professional pricing calculator for bakers and pastry chefs.",
    featuresTitle: isSpanish ? "Características" : "Features",
    features: isSpanish ? [
      "Cálculo de costo de ingredientes",
      "Calculadora de margen de ganancia",
      "Costo de Alimentos %",
      "Guardado de recetas",
      "Soporte sin conexión"
    ] : [
      "Ingredient cost calculation",
      "Profit margin calculator",
      "Food Cost %",
      "Recipe saving",
      "Offline support"
    ],
    versionTitle: isSpanish ? "Versión" : "Version",
    version: "Version 1.0",
    contactTitle: isSpanish ? "Contacto" : "Contact",
    contactText: "CAKENUTZLAND@GMAIL.COM",
    privacyTitle: isSpanish ? "Privacidad" : "Privacy",
    privacyText: isSpanish 
      ? "Esta aplicación almacena recetas e ingredientes localmente en tu dispositivo. CakeNutz no recopila datos personales ni comparte tu información con terceros."
      : "This app stores recipes and ingredients locally on your device. CakeNutz does not collect personal data or share your information with third parties."
  };

  return (
    <div>
      <div className="bg-white/80 backdrop-blur-md border-b border-[#F0E5D1] sticky top-0 z-20 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
          <Button variant="ghost" className="text-[#666666] hover:text-[#1A1A1A] -ml-2" onClick={() => setLocation('/settings')}>
            <ArrowLeft size={18} className="mr-2" />
            {t.back}
          </Button>
          <div className="flex flex-col items-center">
            <h1 className="text-xl font-serif font-bold text-[#1A1A1A] tracking-wide leading-none">{t.title}</h1>
            <p className="text-[10px] font-medium text-[#666666] uppercase tracking-[0.2em] mt-1">{t.subtitle}</p>
          </div>
          <div className="w-20"></div> {/* Spacer to center the title */}
        </div>
      </div>

      <div className="max-w-3xl mx-auto p-4 sm:p-6 space-y-6 mt-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        {/* App Info Card */}
        <Card className="border-0 shadow-sm bg-white rounded-2xl overflow-hidden text-center p-6 border border-[#F0E5D1]">
          <div className="mx-auto w-16 h-16 bg-[#FFF6E6] rounded-2xl flex items-center justify-center text-[#1E73BE] mb-4 shadow-sm border border-[#F0EBE1]">
            <Info size={32} />
          </div>
          <h2 className="text-2xl font-serif font-bold text-[#1A1A1A] mb-2">{t.appName}</h2>
          <p className="text-[#666666]">{t.appDesc}</p>
        </Card>

        {/* Features Card */}
        <Card className="border-0 shadow-sm bg-white rounded-2xl overflow-hidden border border-[#F0E5D1]">
          <CardHeader className="pb-3 border-b border-[#F0E5D1] bg-gradient-to-b from-[#FFF6E6]/50 to-white">
            <CardTitle className="text-lg font-serif text-[#1A1A1A] flex items-center gap-2">
              <ListChecks size={18} className="text-[#1E73BE]" />
              {t.featuresTitle}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5">
            <ul className="space-y-3">
              {t.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-[#1A1A1A] text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FF3B30]"></div>
                  {feature}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Version & Contact Card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Card className="border-0 shadow-sm bg-white rounded-2xl overflow-hidden border border-[#F0E5D1]">
            <CardContent className="p-5 flex items-start gap-4">
              <div className="p-2 bg-[#FFF6E6] rounded-xl text-[#666666] shrink-0 border border-[#F0EBE1]">
                <Hash size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-[#1A1A1A] mb-1">{t.versionTitle}</h3>
                <p className="text-sm text-[#666666]">{t.version}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-sm bg-white rounded-2xl overflow-hidden border border-[#F0E5D1]">
            <CardContent className="p-5 flex items-start gap-4">
              <div className="p-2 bg-[#FFF6E6] rounded-xl text-[#666666] shrink-0 border border-[#F0EBE1]">
                <Mail size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-[#1A1A1A] mb-1">{t.contactTitle}</h3>
                <p className="text-sm text-[#1E73BE] break-all">{t.contactText}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Privacy Card */}
        <Card className="border-0 shadow-sm bg-white rounded-2xl border border-[#F0E5D1]">
          <CardHeader className="pb-3 border-b border-[#F0E5D1] bg-gradient-to-b from-[#FFF6E6]/50 to-white">
            <CardTitle className="text-lg font-serif text-[#1A1A1A] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck size={18} className="text-[#22C55E]" />
                {t.privacyTitle}
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5">
            <p className="text-sm text-[#666666] leading-relaxed mb-4">
              {t.privacyText}
            </p>
            <Button 
              variant="outline" 
              className="w-full border-[#1E73BE] text-[#1E73BE] hover:bg-[#1E73BE]/10"
              onClick={() => setLocation('/privacy')}
            >
              {isSpanish ? "Política de Privacidad" : "Privacy Policy"}
            </Button>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
