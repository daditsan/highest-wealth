"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export function RegisterAlert() {
	const params = useSearchParams();
	const errorMessage = params.get("error");
	const router = useRouter();

	useEffect(() => {
		router.replace("/register");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			{errorMessage && (
				<div className="toast toast-top toast-end">
					<div className="alert alert-error rounded-lg text-white font-semibold">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6 shrink-0 stroke-current"
							fill="none"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
						<span>{errorMessage}</span>
					</div>
				</div>
			)}
		</>
	);
}

export function LoginAlert() {
	const params = useSearchParams();
	const errorMessage = params.get("error");
	const router = useRouter();

	useEffect(() => {
		router.replace("/login");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			{errorMessage && (
				<div className="toast toast-top toast-end">
					<div className="alert alert-error rounded-lg text-white font-semibold">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6 shrink-0 stroke-current"
							fill="none"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
						<span>{errorMessage}</span>
					</div>
				</div>
			)}
		</>
	);
}
