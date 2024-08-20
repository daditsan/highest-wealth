import { AddWishlistButton } from "@/components/WishlistButton";
import { Product } from "@/app/db/interface/product";
import type { Metadata } from 'next'

type Props = {
	params: {
		slug: string;
	};
};

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
    const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + `/api/products/${params.slug}`, {
        method: "GET",
        cache: "no-store"
    })

    const result = await response.json() as { message?: string, data?: Product }

    return {
        generator: "Next.js",
        title: `Highest-Wealth | ${result.data?.name}`,
        description: `${result.data?.description}`,
        keywords: result.data?.tags,
		openGraph: {
			title: `Highest-Wealth | ${result.data?.name}`,
        	description: `${result.data?.description}`,
			images: [
                {
                    url: `${result.data?.thumbnail}`, 
                    alt: `${result.data?.name} image`,
                    width: 800, 
                    height: 600
                }
            ]
		}
    }
}

export default async function ProductDetail({ params }: Props) {
	const { slug } = params;

	let response = await fetch(
		process.env.NEXT_PUBLIC_BASE_URL + `/api/products/${slug}`,
		{
			method: "GET",
			cache: "no-store",
		}
	);

	const result = (await response.json()) as {
		message?: string;
		data?: Product;
	};



	return (
		<>
			<div className="flex flex-col px-20 mt-24 min-h-screen">
				<div className="flex md:flex-row gap-8">
					<div className="md:w-1/2 flex gap-4">
						<img
							src={result.data?.thumbnail}
							alt=""
							className="rounded-lg shadow-lg w-full h-[400px] object-cover"
						/>
						<div className="flex-col">
							{result &&
								result.data?.images?.map((image, index) => {
									return (
										<img
											key={index}
											alt={result.data?.name}
											src={image}
											className="h-[67px] w-[100px] object-cover bg-slate-400 mb-4 rounded-md shadow-lg"
										/>
									);
								})}
						</div>
					</div>
					<div className="w-1/2 p-6">
						<h1 className="text-3xl font-bold mb-2">{result.data?.name}</h1>
						<p className="text-gray-700 mb-2">{result.data?.description}</p>
						<div className="flex gap-2">
							{result.data?.tags.map((tag, index) => {
								return (
									<p key={index} className="text-blue-700">
										#{tag}
									</p>
								);
							})}
						</div>
						{result.data?.price && (
							<p className="text-2xl font-semibold mt-4">
								Rp {new Intl.NumberFormat("en-ID").format(result.data?.price)}
							</p>
						)}
						<div className="flex gap-4 mt-6 w-full">
							{result.data?._id && (
								<AddWishlistButton productId={result.data?._id} />
							)}
							{/* <button className="btn btn-primary w-1/2 mb-4">Buy Now</button> */}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
