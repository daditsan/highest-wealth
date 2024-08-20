import { NextRequest, NextResponse } from "next/server";
import { User } from "@/app/db/interface/user";
import UserModel from "@/app/db/models/user";
import { ZodError } from "zod";
import { zodErrorFormat } from "@/app/db/helpers/zodError";

export async function POST(request: NextRequest) {
	try {
		const body: User = await request.json();

		const result = await UserModel.register({
			name: body.name,
			username: body.username,
			email: body.email,
			password: body.password,
		});

		return result;
	} catch (error: any) {
		if (error.message === "Unexpected end of JSON input") {
			return NextResponse.json(
				{ message: "Username, email, and password is required" },
				{ status: 400 }
			);
		}

		if (error instanceof ZodError) {
			return NextResponse.json(
				{ message: zodErrorFormat(error) },
				{ status: 400 }
			);
		}

		return NextResponse.json(
			{ message: "Internal Server Error" },
			{ status: 500 }
		);
	}
}
