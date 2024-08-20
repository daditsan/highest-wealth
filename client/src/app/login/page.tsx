import Link from "next/link";
import { LoginAlert } from "@/components/Alert";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { Suspense } from "react";

export default function Login() {
	const handleSubmit = async (formData: FormData) => {
		"use server";

		const email = formData.get("email");
		const password = formData.get("password");

		const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email,
				password,
			}),
			cache: "no-store",
		});

		const result = (await response.json()) as {
			access_token?: string;
			message?: string;
		};

		if (!response.ok) {
			redirect("/login?error=" + result.message);
		}

		cookies().set("Authorization", `Bearer ${result.access_token}`);
		redirect("/wishlist");
	};

	return (
		<>
			<div className="flex justify-center">
				<img
					className="w-1/2 min-h-screen object-cover"
					src="https://www.harrywinston.com/-/media/project/harry-winston/corporate/harry-winston-int/homepage/sbs_hp_winstoncluster.jpg?rev=10199c8e82a04a2d9b327871ded8b62d"
					alt=""
				/>
				<form className="w-1/2 px-14 py-10" action={handleSubmit}>
					<Link href={"/"}>Back to Homepage</Link>
					<div className="flex flex-col my-4 gap-2">
						<h1 className="text-3xl font-bold">Login</h1>
					</div>
					<Suspense fallback={<div>Loading...</div>}>
					<LoginAlert />
					</Suspense>
					<div className="form-control">
						<label className="label" htmlFor="email">
							<span className="label-text">Email</span>
						</label>
						<input
							id="email"
							type="email"
							placeholder="email"
							name="email"
							className="input input-bordered"
						/>
					</div>
					<div className="form-control">
						<label className="label" htmlFor="password">
							<span className="label-text">Password</span>
						</label>
						<input
							id="password"
							type="password"
							placeholder="password"
							name="password"
							className="input input-bordered"
						/>
					</div>
					<div className="form-control mt-6">
						<button type="submit" className="btn btn-primary">
							Login
						</button>
					</div>
					<div className="flex flex-row gap-1 justify-center mt-6">
						<p>Don&apos;t have an account?</p>
						<Link href={"/register"}>
							<p className="underline">Sign Up</p>
						</Link>
					</div>
				</form>
			</div>
		</>
	);
}
