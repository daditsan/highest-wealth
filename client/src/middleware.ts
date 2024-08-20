import { NextRequest, NextResponse } from "next/server";
import { readPayloadJose } from "./app/db/helpers/jwt";
import { JWSSignatureVerificationFailed } from "jose/errors";

export async function middleware(request: NextRequest) {
	try {
		if (request.nextUrl.pathname.startsWith("/login")) {
			let authCookie = request.cookies.get("Authorization");

			if (authCookie) {
				return NextResponse.redirect(new URL("/products", request.url));
			}

			return NextResponse.next();
		}

		if (request.nextUrl.pathname.startsWith("/api/wishlist")) {
			let access_token = request.cookies.get("Authorization");

			const [type, token] = access_token!.value.split(" ");

			if (type !== `Bearer`) {
				throw new Error("Unauthenticated");
			}

			const result = await readPayloadJose<{ _id: string }>(token);
			const requestHeaders = new Headers(request.headers);

			requestHeaders.set("user-id", result._id.toString());

			return NextResponse.next({
				request: {
					headers: requestHeaders,
				},
			});
		}
	} catch (error) {
		if (error instanceof Error && error.message === "Unauthenticated") {
			return NextResponse.json(
				{ message: "You need to login to continue this action" },
				{ status: 401 }
			);
		}

		if (error instanceof JWSSignatureVerificationFailed) {
			return NextResponse.json(
				{ message: "You need to login to continue this action" },
				{ status: 401 }
			);
		}

		return NextResponse.json(
			{ message: "Internal Server Error" },
			{ status: 500 }
		);
	}
}

export const config = {
	matcher: ["/login/:path*", "/api/wishlist/:path*"],
};
