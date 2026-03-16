import { useMemo } from "react";
import { useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  Sparkles,
  PieChart as PieChartIcon,
  ShoppingBag,
  Clock,
  PackagePlus,
  Save,
  CheckCircle2,
  Copy
} from "lucide-react";
import { useAppContext } from "@/context/AppContext";
import { useToast } from "@/hooks/use-toast";

export default function ResultsPage() {
  const [, setLocation] = useLocation();
  const { isSpanish, currentRecipe, setRecipes, recipes } = useAppContext();
  const { toast } = useToast();

  const t = {
    title: isSpanish ? "Resultados" : "Results",
    back: isSpanish ? "Volver" : "Back",
    servings: isSpanish ? "Raciones" : "Servings",
    summaryTitle: isSpanish ? "Resumen Ejecutivo" : "Executive Summary",
    laborCostResult: isSpanish ? "Mano de Obra" : "Labor Cost",
    totalIngredientsResult: isSpanish ? "Ingredientes" : "Ingredients",
    totalExtrasResult: isSpanish ? "Gastos Extra" : "Extra Expenses",
    totalCostResult: isSpanish ? "Costo Base" : "Base Cost",
    suggestedPriceResult: isSpanish ? "Precio Sugerido" : "Suggested Price",
    estimatedProfitResult: isSpanish ? "Beneficio Neto" : "Net Profit",
    perUnitResult: isSpanish ? "Precio por Unidad" : "Price per Serving/Unit",
    breakdownTitle: isSpanish ? "Desglose de Costos" : "Cost Breakdown",
    saveRecipe: isSpanish ? "Guardar Receta" : "Save Recipe",
    recipeSaved: isSpanish ? "¡Receta Guardada!" : "Recipe Saved!",
  };

  const { 
    totalIngredientsCost, 
    totalExtrasCost, 
    laborCost, 
    totalCost, 
    suggestedPrice, 
    estimatedProfit,
    pricePerUnit,
    ingPercent,
    labPercent,
    extPercent
  } = useMemo(() => {
    const ingCost = currentRecipe.ingredients.reduce((sum, item) => sum + (parseFloat(item.cost) || 0), 0);
    const extCost = currentRecipe.extraCosts.reduce((sum, item) => sum + (parseFloat(item.cost) || 0), 0);
    const labCost = (parseFloat(currentRecipe.laborHours) || 0) * (parseFloat(currentRecipe.hourlyRate) || 0);
    
    const total = ingCost + extCost + labCost;
    const margin = parseFloat(currentRecipe.profitMargin) || 0;
    
    const safeMargin = margin >= 100 ? 99 : margin;
    const suggested = margin > 0 ? total / (1 - safeMargin / 100) : total;
    const profit = suggested - total;
    
    const units = parseFloat(currentRecipe.servings) || 1;
    const perUnit = suggested / (units > 0 ? units : 1);

    const ingP = total > 0 ? (ingCost / total) * 100 : 0;
    const labP = total > 0 ? (labCost / total) * 100 : 0;
    const extP = total > 0 ? (extCost / total) * 100 : 0;

    return {
      totalIngredientsCost: ingCost,
      totalExtrasCost: extCost,
      laborCost: labCost,
      totalCost: total,
      suggestedPrice: suggested,
      estimatedProfit: profit,
      pricePerUnit: perUnit,
      ingPercent: ingP,
      labPercent: labP,
      extPercent: extP
    };
  }, [currentRecipe]);

  const handleSave = () => {
    if (!currentRecipe.name) {
      toast({
        title: isSpanish ? "Nombre requerido" : "Name required",
        description: isSpanish ? "Por favor, dale un nombre a tu receta antes de guardar." : "Please give your recipe a name before saving.",
        variant: "destructive"
      });
      setLocation("/");
      return;
    }

    const exists = recipes.find(r => r.id === currentRecipe.id);
    if (exists) {
      setRecipes(recipes.map(r => r.id === currentRecipe.id ? { ...currentRecipe, createdAt: Date.now() } : r));
    } else {
      setRecipes([...recipes, { ...currentRecipe, createdAt: Date.now() }]);
    }
    
    toast({
      title: t.recipeSaved,
      description: currentRecipe.name,
      className: "bg-[#2C1E16] text-white border-[#C8A97E]",
    });
  };

  return (
    <div>
      <div className="bg-white/80 backdrop-blur-md border-b border-[#EBE5D9] sticky top-0 z-20 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
          <Button variant="ghost" className="text-[#8C7A6B] hover:text-[#2C1E16] -ml-2" onClick={() => setLocation('/')}>
            <ArrowLeft size={18} className="mr-2" />
            {t.back}
          </Button>
          <h1 className="text-xl font-serif font-bold text-[#2C1E16] tracking-wide">{t.title}</h1>
          <div className="w-20"></div> {/* Spacer for centering */}
        </div>
      </div>

      <div className="max-w-3xl mx-auto p-4 sm:p-6 space-y-8 mt-4 animate-in fade-in slide-in-from-bottom-8 duration-700">
        
        <div className="text-center mb-2">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#2C1E16] mb-1">
            {currentRecipe.name || (isSpanish ? "Sin Nombre" : "Unnamed Recipe")}
          </h2>
          {parseFloat(currentRecipe.servings) > 1 && (
            <p className="text-sm font-medium text-[#8C7A6B]">{currentRecipe.servings} {t.servings.toLowerCase()}</p>
          )}
        </div>

        {/* Main Dashboard Card */}
        <Card className="border-0 shadow-2xl bg-[#1A1311] text-white overflow-hidden rounded-[2rem] relative">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 mix-blend-overlay"></div>
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#C8A97E] rounded-full mix-blend-screen filter blur-[100px] opacity-20"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#D4AF37] rounded-full mix-blend-screen filter blur-[100px] opacity-10"></div>
          
          <CardContent className="p-8 sm:p-10 relative z-10">
            <h2 className="text-sm font-bold text-[#C8A97E] uppercase tracking-[0.2em] mb-8 text-center">{t.summaryTitle}</h2>
            
            <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
              
              <div className="w-full md:w-1/2 relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-[#C8A97E]/0 via-[#C8A97E]/10 to-[#C8A97E]/0 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="bg-gradient-to-b from-white/10 to-white/5 rounded-3xl p-8 border border-white/20 text-center relative overflow-hidden backdrop-blur-md shadow-[0_0_30px_rgba(200,169,126,0.1)]">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#C8A97E] to-transparent opacity-50"></div>
                  
                  <p className="text-[#C8A97E] text-sm uppercase tracking-[0.2em] font-bold mb-3 flex items-center justify-center gap-2">
                    <Sparkles size={16} />
                    {t.suggestedPriceResult}
                  </p>
                  <p className="text-5xl sm:text-6xl font-serif font-bold text-white tracking-tight drop-shadow-lg">
                    ${suggestedPrice.toFixed(2)}
                  </p>
                  
                  <div className="flex justify-center mt-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="bg-transparent border-white/20 text-[#C8A97E] hover:bg-white/10 hover:text-white rounded-full h-7 px-3 text-xs"
                      onClick={() => {
                        navigator.clipboard.writeText(suggestedPrice.toFixed(2));
                        toast({
                          title: isSpanish ? "Precio copiado" : "Price copied",
                          description: isSpanish ? "El precio ha sido copiado al portapapeles." : "The price has been copied to your clipboard.",
                          duration: 2000,
                        });
                      }}
                    >
                      <Copy className="w-3 h-3 mr-1" />
                      {isSpanish ? "Copiar" : "Copy"}
                    </Button>
                  </div>
                  
                  {parseFloat(currentRecipe.servings) > 0 && (
                    <div className="mt-6 pt-4 border-t border-white/10 flex flex-col justify-center items-center">
                      <span className="text-xs text-[#A39589] uppercase tracking-wider mb-1">{t.perUnitResult}</span>
                      <span className="text-2xl font-bold text-white">${pricePerUnit.toFixed(2)}</span>
                      <span className="text-[10px] text-[#A39589] mt-1 opacity-80">
                        ({currentRecipe.servings} {t.servings.toLowerCase()})
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="w-full md:w-1/2 flex flex-col items-center justify-center space-y-6">
                <div className="bg-white/5 rounded-2xl p-5 border border-[#C8A97E]/30 w-full text-center">
                  <p className="text-[#C8A97E] text-[11px] uppercase tracking-widest font-bold mb-1.5">{t.totalCostResult}</p>
                  <p className="text-3xl font-bold text-white">${totalCost.toFixed(2)}</p>
                </div>

                <div className="text-center w-full">
                  <p className="text-[#A39589] text-xs uppercase tracking-widest font-bold mb-2">{t.estimatedProfitResult}</p>
                  <p className="text-4xl font-serif text-[#C8A97E] drop-shadow-md">
                    +${estimatedProfit.toFixed(2)}
                  </p>
                  {currentRecipe.profitMargin && parseFloat(currentRecipe.profitMargin) > 0 && (
                    <div className="inline-flex items-center gap-2 bg-[#2C1E16] text-[#D4C8BC] px-4 py-1.5 rounded-full text-[10px] font-bold tracking-wider border border-[#3A2A20] mt-3">
                      <PieChartIcon size={12} className="text-[#C8A97E]" />
                      {currentRecipe.profitMargin}% MARGIN
                    </div>
                  )}
                </div>
              </div>
              
            </div>
          </CardContent>
        </Card>

        {/* Breakdown Section */}
        <div className="pt-4">
          <h3 className="text-lg font-serif font-bold text-[#2C1E16] mb-4 flex items-center gap-2">
            <PieChartIcon size={18} className="text-[#C8A97E]" />
            {t.breakdownTitle}
          </h3>
          
          <div className="space-y-4">
            {/* Visual Bar */}
            <div className="h-4 rounded-full overflow-hidden flex bg-[#F0EBE1] shadow-inner">
              <div style={{ width: `${ingPercent}%` }} className="bg-[#C8A97E]"></div>
              <div style={{ width: `${labPercent}%` }} className="bg-[#8C7A6B]"></div>
              <div style={{ width: `${extPercent}%` }} className="bg-[#4A3B32]"></div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <Card className="border-[#EBE5D9] shadow-md hover:shadow-lg transition-shadow duration-300 bg-white rounded-2xl">
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <div className="w-8 h-8 rounded-full bg-[#C8A97E]/10 flex items-center justify-center mb-3">
                    <ShoppingBag size={14} className="text-[#C8A97E]" />
                  </div>
                  <p className="text-[10px] font-bold text-[#8C7A6B] uppercase tracking-wider mb-1">
                    {t.totalIngredientsResult}
                  </p>
                  <p className="text-xl font-semibold text-[#2C1E16]">${totalIngredientsCost.toFixed(2)}</p>
                  <div className="mt-2 bg-[#F0EBE1] text-[#8C7A6B] px-2 py-0.5 rounded-full text-[10px] font-bold">
                    {ingPercent.toFixed(1)}%
                  </div>
                </CardContent>
              </Card>

              <Card className="border-[#EBE5D9] shadow-md hover:shadow-lg transition-shadow duration-300 bg-white rounded-2xl">
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <div className="w-8 h-8 rounded-full bg-[#8C7A6B]/10 flex items-center justify-center mb-3">
                    <Clock size={14} className="text-[#8C7A6B]" />
                  </div>
                  <p className="text-[10px] font-bold text-[#8C7A6B] uppercase tracking-wider mb-1">
                    {t.laborCostResult}
                  </p>
                  <p className="text-xl font-semibold text-[#2C1E16]">${laborCost.toFixed(2)}</p>
                  <div className="mt-2 bg-[#F0EBE1] text-[#8C7A6B] px-2 py-0.5 rounded-full text-[10px] font-bold">
                    {labPercent.toFixed(1)}%
                  </div>
                </CardContent>
              </Card>

              <Card className="border-[#EBE5D9] shadow-md hover:shadow-lg transition-shadow duration-300 bg-white rounded-2xl">
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <div className="w-8 h-8 rounded-full bg-[#4A3B32]/10 flex items-center justify-center mb-3">
                    <PackagePlus size={14} className="text-[#4A3B32]" />
                  </div>
                  <p className="text-[10px] font-bold text-[#8C7A6B] uppercase tracking-wider mb-1">
                    {t.totalExtrasResult}
                  </p>
                  <p className="text-xl font-semibold text-[#2C1E16]">${totalExtrasCost.toFixed(2)}</p>
                  <div className="mt-2 bg-[#F0EBE1] text-[#8C7A6B] px-2 py-0.5 rounded-full text-[10px] font-bold">
                    {extPercent.toFixed(1)}%
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <Button 
          onClick={handleSave}
          className="w-full h-14 rounded-2xl bg-white border-2 border-[#C8A97E] hover:bg-[#FAF8F5] text-[#2C1E16] font-medium text-lg shadow-sm transition-all"
        >
          <Save className="mr-2 text-[#C8A97E]" size={20} />
          {t.saveRecipe}
        </Button>
      </div>
    </div>
  );
}