import WishlistModel from "@/app/db/models/wishlist";
import { NextRequest } from "next/server";
import { z, ZodError } from "zod";

export async function DELETE(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		const { id } = params;

		if (id) {
			const data = await WishlistModel.removeWishlist(id);
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
