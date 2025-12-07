import React from 'react';
import { Appointment } from '../types';
import { SERVICES, BARBERS } from '../constants';
import { Calendar, Clock, Search, DollarSign, Filter, MoreHorizontal } from 'lucide-react';

interface AdminDashboardProps {
  appointments: Appointment[];
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ appointments }) => {
  const getService = (id: string) => SERVICES.find(s => s.id === id);
  const getBarber = (id: string) => BARBERS.find(b => b.id === id);

  const totalRevenue = appointments.reduce((acc, curr) => {
    if (curr.status !== 'cancelled') {
      const service = getService(curr.serviceId);
      return acc + (service?.price || 0);
    }
    return acc;
  }, 0);

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-serif font-bold text-white mb-2">Shop Dashboard</h2>
          <p className="text-slate-400">Overview of all shop activity and bookings.</p>
        </div>
        
        <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex items-center gap-4">
          <div className="bg-green-500/10 p-3 rounded-lg text-green-500">
            <DollarSign size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-400">Estimated Revenue</p>
            <p className="text-2xl font-bold text-white">${totalRevenue}</p>
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-slate-800 p-4 rounded-t-xl border-b border-slate-700 flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
          <input 
            type="text" 
            placeholder="Search bookings..." 
            className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-3 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm text-slate-200 transition-colors">
            <Filter size={14} /> Filter
          </button>
          <button className="flex items-center gap-2 px-3 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm text-slate-200 transition-colors">
            <Calendar size={14} /> This Week
          </button>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-slate-800 rounded-b-xl border border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900/50 border-b border-slate-700 text-xs uppercase tracking-wider text-slate-400">
                <th className="p-4 font-medium">Customer</th>
                <th className="p-4 font-medium">Service & Barber</th>
                <th className="p-4 font-medium">Date & Time</th>
                <th className="p-4 font-medium">Price</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {appointments.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-500">
                    No bookings found.
                  </td>
                </tr>
              ) : (
                appointments.map((apt) => {
                  const service = getService(apt.serviceId);
                  const barber = getBarber(apt.barberId);
                  
                  return (
                    <tr key={apt.id} className="hover:bg-slate-700/30 transition-colors group">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-slate-900 font-bold text-xs">
                            {apt.customerName.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium text-white">{apt.customerName}</p>
                            <p className="text-xs text-slate-500">ID: {apt.id.slice(-4)}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <p className="text-sm text-slate-200">{service?.name}</p>
                        <p className="text-xs text-slate-500">with {barber?.name}</p>
                      </td>
                      <td className="p-4">
                        <div className="flex flex-col text-sm">
                          <span className="flex items-center gap-1.5 text-slate-300">
                            <Calendar size={12} /> {apt.date}
                          </span>
                          <span className="flex items-center gap-1.5 text-slate-400">
                            <Clock size={12} /> {apt.time}
                          </span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="text-emerald-400 font-medium">${service?.price}</span>
                      </td>
                      <td className="p-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                          ${apt.status === 'upcoming' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 
                            apt.status === 'completed' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 
                            'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                          {apt.status}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <button className="text-slate-400 hover:text-white p-2 hover:bg-slate-700 rounded-lg transition-colors">
                          <MoreHorizontal size={16} />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;