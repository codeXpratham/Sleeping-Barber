import React, { useState } from 'react';
import { Service, Barber, Appointment } from '../types';
import { SERVICES, BARBERS, TIME_SLOTS } from '../constants';
import { Calendar, Check, Clock, User, Scissors, ChevronLeft } from 'lucide-react';

interface BookingWizardProps {
  preSelectedServiceId?: string;
  onBookingComplete: (appointment: Appointment) => void;
}

type Step = 'SERVICE' | 'BARBER' | 'TIME' | 'DETAILS' | 'CONFIRMATION';

const BookingWizard: React.FC<BookingWizardProps> = ({ preSelectedServiceId, onBookingComplete }) => {
  const [currentStep, setCurrentStep] = useState<Step>(preSelectedServiceId ? 'BARBER' : 'SERVICE');
  const [selectedService, setSelectedService] = useState<Service | undefined>(
    SERVICES.find(s => s.id === preSelectedServiceId)
  );
  const [selectedBarber, setSelectedBarber] = useState<Barber | undefined>();
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [customerName, setCustomerName] = useState('');
  const [notes, setNotes] = useState('');

  const handleServiceSelect = (service: Service) => {
    setSelectedService(service);
    setCurrentStep('BARBER');
  };

  const handleBarberSelect = (barber: Barber) => {
    setSelectedBarber(barber);
    setCurrentStep('TIME');
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setCurrentStep('DETAILS');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedService && selectedBarber && selectedTime && customerName) {
      const newAppointment: Appointment = {
        id: Math.random().toString(36).substr(2, 9),
        serviceId: selectedService.id,
        barberId: selectedBarber.id,
        date: selectedDate,
        time: selectedTime,
        customerName,
        customerNotes: notes,
        status: 'upcoming'
      };
      onBookingComplete(newAppointment);
      setCurrentStep('CONFIRMATION');
    }
  };

  const goBack = () => {
    if (currentStep === 'BARBER') setCurrentStep('SERVICE');
    if (currentStep === 'TIME') setCurrentStep('BARBER');
    if (currentStep === 'DETAILS') setCurrentStep('TIME');
  };

  if (currentStep === 'CONFIRMATION') {
    return (
      <div className="text-center py-20 animate-fade-in">
        <div className="w-20 h-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check size={40} />
        </div>
        <h2 className="text-3xl font-serif font-bold text-white mb-4">Booking Confirmed!</h2>
        <p className="text-slate-400 mb-8">We've secured your spot. See you soon, {customerName}.</p>
        <button 
          onClick={() => window.location.reload()} // Simple reset for demo
          className="bg-slate-800 text-white px-6 py-2 rounded-lg hover:bg-slate-700 transition"
        >
          Book Another
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      {/* Progress Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {currentStep !== 'SERVICE' && (
            <button onClick={goBack} className="text-slate-400 hover:text-white flex items-center gap-1 text-sm">
              <ChevronLeft size={16} /> Back
            </button>
          )}
          <span className="text-slate-500 text-sm ml-auto">Step {
            currentStep === 'SERVICE' ? 1 : 
            currentStep === 'BARBER' ? 2 : 
            currentStep === 'TIME' ? 3 : 4
          } of 4</span>
        </div>
        <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-amber-500 transition-all duration-500 ease-out"
            style={{ 
              width: currentStep === 'SERVICE' ? '25%' : 
                     currentStep === 'BARBER' ? '50%' : 
                     currentStep === 'TIME' ? '75%' : '100%' 
            }}
          />
        </div>
      </div>

      {/* Step 1: Services */}
      {currentStep === 'SERVICE' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
          {SERVICES.map((service) => (
            <div 
              key={service.id}
              onClick={() => handleServiceSelect(service)}
              className="group cursor-pointer bg-slate-800 rounded-xl overflow-hidden hover:ring-2 hover:ring-amber-500 transition-all"
            >
              <div className="h-40 overflow-hidden">
                <img src={service.image} alt={service.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-white">{service.name}</h3>
                  <span className="text-amber-500 font-bold">${service.price}</span>
                </div>
                <p className="text-slate-400 text-sm mb-4 h-10">{service.description}</p>
                <div className="flex items-center text-slate-500 text-xs gap-2">
                  <Clock size={14} /> {service.durationMinutes} mins
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Step 2: Barbers */}
      {currentStep === 'BARBER' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
          {BARBERS.map((barber) => (
            <div 
              key={barber.id}
              onClick={() => handleBarberSelect(barber)}
              className="group cursor-pointer bg-slate-800 rounded-xl p-6 text-center hover:ring-2 hover:ring-amber-500 transition-all"
            >
              <img src={barber.image} alt={barber.name} className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-2 border-slate-600 group-hover:border-amber-500" />
              <h3 className="text-lg font-bold text-white mb-1">{barber.name}</h3>
              <p className="text-amber-500 text-sm mb-2">{barber.specialty}</p>
            </div>
          ))}
        </div>
      )}

      {/* Step 3: Time */}
      {currentStep === 'TIME' && (
        <div className="animate-fade-in">
          <div className="bg-slate-800 p-6 rounded-xl mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Calendar className="text-amber-500" />
              <input 
                type="date" 
                value={selectedDate}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="bg-slate-700 text-white border-none rounded-lg px-4 py-2 outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>
            <div className="text-slate-400 text-sm">
              Note: We are closed on Sundays.
            </div>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
            {TIME_SLOTS.map((time) => (
              <button
                key={time}
                onClick={() => handleTimeSelect(time)}
                className="py-3 px-4 rounded-lg bg-slate-800 text-slate-200 hover:bg-amber-500 hover:text-slate-900 font-medium transition-colors"
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 4: Details */}
      {currentStep === 'DETAILS' && (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto animate-fade-in">
          <div className="bg-slate-800 p-6 rounded-xl space-y-4">
            <div className="border-b border-slate-700 pb-4 mb-4">
              <h3 className="text-lg font-bold text-white mb-2">Summary</h3>
              <div className="flex justify-between text-sm text-slate-400 mb-1">
                <span>Service:</span> <span className="text-white">{selectedService?.name}</span>
              </div>
              <div className="flex justify-between text-sm text-slate-400 mb-1">
                <span>Barber:</span> <span className="text-white">{selectedBarber?.name}</span>
              </div>
              <div className="flex justify-between text-sm text-slate-400 mb-1">
                <span>Date & Time:</span> <span className="text-white">{selectedDate} at {selectedTime}</span>
              </div>
              <div className="flex justify-between text-sm text-slate-400 mt-2 pt-2 border-t border-slate-700">
                <span>Total:</span> <span className="text-amber-500 font-bold text-lg">${selectedService?.price}</span>
              </div>
            </div>

            <div>
              <label className="block text-sm text-slate-400 mb-1">Full Name</label>
              <input 
                type="text" 
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-500"
                placeholder="John Doe"
              />
            </div>
            
            <div>
              <label className="block text-sm text-slate-400 mb-1">Notes (Optional)</label>
              <textarea 
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-500 h-24 resize-none"
                placeholder="Any special requests?"
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold py-4 rounded-lg transition-colors mt-4"
            >
              Confirm Booking
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default BookingWizard;
