import ProductModel from "@/app/db/models/product";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function GET(
	request: NextRequest,
	{ params }: { params: { slug: string } }
) {
	try {
		const { slug } = params;
		const data = await ProductModel.getProductBySlug(slug);

		return NextResponse.json({ data });
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
