import { sign } from 'jsonwebtoken';
import { promisify } from 'util';
import config from '../config/config';

const signAsync = promisify<string | object | Buffer, string, object, string>(sign);

export const generateJwtToken = async (payload: object): Promise<string> => {
  if (!config.jwts.secret) {
    throw new Error("JWT secret not found");
  }

  const token = await signAsync(payload, config.jwts.secret, {
    expiresIn: config.jwts.accessExpiration, // ✅ e.g., "15m", "365d"
  });

  return token;
};
