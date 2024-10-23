import { randomBytes } from 'crypto';

export const generateUniqueString = (length = 16) => {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const randomBytesArray = randomBytes(length);
  for (let i = 0; i < length; i++) {
    result += characters[randomBytesArray[i] % characters.length];
  }
  return result;
};
