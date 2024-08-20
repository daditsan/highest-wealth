import ProductModel from "@/app/db/models/product";
import { NextRequest } from "next/server";
import { ZodError } from "zod";

export async function GET(request: NextRequest) {
	try {
		const url = new URL(request.url);
		const search = url.searchParams.get("search") || "";
		const page = parseInt(url.searchParams.get("page") || "1");
		const limit = parseInt(url.searchParams.get("limit") || "6");

		let data;
		data = await ProductModel.getAllProducts(search, page, limit);

		return Response.json(data, {
			status: 200,
		});
	} catch (error) {
		if (error instanceof ZodError) {
			return Response.json(
				{ message: error.errors[0].message },
				{ status: 400 }
			);
		}

		return Response.json({ message: "Internal Server Error" }, { status: 500 });
	}
}
