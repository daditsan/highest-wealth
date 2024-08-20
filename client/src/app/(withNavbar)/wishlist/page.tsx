"use client";

import { CardWishlist } from "@/components/Card";
import { Wishlist } from "@/app/db/interface/wishlist";
import { useEffect, useState } from "react";
import Link from "next/link";
import Swal from "sweetalert2";

export default function WishlistPage() {
	const [wishlistData, setWishlistData] = useState<Wishlist[]>([]);

	const fetchWishlist = async () => {
		try {
			Swal.fire({
				title: "Loading...",
				allowOutsideClick: false,
				didOpen: () => {
					Swal.showLoading();
				},
			});

			const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + `/api/wishlist`, {
				method: "GET",
				cache: "no-store",
			});

			const result = (await response.json()) as { data: Wishlist[] };
			setWishlistData(result.data);

			Swal.close();
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchWishlist();
	}, []);

	return (
		<div className="flex flex-col px-20 py-10 gap-4 min-h-screen">
			<h1 className="font-bold text-2xl  mt-12 w-fit">My Wishlist</h1>
			{wishlistData.length > 0 ? (
				wishlistData.map((data) => {
					return <CardWishlist key={data._id.toString()} data={data} />;
				})
			) : (
				<div className="w-full">
					<div className="flex justify-center">
						{/* <img className="w-[300px] text-center" src="empty-state.png" alt="" /> */}
						<p>You don&apos;t have any jewlery in the wishlist yet.</p>
					</div>
					<div className="flex flex-col mt-4 text-center gap-2 items-center">
						<h1 className="text-xl font-bold">Your Wishlist is Empty</h1>
						<p>Browse our jewelries and add items to your wishlist for later</p>
						<Link href="/products" className="btn btn-primary w-fit mt-2">
							Explore products
						</Link>
					</div>
				</div>
			)}
		</div>
	);
}
