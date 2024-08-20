import Link from "next/link";
import { redirect } from "next/navigation";
import { RegisterAlert } from "@/components/Alert";
import { Suspense } from "react";

export default function Register() {
	const handleSubmit = async (formData: FormData) => {
		"use server";

		const name = formData.get("name");
		const email = formData.get("email");
		const username = formData.get("username");
		const password = formData.get("password");

		const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/register", {
			method: "POST",
			body: JSON.stringify({
				name,
				email,
				username,
				password,
			}),
			cache: "no-store",
		});

		const result = (await response.json()) as { message?: string };

		if (!response.ok) {
			redirect("/register?error=" + result.message);
		}

		redirect("/login");
	};

	return (
		<>
			<div className="flex justify-center">
				<img
					className="w-1/2 min-h-screen object-cover"
					src="https://www.harrywinston.com/-/media/project/harry-winston/corporate/harry-winston-int/the-house/our-stones/sbs_lp_ourstones_2.jpg?rev=c6c98d16483944fe95136cc0fe8da990"
					alt=""
				/>
				<form className="w-1/2 px-14 py-10" action={handleSubmit}>
				<Suspense fallback={<div>Loading...</div>}>
					<RegisterAlert />
					</Suspense>
					<Link href={"/"}>Back to Homepage</Link>
					<div className="flex flex-col my-4 gap-2">
						<h1 className="text-3xl font-bold">Register</h1>
						<p>Create new account</p>
					</div>
					<div className="form-control">
						<label className="label" htmlFor="name">
							<span className="label-text">Name</span>
						</label>
						<input
							id="name"
							type="text"
							placeholder="name"
							name="name"
							className="input input-bordered"
						/>
					</div>
					<div className="form-control">
						<label className="label" htmlFor="email">
							<span className="label-text">Email</span>
							<span className="text-red-400">*</span>
						</label>
						<input
							id="email"
							type="email"
							placeholder="email"
							name="email"
							className="input input-bordered"
						/>
					</div>
					<div className="form-control mt-2">
						<label className="label text-start" htmlFor="username">
							<span className="label-text">Username</span>
							<span className="text-red-400">*</span>
						</label>
						<input
							id="username"
							type="text"
							placeholder="username"
							name="username"
							className="input input-bordered"
						/>
					</div>
					<div className="form-control">
						<label className="label" htmlFor="password">
							<span className="label-text">Password</span>
							<span className="text-red-400">*</span>
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
							Register
						</button>
					</div>
					<div className="flex flex-row gap-1 justify-center mt-6">
						<p>Already have an account?</p>
						<Link href={"/login"}>
							<p className="underline">Log In</p>
						</Link>
					</div>
				</form>
			</div>
		</>
	);
}
