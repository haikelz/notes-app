import { customAlphabet } from "nanoid";

const randomId = customAlphabet("1234567890", 8);
export const generateRandomId = randomId();
