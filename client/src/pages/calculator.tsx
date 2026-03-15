import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { 
  ChefHat, 
  DollarSign, 
  Clock, 
  Percent, 
  Plus, 
  Trash2, 
  ShoppingBag,
  PackagePlus,
  PieChart,
  Sparkles,
  RotateCcw,
  Info,
  Layers,
  Box,
  Zap,
  Gift,
  Truck
} from "lucide-react";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface CostItem {
  id: number;
  name: string;
  cost: string;
}

export default function CalculatorPage() {
  const [isSpanish, setIsSpanish] = useState(false);

  // Global details
  const [productName, setProductName] = useState("");
  const [servings, setServings] = useState("1"); // Per-unit/servings calculator
  
  // Dynamic Lists
  const [ingredients, setIngredients] = useState<CostItem[]>([{ id: 1, name: "", cost: "" }]);
  const [extraCosts, setExtraCosts] = useState<CostItem[]>([{ id: 1, name: "", cost: "" }]);
  
  // Labor & Profit
  const [laborHours, setLaborHours] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");
  const [profitMargin, setProfitMargin] = useState("30");

  const t = {
    title: isSpanish ? "BakePrice" : "BakePrice",
    subtitle: isSpanish ? "Fijación de Precios Premium" : "Premium Pricing",
    productName: isSpanish ? "Nombre de la Creación" : "Creation Name",
    productNamePlaceholder: isSpanish ? "Ej. Pastel de Bodas Royal" : "e.g. Royal Wedding Cake",
    servings: isSpanish ? "Raciones / Unidades" : "Yield / Servings",
    
    ingredientsTitle: isSpanish ? "Ingredientes" : "Ingredients",
    ingredientNamePlaceholder: isSpanish ? "Ingrediente..." : "Ingredient...",
    costPlaceholder: isSpanish ? "Costo" : "Cost",
    addIngredient: isSpanish ? "Añadir Ingrediente" : "Add Ingredient",
    
    laborTitle: isSpanish ? "Tiempo y Mano de Obra" : "Time & Labor",
    laborHours: isSpanish ? "Horas Invertidas" : "Hours Invested",
    hourlyRate: isSpanish ? "Tu Tarifa por Hora" : "Your Hourly Rate",
    
    extrasTitle: isSpanish ? "Gastos Operativos y Extras" : "Operating & Extra Costs",
    extrasNamePlaceholder: isSpanish ? "Descripción del gasto..." : "Expense description...",
    addExtra: isSpanish ? "Añadir Gasto" : "Add Expense",
    presetsTitle: isSpanish ? "Añadir Rápidamente:" : "Quick Add:",
    presetBox: isSpanish ? "Caja" : "Box",
    presetBoard: isSpanish ? "Base" : "Board",
    presetDelivery: isSpanish ? "Envío" : "Delivery",
    presetEnergy: isSpanish ? "Energía" : "Energy",
    presetDeco: isSpanish ? "Decoración" : "Decor",
    
    profitTitle: isSpanish ? "Margen y Rentabilidad" : "Margin & Profitability",
    profitMargin: isSpanish ? "Margen Deseado (%)" : "Target Margin (%)",
    marginHelpTitle: isSpanish ? "Entendiendo el Margen" : "Understanding Margin",
    marginHelpText: isSpanish 
      ? "El margen de ganancia es el porcentaje del precio final que es tu beneficio neto. Un margen de 30-40% es ideal para negocios artesanales." 
      : "Profit margin is the percentage of the final price that is your net profit. A 30-40% margin is healthy for artisan businesses.",
    
    summaryTitle: isSpanish ? "Resumen Ejecutivo" : "Executive Summary",
    laborCostResult: isSpanish ? "Mano de Obra" : "Labor Cost",
    totalIngredientsResult: isSpanish ? "Ingredientes" : "Ingredients",
    totalExtrasResult: isSpanish ? "Gastos Extra" : "Extra Expenses",
    totalCostResult: isSpanish ? "Costo Base" : "Base Cost",
    
    suggestedPriceResult: isSpanish ? "Precio Sugerido" : "Suggested Price",
    estimatedProfitResult: isSpanish ? "Beneficio Neto" : "Net Profit",
    perUnitResult: isSpanish ? "Precio por Unidad" : "Price per Serving/Unit",
    
    reset: isSpanish ? "Reiniciar" : "Reset",
  };

  // Calculations
  const { 
    totalIngredientsCost, 
    totalExtrasCost, 
    laborCost, 
    totalCost, 
    suggestedPrice, 
    estimatedProfit,
    pricePerUnit
  } = useMemo(() => {
    const ingCost = ingredients.reduce((sum, item) => sum + (parseFloat(item.cost) || 0), 0);
    const extCost = extraCosts.reduce((sum, item) => sum + (parseFloat(item.cost) || 0), 0);
    const labCost = (parseFloat(laborHours) || 0) * (parseFloat(hourlyRate) || 0);
    
    const total = ingCost + extCost + labCost;
    const margin = parseFloat(profitMargin) || 0;
    
    // Using Markup formula to achieve desired Margin: Price = Cost / (1 - Margin/100)
    // For standard Markup: Price = Cost * (1 + Margin/100) 
    // We will use standard markup for simplicity as before, but true margin is Cost / (1-Margin/100)
    // Let's use true Margin formula as this is a "professional" app now
    const safeMargin = margin >= 100 ? 99 : margin; // prevent division by zero
    const suggested = margin > 0 ? total / (1 - safeMargin / 100) : total;
    const profit = suggested - total;
    
    const units = parseFloat(servings) || 1;
    const perUnit = suggested / (units > 0 ? units : 1);

    return {
      totalIngredientsCost: ingCost,
      totalExtrasCost: extCost,
      laborCost: labCost,
      totalCost: total,
      suggestedPrice: suggested,
      estimatedProfit: profit,
      pricePerUnit: perUnit
    };
  }, [ingredients, extraCosts, laborHours, hourlyRate, profitMargin, servings]);


  const addIngredient = () => setIngredients([...ingredients, { id: Date.now(), name: "", cost: "" }]);
  const removeIngredient = (id: number) => setIngredients(ingredients.filter(i => i.id !== id));
  const updateIngredient = (id: number, field: keyof CostItem, value: string) => {
    setIngredients(ingredients.map(i => i.id === id ? { ...i, [field]: value } : i));
  };

  const addExtra = (presetName: string = "") => setExtraCosts([...extraCosts, { id: Date.now(), name: presetName, cost: "" }]);
  const removeExtra = (id: number) => setExtraCosts(extraCosts.filter(e => e.id !== id));
  const updateExtra = (id: number, field: keyof CostItem, value: string) => {
    setExtraCosts(extraCosts.map(e => e.id === id ? { ...e, [field]: value } : e));
  };

  const resetForm = () => {
    setProductName("");
    setServings("1");
    setIngredients([{ id: Date.now(), name: "", cost: "" }]);
    setExtraCosts([{ id: Date.now()+1, name: "", cost: "" }]);
    setLaborHours("");
    setHourlyRate("");
    setProfitMargin("30");
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2C1E16] pb-24 font-sans selection:bg-[#C8A97E] selection:text-white">
      
      {/* Premium Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-[#EBE5D9] sticky top-0 z-20 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-[#2C1E16] text-[#C8A97E] p-2 rounded-xl shadow-sm border border-[#3A2A20]">
              <ChefHat size={24} strokeWidth={1.5} />
            </div>
            <div className="flex flex-col">
              <h1 className="text-2xl font-serif font-bold text-[#2C1E16] tracking-wide leading-none">{t.title}</h1>
              <p className="text-[10px] font-medium text-[#8C7A6B] uppercase tracking-[0.2em] mt-1">{t.subtitle}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={resetForm} className="text-[#8C7A6B] hover:text-[#2C1E16] hover:bg-[#F5F0E6] rounded-full h-10 w-10" title={t.reset}>
              <RotateCcw size={18} />
            </Button>
            <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] border border-[#EBE5D9]">
              <span className={`text-[11px] font-bold tracking-wider ${!isSpanish ? 'text-[#2C1E16]' : 'text-[#A39589]'}`}>EN</span>
              <Switch 
                checked={isSpanish} 
                onCheckedChange={setIsSpanish} 
                className="data-[state=checked]:bg-[#C8A97E] data-[state=unchecked]:bg-[#C8A97E] scale-75 origin-center -mx-1 shadow-inner"
              />
              <span className={`text-[11px] font-bold tracking-wider ${isSpanish ? 'text-[#2C1E16]' : 'text-[#A39589]'}`}>ES</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto p-4 sm:p-6 space-y-8 mt-6">
        
        {/* Hero Section: Product & Yield */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 space-y-2">
            <Label htmlFor="productName" className="text-[#8C7A6B] font-semibold text-xs uppercase tracking-[0.1em] ml-2">{t.productName}</Label>
            <Input 
              id="productName" 
              placeholder={t.productNamePlaceholder}
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="rounded-2xl border-0 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.08)] bg-white h-16 text-xl sm:text-2xl font-serif font-medium text-[#2C1E16] placeholder:text-[#D4C8BC] px-6 focus-visible:ring-2 focus-visible:ring-[#C8A97E]/30 transition-all"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="servings" className="text-[#8C7A6B] font-semibold text-xs uppercase tracking-[0.1em] ml-2 flex items-center gap-1.5">
              <Layers size={14} className="text-[#C8A97E]" />
              {t.servings}
            </Label>
            <Input 
              id="servings" 
              type="number"
              min="1"
              step="1"
              value={servings}
              onChange={(e) => setServings(e.target.value)}
              className="rounded-2xl border-0 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.08)] bg-white h-16 text-xl font-medium text-center text-[#2C1E16] focus-visible:ring-2 focus-visible:ring-[#C8A97E]/30 transition-all"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Ingredients Section */}
          <Card className="border-0 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.06)] bg-white rounded-3xl overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#C8A97E] to-[#E3CDAA]"></div>
            <CardHeader className="bg-gradient-to-b from-[#FAF8F5] to-white border-b border-[#F0EBE1] pb-5 px-6 pt-6">
              <CardTitle className="text-xl font-serif text-[#2C1E16] flex items-center gap-3">
                <div className="p-2 bg-[#F5F0E6] rounded-lg text-[#C8A97E]">
                  <ShoppingBag size={20} />
                </div>
                {t.ingredientsTitle}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-3">
                {ingredients.map((item) => (
                  <div key={item.id} className="flex gap-3 items-center group animate-in fade-in slide-in-from-left-4 duration-300">
                    <Input 
                      placeholder={t.ingredientNamePlaceholder}
                      value={item.name}
                      onChange={(e) => updateIngredient(item.id, 'name', e.target.value)}
                      className="h-12 rounded-xl bg-[#FCFAF8] border-[#EBE5D9] focus-visible:border-[#C8A97E] focus-visible:ring-1 focus-visible:ring-[#C8A97E]/30 shadow-sm"
                    />
                    <div className="w-32 relative shrink-0">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A39589]">
                        <DollarSign size={14} />
                      </div>
                      <Input 
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="0.00"
                        value={item.cost}
                        onChange={(e) => updateIngredient(item.id, 'cost', e.target.value)}
                        className="h-12 pl-8 rounded-xl bg-[#FCFAF8] border-[#EBE5D9] focus-visible:border-[#C8A97E] focus-visible:ring-1 focus-visible:ring-[#C8A97E]/30 shadow-sm font-semibold"
                      />
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => removeIngredient(item.id)}
                      disabled={ingredients.length === 1}
                      className="h-10 w-10 shrink-0 rounded-full text-[#D4C8BC] hover:text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                ))}
              </div>
              
              <div className="pt-4 flex items-center justify-between border-t border-[#F5F0E6] mt-4">
                <Button 
                  variant="ghost" 
                  onClick={addIngredient}
                  className="rounded-full text-[#C8A97E] hover:bg-[#F5F0E6] hover:text-[#A6885D] h-10 px-4 text-sm font-bold tracking-wide"
                >
                  <Plus size={16} className="mr-2" strokeWidth={2.5} />
                  {t.addIngredient}
                </Button>
                <div className="text-right">
                  <p className="text-lg font-bold text-[#2C1E16]">${totalIngredientsCost.toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Extra Costs Section */}
          <Card className="border-0 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.06)] bg-white rounded-3xl overflow-hidden relative flex flex-col">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#8C7A6B] to-[#C4B7AC]"></div>
            <CardHeader className="bg-gradient-to-b from-[#FAF8F5] to-white border-b border-[#F0EBE1] pb-5 px-6 pt-6">
              <CardTitle className="text-xl font-serif text-[#2C1E16] flex items-center gap-3">
                <div className="p-2 bg-[#F5F0E6] rounded-lg text-[#8C7A6B]">
                  <PackagePlus size={20} />
                </div>
                {t.extrasTitle}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 flex-grow flex flex-col">
              
              <div className="mb-5">
                <p className="text-[10px] font-bold text-[#A39589] uppercase tracking-wider mb-2.5">{t.presetsTitle}</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: t.presetBox, icon: Box },
                    { label: t.presetBoard, icon: Layers },
                    { label: t.presetDelivery, icon: Truck },
                    { label: t.presetEnergy, icon: Zap },
                    { label: t.presetDeco, icon: Gift }
                  ].map((preset, i) => (
                    <button 
                      key={i}
                      onClick={() => addExtra(preset.label)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F5F0E6] text-[#6E5D50] hover:bg-[#C8A97E] hover:text-white transition-colors text-xs font-semibold"
                    >
                      <preset.icon size={12} />
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3 flex-grow">
                {extraCosts.map((item) => (
                  <div key={item.id} className="flex gap-3 items-center group animate-in fade-in slide-in-from-right-4 duration-300">
                    <Input 
                      placeholder={t.extrasNamePlaceholder}
                      value={item.name}
                      onChange={(e) => updateExtra(item.id, 'name', e.target.value)}
                      className="h-12 rounded-xl bg-[#FCFAF8] border-[#EBE5D9] focus-visible:border-[#C8A97E] shadow-sm"
                    />
                    <div className="w-32 relative shrink-0">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A39589]">
                        <DollarSign size={14} />
                      </div>
                      <Input 
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="0.00"
                        value={item.cost}
                        onChange={(e) => updateExtra(item.id, 'cost', e.target.value)}
                        className="h-12 pl-8 rounded-xl bg-[#FCFAF8] border-[#EBE5D9] focus-visible:border-[#C8A97E] shadow-sm font-semibold"
                      />
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => removeExtra(item.id)}
                      disabled={extraCosts.length === 1 && !item.name && !item.cost}
                      className="h-10 w-10 shrink-0 rounded-full text-[#D4C8BC] hover:text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                ))}
              </div>
              
              <div className="pt-4 flex items-center justify-between border-t border-[#F5F0E6] mt-4">
                <Button 
                  variant="ghost" 
                  onClick={() => addExtra()}
                  className="rounded-full text-[#8C7A6B] hover:bg-[#F5F0E6] hover:text-[#5E4D40] h-10 px-4 text-sm font-bold tracking-wide"
                >
                  <Plus size={16} className="mr-2" strokeWidth={2.5} />
                  {t.addExtra}
                </Button>
                <div className="text-right">
                  <p className="text-lg font-bold text-[#2C1E16]">${totalExtrasCost.toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Labor & Profit Row */}
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Labor */}
          <Card className="border-0 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.06)] bg-white rounded-3xl overflow-hidden">
            <CardContent className="p-6 sm:p-8 space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-[#F5F0E6] rounded-lg text-[#2C1E16]">
                  <Clock size={20} />
                </div>
                <h3 className="text-xl font-serif text-[#2C1E16]">{t.laborTitle}</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="laborHours" className="text-[#8C7A6B] text-[11px] font-bold uppercase tracking-wider">{t.laborHours}</Label>
                  <Input 
                    id="laborHours" 
                    type="number"
                    min="0"
                    step="0.5"
                    placeholder="0.0"
                    value={laborHours}
                    onChange={(e) => setLaborHours(e.target.value)}
                    className="h-14 rounded-2xl border-[#EBE5D9] bg-[#FCFAF8] focus-visible:border-[#C8A97E] text-lg font-medium shadow-inner-sm text-center"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hourlyRate" className="text-[#8C7A6B] text-[11px] font-bold uppercase tracking-wider">{t.hourlyRate}</Label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A39589]">
                      <DollarSign size={16} />
                    </div>
                    <Input 
                      id="hourlyRate" 
                      type="number"
                      min="0"
                      step="1"
                      placeholder="0.00"
                      value={hourlyRate}
                      onChange={(e) => setHourlyRate(e.target.value)}
                      className="h-14 pl-10 rounded-2xl border-[#EBE5D9] bg-[#FCFAF8] focus-visible:border-[#C8A97E] text-lg font-medium shadow-inner-sm"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Profit */}
          <Card className="border-0 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.06)] bg-white rounded-3xl overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#C8A97E]/10 to-transparent rounded-full -mr-16 -mt-16"></div>
            <CardContent className="p-6 sm:p-8 relative z-10 h-full flex flex-col justify-center">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#C8A97E]/10 rounded-lg text-[#C8A97E]">
                    <PieChart size={20} />
                  </div>
                  <h3 className="text-xl font-serif text-[#2C1E16]">{t.profitTitle}</h3>
                </div>
                
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-[#A39589] hover:text-[#2C1E16] rounded-full">
                      <Info size={16} />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-72 p-4 rounded-2xl shadow-xl border-[#EBE5D9] bg-white">
                    <h4 className="font-serif font-bold text-lg text-[#2C1E16] mb-2">{t.marginHelpTitle}</h4>
                    <p className="text-sm text-[#6E5D50] leading-relaxed">{t.marginHelpText}</p>
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="profitMargin" className="text-[#8C7A6B] text-[11px] font-bold uppercase tracking-wider">{t.profitMargin}</Label>
                <div className="relative">
                  <Input 
                    id="profitMargin" 
                    type="number"
                    min="0"
                    max="99"
                    step="5"
                    placeholder="30"
                    value={profitMargin}
                    onChange={(e) => setProfitMargin(e.target.value)}
                    className="h-16 pl-6 pr-12 rounded-2xl border-[#EBE5D9] bg-[#FCFAF8] focus-visible:border-[#C8A97E] text-2xl font-serif font-bold shadow-inner-sm text-[#2C1E16]"
                  />
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 text-[#C8A97E] font-bold text-xl">
                    %
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Executive Summary Dashboard */}
        <div className="pt-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <Card className="border-0 shadow-2xl bg-[#1A1311] text-white overflow-hidden rounded-[2rem] relative">
            {/* Luxury Background Effects */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 mix-blend-overlay"></div>
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#C8A97E] rounded-full mix-blend-screen filter blur-[100px] opacity-20"></div>
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#D4AF37] rounded-full mix-blend-screen filter blur-[100px] opacity-10"></div>
            
            <CardContent className="p-8 sm:p-10 relative z-10">
              <h2 className="text-sm font-bold text-[#C8A97E] uppercase tracking-[0.2em] mb-8 text-center">{t.summaryTitle}</h2>
              
              {/* Cost Breakdown */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
                <div className="bg-white/5 rounded-2xl p-4 border border-white/10 backdrop-blur-sm">
                  <p className="text-[#A39589] text-[10px] uppercase tracking-widest font-bold mb-1.5">{t.totalIngredientsResult}</p>
                  <p className="text-xl font-medium text-white">${totalIngredientsCost.toFixed(2)}</p>
                </div>
                <div className="bg-white/5 rounded-2xl p-4 border border-white/10 backdrop-blur-sm">
                  <p className="text-[#A39589] text-[10px] uppercase tracking-widest font-bold mb-1.5">{t.laborCostResult}</p>
                  <p className="text-xl font-medium text-white">${laborCost.toFixed(2)}</p>
                </div>
                <div className="bg-white/5 rounded-2xl p-4 border border-white/10 backdrop-blur-sm">
                  <p className="text-[#A39589] text-[10px] uppercase tracking-widest font-bold mb-1.5">{t.totalExtrasResult}</p>
                  <p className="text-xl font-medium text-white">${totalExtrasCost.toFixed(2)}</p>
                </div>
                <div className="bg-white/10 rounded-2xl p-4 border border-[#C8A97E]/30 backdrop-blur-sm shadow-[0_0_15px_rgba(200,169,126,0.1)]">
                  <p className="text-[#C8A97E] text-[10px] uppercase tracking-widest font-bold mb-1.5">{t.totalCostResult}</p>
                  <p className="text-xl font-bold text-white">${totalCost.toFixed(2)}</p>
                </div>
              </div>
              
              <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-10"></div>

              {/* Main Price & Profit */}
              <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
                
                <div className="w-full md:w-1/2 relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#C8A97E]/0 via-[#C8A97E]/10 to-[#C8A97E]/0 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  <div className="bg-gradient-to-b from-white/10 to-white/5 rounded-3xl p-8 border border-white/20 text-center relative overflow-hidden backdrop-blur-md">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#C8A97E] to-transparent opacity-50"></div>
                    
                    <p className="text-[#C8A97E] text-sm uppercase tracking-[0.2em] font-bold mb-3 flex items-center justify-center gap-2">
                      <Sparkles size={16} />
                      {t.suggestedPriceResult}
                    </p>
                    <p className="text-5xl sm:text-6xl font-serif font-bold text-white tracking-tight drop-shadow-lg">
                      ${suggestedPrice.toFixed(2)}
                    </p>
                    
                    {parseFloat(servings) > 1 && (
                      <div className="mt-4 pt-4 border-t border-white/10 flex justify-between items-center px-4">
                        <span className="text-xs text-[#A39589] uppercase tracking-wider">{t.perUnitResult}</span>
                        <span className="text-lg font-bold text-white">${pricePerUnit.toFixed(2)}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="w-full md:w-1/2 flex flex-col items-center md:items-end justify-center space-y-4">
                  <div className="text-center md:text-right">
                    <p className="text-[#A39589] text-xs uppercase tracking-widest font-bold mb-2">{t.estimatedProfitResult}</p>
                    <p className="text-4xl font-serif text-[#C8A97E] drop-shadow-md">
                      +${estimatedProfit.toFixed(2)}
                    </p>
                  </div>
                  
                  {profitMargin && parseFloat(profitMargin) > 0 && (
                    <div className="inline-flex items-center gap-2 bg-[#2C1E16] text-[#D4C8BC] px-4 py-2 rounded-full text-xs font-bold tracking-wider border border-[#3A2A20]">
                      <PieChart size={14} className="text-[#C8A97E]" />
                      {profitMargin}% MARGIN
                    </div>
                  )}
                </div>
                
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}