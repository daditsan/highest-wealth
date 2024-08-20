import { NextResponse } from "next/server";
import { database } from "../config";
import { compareSync, hashSync } from "bcryptjs";
import { User, UserSchema, Login, LoginSchema } from "../interface/user";
import { cookies } from "next/headers";
import { createToken } from "../helpers/jwt";

export default class UserModel {
	static async findUserByEmail(email: string) {
		const users = database.collection("users");
		const result = await users.findOne({ email });
		return result;
	}

	static async findUserByUsername(username: string) {
		const users = database.collection("users");
		const result = await users.findOne({ username });
		return result;
	}

	static async register(userBody: User) {
		try {
			UserSchema.parse(userBody);

			const checkEmail = await UserModel.findUserByEmail(userBody.email);
			const checkUsername = await UserModel.findUserByUsername(
				userBody.username
			);

			if (checkEmail) {
				return NextResponse.json(
					{ message: "Email already registered" },
					{ status: 401 }
				);
			}

			if (checkUsername) {
				return NextResponse.json(
					{ message: "Username is already registered" },
					{ status: 401 }
				);
			}

			const users = database.collection("users");
			await users.insertOne({
				...userBody,
				password: hashSync(userBody.password),
			});

			return NextResponse.json(
				{ message: "Successfully registered!" },
				{ status: 201 }
			);
		} catch (error) {
			throw error;
		}
	}

	static async login(userBody: Login) {
		try {
			LoginSchema.parse(userBody);

			const user = await UserModel.findUserByEmail(userBody.email);

			if (!user) {
				return NextResponse.json({ message: "Invalid Email" }, { status: 401 });
			}

			const passwordChecker = compareSync(userBody.password, user.password);

			if (!passwordChecker) {
				return NextResponse.json(
					{ message: "Invalid Password" },
					{ status: 401 }
				);
			}

			const access_token = createToken({
				_id: user._id,
			});

			cookies().set("Authorization", `Bearer ${access_token}`);

			return NextResponse.json({ access_token: access_token }, { status: 200 });
		} catch (error) {
			throw error;
		}
	}
}
