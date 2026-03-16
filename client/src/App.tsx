import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import { AppProvider } from "@/context/AppContext";
import { AppLayout } from "@/components/layout/AppLayout";

import LandingPage from "@/pages/landing/index";
import CalculatorPage from "@/pages/calculator/index";
import ResultsPage from "@/pages/results/index";
import IngredientsPage from "@/pages/ingredients/index";
import RecipesPage from "@/pages/recipes/index";
import SettingsPage from "@/pages/settings/index";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <AppLayout>
      <Switch>
        <Route path="/" component={LandingPage}/>
        <Route path="/calculator" component={CalculatorPage}/>
        <Route path="/results" component={ResultsPage}/>
        <Route path="/ingredients" component={IngredientsPage}/>
        <Route path="/recipes" component={RecipesPage}/>
        <Route path="/settings" component={SettingsPage}/>
        <Route component={NotFound} />
      </Switch>
    </AppLayout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </AppProvider>
    </QueryClientProvider>
  );
}

export default App;