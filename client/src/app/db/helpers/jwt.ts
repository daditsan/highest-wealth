import jwt, { JwtPayload } from "jsonwebtoken";
import * as jose from "jose";

const secret = process.env.JWT_SECRET as string;

export const createToken = (payload: JwtPayload) => jwt.sign(payload, secret);

export const readPayloadJose = async <T>(access_token: string): Promise<T> => {
	const secretKey = new TextEncoder().encode(secret);
	const result = await jose.jwtVerify<T>(access_token, secretKey);
	return result.payload;
};
