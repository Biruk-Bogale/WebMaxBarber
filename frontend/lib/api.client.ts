import api, { setAccessToken } from "./api";

import type {
  AdminUser,
  Barber,
  Booking,
  Customer,
  DashboardStats,
  Service,
  ShopSettings,
  AvailableSlot,
} from "@/types/api";

type BackendService = Service & { image?: string | null };
type BackendBarber = Barber & { image?: string | null };
type BackendBooking = Booking & {
  bookingDate?: string | Date;
  startTime?: string | Date;
  service?: BackendService;
  barber?: BackendBarber;
};

function normalizeService(service: BackendService): Service {
  return {
    ...service,
    imageUrl: service.imageUrl ?? service.image ?? undefined,
  };
}

function normalizeBarber(barber: BackendBarber): Barber {
  return {
    ...barber,
    imageUrl: barber.imageUrl ?? barber.image ?? undefined,
  };
}

function normalizeDateTime(value: string | Date | undefined): string {
  if (!value) {
    return "";
  }

  return typeof value === "string" ? value : value.toISOString();
}

function normalizeBooking(booking: BackendBooking): Booking {
  const date = booking.date ?? booking.bookingDate ?? "";
  const time = booking.time ?? booking.startTime ?? "";

  return {
    ...booking,
    date: normalizeDateTime(date),
    time: normalizeDateTime(time),
    service: booking.service
      ? normalizeService(booking.service)
      : booking.service,
    barber: booking.barber ? normalizeBarber(booking.barber) : booking.barber,
  };
}

function servicePayload(payload: Partial<Service>) {
  const { imageUrl, ...rest } = payload;

  return {
    ...rest,
    ...(imageUrl !== undefined ? { image: imageUrl } : {}),
  };
}

function barberPayload(payload: Partial<Barber>) {
  const { imageUrl, ...rest } = payload;

  return {
    ...rest,
    ...(imageUrl !== undefined ? { image: imageUrl } : {}),
  };
}

export const publicApi = {
  getServices: async (): Promise<Service[]> => {
    const response = await api.get("/services");
    return response.data.data.map(normalizeService);
  },

  getService: async (id: string): Promise<Service> => {
    const response = await api.get(`/services/${id}`);
    return normalizeService(response.data.data);
  },

  getBarbers: async (): Promise<Barber[]> => {
    const response = await api.get("/barbers");
    return response.data.data.map(normalizeBarber);
  },

  getBarber: async (id: string): Promise<Barber> => {
    const response = await api.get(`/barbers/${id}`);
    return normalizeBarber(response.data.data);
  },

  getShop: async (): Promise<ShopSettings> => {
    const response = await api.get("/shop");
    return response.data.data;
  },

  getAvailableSlots: async ({
    barberId,
    serviceId,
    date,
  }: {
    barberId: string;
    serviceId: string;
    date: string;
  }): Promise<AvailableSlot[]> => {
    const response = await api.get("/bookings/available-slots", {
      params: {
        barberId,
        serviceId,
        date,
      },
    });

    return response.data.data.slots;
  },

  createBooking: async (payload: {
    serviceId: string;
    barberId: string;
    date: string;
    time: string;

    customer: {
      name: string;
      email: string;
      phone: string;
    };

    notes?: string;
  }): Promise<Booking> => {
    const response = await api.post("/bookings", payload);

    return response.data.data;
  },

  getGoogleCalendarUrl: (bookingId: string) => {
    return `${api.defaults.baseURL}/bookings/${bookingId}/calendar/google`;
  },

  getAppleCalendarUrl: (bookingId: string) => {
    return `${api.defaults.baseURL}/bookings/${bookingId}/calendar/ics`;
  },
};

export const authApi = {
  login: async (payload: { email: string; password: string }) => {
    const response = await api.post("/auth/login", payload);
    const data = response.data.data;
    setAccessToken(data.accessToken);
    return data;
  },

  logout: async () => {
    const response = await api.post("/auth/logout");
    setAccessToken(null);
    return response.data;
  },

  me: async () => {
    const response = await api.get("/auth/me");
    return response.data.data;
  },

  refresh: async () => {
    const response = await api.post("/auth/refresh");
    const data = response.data.data;
    setAccessToken(data.accessToken);
    return data;
  },
};

