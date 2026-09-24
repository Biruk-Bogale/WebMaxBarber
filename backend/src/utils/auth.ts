import bcrypt from "bcryptjs";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { UserRole } from "../../generated/prisma/index.js";

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not configured");
}

if (!JWT_REFRESH_SECRET) {
  throw new Error("JWT_REFRESH_SECRET is not configured");
}

export const hashPassword = async (password: string) => {
  return bcrypt.hash(password, 12);
};

export const comparePassword = async (
  password: string,
  passwordHash: string,
) => {
  return bcrypt.compare(password, passwordHash);
};

export const generateAccessToken = (userId: string, role: UserRole) => {
  return jwt.sign(
    {
      userId,
      role,
    },
    JWT_SECRET,
    {
      expiresIn: (process.env.ACCESS_TOKEN_EXPIRES_IN ||
        "15m") as jwt.SignOptions["expiresIn"],
    },
  );
};

export const generateRefreshToken = (userId: string, role: UserRole) => {
  return jwt.sign(
    {
      userId,
      role,
    },
    JWT_REFRESH_SECRET,
    {
      expiresIn: "7d",
    },
  );
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET) as {
    userId: string;
    role: UserRole;
  };
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, JWT_REFRESH_SECRET) as {
    userId: string;
    role: UserRole;
  };
};

export const hashToken = (token: string) => {
  return crypto.createHash("sha256").update(token).digest("hex");
};

export const getRefreshTokenExpiration = () => {
  const days = Number(process.env.REFRESH_TOKEN_EXPIRES_IN_DAYS || 7);

  const date = new Date();

  date.setDate(date.getDate() + days);

  return date;
};
