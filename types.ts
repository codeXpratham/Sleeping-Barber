export enum ServiceType {
  HAIRCUT = 'Haircut',
  BEARD_TRIM = 'Beard Trim',
  SHAVE = 'Hot Towel Shave',
  FULL_SERVICE = 'The Full Service',
  KIDS_CUT = 'Kids Cut',
  STYLING = 'Wash & Style'
}

export interface Barber {
  id: string;
  name: string;
  specialty: string;
  image: string;
}

export interface Service {
  id: string;
  type: ServiceType;
  name: string;
  durationMinutes: number;
  price: number;
  description: string;
  image: string;
}

export interface Appointment {
  id: string;
  userId: string; // Added to track who made the booking
  serviceId: string;
  barberId: string;
  date: string; // ISO Date string
  time: string; // "14:00"
  customerName: string;
  customerNotes?: string;
  status: 'upcoming' | 'completed' | 'cancelled';
}

export type ViewState = 'HOME' | 'BOOKING' | 'AI_CONSULTANT' | 'MY_APPOINTMENTS' | 'ADMIN_DASHBOARD';