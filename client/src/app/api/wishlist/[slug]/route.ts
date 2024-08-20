import WishlistModel from "@/app/db/models/wishlist";
import { NextRequest } from "next/server";
import { ZodError } from "zod";

export async function POST(
	request: NextRequest,
	{ params }: { params: { slug: string } }
) {
	try {
		const userId = request.headers.get("user-id");
		const { slug } = params;

		if (userId) {
			const data = await WishlistModel.addWishlist(userId, slug);
			return data;
		}
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
