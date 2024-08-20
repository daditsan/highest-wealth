import { ZodError } from "zod";

export function zodErrorFormat(error: ZodError) {
	const errorPath = error.errors[0].path[0];
	const errorMessage = error.errors[0].message;
	return `${errorPath} ${errorMessage.toLocaleLowerCase()}`;
}
