import { database } from "../config";
import { Product } from "../interface/product";

export default class ProductModel {
	static async getAllProducts(
		search?: string,
		page?: number,
		limit: number = 6
	) {
		const query = search ? { name: new RegExp(search, "i") } : {};
		if (page) {
			const skip = (page - 1) * limit;

			const products = await database
				.collection("products")
				.find(query)
				.skip(skip)
				.limit(limit)
				.toArray();
			const totalPages = Math.ceil(products.length / limit);

			return {
				page,
				products,
				totalPages,
			};
		}
	}

	static async getProductBySlug(slug: string) {
		const products = database.collection("products");
		const data = await products.findOne({ slug });

		return data as Product;
	}
}
