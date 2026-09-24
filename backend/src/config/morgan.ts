import morgan from "morgan";
import { Request, Response } from "express";

import config from "./config.js";

morgan.token(
  "message",
  (_req: Request, res: Response) => res.locals.errorMessage || "",
);

const getIPFormat = () => (config.env === "production" ? ":remote-addr -" : "");

// Get current file path
// Get current directory

const successResponseFormat = `${getIPFormat()} :method :url :status :response-time ms :user-agent :date`;
const errorResponseFormat = `${getIPFormat()} :method :url :status :response-time ms :user-agent :date - error-message: :message`;

export const successHandler = morgan(successResponseFormat, {
  skip: (_req, res) => res.statusCode >= 400,
});

export const errorHandler = morgan(errorResponseFormat, {
  skip: (_req, res) => res.statusCode < 400,
});
