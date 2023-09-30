import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
	const supabase = createRouteHandlerClient<Database>({ cookies });

	const isPrivate = request.nextUrl.searchParams.get("is_private") as string;
	const formData = await request.formData();
	const nameField = String(formData.get("name"));
	const columnFields = formData.getAll("column");

	const redirectUrl = new URL("/board/create", request.nextUrl.origin);
	redirectUrl.searchParams.set("is_private", isPrivate);

	const {
		data: { session },
	} = await supabase.auth.getSession();

	const { data: board, error: boardError } = await supabase
		.from("boards")
		.insert({
			name: nameField,
			user_id: isPrivate === "1" && session ? session.user.id : null,
		})
		.select()
		.single();

	if (boardError) {
		redirectUrl.searchParams.set("error_message", boardError.message);
		return NextResponse.redirect(redirectUrl, { status: 301 });
	}

	const toInsert = columnFields.map((column) => ({
		name: String(column),
		board_id: board.id,
	}));

	const { error: columnError } = await supabase
		.from("columns")
		.insert(toInsert);

	if (columnError) {
		redirectUrl.searchParams.set("error_message", columnError.message);
		return NextResponse.redirect(redirectUrl, { status: 301 });
	}

	return NextResponse.redirect(
		new URL(`/board/${board.id}`, request.nextUrl.origin),
		{ status: 301 }
	);
}
