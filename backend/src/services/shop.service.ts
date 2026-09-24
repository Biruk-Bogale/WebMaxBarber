import { prisma } from "../libs/prisma.js";

export const getShop = async () => {
  let shop = await prisma.shopSettings.findFirst();

  if (!shop) {
    shop = await prisma.shopSettings.create({
      data: {
        name: "The Craft Barber",
        description: "Premium men's grooming and barbering.",
        phone: "+27 21 555 0199",
        email: "info@thecraftbarber.com",
        address: "42 Long Street",
        city: "Cape Town",
        openingHours: {
          monday: "09:00-18:00",
          tuesday: "09:00-18:00",
          wednesday: "09:00-18:00",
          thursday: "09:00-18:00",
          friday: "09:00-19:00",
          saturday: "09:00-17:00",
          sunday: "Closed",
        },
      },
    });
  }

  return shop;
};

export const updateShop = async (data: Record<string, unknown>) => {
  const existing = await prisma.shopSettings.findFirst();

  if (!existing) {
    return prisma.shopSettings.create({
      data: {
        name: String(data.name || "The Craft Barber"),
        description: data.description ? String(data.description) : undefined,
        phone: String(data.phone || ""),
        email: String(data.email || ""),
        address: String(data.address || ""),
        city: String(data.city || ""),
        latitude:
          data.latitude !== undefined ? Number(data.latitude) : undefined,
        longitude:
          data.longitude !== undefined ? Number(data.longitude) : undefined,
        openingHours: data.openingHours || undefined,
        instagram: data.instagram ? String(data.instagram) : undefined,
        facebook: data.facebook ? String(data.facebook) : undefined,
        website: data.website ? String(data.website) : undefined,
      },
    });
  }

  return prisma.shopSettings.update({
    where: {
      id: existing.id,
    },
    data: {
      ...(data.name !== undefined && {
        name: String(data.name),
      }),
      ...(data.description !== undefined && {
        description: String(data.description),
      }),
      ...(data.phone !== undefined && {
        phone: String(data.phone),
      }),
      ...(data.email !== undefined && {
        email: String(data.email),
      }),
      ...(data.address !== undefined && {
        address: String(data.address),
      }),
      ...(data.city !== undefined && {
        city: String(data.city),
      }),
      ...(data.latitude !== undefined && {
        latitude: Number(data.latitude),
      }),
      ...(data.longitude !== undefined && {
        longitude: Number(data.longitude),
      }),
      ...(data.openingHours !== undefined && {
        openingHours: data.openingHours as object,
      }),
      ...(data.instagram !== undefined && {
        instagram: String(data.instagram),
      }),
      ...(data.facebook !== undefined && {
        facebook: String(data.facebook),
      }),
      ...(data.website !== undefined && {
        website: String(data.website),
      }),
    },
  });
};
