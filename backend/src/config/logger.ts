import winston from 'winston';
import config from './config.js';

const { format, createLogger, transports } = winston;
const { printf, combine, timestamp, uncolorize, colorize } = format;

const winstonFormat = printf((obj) => {
  const { level, message, timestamp, stack } = obj;

  return `${timestamp}:${level} ${stack || message}`;
});

const logger = createLogger({
  level: config.env === 'development' ? 'debug' : 'info',
  format: combine(
    timestamp(),
    winstonFormat,
    config.env === 'development' ? colorize() : uncolorize(),
  ),
  transports: [new transports.Console()],
});

export default logger;
