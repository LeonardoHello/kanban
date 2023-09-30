import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
	const supabase = createRouteHandlerClient<Database>({ cookies });

	await supabase.auth.signOut();

	return NextResponse.redirect(`${request.nextUrl.origin}/`, {
		status: 301,
	});
}
