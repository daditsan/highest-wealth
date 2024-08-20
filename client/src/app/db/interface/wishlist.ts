import { ObjectId } from "mongodb";

export interface Wishlist {
	_id: ObjectId;
	userId: ObjectId;
	productId: ObjectId;
	createdAt: Date;
	updatedAt: Date;
	product: WishlistProduct;
}

interface WishlistProduct {
	_id: ObjectId;
	name: string;
	slug: string;
	description: string;
	excerpt: string;
	price: number;
	tags: string[];
	thumbnail: string;
	images: string[];
	createdAt: Date;
	updatedAt: Date;
}
