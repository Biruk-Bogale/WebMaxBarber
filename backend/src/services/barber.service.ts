import { prisma } from "../libs/prisma.js";

interface CreateBarberInput {
  name: string;
  slug?: string;
  bio?: string;
  image?: string;
  specialty?: string;
  isActive?: boolean;
}

export const getBarbers = async (includeInactive = false) => {
  return prisma.barber.findMany({
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

export const getBarberById = async (id: string) => {
  const barber = await prisma.barber.findUnique({
    where: { id },
  });

  if (!barber) {
    throw new Error("Barber not found");
  }

  return barber;
};

export const createBarber = async (data: CreateBarberInput) => {
  const slug = (data.slug ?? data.name)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  if (!slug) {
    throw new Error("Barber name or slug is required");
  }

  const existing = await prisma.barber.findUnique({
    where: {
      slug,
    },
  });

  if (existing) {
    throw new Error("Barber slug already exists");
  }

  return prisma.barber.create({
    data: {
      name: data.name.trim(),
      slug,
      bio: data.bio?.trim(),
      image: data.image,
      specialty: data.specialty?.trim(),
      isActive: data.isActive ?? true,
    },
  });
};

export const updateBarber = async (
  id: string,
  data: Partial<CreateBarberInput>,
) => {
  await getBarberById(id);

  if (data.slug) {
    const existing = await prisma.barber.findFirst({
      where: {
        slug: data.slug,
        NOT: { id },
      },
    });

    if (existing) {
      throw new Error("Barber slug already exists");
    }
  }

  return prisma.barber.update({
    where: { id },
    data: {
      ...(data.name !== undefined && {
        name: data.name.trim(),
      }),
      ...(data.slug !== undefined && {
        slug: data.slug.trim().toLowerCase(),
      }),
      ...(data.bio !== undefined && {
        bio: data.bio?.trim(),
      }),
      ...(data.image !== undefined && {
        image: data.image,
      }),
      ...(data.specialty !== undefined && {
        specialty: data.specialty?.trim(),
      }),
      ...(data.isActive !== undefined && {
        isActive: data.isActive,
      }),
    },
  });
};

export const deleteBarber = async (id: string) => {
  await getBarberById(id);

  const activeBookings = await prisma.booking.count({
    where: {
      barberId: id,
      status: {
        in: ["PENDING", "CONFIRMED"],
      },
    },
  });

  if (activeBookings > 0) {
    throw new Error("Cannot delete a barber with active bookings");
  }

  return prisma.barber.update({
    where: { id },
    data: {
      isActive: false,
    },
  });
};
