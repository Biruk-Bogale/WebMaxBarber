import http from "http";
import express, { Express } from "express";
import loaders from "./loaders/index.js";
import config from "./config/config.js";

import logger from "./config/logger.js";

const exitHandler = (server?: http.Server) => {
  if (server) {
    server.close(() => {
      logger.info("Server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unExpectedErrorHandler = (server?: http.Server) => {
  return (error: unknown) => {
    logger.error("Unexpected error:", error);
    exitHandler(server);
  };
};

const startServer = async (): Promise<void> => {
  const app: Express = express();

  await loaders(app);

  // create a server using the Node's built-in HTTP module, integrate it with Express app, and simplify our index.js file for better maintainability and structure.
  const httpServer = http.createServer(app);

  const server = httpServer.listen(config.port, () => {
    logger.info(`Server listening on port ${config.port}`);
  });

  // listen for unhandled exception/rejections globally
  // Graceful shutdowns
  process.on("uncaughtException", unExpectedErrorHandler(server));
  process.on("unhandledRejection", unExpectedErrorHandler(server));

  // we listened to a SIGTERM event, which is triggered when the Node.js process is terminated (e.g., by pressing Ctrl+C in the terminal on Linux) use  other event for windows.
  const cleanupAndExit = () => {
    if (server) {
      server.close(() => {
        logger.info("Server closed");
        process.exit(0);
      });
    } else {
      process.exit(0);
    }
  };

  process.on("SIGINT", () => {
    logger.info("SIGINT received (Ctrl+C)");
    cleanupAndExit();
  });

  process.on("SIGTERM", () => {
    logger.info("SIGTERM received");
    cleanupAndExit();
  });
};

startServer();
