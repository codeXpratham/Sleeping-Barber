import React from 'react';
import { Appointment } from '../types';
import { SERVICES, BARBERS } from '../constants';
import { Calendar, Clock, User } from 'lucide-react';

interface AppointmentListProps {
  appointments: Appointment[];
}

const AppointmentList: React.FC<AppointmentListProps> = ({ appointments }) => {
  const getService = (id: string) => SERVICES.find(s => s.id === id);
  const getBarber = (id: string) => BARBERS.find(b => b.id === id);

  if (appointments.length === 0) {
    return (
      <div className="text-center py-20 text-slate-500">
        <Calendar size={48} className="mx-auto mb-4 opacity-20" />
        <p className="text-lg">No upcoming appointments.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-8 animate-fade-in">
      <h2 className="text-3xl font-serif font-bold text-white mb-8">My Bookings</h2>
      <div className="space-y-4">
        {appointments.map((apt) => {
          const service = getService(apt.serviceId);
          const barber = getBarber(apt.barberId);

          return (
            <div key={apt.id} className="bg-slate-800 rounded-xl p-6 border-l-4 border-amber-500 shadow-lg flex flex-col md:flex-row gap-6 md:items-center">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                   <span className="bg-amber-500/10 text-amber-500 text-xs px-2 py-1 rounded font-bold uppercase tracking-wide">
                     {apt.status}
                   </span>
                   <span className="text-slate-400 text-sm">{apt.id}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-1">{service?.name || 'Unknown Service'}</h3>
                <div className="flex flex-col gap-1 text-slate-400 text-sm">
                  <div className="flex items-center gap-2">
                    <User size={14} /> with {barber?.name}
                  </div>
                  {apt.customerNotes && (
                    <p className="italic text-slate-500 mt-1">"{apt.customerNotes}"</p>
                  )}
                </div>
              </div>

              <div className="flex md:flex-col items-center gap-4 md:gap-2 md:text-right border-t md:border-t-0 md:border-l border-slate-700 pt-4 md:pt-0 md:pl-6">
                <div className="flex items-center gap-2 text-white font-medium">
                  <Calendar size={16} className="text-amber-500" />
                  {new Date(apt.date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric'})}
                </div>
                <div className="flex items-center gap-2 text-white font-bold text-lg">
                  <Clock size={18} className="text-amber-500" />
                  {apt.time}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AppointmentList;