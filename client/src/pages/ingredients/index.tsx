import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Library, 
  Plus, 
  Search, 
  Trash2, 
  Edit2,
  DollarSign
} from "lucide-react";
import { useAppContext } from "@/context/AppContext";

export default function IngredientsPage() {
  const { isSpanish, ingredientsLibrary, setIngredientsLibrary } = useAppContext();
  const [search, setSearch] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState("");
  const [newCost, setNewCost] = useState("");
  const [newUnit, setNewUnit] = useState("kg");

  const t = {
    title: isSpanish ? "Librería de Ingredientes" : "Ingredients Library",
    subtitle: isSpanish ? "Gestiona tus costos base" : "Manage your base costs",
    search: isSpanish ? "Buscar ingrediente..." : "Search ingredient...",
    add: isSpanish ? "Añadir Nuevo" : "Add New",
    save: isSpanish ? "Guardar" : "Save",
    cancel: isSpanish ? "Cancelar" : "Cancel",
    name: isSpanish ? "Nombre" : "Name",
    cost: isSpanish ? "Costo" : "Cost",
    unit: isSpanish ? "Unidad (ej. kg, lb, litro)" : "Unit (e.g. kg, lb, liter)",
    empty: isSpanish ? "No se encontraron ingredientes" : "No ingredients found",
  };

  const filtered = ingredientsLibrary.filter(i => i.name.toLowerCase().includes(search.toLowerCase()));

  const handleAdd = () => {
    if (newName && newCost) {
      setIngredientsLibrary([...ingredientsLibrary, {
        id: Date.now().toString(),
        name: newName,
        cost: parseFloat(newCost),
        unit: newUnit
      }]);
      setIsAdding(false);
      setNewName("");
      setNewCost("");
      setNewUnit("kg");
    }
  };

  const removeIng = (id: string) => {
    setIngredientsLibrary(ingredientsLibrary.filter(i => i.id !== id));
  };

  return (
    <div>
      <div className="bg-white/80 backdrop-blur-md border-b border-[#EBE5D9] sticky top-0 z-20 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-[#F5F0E6] text-[#C8A97E] p-2 rounded-xl border border-[#EBE5D9]">
              <Library size={24} />
            </div>
            <div className="flex flex-col">
              <h1 className="text-2xl font-serif font-bold text-[#2C1E16] tracking-wide leading-none">{t.title}</h1>
              <p className="text-[10px] font-medium text-[#8C7A6B] uppercase tracking-[0.2em] mt-1">{t.subtitle}</p>
            </div>
          </div>
          <Button size="icon" onClick={() => setIsAdding(!isAdding)} className="bg-[#2C1E16] hover:bg-[#3A2A20] text-[#C8A97E] rounded-full h-10 w-10 shadow-sm">
            <Plus size={18} />
          </Button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto p-4 sm:p-6 space-y-6 mt-4">
        
        {isAdding && (
          <Card className="border-[#C8A97E] shadow-md bg-[#FCFAF8] rounded-3xl overflow-hidden animate-in slide-in-from-top-4 duration-300">
            <CardContent className="p-5 space-y-4">
              <div className="space-y-2">
                <Label className="text-[#8C7A6B] text-xs font-bold uppercase tracking-wider">{t.name}</Label>
                <Input value={newName} onChange={e => setNewName(e.target.value)} className="h-12 rounded-xl border-[#EBE5D9] focus-visible:border-[#C8A97E]" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-[#8C7A6B] text-xs font-bold uppercase tracking-wider">{t.cost}</Label>
                  <div className="relative">
                    <DollarSign size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A39589]" />
                    <Input type="number" value={newCost} onChange={e => setNewCost(e.target.value)} className="h-12 pl-8 rounded-xl border-[#EBE5D9] focus-visible:border-[#C8A97E]" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-[#8C7A6B] text-xs font-bold uppercase tracking-wider">{t.unit}</Label>
                  <Input value={newUnit} onChange={e => setNewUnit(e.target.value)} className="h-12 rounded-xl border-[#EBE5D9] focus-visible:border-[#C8A97E]" placeholder="kg, cup, etc." />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button variant="ghost" onClick={() => setIsAdding(false)} className="text-[#8C7A6B]">{t.cancel}</Button>
                <Button onClick={handleAdd} className="bg-[#C8A97E] hover:bg-[#A6885D] text-white rounded-xl">{t.save}</Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A39589] h-5 w-5" />
          <Input 
            placeholder={t.search} 
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="h-14 pl-12 rounded-2xl border-0 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.08)] bg-white text-[#2C1E16] focus-visible:ring-2 focus-visible:ring-[#C8A97E]/30"
          />
        </div>

        <div className="space-y-3">
          {filtered.length === 0 ? (
            <div className="text-center py-10 text-[#8C7A6B]">
              <Library size={40} className="mx-auto mb-3 opacity-20" />
              <p>{t.empty}</p>
            </div>
          ) : (
            filtered.map(ing => (
              <Card key={ing.id} className="border-0 shadow-sm bg-white rounded-2xl overflow-hidden group">
                <CardContent className="p-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-[#2C1E16]">{ing.name}</h3>
                    <p className="text-sm text-[#8C7A6B] mt-0.5">${ing.cost.toFixed(2)} / {ing.unit}</p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => removeIng(ing.id)} className="text-[#D4C8BC] hover:text-red-500 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                    <Trash2 size={18} />
                  </Button>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}