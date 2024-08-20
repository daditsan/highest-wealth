import { z } from "zod";

export const UserSchema = z.object({
	name: z.string().optional(),
	username: z.string(),
	email: z.string().email(),
	password: z.string().min(5),
});

export const LoginSchema = z.object({
	email: z.string(),
	password: z.string(),
});

export type User = z.infer<typeof UserSchema>;
export type Login = z.infer<typeof LoginSchema>;
