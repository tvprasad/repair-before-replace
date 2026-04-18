import { UploadCloud, Image as ImageIcon } from "lucide-react";
import { useState, useRef } from "react";

interface PhotoUploadProps {
  onUpload: (base64: string, mimeType: string) => void;
  onImageSelected?: (selected: boolean) => void;
}

export function PhotoUpload({ onUpload, onImageSelected }: PhotoUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setPreview(result);
      const base64 = result.split(',')[1];
      onUpload(base64, file.type);
      onImageSelected?.(true);
    };
    reader.readAsDataURL(file);
  };

  const trigger = () => fileInputRef.current?.click();

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={preview ? "Change photo — click or press Enter to upload a new image" : "Upload item photo — click or press Enter to select an image"}
      className="w-full max-w-xl mx-auto border-2 border-dashed border-border-subtle rounded-3xl p-8 text-center hover:border-primary-500 hover:bg-primary-500/5 transition-all duration-300 cursor-pointer group bg-surface shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-[#0a0a0a]"
      onClick={trigger}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); trigger(); } }}
    >
      <input
        type="file"
        accept="image/*"
        aria-label="Upload a photo of the damaged item"
        className="hidden"
        ref={fileInputRef}
        onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
      />
      {preview ? (
        <div className="relative rounded-2xl overflow-hidden shadow-inner h-72 w-full">
          <img src={preview} alt="Preview of uploaded item" className="object-contain w-full h-full transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-[#0a0a0a]/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300 backdrop-blur-sm">
            <span className="text-white font-medium flex items-center gap-2 bg-[#141414]/80 px-6 py-3 rounded-full border border-border-subtle">
              <UploadCloud size={20} /> Change Photo
            </span>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-5 py-12">
          <div className="w-20 h-20 rounded-full bg-[#0a0a0a] text-primary-500 flex items-center justify-center border border-border-subtle group-hover:scale-110 group-hover:border-primary-500 transition-all duration-300 shadow-sm" aria-hidden="true">
            <ImageIcon size={36} />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">Upload Item Photo</h3>
            <p className="text-slate-400 mt-2 max-w-xs mx-auto">Tap or click to upload a clear photo of the damage</p>
          </div>
        </div>
      )}
    </div>
  );
}
