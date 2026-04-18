import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CategoryChips } from "../components/CategoryChips";
import { PhotoUpload } from "../components/PhotoUpload";
import { ITEM_CATEGORIES } from "../data/categories";
import { Wrench } from "lucide-react";
import { Footer } from "../components/Footer";
import { AppHeader } from "../components/AppHeader";

export function Home() {
  const navigate = useNavigate();
  const [category, setCategory] = useState(ITEM_CATEGORIES[0]);
  const [uploadedImage, setUploadedImage] = useState<{ base64: string; mimeType: string } | null>(null);

  const handleUpload = (base64: string, mimeType: string) => {
    setUploadedImage({ base64, mimeType });
  };

  const handleAnalyze = () => {
    if (!uploadedImage) return;
    navigate("/assessment", { state: { imageBase64: uploadedImage.base64, mimeType: uploadedImage.mimeType, category } });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] py-12 px-4 sm:px-6 font-sans text-slate-100">
      <div className="max-w-3xl mx-auto animate-fade-in-up">
        <AppHeader />

        <main>
          <div className="text-center mb-10">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-5 tracking-tight leading-tight">Give your items a second life.</h2>
            <p className="text-lg text-slate-400 max-w-xl mx-auto leading-relaxed">
              Not sure if it's safe to repair, patch, or replace? Choose a category and upload a photo for a safer, more sustainable next step.
            </p>
          </div>

          <div className="bg-surface rounded-3xl p-8 sm:p-10 shadow-2xl border border-border-subtle">
            <h3 className="text-center font-bold text-slate-200 mb-3 text-lg">1. What kind of item is this?</h3>
            <CategoryChips selected={category} onChange={setCategory} />

            <div className="my-10 h-px bg-gradient-to-r from-transparent via-border-subtle to-transparent w-full opacity-60" />

            <h3 className="text-center font-bold text-slate-200 mb-6 text-lg">2. Let's see the damage</h3>
            <PhotoUpload onUpload={handleUpload} onImageSelected={() => {}} />

            <p className="text-center text-xs text-slate-500 mt-4 leading-relaxed">
              Supported: furniture, clothing &amp; textiles, cosmetic appliance damage.<br />
              Avoid uploading internal electrical, battery, or hidden internal damage.
            </p>

            {uploadedImage && (
              <div className="mt-8 flex justify-center">
                <button
                  onClick={handleAnalyze}
                  className="bg-primary-600 text-white px-8 py-3.5 rounded-xl font-bold text-base hover:bg-primary-700 transition-all shadow-lg shadow-primary-500/25 flex items-center gap-2 animate-fade-in-up"
                >
                  <Wrench size={18} /> Analyze Damage
                </button>
              </div>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
