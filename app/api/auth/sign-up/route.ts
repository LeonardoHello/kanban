import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
	const supabase = createRouteHandlerClient<Database>({ cookies });

	const formData = await request.formData();
	const email = String(formData.get("email"));
	const password = String(formData.get("password"));

	const { data, error } = await supabase.auth.signUp({
		email,
		password,
		options: {
			emailRedirectTo: `${request.nextUrl.origin}/api/auth/callback`,
		},
	});

	const redirectUrl = new URL("/sign-up", request.nextUrl.origin);

	if (error) {
		redirectUrl.searchParams.set("error_message", error.message);
	} else if (data.user?.email) {
		if (data.user?.identities?.length === 0) {
			redirectUrl.searchParams.set(
				"error_message",
				"This user already exists"
			);
		} else {
			redirectUrl.searchParams.set(
				"verificatione_email",
				data.user.email
			);
		}
	}

	return NextResponse.redirect(redirectUrl, {
		status: 301,
	});
}
