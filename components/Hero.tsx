import React from 'react';
import { ViewState } from '../types';
import { ArrowRight, Star, Clock, CheckCircle } from 'lucide-react';

interface HeroProps {
  onBookNow: () => void;
  onTryAI: () => void;
}

const Hero: React.FC<HeroProps> = ({ onBookNow, onTryAI }) => {
  return (
    <div className="relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1503951914875-452162b7f30a?q=80&w=2070&auto=format&fit=crop" 
          alt="Barber Shop Interior" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-20 md:py-32 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-sm font-medium mb-6 animate-fade-in">
          <Star size={14} fill="currentColor" /> Voted #1 Barber Shop in City
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold font-serif text-white mb-6 leading-tight">
          Mastering the Art of <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
            Modern Grooming
          </span>
        </h1>
        
        <p className="text-slate-300 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed">
          Experience precision cuts and timeless style without the wait. 
          Book your appointment online and walk straight into the chair.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md justify-center">
          <button 
            onClick={onBookNow}
            className="flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold py-4 px-8 rounded-xl transition-all shadow-[0_4px_20px_rgba(245,158,11,0.3)] hover:shadow-[0_6px_25px_rgba(245,158,11,0.4)]"
          >
            Book Appointment <ArrowRight size={20} />
          </button>
          
          <button 
            onClick={onTryAI}
            className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold py-4 px-8 rounded-xl border border-slate-700 transition-all"
          >
            AI Style Consultant
          </button>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-slate-400 text-sm font-medium">
          <div className="flex items-center justify-center gap-2">
            <Clock className="text-amber-500" size={20} />
            <span>Zero Wait Policy</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <CheckCircle className="text-amber-500" size={20} />
            <span>Expert Barbers</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Star className="text-amber-500" size={20} />
            <span>Premium Products</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
