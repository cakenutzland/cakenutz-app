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
    search: isSpanish ? "Buscar receta..." : "Search recipe...",
    empty: isSpanish ? "No hay recetas guardadas" : "No saved recipes yet",
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
      <div className="bg-white/80 backdrop-blur-md border-b border-[#EBE5D9] sticky top-0 z-20 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-[#F5F0E6] text-[#C8A97E] p-2 rounded-xl border border-[#EBE5D9]">
              <BookOpen size={24} />
            </div>
            <div className="flex flex-col">
              <h1 className="text-2xl font-serif font-bold text-[#2C1E16] tracking-wide leading-none">{t.title}</h1>
              <p className="text-[10px] font-medium text-[#8C7A6B] uppercase tracking-[0.2em] mt-1">{t.subtitle}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto p-4 sm:p-6 space-y-6 mt-4">
        
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A39589] h-5 w-5" />
          <Input 
            placeholder={t.search} 
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="h-14 pl-12 rounded-2xl border-0 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.08)] bg-white text-[#2C1E16] focus-visible:ring-2 focus-visible:ring-[#C8A97E]/30"
          />
        </div>

        <div className="space-y-4">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-[#8C7A6B]">
              <BookOpen size={48} className="mx-auto mb-4 text-[#EBE5D9]" />
              <p className="font-medium">{t.empty}</p>
              <Button variant="link" onClick={() => setLocation("/")} className="text-[#C8A97E] mt-2">
                {isSpanish ? "Ir a la calculadora" : "Go to calculator"}
              </Button>
            </div>
          ) : (
            filtered.sort((a,b) => b.createdAt - a.createdAt).map(recipe => (
              <Card key={recipe.id} className="border-0 shadow-sm hover:shadow-md transition-shadow bg-white rounded-2xl overflow-hidden group">
                <CardContent className="p-5">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-serif font-bold text-lg text-[#2C1E16]">{recipe.name}</h3>
                      <div className="flex items-center gap-3 mt-1 text-xs text-[#8C7A6B]">
                        <span className="flex items-center gap-1"><Clock size={12}/> {new Date(recipe.createdAt).toLocaleDateString()}</span>
                        <span>{recipe.servings} {isSpanish ? 'unidades' : 'units'}</span>
                      </div>
                    </div>
                    <div className="bg-[#F5F0E6] text-[#A6885D] px-2 py-1 rounded text-xs font-bold">
                      {recipe.profitMargin}% {isSpanish ? 'Margen' : 'Margin'}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 pt-3 border-t border-[#F5F0E6]">
                    <Button onClick={() => handleOpen(recipe)} className="flex-1 bg-[#2C1E16] hover:bg-[#3A2A20] text-white rounded-xl h-10">
                      <Play size={16} className="mr-2 text-[#C8A97E]" />
                      {t.open}
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => handleDuplicate(recipe)} className="rounded-xl border-[#EBE5D9] text-[#8C7A6B] hover:text-[#2C1E16] h-10 w-10">
                      <Copy size={16} />
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => handleDelete(recipe.id)} className="rounded-xl border-[#EBE5D9] text-[#8C7A6B] hover:text-red-500 hover:bg-red-50 hover:border-red-200 h-10 w-10">
                      <Trash2 size={16} />
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