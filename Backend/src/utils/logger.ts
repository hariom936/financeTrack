import { createLogger } from 'winston';
import loggerConfig from '../config/winston';

// Create logger
const logger = createLogger(loggerConfig);

export default logger;
