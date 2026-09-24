export interface Service {
  id: string;
  name: string;
  description?: string | null;
  price: number;
  duration: number;
  imageUrl?: string | null;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Barber {
  id: string;
  name: string;
  bio?: string | null;
  specialty?: string | null;
  imageUrl?: string | null;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export type BookingStatus = "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";

export interface Booking {
  id: string;

  serviceId: string;
  barberId: string;
  customerId?: string | null;

  date: string;
  time: string;

  status: BookingStatus;

  notes?: string | null;

  service?: Service;
  barber?: Barber;
  customer?: Customer;

  createdAt?: string;
  updatedAt?: string;
}

export interface ShopSettings {
  id?: string;

  name: string;
  tagline?: string | null;

  phone?: string | null;
  email?: string | null;

  address?: string | null;
  city?: string | null;

  openingHours?: Record<string, string>;

  instagramUrl?: string | null;
  facebookUrl?: string | null;
  twitterUrl?: string | null;

  latitude?: number | null;
  longitude?: number | null;
}

export interface AvailableSlot {
  time: string;
  available: boolean;
}

export interface DashboardStats {
  totalBookings: number;
  todayBookings: number;
  totalCustomers: number;
  totalServices: number;
  totalBarbers: number;
  recentBookings: Booking[];
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  isActive?: boolean;
  createdAt?: string;
}
