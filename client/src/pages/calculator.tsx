import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { 
  ChefHat, 
  DollarSign, 
  Clock, 
  Percent, 
  Plus, 
  Trash2, 
  ShoppingBasket,
  PackageSearch,
  PieChart,
  Sparkles,
  Receipt
} from "lucide-react";

interface CostItem {
  id: number;
  name: string;
  cost: string;
}

export default function CalculatorPage() {
  const [isSpanish, setIsSpanish] = useState(false);

  // Global details
  const [productName, setProductName] = useState("");
  
  // Dynamic Lists
  const [ingredients, setIngredients] = useState<CostItem[]>([{ id: 1, name: "", cost: "" }]);
  const [extraCosts, setExtraCosts] = useState<CostItem[]>([{ id: 1, name: "", cost: "" }]);
  
  // Labor & Profit
  const [laborHours, setLaborHours] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");
  const [profitMargin, setProfitMargin] = useState("30");

  const t = {
    title: isSpanish ? "BakePrice" : "BakePrice",
    subtitle: isSpanish ? "Calculadora Profesional" : "Professional Pricing",
    productName: isSpanish ? "Nombre del Producto" : "Product Name",
    productNamePlaceholder: isSpanish ? "Ej. Pastel de Bodas de 3 Pisos" : "e.g. 3-Tier Wedding Cake",
    
    ingredientsTitle: isSpanish ? "Ingredientes" : "Ingredients",
    ingredientNamePlaceholder: isSpanish ? "Harina, mantequilla..." : "Flour, butter...",
    costPlaceholder: isSpanish ? "Costo" : "Cost",
    addIngredient: isSpanish ? "Añadir Ingrediente" : "Add Ingredient",
    
    laborTitle: isSpanish ? "Mano de Obra" : "Labor & Time",
    laborHours: isSpanish ? "Horas de Trabajo" : "Labor Hours",
    hourlyRate: isSpanish ? "Tarifa por Hora" : "Hourly Rate",
    
    extrasTitle: isSpanish ? "Costos Extras" : "Extra Costs",
    extrasNamePlaceholder: isSpanish ? "Caja, envío, base..." : "Box, delivery, board...",
    addExtra: isSpanish ? "Añadir Costo Extra" : "Add Extra Cost",
    
    profitTitle: isSpanish ? "Rentabilidad" : "Profitability",
    profitMargin: isSpanish ? "Margen de Ganancia (%)" : "Profit Margin (%)",
    
    summaryTitle: isSpanish ? "Resumen de Costos" : "Cost Summary",
    laborCostResult: isSpanish ? "Mano de Obra" : "Labor Cost",
    totalIngredientsResult: isSpanish ? "Ingredientes" : "Ingredients",
    totalExtrasResult: isSpanish ? "Gastos Extra" : "Extra Expenses",
    totalCostResult: isSpanish ? "Costo Base Total" : "Total Base Cost",
    
    suggestedPriceResult: isSpanish ? "Precio Sugerido" : "Suggested Price",
    estimatedProfitResult: isSpanish ? "Ganancia Neta" : "Net Profit",
  };

  // Calculations
  const { 
    totalIngredientsCost, 
    totalExtrasCost, 
    laborCost, 
    totalCost, 
    suggestedPrice, 
    estimatedProfit 
  } = useMemo(() => {
    const ingCost = ingredients.reduce((sum, item) => sum + (parseFloat(item.cost) || 0), 0);
    const extCost = extraCosts.reduce((sum, item) => sum + (parseFloat(item.cost) || 0), 0);
    const labCost = (parseFloat(laborHours) || 0) * (parseFloat(hourlyRate) || 0);
    
    const total = ingCost + extCost + labCost;
    const margin = parseFloat(profitMargin) || 0;
    
    const suggested = total * (1 + margin / 100);
    const profit = suggested - total;

    return {
      totalIngredientsCost: ingCost,
      totalExtrasCost: extCost,
      laborCost: labCost,
      totalCost: total,
      suggestedPrice: suggested,
      estimatedProfit: profit
    };
  }, [ingredients, extraCosts, laborHours, hourlyRate, profitMargin]);


  const addIngredient = () => setIngredients([...ingredients, { id: Date.now(), name: "", cost: "" }]);
  const removeIngredient = (id: number) => setIngredients(ingredients.filter(i => i.id !== id));
  const updateIngredient = (id: number, field: keyof CostItem, value: string) => {
    setIngredients(ingredients.map(i => i.id === id ? { ...i, [field]: value } : i));
  };

  const addExtra = () => setExtraCosts([...extraCosts, { id: Date.now(), name: "", cost: "" }]);
  const removeExtra = (id: number) => setExtraCosts(extraCosts.filter(e => e.id !== id));
  const updateExtra = (id: number, field: keyof CostItem, value: string) => {
    setExtraCosts(extraCosts.map(e => e.id === id ? { ...e, [field]: value } : e));
  };

  return (
    <div className="min-h-screen bg-[#F9F8F6] text-[#2C241E] pb-24 font-sans selection:bg-[#B58562] selection:text-white">
      
      {/* Top Navigation / Header */}
      <div className="bg-white border-b border-[#EAE5DF] sticky top-0 z-10 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="bg-gradient-to-tr from-[#B58562] to-[#D4A373] text-white p-1.5 rounded-lg shadow-sm">
              <ChefHat size={22} strokeWidth={1.5} />
            </div>
            <div>
              <h1 className="text-xl font-serif font-semibold text-[#2C241E] tracking-tight leading-none">{t.title}</h1>
              <p className="text-[10px] font-medium text-[#8C8279] uppercase tracking-widest">{t.subtitle}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 bg-[#F9F8F6] px-3 py-1.5 rounded-full border border-[#EAE5DF]">
            <span className={`text-xs font-semibold ${!isSpanish ? 'text-[#2C241E]' : 'text-[#A39A92]'}`}>EN</span>
            <Switch 
              checked={isSpanish} 
              onCheckedChange={setIsSpanish} 
              className="data-[state=checked]:bg-[#B58562] data-[state=unchecked]:bg-[#B58562] scale-75 origin-center -mx-1"
              data-testid="toggle-language"
            />
            <span className={`text-xs font-semibold ${isSpanish ? 'text-[#2C241E]' : 'text-[#A39A92]'}`}>ES</span>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-4 sm:p-6 space-y-6 mt-4">
        
        {/* Product Name Hero Input */}
        <div className="space-y-2">
          <Label htmlFor="productName" className="text-[#8C8279] font-medium text-xs uppercase tracking-wider ml-1">{t.productName}</Label>
          <Input 
            id="productName" 
            placeholder={t.productNamePlaceholder}
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="rounded-2xl border-0 shadow-sm bg-white h-16 text-xl sm:text-2xl font-serif text-[#2C241E] placeholder:text-[#D4CCC4] px-5 focus-visible:ring-2 focus-visible:ring-[#B58562]/20 focus-visible:bg-white transition-all"
            data-testid="input-product-name"
          />
        </div>

        {/* Ingredients Section */}
        <Card className="border-[#EAE5DF] shadow-sm bg-white overflow-hidden rounded-2xl">
          <CardHeader className="bg-[#FAF9F7] border-b border-[#EAE5DF] pb-4 px-5 pt-5">
            <CardTitle className="text-lg font-serif text-[#2C241E] flex items-center gap-2">
              <ShoppingBasket size={18} className="text-[#B58562]" />
              {t.ingredientsTitle}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5 space-y-3">
            <div className="space-y-3">
              {ingredients.map((item, index) => (
                <div key={item.id} className="flex gap-2 items-start animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="flex-grow">
                    <Input 
                      placeholder={t.ingredientNamePlaceholder}
                      value={item.name}
                      onChange={(e) => updateIngredient(item.id, 'name', e.target.value)}
                      className="h-11 rounded-xl bg-[#FDFCFB] border-[#EAE5DF] focus-visible:border-[#B58562] focus-visible:ring-1 focus-visible:ring-[#B58562]/30"
                    />
                  </div>
                  <div className="w-28 relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A39A92]">
                      <DollarSign size={14} />
                    </div>
                    <Input 
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="0.00"
                      value={item.cost}
                      onChange={(e) => updateIngredient(item.id, 'cost', e.target.value)}
                      className="h-11 pl-7 rounded-xl bg-[#FDFCFB] border-[#EAE5DF] focus-visible:border-[#B58562] focus-visible:ring-1 focus-visible:ring-[#B58562]/30 font-medium"
                    />
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => removeIngredient(item.id)}
                    disabled={ingredients.length === 1}
                    className="h-11 w-11 rounded-xl text-[#A39A92] hover:text-red-500 hover:bg-red-50"
                  >
                    <Trash2 size={18} />
                  </Button>
                </div>
              ))}
            </div>
            
            <div className="pt-2 flex items-center justify-between">
              <Button 
                variant="outline" 
                onClick={addIngredient}
                className="rounded-xl border-[#EAE5DF] text-[#B58562] hover:bg-[#FDFCFB] hover:text-[#8C6042] h-10 px-4 text-sm font-medium"
              >
                <Plus size={16} className="mr-1.5" />
                {t.addIngredient}
              </Button>
              <div className="text-right">
                <span className="text-xs text-[#8C8279] uppercase tracking-wider font-medium">{t.totalIngredientsResult}</span>
                <p className="text-lg font-semibold text-[#2C241E]">${totalIngredientsCost.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Extra Costs Section */}
        <Card className="border-[#EAE5DF] shadow-sm bg-white overflow-hidden rounded-2xl">
          <CardHeader className="bg-[#FAF9F7] border-b border-[#EAE5DF] pb-4 px-5 pt-5">
            <CardTitle className="text-lg font-serif text-[#2C241E] flex items-center gap-2">
              <PackageSearch size={18} className="text-[#B58562]" />
              {t.extrasTitle}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5 space-y-3">
            <div className="space-y-3">
              {extraCosts.map((item, index) => (
                <div key={item.id} className="flex gap-2 items-start animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="flex-grow">
                    <Input 
                      placeholder={t.extrasNamePlaceholder}
                      value={item.name}
                      onChange={(e) => updateExtra(item.id, 'name', e.target.value)}
                      className="h-11 rounded-xl bg-[#FDFCFB] border-[#EAE5DF] focus-visible:border-[#B58562] focus-visible:ring-1 focus-visible:ring-[#B58562]/30"
                    />
                  </div>
                  <div className="w-28 relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A39A92]">
                      <DollarSign size={14} />
                    </div>
                    <Input 
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="0.00"
                      value={item.cost}
                      onChange={(e) => updateExtra(item.id, 'cost', e.target.value)}
                      className="h-11 pl-7 rounded-xl bg-[#FDFCFB] border-[#EAE5DF] focus-visible:border-[#B58562] focus-visible:ring-1 focus-visible:ring-[#B58562]/30 font-medium"
                    />
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => removeExtra(item.id)}
                    disabled={extraCosts.length === 1}
                    className="h-11 w-11 rounded-xl text-[#A39A92] hover:text-red-500 hover:bg-red-50"
                  >
                    <Trash2 size={18} />
                  </Button>
                </div>
              ))}
            </div>
            
            <div className="pt-2 flex items-center justify-between">
              <Button 
                variant="outline" 
                onClick={addExtra}
                className="rounded-xl border-[#EAE5DF] text-[#B58562] hover:bg-[#FDFCFB] hover:text-[#8C6042] h-10 px-4 text-sm font-medium"
              >
                <Plus size={16} className="mr-1.5" />
                {t.addExtra}
              </Button>
              <div className="text-right">
                <span className="text-xs text-[#8C8279] uppercase tracking-wider font-medium">{t.totalExtrasResult}</span>
                <p className="text-lg font-semibold text-[#2C241E]">${totalExtrasCost.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid sm:grid-cols-2 gap-6">
          {/* Labor Section */}
          <Card className="border-[#EAE5DF] shadow-sm bg-white overflow-hidden rounded-2xl">
            <CardHeader className="bg-[#FAF9F7] border-b border-[#EAE5DF] pb-4 px-5 pt-5">
              <CardTitle className="text-lg font-serif text-[#2C241E] flex items-center gap-2">
                <Clock size={18} className="text-[#B58562]" />
                {t.laborTitle}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="laborHours" className="text-[#8C8279] text-xs font-medium uppercase tracking-wider">{t.laborHours}</Label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A39A92]">
                    <Clock size={16} />
                  </div>
                  <Input 
                    id="laborHours" 
                    type="number"
                    min="0"
                    step="0.5"
                    placeholder="0.0"
                    value={laborHours}
                    onChange={(e) => setLaborHours(e.target.value)}
                    className="h-12 pl-9 rounded-xl border-[#EAE5DF] bg-[#FDFCFB] focus-visible:border-[#B58562] focus-visible:ring-1 focus-visible:ring-[#B58562]/30 font-medium"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="hourlyRate" className="text-[#8C8279] text-xs font-medium uppercase tracking-wider">{t.hourlyRate}</Label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A39A92]">
                    <DollarSign size={16} />
                  </div>
                  <Input 
                    id="hourlyRate" 
                    type="number"
                    min="0"
                    step="0.5"
                    placeholder="0.00"
                    value={hourlyRate}
                    onChange={(e) => setHourlyRate(e.target.value)}
                    className="h-12 pl-9 rounded-xl border-[#EAE5DF] bg-[#FDFCFB] focus-visible:border-[#B58562] focus-visible:ring-1 focus-visible:ring-[#B58562]/30 font-medium"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Profit Section */}
          <Card className="border-[#EAE5DF] shadow-sm bg-white overflow-hidden rounded-2xl">
            <CardHeader className="bg-[#FAF9F7] border-b border-[#EAE5DF] pb-4 px-5 pt-5">
              <CardTitle className="text-lg font-serif text-[#2C241E] flex items-center gap-2">
                <PieChart size={18} className="text-[#B58562]" />
                {t.profitTitle}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5">
              <div className="space-y-1.5">
                <Label htmlFor="profitMargin" className="text-[#8C8279] text-xs font-medium uppercase tracking-wider">{t.profitMargin}</Label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A39A92]">
                    <Percent size={16} />
                  </div>
                  <Input 
                    id="profitMargin" 
                    type="number"
                    min="0"
                    step="1"
                    placeholder="30"
                    value={profitMargin}
                    onChange={(e) => setProfitMargin(e.target.value)}
                    className="h-12 pl-9 rounded-xl border-[#EAE5DF] bg-[#FDFCFB] focus-visible:border-[#B58562] focus-visible:ring-1 focus-visible:ring-[#B58562]/30 font-medium text-lg"
                  />
                </div>
              </div>
              <p className="text-xs text-[#A39A92] mt-4 leading-relaxed">
                {isSpanish 
                  ? "Un margen del 30-40% es estándar para negocios de repostería artesanales."
                  : "A 30-40% margin is standard for artisan baking businesses."}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Final Results Dashboard */}
        <div className="mt-8 space-y-4">
          <h2 className="text-sm font-semibold text-[#8C8279] uppercase tracking-widest pl-1">{t.summaryTitle}</h2>
          
          <Card className="border-0 shadow-lg bg-[#2C241E] text-white overflow-hidden rounded-3xl relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#B58562]/20 to-transparent rounded-full -mr-32 -mt-32 blur-3xl pointer-events-none"></div>
            
            <CardContent className="p-6 sm:p-8 relative z-10">
              {/* Breakdown */}
              <div className="grid grid-cols-3 gap-4 mb-6 text-center">
                <div>
                  <p className="text-[#A39A92] text-xs uppercase tracking-wider font-medium mb-1">{t.totalIngredientsResult}</p>
                  <p className="text-lg font-semibold text-[#EAE5DF]">${totalIngredientsCost.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-[#A39A92] text-xs uppercase tracking-wider font-medium mb-1">{t.laborCostResult}</p>
                  <p className="text-lg font-semibold text-[#EAE5DF]">${laborCost.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-[#A39A92] text-xs uppercase tracking-wider font-medium mb-1">{t.totalExtrasResult}</p>
                  <p className="text-lg font-semibold text-[#EAE5DF]">${totalExtrasCost.toFixed(2)}</p>
                </div>
              </div>
              
              <div className="w-full h-px bg-white/10 mb-6"></div>

              {/* Totals */}
              <div className="flex flex-col sm:flex-row gap-6 items-center justify-between">
                <div className="text-center sm:text-left">
                  <p className="text-[#A39A92] text-xs uppercase tracking-widest font-medium mb-1">{t.totalCostResult}</p>
                  <p className="text-2xl font-serif text-white">${totalCost.toFixed(2)}</p>
                </div>

                <div className="bg-white/5 rounded-2xl p-5 border border-white/10 text-center flex-grow w-full sm:w-auto relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_2.5s_infinite]"></div>
                  <p className="text-[#D4A373] text-sm uppercase tracking-widest font-semibold mb-1 flex items-center justify-center gap-1.5">
                    <Sparkles size={14} />
                    {t.suggestedPriceResult}
                  </p>
                  <p className="text-4xl sm:text-5xl font-serif font-bold text-white tracking-tight">
                    ${suggestedPrice.toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex justify-center">
                <div className="inline-flex items-center gap-2 bg-[#B58562]/20 text-[#D4A373] px-4 py-2 rounded-full text-sm font-medium border border-[#B58562]/30">
                  <Receipt size={16} />
                  {t.estimatedProfitResult}: 
                  <span className="text-white ml-1">${estimatedProfit.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}