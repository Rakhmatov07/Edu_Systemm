import { hash, compare } from "bcrypt";
import config from "config";

const salt: number = config.get('SALT');

export const hashPayload = async(payload: string): Promise<string> => await hash(payload, salt);
export const comparePayload = async(payload: string, encryptedPayload: string): Promise<boolean> => await compare(payload, encryptedPayload);
