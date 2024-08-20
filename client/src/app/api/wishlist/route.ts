import WishlistModel from "@/app/db/models/wishlist";
import { NextRequest, NextResponse } from "next/server";
import { z, ZodError } from "zod";

const wishlistInputSchema = z.object({
	productId: z.string(),
});

export async function GET(request: NextRequest) {
	try {
		const userId = request.headers.get("user-id");

		if (userId) {
			const data = await WishlistModel.getWishlist(userId);
			return Response.json({ data }, { status: 200 });
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

export async function POST(request: Request) {
	try {
		const body = await request.json();
		const { productId } = wishlistInputSchema.parse(body);
		const userId = request.headers.get("user-id");

		if (!userId) {
			return NextResponse.json({ message: "Not authorized" }, { status: 403 });
		}

		const wishlistItem = {
			productId,
			userId,
		};

		const wishlist = await WishlistModel.create(wishlistItem);
		return NextResponse.json({ message: "Product wishlist added" });
	} catch (error) {
		console.log(error);

		return NextResponse.json(
			{ error: "There's something Wrong" },
			{
				status: 400,
			}
		);
	}
}
