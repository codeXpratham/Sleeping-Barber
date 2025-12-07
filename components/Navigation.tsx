import React from 'react';
import { Scissors, User, Calendar, Sparkles } from 'lucide-react';
import { ViewState } from '../types';

interface NavigationProps {
  currentView: ViewState;
  onChangeView: (view: ViewState) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, onChangeView }) => {
  const navItems = [
    { id: 'HOME', label: 'Home', icon: Scissors },
    { id: 'BOOKING', label: 'Book Now', icon: Calendar },
    { id: 'AI_CONSULTANT', label: 'AI Consultant', icon: Sparkles },
    { id: 'MY_APPOINTMENTS', label: 'My Bookings', icon: User },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div 
            className="flex items-center gap-2 cursor-pointer" 
            onClick={() => onChangeView('HOME')}
          >
            <div className="bg-amber-500 p-1.5 rounded-lg text-slate-900">
              <Scissors size={24} />
            </div>
            <span className="text-xl font-bold font-serif text-amber-500 tracking-wider">
              Crown & Clipper
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onChangeView(item.id as ViewState)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 text-sm font-medium ${
                  currentView === item.id
                    ? 'bg-amber-500 text-slate-900 shadow-[0_0_15px_rgba(245,158,11,0.3)]'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <item.icon size={16} />
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Nav Button (Simplified for this demo) */}
          <div className="md:hidden flex gap-4">
             {navItems.slice(1, 4).map((item) => (
                 <button
                    key={item.id}
                    onClick={() => onChangeView(item.id as ViewState)}
                    className={`p-2 rounded-lg ${currentView === item.id ? 'text-amber-500' : 'text-slate-400'}`}
                 >
                     <item.icon size={20} />
                 </button>
             ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
