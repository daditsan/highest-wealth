import { CardProduct } from "@/components/Card";
import { Hero, HeroFigure } from "@/components/Hero";
import Link from "next/link";
import Swal from "sweetalert2";
import { Product } from "../db/interface/product";
import CookieAlert from "@/components/CookiesAlert";



export default async function Home() {
	Swal.fire({
		title: "Loading...",
		allowOutsideClick: false,
		didOpen: () => {
			Swal.showLoading();
		},
	});

	let response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + `/api/products`, {
		method: "GET",
		cache: "no-store",
	});

	const result = (await response.json()) as { products: Product[] };

	Swal.close();

	return (
		<>
			<Hero />
			<div className="flex justify-between px-20 pt-14">
				<h1 className="font-bold text-2xl">
					DISCOVER THE NEWEST JEWELRIES TODAY
				</h1>
				<Link href={`/products`}>See All Jewelries</Link>
			</div>
			<div className="flex flex-wrap px-20 py-10 gap-6">
				{result &&
					result.products.map((product: Product) => {
						return (
							<CardProduct product={product} key={product._id.toString()} />
						);
					})}
			</div>
			<section id="company-profile">
				<HeroFigure />
			</section>
			<CookieAlert />
		</>
	);
}
