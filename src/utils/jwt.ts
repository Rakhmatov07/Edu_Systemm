import Jwt, { JwtPayload } from "jsonwebtoken";
import config from "config";

const { sign, verify } = Jwt;
const jwt_key: string = config.get("JWT_KEY");


export const signPayload = (payload: string): string => sign(payload, jwt_key);
export const verifyPayload = (payload: string): JwtPayload | string => verify(payload, jwt_key);