import React, { createContext, useContext, useState, useEffect } from 'react';

type Ingredient = {
  id: string;
  name: string;
  cost: number;
  unit: string;
};

type RecipeIngredient = {
  id: string;
  ingredientId?: string; // If from library
  name: string;
  cost: string;
  quantity?: string; // Optional for now
};

type ExtraCost = {
  id: string;
  name: string;
  cost: string;
};

type Recipe = {
  id: string;
  name: string;
  servings: string;
  ingredients: RecipeIngredient[];
  extraCosts: ExtraCost[];
  laborHours: string;
  hourlyRate: string;
  profitMargin: string;
  createdAt: number;
};

type AppContextType = {
  isSpanish: boolean;
  setIsSpanish: (val: boolean) => void;
  ingredientsLibrary: Ingredient[];
  setIngredientsLibrary: React.Dispatch<React.SetStateAction<Ingredient[]>>;
  recipes: Recipe[];
  setRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>;
  currentRecipe: Recipe;
  setCurrentRecipe: React.Dispatch<React.SetStateAction<Recipe>>;
  resetCurrentRecipe: () => void;
};

const defaultRecipe: Recipe = {
  id: '',
  name: '',
  servings: '1',
  ingredients: [{ id: '1', name: '', cost: '' }],
  extraCosts: [{ id: '1', name: '', cost: '' }],
  laborHours: '',
  hourlyRate: '',
  profitMargin: '30',
  createdAt: 0,
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [isSpanish, setIsSpanish] = useState(false);
  const [ingredientsLibrary, setIngredientsLibrary] = useState<Ingredient[]>([
    { id: '1', name: 'Flour (All Purpose)', cost: 0.15, unit: 'cup' },
    { id: '2', name: 'Sugar', cost: 0.20, unit: 'cup' },
    { id: '3', name: 'Butter', cost: 1.50, unit: 'stick' },
    { id: '4', name: 'Eggs', cost: 0.25, unit: 'each' },
  ]);
  const [recipes, setRecipes] = useState<Recipe[]>(() => {
    try {
      const savedRecipes = localStorage.getItem('cakenutz-recipes');
      if (savedRecipes) {
        return JSON.parse(savedRecipes);
      }
    } catch (e) {
      console.error("Failed to load recipes from localStorage", e);
    }
    return [];
  });
  
  const [currentRecipe, setCurrentRecipe] = useState<Recipe>({ ...defaultRecipe, id: Date.now().toString() });

  // Save recipes to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('cakenutz-recipes', JSON.stringify(recipes));
    } catch (e) {
      console.error("Failed to save recipes to localStorage", e);
    }
  }, [recipes]);

  const resetCurrentRecipe = () => {
    setCurrentRecipe({ ...defaultRecipe, id: Date.now().toString() });
  };

  return (
    <AppContext.Provider value={{
      isSpanish,
      setIsSpanish,
      ingredientsLibrary,
      setIngredientsLibrary,
      recipes,
      setRecipes,
      currentRecipe,
      setCurrentRecipe,
      resetCurrentRecipe
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
