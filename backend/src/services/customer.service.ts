import { prisma } from "../libs/prisma.js";

export const getCustomers = async () => {
  return prisma.customer.findMany({
    include: {
      _count: {
        select: {
          bookings: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getCustomerById = async (id: string) => {
  const customer = await prisma.customer.findUnique({
    where: { id },
    include: {
      bookings: {
        include: {
          barber: true,
          service: true,
        },
        orderBy: {
          bookingDate: "desc",
        },
      },
    },
  });

  if (!customer) {
    throw new Error("Customer not found");
  }

  return customer;
};

export const createCustomer = async (data: {
  name: string;
  email: string;
  phone: string;
}) => {
  return prisma.customer.create({
    data: {
      name: data.name.trim(),
      email: data.email.toLowerCase().trim(),
      phone: data.phone.trim(),
    },
  });
};

export const updateCustomer = async (
  id: string,
  data: Partial<{
    name: string;
    email: string;
    phone: string;
  }>,
) => {
  await getCustomerById(id);

  return prisma.customer.update({
    where: { id },
    data: {
      ...(data.name !== undefined && {
        name: data.name.trim(),
      }),
      ...(data.email !== undefined && {
        email: data.email.toLowerCase().trim(),
      }),
      ...(data.phone !== undefined && {
        phone: data.phone.trim(),
      }),
    },
  });
};

export const deleteCustomer = async (id: string) => {
  await getCustomerById(id);

  const bookingCount = await prisma.booking.count({
    where: {
      customerId: id,
    },
  });

  if (bookingCount > 0) {
    throw new Error("Customer with booking history cannot be deleted");
  }

  return prisma.customer.delete({
    where: { id },
  });
};
