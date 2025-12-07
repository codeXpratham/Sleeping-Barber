import React from 'react';
import { Scissors, User, Calendar, Sparkles, Shield, LayoutDashboard, LogOut } from 'lucide-react';
import { ViewState } from '../types';

interface NavigationProps {
  currentView: ViewState;
  onChangeView: (view: ViewState) => void;
  isAdmin: boolean;
  onToggleRole: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, onChangeView, isAdmin, onToggleRole }) => {
  const userNavItems = [
    { id: 'HOME', label: 'Home', icon: Scissors },
    { id: 'BOOKING', label: 'Book Now', icon: Calendar },
    { id: 'AI_CONSULTANT', label: 'AI Consultant', icon: Sparkles },
    { id: 'MY_APPOINTMENTS', label: 'My Bookings', icon: User },
  ];

  const adminNavItems = [
    { id: 'ADMIN_DASHBOARD', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'HOME', label: 'Public Site', icon: Scissors },
  ];

  const currentNavItems = isAdmin ? adminNavItems : userNavItems;

  return (
    <nav className={`sticky top-0 z-50 ${isAdmin ? 'bg-slate-950 border-b border-indigo-900/50' : 'bg-slate-900/95 border-b border-slate-800'} backdrop-blur-md shadow-lg transition-colors duration-300`}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div 
            className="flex items-center gap-2 cursor-pointer" 
            onClick={() => onChangeView(isAdmin ? 'ADMIN_DASHBOARD' : 'HOME')}
          >
            <div className={`${isAdmin ? 'bg-indigo-500' : 'bg-amber-500'} p-1.5 rounded-lg text-slate-900 transition-colors`}>
              {isAdmin ? <Shield size={24} /> : <Scissors size={24} />}
            </div>
            <span className={`text-xl font-bold font-serif ${isAdmin ? 'text-indigo-400' : 'text-amber-500'} tracking-wider`}>
              {isAdmin ? 'Crown Admin' : 'Crown & Clipper'}
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-1">
            {currentNavItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onChangeView(item.id as ViewState)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 text-sm font-medium ${
                  currentView === item.id
                    ? isAdmin 
                      ? 'bg-indigo-600 text-white shadow-[0_0_15px_rgba(79,70,229,0.4)]' 
                      : 'bg-amber-500 text-slate-900 shadow-[0_0_15px_rgba(245,158,11,0.3)]'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <item.icon size={16} />
                {item.label}
              </button>
            ))}
          </div>

          {/* Role Toggler */}
          <div className="flex items-center ml-4 pl-4 border-l border-slate-800">
            <button
              onClick={onToggleRole}
              className={`text-xs font-medium px-3 py-1.5 rounded border transition-colors flex items-center gap-2 ${
                isAdmin 
                  ? 'border-indigo-500/50 text-indigo-300 hover:bg-indigo-500/10' 
                  : 'border-slate-700 text-slate-500 hover:text-slate-300 hover:bg-slate-800'
              }`}
            >
              {isAdmin ? (
                <>
                  <LogOut size={12} /> Exit Admin
                </>
              ) : (
                <>
                  <Shield size={12} /> Admin Mode
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;