import { useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  BookOpen, 
  Search, 
  Trash2, 
  Play,
  Copy,
  Clock
} from "lucide-react";
import { useAppContext } from "@/context/AppContext";

export default function RecipesPage() {
  const [, setLocation] = useLocation();
  const { isSpanish, recipes, setRecipes, setCurrentRecipe } = useAppContext();
  const [search, setSearch] = useState("");

  const t = {
    title: isSpanish ? "Mis Recetas" : "My Recipes",
    subtitle: isSpanish ? "Cotizaciones guardadas" : "Saved pricings",
    search: isSpanish ? "Buscar receta por nombre..." : "Search recipe by name...",
    empty: isSpanish ? "Aún no tienes recetas guardadas." : "You haven't saved any recipes yet.",
    open: isSpanish ? "Abrir" : "Open",
    duplicate: isSpanish ? "Duplicar" : "Duplicate",
    delete: isSpanish ? "Eliminar" : "Delete",
  };

  const filtered = recipes.filter(r => r.name.toLowerCase().includes(search.toLowerCase()));

  const handleOpen = (recipe: any) => {
    setCurrentRecipe(recipe);
    setLocation("/");
  };

  const handleDuplicate = (recipe: any) => {
    const dupe = { ...recipe, id: Date.now().toString(), name: `${recipe.name} (Copy)`, createdAt: Date.now() };
    setRecipes([dupe, ...recipes]);
  };

  const handleDelete = (id: string) => {
    setRecipes(recipes.filter(r => r.id !== id));
  };

  return (
    <div>
      <div className="bg-white/80 backdrop-blur-md border-b border-[#F0E5D1] sticky top-0 z-20 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-[#FFF6E6] text-[#1E73BE] p-2 rounded-xl border border-[#F0E5D1]">
              <BookOpen size={24} />
            </div>
            <div className="flex flex-col">
              <h1 className="text-2xl font-serif font-bold text-[#1A1A1A] tracking-wide leading-none">{t.title}</h1>
              <p className="text-[10px] font-medium text-[#666666] uppercase tracking-[0.2em] mt-1">{t.subtitle}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto p-4 sm:p-6 space-y-6 mt-4">
        
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#888888] h-5 w-5" />
          <Input 
            placeholder={t.search} 
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="h-14 pl-12 rounded-2xl border-0 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.08)] bg-white text-[#1A1A1A] focus-visible:ring-2 focus-visible:ring-[#1E73BE]/30"
          />
        </div>

        <div className="space-y-4">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-[#666666]">
              <BookOpen size={48} className="mx-auto mb-4 text-[#F0E5D1]" />
              <p className="font-medium">{t.empty}</p>
              <Button variant="link" onClick={() => setLocation("/")} className="text-[#1E73BE] mt-2">
                {isSpanish ? "Ir a la calculadora" : "Go to calculator"}
              </Button>
            </div>
          ) : (
            filtered.sort((a,b) => b.createdAt - a.createdAt).map(recipe => (
              <Card key={recipe.id} className="border-0 shadow-sm hover:shadow-md transition-all duration-200 bg-white rounded-3xl overflow-hidden group">
                <CardContent className="p-6 sm:p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="font-serif font-bold text-xl text-[#1A1A1A]">{recipe.name}</h3>
                      <div className="flex items-center gap-3 mt-2 text-sm text-[#666666] font-medium">
                        <span className="flex items-center gap-1.5"><Clock size={14}/> {new Date(recipe.createdAt).toLocaleDateString()}</span>
                        <span>{recipe.servings} {parseFloat(recipe.servings) === 1 ? (isSpanish ? 'unidad' : 'unit') : (isSpanish ? 'unidades' : 'units')}</span>
                      </div>
                    </div>
                    <div className="bg-[#FFF6E6] text-[#1E73BE] px-3 py-1.5 rounded-lg text-xs font-bold shadow-sm">
                      {recipe.profitMargin}% {isSpanish ? 'Margen' : 'Margin'}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 pt-4 border-t border-[#F0E5D1]">
                    <Button onClick={() => handleOpen(recipe)} className="flex-1 bg-[#1A1A1A] hover:bg-[#333333] text-white rounded-xl h-12 shadow-sm transition-all active:scale-[0.98]">
                      <Play size={18} className="mr-2 text-[#FFD83D]" />
                      {t.open}
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => handleDuplicate(recipe)} className="rounded-xl border-[#F0E5D1] text-[#666666] hover:text-[#1A1A1A] hover:bg-[#F0E5D1]/50 h-12 w-12 transition-colors shrink-0">
                      <Copy size={18} />
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => handleDelete(recipe.id)} className="rounded-xl border-[#F0E5D1] text-[#666666] hover:text-red-500 hover:bg-red-50 hover:border-red-200 h-12 w-12 transition-colors shrink-0">
                      <Trash2 size={18} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}