import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
	const supabase = createRouteHandlerClient<Database>({ cookies });

	const formData = await request.formData();
	const email = String(formData.get("email"));
	const password = String(formData.get("password"));

	const { error } = await supabase.auth.signInWithPassword({
		email,
		password,
	});

	const redirectUrl = new URL("/login", request.nextUrl.origin);

	if (error) {
		redirectUrl.searchParams.set("error_message", error.message);
	}

	return NextResponse.redirect(redirectUrl, {
		status: 301,
	});
}
