import React, { useState, useRef } from 'react';
import { Sparkles, Camera, Loader2, ArrowRight } from 'lucide-react';
import { analyzeStyle } from '../services/geminiService';
import { SERVICES } from '../constants';

interface AIStyleConsultantProps {
  onStyleSelected: (serviceId: string) => void;
}

const AIStyleConsultant: React.FC<AIStyleConsultantProps> = ({ onStyleSelected }) => {
  const [description, setDescription] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{ suggestion: string; recommendedServiceId: string | null } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!description && !imagePreview) return;
    
    setIsLoading(true);
    setResult(null);
    
    // Convert preview to base64 string only if it exists
    const base64Image = imagePreview || undefined;
    
    const analysis = await analyzeStyle(description, base64Image);
    
    setResult(analysis);
    setIsLoading(false);
  };

  const recommendedService = result?.recommendedServiceId 
    ? SERVICES.find(s => s.id === result.recommendedServiceId)
    : null;

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 animate-fade-in">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center p-3 bg-indigo-500/10 text-indigo-400 rounded-full mb-4">
          <Sparkles size={24} />
        </div>
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">AI Style Consultant</h2>
        <p className="text-slate-400 max-w-xl mx-auto">
          Not sure what to get? Upload a selfie or describe your hair type, and our AI will analyze your face shape to recommend the perfect cut.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="bg-slate-800 p-6 rounded-2xl shadow-xl border border-slate-700">
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-300 mb-2">Upload a Photo (Optional)</label>
            <div 
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl h-48 flex flex-col items-center justify-center cursor-pointer transition-colors ${
                imagePreview ? 'border-amber-500 bg-slate-900' : 'border-slate-600 hover:border-slate-500 hover:bg-slate-750'
              }`}
            >
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="h-full w-full object-contain rounded-lg" />
              ) : (
                <div className="flex flex-col items-center text-slate-500">
                  <Camera size={32} className="mb-2" />
                  <span className="text-sm">Click to upload selfie</span>
                </div>
              )}
            </div>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*"
              onChange={handleImageUpload}
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-300 mb-2">Describe your hair or what you want</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 h-32 resize-none placeholder-slate-600"
              placeholder="e.g., I have thick curly hair and want something low maintenance but professional..."
            />
          </div>

          <button
            onClick={handleAnalyze}
            disabled={isLoading || (!description && !imagePreview)}
            className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
              isLoading || (!description && !imagePreview)
                ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg hover:shadow-indigo-500/25'
            }`}
          >
            {isLoading ? <Loader2 className="animate-spin" /> : <Sparkles size={20} />}
            {isLoading ? 'Analyzing...' : 'Get Recommendation'}
          </button>
        </div>

        {/* Result Section */}
        <div className={`transition-all duration-500 ${result ? 'opacity-100 translate-x-0' : 'opacity-50 translate-x-4 grayscale'}`}>
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-2xl border border-slate-700 h-full relative overflow-hidden">
            {!result ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-600">
                <Sparkles size={48} className="mb-4 opacity-20" />
                <p>Your recommendation will appear here</p>
              </div>
            ) : (
              <>
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Sparkles size={100} />
                </div>
                
                <h3 className="text-xl font-serif text-amber-500 mb-4">Our Recommendation</h3>
                <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-700/50 mb-6">
                  <p className="text-slate-200 leading-relaxed">
                    {result.suggestion}
                  </p>
                </div>

                {recommendedService && (
                  <div className="mt-auto">
                    <p className="text-sm text-slate-400 mb-2">Best Service Match:</p>
                    <div className="bg-slate-700/30 p-4 rounded-xl flex items-center gap-4 mb-6">
                      <img src={recommendedService.image} alt={recommendedService.name} className="w-16 h-16 rounded-lg object-cover" />
                      <div>
                        <h4 className="font-bold text-white">{recommendedService.name}</h4>
                        <p className="text-amber-500 text-sm">${recommendedService.price} • {recommendedService.durationMinutes} mins</p>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => onStyleSelected(recommendedService.id)}
                      className="w-full bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
                    >
                      Book This Style <ArrowRight size={18} />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIStyleConsultant;