import { ObjectId } from "mongodb";
import { database } from "../config";
import { Wishlist } from "../interface/wishlist";
import { NextResponse } from "next/server";

export default class WishlistModel {
	static async addWishlist(userId: string, slug: string) {
		const wishlist = database.collection("wishlists");
		const findProduct = await database.collection("products").findOne({ slug });

		const newWishlist = await wishlist.insertOne({
			userId,
			productId: findProduct?._id,
		});

		return NextResponse.json(
			{ message: "Successfully added to wishlist!" },
			{ status: 201 }
		);
	}

	static async create(wishlistItem: { productId: string; userId: string }) {
		const collection = database.collection("wishlists");

		const result = await collection.insertOne({
			productId: new ObjectId(wishlistItem.productId),
			userId: new ObjectId(wishlistItem.userId),
			createdAt: new Date(),
			updatedAt: new Date(),
		});

		return result;
	}

	static async getWishlist(userId: string) {
		const wishlists = database.collection("wishlists");
		const data = await wishlists
			.aggregate([
				{
					$match: {
						userId: new ObjectId(userId),
					},
				},
				{
					$lookup: {
						from: "products",
						localField: "productId",
						foreignField: "_id",
						as: "product",
					},
				},
				{
					$unwind: {
						path: "$product",
					},
				},
			])
			.toArray();

		return data as Wishlist[];
	}

	static async removeWishlist(id: string) {
		const wishlists = database.collection("wishlists");
		await wishlists.deleteOne({
			_id: new ObjectId(id),
		});

		return NextResponse.json(
			{ message: "Successfully deleted from wishlist!" },
			{ status: 200 }
		);
	}
}
