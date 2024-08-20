import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export function LogoutButton() {
	return (
		<>
			<form
				action={async () => {
					"use server";

					cookies().delete("Authorization");
					redirect("/login");
				}}
			>
				<button
					type="submit"
					className="btn bg-red-500 text-white font-bold hover:bg-red-800"
				>
					Logout
				</button>
			</form>
		</>
	);
}
