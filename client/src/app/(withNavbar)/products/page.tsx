"use client";

import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { CardProduct } from "@/components/Card";
import { Product } from "@/app/db/interface/product";
import Search from "@/components/Search";
import { useSearchParams } from "next/navigation";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Products() {
	const [products, setProducts] = useState<Product[]>([]);
	const params = useSearchParams();
	const search: string | null = params.get("search");
	const [page, setPage] = useState(1);
	const [hasMore, setHasMore] = useState(true);

	useEffect(() => {
		fetchData(true);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [search]);

	async function fetchData(reset = false) {
		try {
			if (reset) {
				setProducts([]);
				setPage(1);
				setHasMore(true);
			}

			const response = await fetch(
				process.env.NEXT_PUBLIC_BASE_URL +
					`/api/products?search=${search}&page=${reset ? 1 : page}&limit=6`,
				{
					method: "GET",
					cache: "no-store",
				}
			);

			const data = (await response.json()) as { products: Product[] };

			if (response.ok) {
				if (reset) {
					setProducts(data.products);
				} else {
					setProducts((prevProducts) => {
						return [...prevProducts, ...data.products];
					});
				}

				if (data.products.length < 6) {
					setHasMore(false);
				}

				Swal.close();
			} else {
				throw new Error("Failed to fetch products");
			}
		} catch (error) {
			console.error(error);

			Swal.fire({
				icon: "error",
				title: "Error",
				text:
					error instanceof Error
						? error.message
						: "An unexpected error occurred",
			});
		}
	}

	function loadMoreProducts() {
		setPage((prevPage) => prevPage + 1);
	}

	useEffect(() => {
		if (page > 1) {
			fetchData(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page]);

	return (
		<>
			<div>
				<div className="flex mt-[100px] align-middle px-20 ">
					<p className="font-bold text-2xl me-auto">FIND YOUR VERY OWN JEWEL</p>
					<Search />
				</div>
				<InfiniteScroll
					dataLength={products.length}
					next={loadMoreProducts}
					hasMore={hasMore}
					loader={<h4>Loading...</h4>}
				>
					<div className="flex flex-wrap px-20 py-10 gap-6">
						{products.map((product) => (
							<CardProduct key={product._id.toString()} product={product} />
						))}
					</div>
				</InfiniteScroll>
			</div>
		</>
	);
}
