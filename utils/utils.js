import crypto from 'crypto';

// Generate a random string of a given length
export const generateRandomString = (length) => {
  return crypto.randomBytes(length).toString('hex');
};