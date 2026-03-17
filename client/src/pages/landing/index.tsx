import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { BakerHat } from "@/components/ui/baker-hat";
import { Calculator, DollarSign, Save, PieChart, ArrowRight, Globe } from "lucide-react";
import { useAppContext } from "@/context/AppContext";

export default function LandingPage() {
  const [, setLocation] = useLocation();
  const { isSpanish, setIsSpanish } = useAppContext();

  const t = {
    title: isSpanish ? "Calcula el precio perfecto para tus productos horneados." : "Calculate the perfect price for your baked goods.",
    subtitle: isSpanish ? "Calcula al instante costos, márgenes y precios finales para tus productos de panadería." : "Instantly calculate costs, margins, and final prices for your bakery products.",
    cta: isSpanish ? "Abrir Calculadora" : "Open Calculator",
    features: [
      {
        icon: DollarSign,
        title: isSpanish ? "Cálculo de Costos" : "Cost Calculation",
        desc: isSpanish ? "Calcula el costo exacto de los ingredientes para cada receta." : "Calculate the exact cost of ingredients for each recipe."
      },
      {
        icon: PieChart,
        title: isSpanish ? "Márgenes y Ganancias" : "Margin & Profit",
        desc: isSpanish ? "Controla tus márgenes de ganancia y horas de trabajo." : "Control your profit margins and labor hours."
      },
      {
        icon: Save,
        title: isSpanish ? "Guarda tus Recetas" : "Save Recipes",
        desc: isSpanish ? "Almacena tus recetas para no tener que calcularlas de nuevo." : "Store your recipes so you don't have to calculate them again."
      },
      {
        icon: Calculator,
        title: isSpanish ? "Herramienta Simple" : "Simple Pricing Tool",
        desc: isSpanish ? "Diseñada específicamente para las necesidades de los pasteleros." : "Designed specifically for the needs of bakers."
      }
    ]
  };

  return (
    <div className="min-h-screen bg-[#FFF6E6] flex flex-col items-center justify-center p-6 sm:p-10 relative overflow-hidden">
      {/* Language Selector Top Right */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50">
        <button 
          onClick={() => setIsSpanish(!isSpanish)}
          className="flex items-center gap-2 px-4 py-2 min-h-[44px] rounded-full text-xs font-bold text-[#666666] hover:text-[#1A1A1A] hover:bg-black/5 transition-colors active:scale-95 border border-transparent hover:border-[#F0E5D1]"
        >
          <Globe size={18} className={isSpanish ? "text-[#1E73BE]" : "text-[#FF3B30]"} />
          <span className="tracking-wider">{isSpanish ? "ES" : "EN"}</span>
        </button>
      </div>

      {/* Decorative background elements */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-[#FFD83D]/20 rounded-full blur-3xl opacity-60 pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-[#FF3B30]/10 rounded-full blur-3xl opacity-60 pointer-events-none"></div>
      <div className="absolute top-[40%] right-[-5%] w-64 h-64 bg-[#1E73BE]/10 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

      <div className="max-w-4xl w-full mx-auto flex flex-col items-center text-center z-10 space-y-10 py-10">
        {/* Logo & Header */}
        <div className="flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="bg-white p-5 rounded-3xl shadow-[0_8px_30px_-12px_rgba(0,0,0,0.12)] mb-8 border border-[#F0E5D1]">
            <BakerHat size={96} />
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-[#1A1A1A] tracking-tight leading-[1.1] max-w-2xl">
            {t.title}
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-[#666666] font-medium max-w-xl leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* CTA Button */}
        <div className="animate-in fade-in slide-in-from-bottom-6 duration-700 delay-150">
          <Button 
            onClick={() => setLocation("/calculator")}
            className="bg-[#FF3B30] hover:bg-[#E6352B] text-white rounded-2xl h-16 px-10 text-lg font-bold shadow-[0_8px_20px_-8px_rgba(255,59,48,0.5)] transition-all hover:scale-105 active:scale-95 flex items-center gap-3"
          >
            <Calculator size={24} />
            {t.cta}
            <ArrowRight size={20} className="ml-2 opacity-80" />
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl mt-10 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
          {t.features.map((feature, i) => (
            <div key={i} className="bg-white/80 backdrop-blur-md border border-[#F0E5D1] p-6 rounded-3xl shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] text-left flex items-start gap-4 transition-all hover:-translate-y-1 hover:shadow-[0_8px_30px_-10px_rgba(0,0,0,0.08)]">
              <div className="bg-[#FFF6E6] p-3 rounded-2xl text-[#1E73BE] shrink-0">
                <feature.icon size={24} strokeWidth={2.5} />
              </div>
              <div>
                <h3 className="text-xl font-serif font-bold text-[#1A1A1A] mb-1">{feature.title}</h3>
                <p className="text-sm text-[#666666] leading-relaxed">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
