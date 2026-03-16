import { useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Shield } from "lucide-react";
import { useAppContext } from "@/context/AppContext";

export default function PrivacyPage() {
  const [, setLocation] = useLocation();
  const { isSpanish } = useAppContext();

  const t = {
    title: isSpanish ? "Política de Privacidad" : "Privacy Policy",
    subtitle: isSpanish ? "Tus datos" : "Your data",
    back: isSpanish ? "Volver" : "Back",
  };

  const today = "03/16/2026";

  return (
    <div>
      <div className="bg-white/80 backdrop-blur-md border-b border-[#F0E5D1] sticky top-0 z-20 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
          <Button variant="ghost" className="text-[#666666] hover:text-[#1A1A1A] -ml-2" onClick={() => setLocation('/about')}>
            <ArrowLeft size={18} className="mr-2" />
            {t.back}
          </Button>
          <div className="flex flex-col items-center">
            <h1 className="text-xl font-serif font-bold text-[#1A1A1A] tracking-wide leading-none">{t.title}</h1>
            <p className="text-[10px] font-medium text-[#666666] uppercase tracking-[0.2em] mt-1">{t.subtitle}</p>
          </div>
          <div className="w-20"></div> {/* Spacer to center the title */}
        </div>
      </div>

      <div className="max-w-3xl mx-auto p-4 sm:p-6 mt-4 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-24">
        
        <Card className="border-0 shadow-sm bg-white rounded-2xl overflow-hidden border border-[#F0E5D1]">
          <CardContent className="p-6 sm:p-8 space-y-6 text-[#1A1A1A] text-sm leading-relaxed">
            
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-[#FFF6E6] rounded-2xl flex items-center justify-center text-[#22C55E] shadow-sm border border-[#F0EBE1]">
                <Shield size={32} />
              </div>
            </div>

            <h2 className="text-2xl font-serif font-bold text-center">Privacy Policy for CakeNutz Bake Price Calculator</h2>
            <p className="text-center text-[#666666] italic">Effective date: {today}</p>

            <p>CakeNutz Bake Price Calculator respects your privacy.</p>

            <div>
              <h3 className="font-bold text-base mt-6 mb-2">1. Information We Collect</h3>
              <p>CakeNutz does not require users to create an account and does not collect personal information such as name, email address, phone number, or payment information.</p>
            </div>

            <div>
              <h3 className="font-bold text-base mt-6 mb-2">2. Local Storage</h3>
              <p>Recipes, ingredients, and calculation data entered into the app are stored locally on the user’s device using local storage. This information remains on your device unless you delete it.</p>
            </div>

            <div>
              <h3 className="font-bold text-base mt-6 mb-2">3. Data Sharing</h3>
              <p>CakeNutz does not sell, share, or transfer your personal data to third parties.</p>
            </div>

            <div>
              <h3 className="font-bold text-base mt-6 mb-2">4. Internet Access</h3>
              <p>The app may use internet access only to load app files, updates, and installed web app functionality. Core recipe and calculation data are stored locally on your device.</p>
            </div>

            <div>
              <h3 className="font-bold text-base mt-6 mb-2">5. Children’s Privacy</h3>
              <p>CakeNutz is not directed toward children under 13 and does not knowingly collect personal information from children.</p>
            </div>

            <div>
              <h3 className="font-bold text-base mt-6 mb-2">6. Data Security</h3>
              <p>Because your recipe and ingredient data are stored locally on your device, you are responsible for managing and protecting access to your device.</p>
            </div>

            <div>
              <h3 className="font-bold text-base mt-6 mb-2">7. Changes to This Privacy Policy</h3>
              <p>This privacy policy may be updated from time to time. Any updates will be reflected by changing the effective date above.</p>
            </div>

            <div>
              <h3 className="font-bold text-base mt-6 mb-2">8. Contact</h3>
              <p>If you have any questions about this Privacy Policy, you may contact us at:</p>
              <p className="mt-2 text-[#1E73BE] font-medium">cakenutzland@gmail.com</p>
            </div>

          </CardContent>
        </Card>
      </div>
    </div>
  );
}
