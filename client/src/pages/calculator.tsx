import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Calculator, ChefHat, DollarSign, Clock, Percent, PlusCircle } from "lucide-react";

export default function CalculatorPage() {
  const [isSpanish, setIsSpanish] = useState(false);

  const [productName, setProductName] = useState("");
  const [ingredientCost, setIngredientCost] = useState("");
  const [laborHours, setLaborHours] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");
  const [extraCosts, setExtraCosts] = useState("");
  const [profitMargin, setProfitMargin] = useState("");

  const [results, setResults] = useState<{
    laborCost: number;
    totalCost: number;
    suggestedPrice: number;
    estimatedProfit: number;
  } | null>(null);

  const t = {
    title: isSpanish ? "BakePrice" : "BakePrice",
    subtitle: isSpanish ? "Calculadora de Precios de Repostería" : "Bakery Pricing Calculator",
    language: isSpanish ? "Español" : "English",
    productName: isSpanish ? "Nombre del Producto" : "Product Name",
    productNamePlaceholder: isSpanish ? "Ej. Pastel de Chocolate" : "e.g. Chocolate Cake",
    ingredientCost: isSpanish ? "Costo de Ingredientes" : "Ingredient Cost",
    laborHours: isSpanish ? "Horas de Trabajo" : "Labor Hours",
    hourlyRate: isSpanish ? "Tarifa por Hora" : "Hourly Rate",
    extraCosts: isSpanish ? "Costos Extra (Empaque, etc.)" : "Extra Costs (Packaging, etc.)",
    profitMargin: isSpanish ? "Margen de Ganancia (%)" : "Profit Margin (%)",
    calculate: isSpanish ? "Calcular Precio" : "Calculate Price",
    laborCostResult: isSpanish ? "Costo de Trabajo" : "Labor Cost",
    totalCostResult: isSpanish ? "Costo Total" : "Total Cost",
    suggestedPriceResult: isSpanish ? "Precio Sugerido" : "Suggested Price",
    estimatedProfitResult: isSpanish ? "Ganancia Estimada" : "Estimated Profit",
  };

  const handleCalculate = () => {
    const costIng = parseFloat(ingredientCost) || 0;
    const hours = parseFloat(laborHours) || 0;
    const rate = parseFloat(hourlyRate) || 0;
    const extra = parseFloat(extraCosts) || 0;
    const margin = parseFloat(profitMargin) || 0;

    const laborCost = hours * rate;
    const totalCost = costIng + laborCost + extra;
    const suggestedPrice = totalCost * (1 + margin / 100);
    const estimatedProfit = suggestedPrice - totalCost;

    setResults({
      laborCost,
      totalCost,
      suggestedPrice,
      estimatedProfit,
    });
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#4A3B32] p-4 md:p-8 font-sans selection:bg-[#E8A585] selection:text-white">
      <div className="max-w-md mx-auto space-y-6">
        
        {/* Header & Language Toggle */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <div className="bg-[#E8A585] text-white p-2 rounded-xl shadow-sm">
              <ChefHat size={28} strokeWidth={1.5} />
            </div>
            <div>
              <h1 className="text-2xl font-serif font-bold text-[#3E2B20] tracking-tight">{t.title}</h1>
            </div>
          </div>
          
          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full shadow-sm border border-[#F0EBE1]">
            <span className="text-xs font-medium text-[#8C7A6B]">EN</span>
            <Switch 
              checked={isSpanish} 
              onCheckedChange={setIsSpanish} 
              className="data-[state=checked]:bg-[#E8A585]"
              data-testid="toggle-language"
            />
            <span className="text-xs font-medium text-[#8C7A6B]">ES</span>
          </div>
        </div>

        <div className="text-center mb-6">
          <h2 className="text-lg font-medium text-[#6B5A4E]">{t.subtitle}</h2>
        </div>

        {/* Calculator Form */}
        <Card className="border-0 shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white rounded-3xl overflow-hidden">
          <CardContent className="p-6 md:p-8 space-y-6">
            
            <div className="space-y-2">
              <Label htmlFor="productName" className="text-[#6B5A4E] font-medium text-sm ml-1">{t.productName}</Label>
              <Input 
                id="productName" 
                placeholder={t.productNamePlaceholder}
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="rounded-2xl border-[#F0EBE1] bg-[#FCFAF8] focus-visible:ring-[#E8A585] h-12 text-base px-4 transition-all"
                data-testid="input-product-name"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="ingredientCost" className="text-[#6B5A4E] font-medium text-sm ml-1 flex items-center gap-1.5">
                  <DollarSign size={14} className="text-[#E8A585]" />
                  {t.ingredientCost}
                </Label>
                <Input 
                  id="ingredientCost" 
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  value={ingredientCost}
                  onChange={(e) => setIngredientCost(e.target.value)}
                  className="rounded-2xl border-[#F0EBE1] bg-[#FCFAF8] focus-visible:ring-[#E8A585] h-12 text-base px-4"
                  data-testid="input-ingredient-cost"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="extraCosts" className="text-[#6B5A4E] font-medium text-sm ml-1 flex items-center gap-1.5">
                  <PlusCircle size={14} className="text-[#E8A585]" />
                  {t.extraCosts}
                </Label>
                <Input 
                  id="extraCosts" 
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  value={extraCosts}
                  onChange={(e) => setExtraCosts(e.target.value)}
                  className="rounded-2xl border-[#F0EBE1] bg-[#FCFAF8] focus-visible:ring-[#E8A585] h-12 text-base px-4"
                  data-testid="input-extra-costs"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="laborHours" className="text-[#6B5A4E] font-medium text-sm ml-1 flex items-center gap-1.5">
                  <Clock size={14} className="text-[#E8A585]" />
                  {t.laborHours}
                </Label>
                <Input 
                  id="laborHours" 
                  type="number"
                  min="0"
                  step="0.5"
                  placeholder="0.0"
                  value={laborHours}
                  onChange={(e) => setLaborHours(e.target.value)}
                  className="rounded-2xl border-[#F0EBE1] bg-[#FCFAF8] focus-visible:ring-[#E8A585] h-12 text-base px-4"
                  data-testid="input-labor-hours"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="hourlyRate" className="text-[#6B5A4E] font-medium text-sm ml-1 flex items-center gap-1.5">
                  <DollarSign size={14} className="text-[#E8A585]" />
                  {t.hourlyRate}
                </Label>
                <Input 
                  id="hourlyRate" 
                  type="number"
                  min="0"
                  step="0.5"
                  placeholder="0.00"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(e.target.value)}
                  className="rounded-2xl border-[#F0EBE1] bg-[#FCFAF8] focus-visible:ring-[#E8A585] h-12 text-base px-4"
                  data-testid="input-hourly-rate"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="profitMargin" className="text-[#6B5A4E] font-medium text-sm ml-1 flex items-center gap-1.5">
                <Percent size={14} className="text-[#E8A585]" />
                {t.profitMargin}
              </Label>
              <Input 
                id="profitMargin" 
                type="number"
                min="0"
                step="1"
                placeholder="20"
                value={profitMargin}
                onChange={(e) => setProfitMargin(e.target.value)}
                className="rounded-2xl border-[#F0EBE1] bg-[#FCFAF8] focus-visible:ring-[#E8A585] h-12 text-base px-4"
                data-testid="input-profit-margin"
              />
            </div>

            <Button 
              onClick={handleCalculate}
              className="w-full h-14 mt-4 rounded-2xl bg-[#E8A585] hover:bg-[#D99173] text-white font-medium text-lg shadow-md transition-all active:scale-[0.98]"
              data-testid="button-calculate"
            >
              <Calculator className="mr-2" size={20} />
              {t.calculate}
            </Button>
          </CardContent>
        </Card>

        {/* Results Section */}
        {results && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
            <h3 className="text-center font-serif text-xl font-semibold text-[#3E2B20]">
              {productName ? productName : t.suggestedPriceResult}
            </h3>
            
            <div className="grid grid-cols-2 gap-3">
              <Card className="border-0 shadow-sm bg-white rounded-2xl">
                <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                  <p className="text-xs font-medium text-[#8C7A6B] uppercase tracking-wider mb-1">{t.laborCostResult}</p>
                  <p className="text-xl font-semibold text-[#6B5A4E]" data-testid="text-labor-cost">
                    ${results.laborCost.toFixed(2)}
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm bg-white rounded-2xl">
                <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                  <p className="text-xs font-medium text-[#8C7A6B] uppercase tracking-wider mb-1">{t.totalCostResult}</p>
                  <p className="text-xl font-semibold text-[#6B5A4E]" data-testid="text-total-cost">
                    ${results.totalCost.toFixed(2)}
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card className="border-0 shadow-lg bg-[#3E2B20] text-white rounded-3xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#E8A585]/20 rounded-full -ml-8 -mb-8 blur-xl"></div>
              <CardContent className="p-8 relative z-10 flex flex-col items-center justify-center text-center">
                <p className="text-sm font-medium text-white/80 uppercase tracking-widest mb-2">{t.suggestedPriceResult}</p>
                <p className="text-5xl font-serif font-bold text-[#FDFBF7] mb-6" data-testid="text-suggested-price">
                  ${results.suggestedPrice.toFixed(2)}
                </p>
                
                <div className="w-full h-px bg-white/10 mb-6"></div>
                
                <p className="text-sm font-medium text-[#E8A585] flex items-center gap-1.5">
                  {t.estimatedProfitResult}: 
                  <span className="text-lg font-semibold text-white ml-1" data-testid="text-estimated-profit">
                    ${results.estimatedProfit.toFixed(2)}
                  </span>
                </p>
              </CardContent>
            </Card>
          </div>
        )}

      </div>
    </div>
  );
}