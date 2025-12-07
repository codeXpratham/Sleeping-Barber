import { Barber, Service, ServiceType } from './types';

export const BARBERS: Barber[] = [
  {
    id: 'b1',
    name: 'James "The Blade" Miller',
    specialty: 'Fades & Precision Cuts',
    image: 'https://picsum.photos/200/200?random=1'
  },
  {
    id: 'b2',
    name: 'Sarah Jenkins',
    specialty: 'Textured Styling & Beards',
    image: 'https://picsum.photos/200/200?random=2'
  },
  {
    id: 'b3',
    name: 'Marcus Thorne',
    specialty: 'Classic Gentleman Cuts',
    image: 'https://picsum.photos/200/200?random=3'
  }
];

export const SERVICES: Service[] = [
  {
    id: 's1',
    type: ServiceType.HAIRCUT,
    name: 'Signature Haircut',
    durationMinutes: 45,
    price: 35,
    description: 'Consultation, wash, precision cut, and styling.',
    image: 'https://picsum.photos/400/300?random=10'
  },
  {
    id: 's2',
    type: ServiceType.BEARD_TRIM,
    name: 'Beard Sculpting',
    durationMinutes: 30,
    price: 25,
    description: 'Hot towel, shaping, trimming, and oil treatment.',
    image: 'https://picsum.photos/400/300?random=11'
  },
  {
    id: 's3',
    type: ServiceType.SHAVE,
    name: 'Royal Shave',
    durationMinutes: 45,
    price: 40,
    description: 'Traditional straight razor shave with hot lather.',
    image: 'https://picsum.photos/400/300?random=12'
  },
  {
    id: 's4',
    type: ServiceType.FULL_SERVICE,
    name: 'The Crown Experience',
    durationMinutes: 75,
    price: 70,
    description: 'Haircut, beard sculpt, facial massage, and beverage.',
    image: 'https://picsum.photos/400/300?random=13'
  }
];

export const TIME_SLOTS = [
  '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'
];
