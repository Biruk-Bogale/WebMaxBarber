import { prisma } from "../libs/prisma.js";
import { hashPassword } from "../utils/auth.js";

export const getUsers = async () => {
  return prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      isActive: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getUserById = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      isActive: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!user) {
    throw new Error("Admin user not found");
  }

  return user;
};

export const createUser = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  const email = data.email.toLowerCase().trim();

  const existing = await prisma.user.findUnique({
    where: { email },
  });

  if (existing) {
    throw new Error("A user with this email already exists");
  }

  const passwordHash = await hashPassword(data.password);

  return prisma.user.create({
    data: {
      name: data.name.trim(),
      email,
      passwordHash,
      role: "ADMIN",
      isActive: true,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      isActive: true,
      createdAt: true,
    },
  });
};

export const updateUser = async (
  id: string,
  data: {
    name?: string;
    email?: string;
    password?: string;
    isActive?: boolean;
  },
) => {
  await getUserById(id);

  let passwordHash: string | undefined;

  if (data.password) {
    passwordHash = await hashPassword(data.password);
  }

  let email: string | undefined;

  if (data.email) {
    email = data.email.toLowerCase().trim();

    const existing = await prisma.user.findFirst({
      where: {
        email,
        NOT: {
          id,
        },
      },
    });

    if (existing) {
      throw new Error("A user with this email already exists");
    }
  }

  return prisma.user.update({
    where: { id },
    data: {
      ...(data.name !== undefined && {
        name: data.name.trim(),
      }),
      ...(email !== undefined && {
        email,
      }),
      ...(passwordHash !== undefined && {
        passwordHash,
      }),
      ...(data.isActive !== undefined && {
        isActive: data.isActive,
      }),
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      isActive: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

export const deleteUser = async (id: string, currentUserId: string) => {
  if (id === currentUserId) {
    throw new Error("You cannot delete your own account");
  }

  await getUserById(id);

  return prisma.user.delete({
    where: { id },
  });
};
