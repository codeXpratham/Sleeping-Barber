import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import BookingWizard from './components/BookingWizard';
import AIStyleConsultant from './components/AIStyleConsultant';
import AppointmentList from './components/AppointmentList';
import { ViewState, Appointment } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('HOME');
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [preSelectedServiceId, setPreSelectedServiceId] = useState<string | undefined>(undefined);

  // Load appointments from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('appointments');
    if (saved) {
      setAppointments(JSON.parse(saved));
    }
  }, []);

  const handleBookingComplete = (apt: Appointment) => {
    const updated = [...appointments, apt];
    setAppointments(updated);
    localStorage.setItem('appointments', JSON.stringify(updated));
    // Usually stay on confirmation screen or redirect after delay
    setTimeout(() => {
      setPreSelectedServiceId(undefined);
    }, 2000);
  };

  const handleStyleSelected = (serviceId: string) => {
    setPreSelectedServiceId(serviceId);
    setCurrentView('BOOKING');
  };

  const renderView = () => {
    switch (currentView) {
      case 'HOME':
        return (
          <Hero 
            onBookNow={() => {
              setPreSelectedServiceId(undefined);
              setCurrentView('BOOKING');
            }} 
            onTryAI={() => setCurrentView('AI_CONSULTANT')} 
          />
        );
      case 'BOOKING':
        return (
          <BookingWizard 
            preSelectedServiceId={preSelectedServiceId} 
            onBookingComplete={handleBookingComplete} 
          />
        );
      case 'AI_CONSULTANT':
        return <AIStyleConsultant onStyleSelected={handleStyleSelected} />;
      case 'MY_APPOINTMENTS':
        return <AppointmentList appointments={appointments} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-slate-50">
      <Navigation currentView={currentView} onChangeView={setCurrentView} />
      
      <main className="flex-grow">
        {renderView()}
      </main>

      <footer className="bg-slate-950 py-8 border-t border-slate-800 mt-auto">
        <div className="max-w-6xl mx-auto px-4 text-center text-slate-500 text-sm">
          <p className="font-serif text-lg text-amber-500/50 mb-2">Crown & Clipper</p>
          <p>&copy; {new Date().getFullYear()} Premium Barber Services. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
