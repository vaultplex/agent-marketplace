import 'dotenv/config'
import { createLogger, transports, format } from 'winston';

let level = process.env['LOGGER_LEVEL'] || 'debug';
const filename = process.env['LOGGER_FILENAME'] || 'error.log';

if (process.env.NODE_ENV === 'production') {
  level = 'warn';
}

export const logger = createLogger({
  level,
  transports: [
    new transports.Console(),
    new transports.File({ filename, level: 'error' }),
  ]
});