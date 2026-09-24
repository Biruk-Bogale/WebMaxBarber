import express, { Express } from "express";
// import status from 'http-status';
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
// import passport from 'passport';
// import path from 'path';

import { sanitizeAllMiddleware } from "../middlewares/sanitizeMiddleware.js"; // <-- NodeNext requires .js extension
import { errorMiddleware } from "../middlewares/errorMiddleware.js";
import { notFoundHandler } from "../middlewares/notFound.js";
import { errorHandler, successHandler } from "../config/morgan.js";
import config from "../config/config.js";
import router from "../routes/index.js";
// import path from 'path';

const app = async (app: Express) => {
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));

  app.use(successHandler);
  app.use(errorHandler);

  app.use(express.json());

  // security
  app.use(helmet());

  app.use(sanitizeAllMiddleware);

  // app.use('/profile', express.static(path.join(__dirname, '../../uploads/ispa/layer-0/summary-0')));

  // Middleware to parse cookies (required to handle cookies in the request)
  app.use(cookieParser());

  //////////////////////////////////////
  if (config.env === "production") {
    app.use(cors(config.corsOptions));
  } else {
    // enabling all cors
    app.use(cors(config.corsOptions));
    // app.options("/*", cors());
  }

  // “Trust the real client IP from headers”
  app.set("trust proxy", 1);

  // explicitly handle favicon.ico route (if you don’t want a file)
  app.get("/favicon.ico", (_req, res) => {
    res.status(204).end();
  });

  // Health Checker
  app.get("/api/health", (_req, res) => {
    res.send({
      message: "Health OK!",
    });
  });

  // Add the routes to the application as middleware
  app.use("/api/v1", router);

  // 404 handler
  app.use(notFoundHandler); // Sets res.locals.errorMessage

  // Error handler
  app.use(errorMiddleware as unknown as express.ErrorRequestHandler); // Sends response and logs

  return app;
};

export default {
  app,
};
