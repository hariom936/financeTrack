import jwt from 'jsonwebtoken';
import config from '../config/config';

export const generateJwtToken = (payload: object): Promise<string> => {
  const secret = config.jwts.secret;
  const expiration = config.jwts.accessExpiration;

  if (!secret || typeof secret !== 'string') {
    throw new Error('JWT secret missing or invalid');
  }

  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      secret,
      {
        expiresIn: expiration as unknown as jwt.SignOptions['expiresIn']
      },
      (err, token) => {
        if (err || !token) {
          return reject(err || new Error('Token generation failed'));
        }
        resolve(token);
      }
    );
  });
};
