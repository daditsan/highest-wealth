"use client";

import { Product } from "@/app/db/interface/product";
import { Wishlist } from "@/app/db/interface/wishlist";
import Link from "next/link";
import { AddWishlistButton, DeleteWishlistButton } from "./WishlistButton";

export function CardProduct({ product }: { product: Product }) {
	return (
		<>
			<Link
				href={process.env.NEXT_PUBLIC_BASE_URL + `/products/${product.slug}`}
				className="card bg-base-100 w-[350px] shadow-xl"
			>
				<figure>
					<img
						src={product.thumbnail}
						alt=""
						className="h-[300px] w-full object-cover"
					/>
				</figure>
				<div className="card-body p-4">
					<h2 className="card-title">{product.name}</h2>
					<p className="text-ellipsis overflow-hidden whitespace-nowrap">
						{product.excerpt}
					</p>
					<h2 className="card-title">
						Rp {new Intl.NumberFormat("en-ID").format(product.price)}
					</h2>
					<div className="card-actions justify-end mt-2">
						<AddWishlistButton productId={product._id} />
					</div>
				</div>
			</Link>
		</>
	);
}

export function CardWishlist({ data }: { data: Wishlist }) {
	return (
		<>
			{data && 
				<div className="card flex flex-row bg-base-100 w-full shadow-xl p-4">
					<figure className="w-[300px]">
						<img
							src={data.product.thumbnail}
							alt={data.product.name}
							className="rounded-xl h-[160px] w-[250px] object-cover"
						/>
					</figure>
					<div className="w-full ms-4">
						<div className="flex flex-col gap-2">
							<h2 className="card-title">{data.product.name}</h2>

							<p>{data.product.excerpt}</p>

							<h2 className="card-title">
								Rp {new Intl.NumberFormat("en-ID").format(data.product.price)}
							</h2>
						</div>
						<div className="card-actions justify-end mt-auto">
							<DeleteWishlistButton id={data._id} />
						</div>
					</div>
				</div>
			}
		</>
	);
}
