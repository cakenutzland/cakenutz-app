import { useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  DollarSign, 
  Clock, 
  Percent, 
  Plus, 
  Trash2, 
  ShoppingBag,
  PackagePlus,
  PieChart,
  Layers,
  Box,
  Zap,
  Gift,
  Truck,
  RotateCcw,
  Info
} from "lucide-react";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAppContext } from "@/context/AppContext";
import { BakerHat } from "@/components/ui/baker-hat";

export default function CalculatorPage() {
  const [, setLocation] = useLocation();
  const { isSpanish, currentRecipe, setCurrentRecipe, resetCurrentRecipe } = useAppContext();

  const t = {
    title: isSpanish ? "CakeNutz" : "CakeNutz",
    subtitle: isSpanish ? "Calculadora de Costos" : "Cost Calculator",
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
    
    calculateBtn: isSpanish ? "Calcular Precio Final" : "Calculate Final Price",
    reset: isSpanish ? "Nueva Receta" : "New Recipe",
  };

  const updateRecipe = (field: string, value: any) => {
    setCurrentRecipe(prev => ({ ...prev, [field]: value }));
  };

  const addIngredient = () => {
    const newIngredients = [...currentRecipe.ingredients, { id: Date.now().toString(), name: "", cost: "" }];
    updateRecipe('ingredients', newIngredients);
  };
  
  const removeIngredient = (id: string) => {
    updateRecipe('ingredients', currentRecipe.ingredients.filter(i => i.id !== id));
  };
  
  const updateIngredient = (id: string, field: string, value: string) => {
    updateRecipe('ingredients', currentRecipe.ingredients.map(i => i.id === id ? { ...i, [field]: value } : i));
  };

  const addExtra = (presetName: string = "") => {
    const newExtras = [...currentRecipe.extraCosts, { id: Date.now().toString(), name: presetName, cost: "" }];
    updateRecipe('extraCosts', newExtras);
  };
  
  const removeExtra = (id: string) => {
    updateRecipe('extraCosts', currentRecipe.extraCosts.filter(e => e.id !== id));
  };
  
  const updateExtra = (id: string, field: string, value: string) => {
    updateRecipe('extraCosts', currentRecipe.extraCosts.map(e => e.id === id ? { ...e, [field]: value } : e));
  };

  return (
    <div>
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-[#F0E5D1] sticky top-0 z-20 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 flex items-center justify-center rounded-full overflow-hidden border-2 border-white shadow-sm bg-white">
              <img src="/assets/logo.png" alt="CakeNutz Logo" className="w-full h-full object-cover scale-110" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-2xl font-serif font-bold text-[#1A1A1A] tracking-wide leading-none">{t.title}</h1>
              <p className="text-[10px] font-medium text-[#666666] uppercase tracking-[0.2em] mt-1">{t.subtitle}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={resetCurrentRecipe} className="text-[#666666] hover:text-[#1A1A1A] hover:bg-[#FFF6E6] rounded-full h-10 w-10" title={t.reset}>
            <RotateCcw size={18} />
          </Button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto p-4 sm:p-6 space-y-8 mt-4">
        
        {/* Hero Section: Product & Yield */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 space-y-2">
            <Label htmlFor="productName" className="text-[#666666] font-semibold text-xs uppercase tracking-[0.1em] ml-2">{t.productName}</Label>
            <Input 
              id="productName" 
              placeholder={t.productNamePlaceholder}
              value={currentRecipe.name}
              onChange={(e) => updateRecipe('name', e.target.value)}
              className="rounded-2xl border-0 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.08)] bg-white h-16 text-xl sm:text-2xl font-serif font-medium text-[#1A1A1A] placeholder:text-[#D4C8BC] px-6 focus-visible:ring-2 focus-visible:ring-[#1E73BE]/30 transition-all"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="servings" className="text-[#666666] font-semibold text-xs uppercase tracking-[0.1em] ml-2 flex items-center gap-1.5">
              <Layers size={14} className="text-[#1E73BE]" />
              {t.servings}
            </Label>
            <Input 
              id="servings" 
              type="number"
              min="1"
              step="1"
              value={currentRecipe.servings}
              onChange={(e) => updateRecipe('servings', e.target.value)}
              className="rounded-2xl border-0 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.08)] bg-white h-16 text-xl font-medium text-center text-[#1A1A1A] focus-visible:ring-2 focus-visible:ring-[#1E73BE]/30 transition-all"
            />
          </div>
        </div>

        {/* Ingredients Section */}
        <Card className="border-0 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.06)] bg-white rounded-3xl overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#1E73BE] to-[#E3CDAA]"></div>
          <CardHeader className="bg-gradient-to-b from-[#FFF6E6] to-white border-b border-[#F0EBE1] pb-5 px-6 pt-6">
            <CardTitle className="text-xl font-serif text-[#1A1A1A] flex items-center gap-3">
              <div className="p-2 bg-[#FFF6E6] rounded-lg text-[#1E73BE]">
                <ShoppingBag size={20} />
              </div>
              {t.ingredientsTitle}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="space-y-3">
              {currentRecipe.ingredients.map((item) => (
                <div key={item.id} className="flex gap-3 items-center group animate-in fade-in slide-in-from-left-4 duration-300">
                  <Input 
                    placeholder={t.ingredientNamePlaceholder}
                    value={item.name}
                    onChange={(e) => updateIngredient(item.id, 'name', e.target.value)}
                    className="h-12 rounded-xl bg-[#FFFFFF] border-[#F0E5D1] focus-visible:border-[#1E73BE] focus-visible:ring-1 focus-visible:ring-[#1E73BE]/30 shadow-sm"
                  />
                  <div className="w-32 relative shrink-0">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#888888]">
                      <DollarSign size={14} />
                    </div>
                    <Input 
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="0.00"
                      value={item.cost}
                      onChange={(e) => updateIngredient(item.id, 'cost', e.target.value)}
                      className="h-12 pl-8 rounded-xl bg-[#FFFFFF] border-[#F0E5D1] focus-visible:border-[#1E73BE] focus-visible:ring-1 focus-visible:ring-[#1E73BE]/30 shadow-sm font-semibold"
                    />
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => removeIngredient(item.id)}
                    disabled={currentRecipe.ingredients.length === 1}
                    className="h-10 w-10 shrink-0 rounded-full text-[#D4C8BC] hover:text-red-500 hover:bg-red-50 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity disabled:opacity-0"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              ))}
            </div>
            
            <div className="pt-4 flex items-center justify-between border-t border-[#FFF6E6] mt-4">
              <Button 
                variant="ghost" 
                onClick={addIngredient}
                className="rounded-full text-[#1E73BE] hover:bg-[#FFF6E6] hover:text-[#A6885D] h-10 px-4 text-sm font-bold tracking-wide"
              >
                <Plus size={16} className="mr-2" strokeWidth={2.5} />
                {t.addIngredient}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Labor & Profit Row */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-0 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.06)] bg-white rounded-3xl overflow-hidden">
            <CardContent className="p-6 space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-[#FFF6E6] rounded-lg text-[#1A1A1A]">
                  <Clock size={20} />
                </div>
                <h3 className="text-xl font-serif text-[#1A1A1A]">{t.laborTitle}</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="laborHours" className="text-[#666666] text-[10px] font-bold uppercase tracking-wider">{t.laborHours}</Label>
                  <Input 
                    id="laborHours" 
                    type="number"
                    min="0"
                    step="0.5"
                    placeholder="0.0"
                    value={currentRecipe.laborHours}
                    onChange={(e) => updateRecipe('laborHours', e.target.value)}
                    className="h-14 rounded-2xl border-[#F0E5D1] bg-[#FFFFFF] focus-visible:border-[#1E73BE] text-lg font-medium shadow-inner-sm text-center"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hourlyRate" className="text-[#666666] text-[10px] font-bold uppercase tracking-wider">{t.hourlyRate}</Label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#888888]">
                      <DollarSign size={16} />
                    </div>
                    <Input 
                      id="hourlyRate" 
                      type="number"
                      min="0"
                      step="1"
                      placeholder="0.00"
                      value={currentRecipe.hourlyRate}
                      onChange={(e) => updateRecipe('hourlyRate', e.target.value)}
                      className="h-14 pl-10 rounded-2xl border-[#F0E5D1] bg-[#FFFFFF] focus-visible:border-[#1E73BE] text-lg font-medium shadow-inner-sm"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.06)] bg-white rounded-3xl overflow-hidden relative">
            <CardContent className="p-6 relative z-10 h-full flex flex-col justify-center">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#1E73BE]/10 rounded-lg text-[#1E73BE]">
                    <PieChart size={20} />
                  </div>
                  <h3 className="text-xl font-serif text-[#1A1A1A]">{t.profitTitle}</h3>
                </div>
                
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-[#888888] hover:text-[#1A1A1A] rounded-full">
                      <Info size={16} />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-72 p-4 rounded-2xl shadow-xl border-[#F0E5D1] bg-white">
                    <h4 className="font-serif font-bold text-lg text-[#1A1A1A] mb-2">{t.marginHelpTitle}</h4>
                    <p className="text-sm text-[#6E5D50] leading-relaxed">{t.marginHelpText}</p>
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="profitMargin" className="text-[#666666] text-[10px] font-bold uppercase tracking-wider">{t.profitMargin}</Label>
                <div className="relative">
                  <Input 
                    id="profitMargin" 
                    type="number"
                    min="0"
                    max="99"
                    step="5"
                    placeholder="30"
                    value={currentRecipe.profitMargin}
                    onChange={(e) => updateRecipe('profitMargin', e.target.value)}
                    className="h-14 pl-6 pr-12 rounded-2xl border-[#F0E5D1] bg-[#FFFFFF] focus-visible:border-[#1E73BE] text-2xl font-serif font-bold shadow-inner-sm text-[#1A1A1A]"
                  />
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 text-[#1E73BE] font-bold text-xl">
                    %
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Extra Costs Section */}
        <Card className="border-0 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.06)] bg-white rounded-3xl overflow-hidden relative flex flex-col mb-8">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#666666] to-[#C4B7AC]"></div>
          <CardHeader className="bg-gradient-to-b from-[#FFF6E6] to-white border-b border-[#F0EBE1] pb-4 px-6 pt-5">
            <CardTitle className="text-xl font-serif text-[#1A1A1A] flex items-center gap-3">
              <div className="p-2 bg-[#FFF6E6] rounded-lg text-[#666666]">
                <PackagePlus size={20} />
              </div>
              {t.extrasTitle}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 flex-grow flex flex-col">
            
            <div className="mb-5">
              <p className="text-[10px] font-bold text-[#888888] uppercase tracking-wider mb-2.5">{t.presetsTitle}</p>
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
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FFF6E6] text-[#6E5D50] hover:bg-[#1E73BE] hover:text-white transition-colors text-xs font-semibold"
                  >
                    <preset.icon size={12} />
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3 flex-grow">
              {currentRecipe.extraCosts.map((item) => (
                <div key={item.id} className="flex gap-3 items-center group animate-in fade-in slide-in-from-right-4 duration-300">
                  <Input 
                    placeholder={t.extrasNamePlaceholder}
                    value={item.name}
                    onChange={(e) => updateExtra(item.id, 'name', e.target.value)}
                    className="h-12 rounded-xl bg-[#FFFFFF] border-[#F0E5D1] focus-visible:border-[#1E73BE] shadow-sm"
                  />
                  <div className="w-32 relative shrink-0">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#888888]">
                      <DollarSign size={14} />
                    </div>
                    <Input 
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="0.00"
                      value={item.cost}
                      onChange={(e) => updateExtra(item.id, 'cost', e.target.value)}
                      className="h-12 pl-8 rounded-xl bg-[#FFFFFF] border-[#F0E5D1] focus-visible:border-[#1E73BE] shadow-sm font-semibold"
                    />
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => removeExtra(item.id)}
                    disabled={currentRecipe.extraCosts.length === 1 && !item.name && !item.cost}
                    className="h-10 w-10 shrink-0 rounded-full text-[#D4C8BC] hover:text-red-500 hover:bg-red-50 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity disabled:opacity-0"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              ))}
            </div>
            
            <div className="pt-4 flex items-center justify-between border-t border-[#FFF6E6] mt-4">
              <Button 
                variant="ghost" 
                onClick={() => addExtra()}
                className="rounded-full text-[#666666] hover:bg-[#FFF6E6] hover:text-[#5E4D40] h-10 px-4 text-sm font-bold tracking-wide"
              >
                <Plus size={16} className="mr-2" strokeWidth={2.5} />
                {t.addExtra}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Calculate Action */}
        <div className="py-4">
          <Button 
            onClick={() => setLocation('/results')}
            className="w-full h-16 rounded-[2rem] bg-[#FF3B30] hover:bg-[#E6352B] text-white font-medium text-xl shadow-[0_10px_30px_-10px_rgba(255,59,48,0.5)] transition-all active:scale-[0.98] border border-[#D32F2F]"
          >
            <PieChart className="mr-3 text-white" size={24} />
            {t.calculateBtn}
          </Button>
        </div>

      </div>
    </div>
  );
}