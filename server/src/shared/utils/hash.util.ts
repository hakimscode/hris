import { genSalt, hash } from 'bcrypt';

export const HashPassword = async (password: string): Promise<string> => {
  const salt = await genSalt(10);
  return hash(password, salt);
};
