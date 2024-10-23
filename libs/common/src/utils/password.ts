import { genSaltSync, hashSync } from 'bcrypt';

export const hashPassword = (password: string) => {
  return hashSync(password, genSaltSync(10));
};

export const isBcryptHash = (password: string) => {
  const bcryptPattern = /^\$2[aby]\$.{56}$/;
  return bcryptPattern.test(password);
};
