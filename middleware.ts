import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
	const res = NextResponse.next();
	const supabase = createMiddlewareClient<Database>({ req, res });

	if (req.nextUrl.pathname === "/") {
		const { data } = await supabase
			.from("boards")
			.select()
			.order("created_at")
			.limit(1)
			.single();

		const url = new URL(`/board/${data?.id}`, req.nextUrl.origin);

		if (data !== null) {
			return NextResponse.redirect(url);
		}
	}

	const {
		data: { session },
	} = await supabase.auth.getSession();

	if (
		session &&
		(req.nextUrl.pathname === "/login" ||
			req.nextUrl.pathname === "/sign-up")
	) {
		const url = new URL("/", req.nextUrl.origin);

		return NextResponse.redirect(url);
	}
	return res;
}

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