export const adminApi = {
  dashboard: async (): Promise<DashboardStats> => {
    const response = await api.get("/admin/dashboard");
    const dashboard = response.data.data;

    return {
      totalBookings: dashboard.statistics.totalBookings,
      todayBookings: dashboard.statistics.todayBookings,
      totalCustomers: dashboard.statistics.totalCustomers,
      totalServices: dashboard.statistics.activeServices,
      totalBarbers: dashboard.statistics.activeBarbers,
      recentBookings: dashboard.recentBookings.map(normalizeBooking),
    };
  },

  bookings: async (): Promise<Booking[]> => {
    const response = await api.get("/bookings");
    return response.data.data.map(normalizeBooking);
  },

  booking: async (id: string): Promise<Booking> => {
    const response = await api.get(`/bookings/${id}`);
    return normalizeBooking(response.data.data);
  },

  confirmBooking: async (id: string) => {
    const response = await api.patch(`/bookings/${id}/confirm`);
    return normalizeBooking(response.data.data);
  },

  cancelBooking: async (id: string) => {
    const response = await api.patch(`/bookings/${id}/cancel`);
    return normalizeBooking(response.data.data);
  },

  completeBooking: async (id: string) => {
    const response = await api.patch(`/bookings/${id}/complete`);
    return normalizeBooking(response.data.data);
  },

  deleteBooking: async (id: string) => {
    const response = await api.delete(`/bookings/${id}`);
    return response.data;
  },

  createService: async (payload: Partial<Service>) => {
    const response = await api.post("/services", servicePayload(payload));
    return normalizeService(response.data.data);
  },

  updateService: async (id: string, payload: Partial<Service>) => {
    const response = await api.patch(
      `/services/${id}`,
      servicePayload(payload),
    );
    return normalizeService(response.data.data);
  },

  deleteService: async (id: string) => {
    const response = await api.delete(`/services/${id}`);
    return normalizeService(response.data.data);
  },

  createBarber: async (payload: Partial<Barber>) => {
    const response = await api.post("/barbers", barberPayload(payload));
    return normalizeBarber(response.data.data);
  },

  updateBarber: async (id: string, payload: Partial<Barber>) => {
    const response = await api.patch(`/barbers/${id}`, barberPayload(payload));
    return normalizeBarber(response.data.data);
  },

  deleteBarber: async (id: string) => {
    const response = await api.delete(`/barbers/${id}`);
    return normalizeBarber(response.data.data);
  },

  customers: async (): Promise<Customer[]> => {
    const response = await api.get("/customers");
    return response.data.data;
  },

  customer: async (id: string): Promise<Customer> => {
    const response = await api.get(`/customers/${id}`);
    return response.data.data;
  },

  updateCustomer: async (id: string, payload: Partial<Customer>) => {
    const response = await api.patch(`/customers/${id}`, payload);
    return response.data.data;
  },

  deleteCustomer: async (id: string) => {
    const response = await api.delete(`/customers/${id}`);
    return response.data;
  },

  adminUsers: async (): Promise<AdminUser[]> => {
    const response = await api.get("/admin/users");
    return response.data.data;
  },

  createAdminUser: async (payload: {
    name: string;
    email: string;
    password: string;
    role: string;
  }) => {
    const response = await api.post("/admin/users", payload);
    return response.data.data;
  },

  updateAdminUser: async (id: string, payload: Partial<AdminUser>) => {
    const response = await api.patch(`/admin/users/${id}`, payload);
    return response.data.data;
  },

  deleteAdminUser: async (id: string) => {
    const response = await api.delete(`/admin/users/${id}`);
    return response.data;
  },

  shop: async (): Promise<ShopSettings> => {
    const response = await api.get("/shop");
    return response.data.data;
  },

  updateShop: async (payload: Partial<ShopSettings>) => {
    const response = await api.patch("/shop", payload);
    return response.data.data;
  },
};
