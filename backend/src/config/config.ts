/* eslint-disable no-console */
import dotenv from "dotenv";
import envValidation from "../validations/index.js";

dotenv.config();

const { value: envVars, error } = envValidation.validate(process.env);

if (error) {
  // logger.error(error);
  console.log(error);
}

export default {
  port: envVars.PORT,
  env: envVars.NODE_ENV,
  adminEmail: envVars.ADMIN_EMAIL,
  redisUri: envVars.REDIS_DATABASE_URI!,

  jwt: {
    accessTokenSecret: envVars.ACCESS_TOKEN_SECRET,
    refreshTokenSecret: envVars.REFRESH_TOKEN_SECRET,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
  },

  database: {
    db_pass: envVars.DB_PASS,
    db_user: envVars.DB_USER,
    db_host: envVars.DB_HOST,
    db_name: envVars.DB_NAME,
    db_port: envVars.DB_PORT,
    databaseUrl: envVars.DATABASE_URL!,
  },

  mail: {
    host: envVars.MAIL_HOST,
    user: envVars.MAIL_USER,
    pass: envVars.MAIL_PASS,
    port: envVars.MAIL_PORT,
  },

  corsOptions: {
    origin: (
      origin: string | undefined,
      callback: (err: Error | null, allow?: boolean) => void,
    ) => {
      const allowedOrigins = envVars.FRONTEND_URL.split(","); // e.g., "http://localhost:3000,https://myapp.com"

      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Allow cookies/credentials to be sent
    optionsSuccessStatus: 200, // For legacy browsers (like IE11) handling preflight
  },
};
