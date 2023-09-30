import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

type Params = { params: { boardId: string } };

export async function POST(
	request: NextRequest,
	{ params: { boardId } }: Params
) {
	const supabase = createRouteHandlerClient<Database>({ cookies });

	const formData = await request.formData();
	const nameField = String(formData.get("name"));

	const redirectUrl = new URL(
		`/board/${boardId}/edit`,
		request.nextUrl.origin
	);

	const boardUpdateQuery = supabase
		.from("boards")
		.update({ name: String(nameField) })
		.eq("id", boardId);
	const columnsQuery = await supabase
		.from("columns")
		.select("id")
		.eq("board_id", boardId);

	const [boardUpdate, columns] = await Promise.all([
		boardUpdateQuery,
		columnsQuery,
	]);

	if (boardUpdate.error) {
		redirectUrl.searchParams.set(
			"error_message",
			boardUpdate.error.message
		);
		return NextResponse.redirect(redirectUrl, { status: 301 });
	} else if (columns.error) {
		redirectUrl.searchParams.set("error_message", columns.error.message);
		return NextResponse.redirect(redirectUrl, { status: 301 });
	}

	formData.delete("name");

	// Deleting columns with missing ID-s
	columns.data.map(async (column) => {
		if (!formData.has(column.id)) {
			const columnDelete = await supabase
				.from("columns")
				.delete()
				.eq("id", column.id);

			if (columnDelete.error) {
				redirectUrl.searchParams.set(
					"error_message",
					columnDelete.error.message
				);
				return NextResponse.redirect(redirectUrl, { status: 301 });
			}
		}
	});

	for (const [key, value] of formData.entries()) {
		const { error: upsertError } = await supabase
			.from("columns")
			.upsert(
				{ id: key, name: String(value), board_id: boardId },
				{ onConflict: "id" }
			);

		if (upsertError) {
			redirectUrl.searchParams.set("error_message", upsertError.message);
			return NextResponse.redirect(redirectUrl, { status: 301 });
		}
	}

	return NextResponse.redirect(
		new URL(`/board/${boardId}`, request.nextUrl.origin),
		{ status: 301 }
	);
}
