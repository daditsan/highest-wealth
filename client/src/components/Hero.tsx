import { Edu_SA_Beginner } from "next/font/google";
import Link from "next/link";

export function Hero() {
	return (
		<div
			className="hero min-h-screen"
			style={{
				backgroundImage:
					"url(https://www.harrywinston.com/-/media/project/harry-winston/corporate/harry-winston-int/homepage/herolarged_hp_lily24.jpg?rev=8486382c285c405791449a4b1b973d54)",
			}}
		>
			<div className="hero-overlay bg-opacity-80"></div>
			<div className="hero-content text-neutral-content text-center">
				<div className="max-w-md">
					<h1 className="mb-5 text-5xl font-bold">
						Discover the most Prestige Jewels Every Day
					</h1>
					<p className="mb-5">
						Shop the latest jewelries and exclusive jewelries, from the fine to
						the most luxorious.
					</p>
					<Link href="/products" className="btn btn-primary me-4">
						Discover Now
					</Link>
					<a
						href="#company-profile"
						className="btn btn-outline text-white border-white hover:text-blue-700 hover:border-blue-700"
					>
						Learn More About Us
					</a>
				</div>
			</div>
		</div>
	);
}

export function HeroFigure() {
	return (
		<div className="hero bg-base-200 px-20 py-6">
			<div className="hero-content flex-col lg:flex-row-reverse">
				<img
					className="h-[600px] w-full object-cover rounded"
					src="https://www.harrywinston.com/-/media/project/harry-winston/corporate/harry-winston-int/global/hero/hero-side-by-side/find-my-harry-winston/find-my-harry-winston.jpg?rev=4dea995cda14401cadec208474337bec"
				/>
				<div className="me-12">
					<h1 className="text-3xl font-bold">
						Everyone needs at least one precious jewelry in their life.
					</h1>
					<p className="py-6">
						We are committed to delivering the highest quality jewelries and
						other luxorious things to our consumers. Our journey began in 1945,
						and since then, we have grown into a trusted name in the jewelry
						industry.
					</p>
					<div>
						<p className="text-gray-400 font-semibold mt-6">
							Acceptable Payment
						</p>
						<div className="flex gap-6 mt-4">
							<img
								src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png"
								alt=""
								className="w-[30px] h-[28px] grayscale hover:grayscale-0 hover:transition-all"
							/>
							<img
								src="https://seeklogo.com/images/E/ethereum-logo-EC6CDBA45B-seeklogo.com.png"
								alt=""
								className="w-[30px] h-[29px] grayscale hover:grayscale-0 hover:transition-all"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
