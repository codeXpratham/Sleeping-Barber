import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import BookingWizard from './components/BookingWizard';
import AIStyleConsultant from './components/AIStyleConsultant';
import AppointmentList from './components/AppointmentList';
import AdminDashboard from './components/AdminDashboard';
import { ViewState, Appointment } from './types';
import { INITIAL_APPOINTMENTS } from './constants';

const App: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentView, setCurrentView] = useState<ViewState>('HOME');
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [preSelectedServiceId, setPreSelectedServiceId] = useState<string | undefined>(undefined);
  
  // Simulate a logged in user ID for the "User Mode"
  // In a real app, this comes from auth
  const [currentUserId] = useState('demo-user-1');

  // Load appointments from localStorage and merge with dummy initial data if empty
  useEffect(() => {
    const saved = localStorage.getItem('appointments');
    if (saved) {
      setAppointments(JSON.parse(saved));
    } else {
      // Seed with initial dummy data so Admin view looks populated
      setAppointments(INITIAL_APPOINTMENTS);
      localStorage.setItem('appointments', JSON.stringify(INITIAL_APPOINTMENTS));
    }
  }, []);

  const handleBookingComplete = (aptData: Omit<Appointment, 'userId'>) => {
    // When a booking completes, we attach the current user's ID
    const newAppointment: Appointment = { ...aptData, userId: currentUserId };
    
    const updated = [...appointments, newAppointment];
    setAppointments(updated);
    localStorage.setItem('appointments', JSON.stringify(updated));
    
    setTimeout(() => {
      setPreSelectedServiceId(undefined);
    }, 2000);
  };

  const handleStyleSelected = (serviceId: string) => {
    setPreSelectedServiceId(serviceId);
    setCurrentView('BOOKING');
  };

  const toggleRole = () => {
    const newRoleIsAdmin = !isAdmin;
    setIsAdmin(newRoleIsAdmin);
    // Switch view to relevant home for that role
    setCurrentView(newRoleIsAdmin ? 'ADMIN_DASHBOARD' : 'HOME');
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
        // USER MODE: Only show bookings matching the currentUserId
        const myAppointments = appointments.filter(a => a.userId === currentUserId);
        return <AppointmentList appointments={myAppointments} />;
      case 'ADMIN_DASHBOARD':
        // ADMIN MODE: Show ALL bookings
        return <AdminDashboard appointments={appointments} />;
      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen flex flex-col ${isAdmin ? 'bg-slate-950' : 'bg-slate-900'} text-slate-50 transition-colors duration-500`}>
      <Navigation 
        currentView={currentView} 
        onChangeView={setCurrentView} 
        isAdmin={isAdmin}
        onToggleRole={toggleRole}
      />
      
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