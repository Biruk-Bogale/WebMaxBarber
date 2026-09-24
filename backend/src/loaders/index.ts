import { Express } from "express";

import mySqlLoader from "./db.config.js";
import logger from "../config/logger.js";
import expressLoader from "./express.js";
import subscribers from "../subscribers/index.js";
import EventEmitter from "../utils/EventEmitter.js";

export default async (app: Express): Promise<void> => {
  await mySqlLoader.checkConnection();
  logger.info("PostgreSQL initiated");

  await expressLoader.app(app);
  logger.info("Express app initiated");

  //  Dynamically registers all subscribers event listeners
  (Object.keys(subscribers) as Array<keyof typeof subscribers>).forEach(
    (eventName) => {
      EventEmitter.on(eventName, subscribers[eventName]);
    },
  );
};
