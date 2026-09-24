import { prisma } from "../libs/prisma.js";

interface CreateServiceInput {
  name: string;
  slug?: string;
  description?: string;
  price: number;
  duration: number;
  image?: string;
  isActive?: boolean;
}

interface UpdateServiceInput {
  name?: string;
  slug?: string;
  description?: string;
  price?: number;
  duration?: number;
  image?: string;
  isActive?: boolean;
}

export const getServices = async (includeInactive = false) => {
  return prisma.service.findMany({
    where: includeInactive
      ? {}
      : {
          isActive: true,
        },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getServiceById = async (id: string) => {
  const service = await prisma.service.findUnique({
    where: { id },
  });

  if (!service) {
    throw new Error("Service not found");
  }

  return service;
};

export const createService = async (data: CreateServiceInput) => {
  const slug = (data.slug ?? data.name)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  if (!slug) {
    throw new Error("Service name or slug is required");
  }

  const existing = await prisma.service.findUnique({
    where: {
      slug,
    },
  });

  if (existing) {
    throw new Error("Service slug already exists");
  }

  if (data.price < 0) {
    throw new Error("Price cannot be negative");
  }

  if (data.duration <= 0) {
    throw new Error("Duration must be greater than zero");
  }

  return prisma.service.create({
    data: {
      name: data.name.trim(),
      slug,
      description: data.description?.trim(),
      price: data.price,
      duration: data.duration,
      image: data.image,
      isActive: data.isActive ?? true,
    },
  });
};

export const updateService = async (id: string, data: UpdateServiceInput) => {
  await getServiceById(id);

  if (data.slug) {
    const existing = await prisma.service.findFirst({
      where: {
        slug: data.slug,
        NOT: {
          id,
        },
      },
    });

    if (existing) {
      throw new Error("Service slug already exists");
    }
  }

  if (data.price !== undefined && data.price < 0) {
    throw new Error("Price cannot be negative");
  }

  if (data.duration !== undefined && data.duration <= 0) {
    throw new Error("Duration must be greater than zero");
  }

  return prisma.service.update({
    where: { id },
    data: {
      ...(data.name !== undefined && {
        name: data.name.trim(),
      }),
      ...(data.slug !== undefined && {
        slug: data.slug.trim().toLowerCase(),
      }),
      ...(data.description !== undefined && {
        description: data.description?.trim(),
      }),
      ...(data.price !== undefined && {
        price: data.price,
      }),
      ...(data.duration !== undefined && {
        duration: data.duration,
      }),
      ...(data.image !== undefined && {
        image: data.image,
      }),
      ...(data.isActive !== undefined && {
        isActive: data.isActive,
      }),
    },
  });
};

export const deleteService = async (id: string) => {
  await getServiceById(id);

  const bookings = await prisma.booking.count({
    where: {
      serviceId: id,
      status: {
        in: ["PENDING", "CONFIRMED"],
      },
    },
  });

  if (bookings > 0) {
    throw new Error("Cannot delete a service with active bookings");
  }

  return prisma.service.update({
    where: { id },
    data: {
      isActive: false,
    },
  });
};
