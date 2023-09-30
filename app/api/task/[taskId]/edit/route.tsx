import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

type Params = { params: { taskId: string } };

export async function POST(
	request: NextRequest,
	{ params: { taskId } }: Params
) {
	const supabase = createRouteHandlerClient<Database>({ cookies });

	const formData = await request.formData();
	const nameField = String(formData.get("name"));
	const descriptionField = String(formData.get("description"));
	const columnField = String(formData.get("column"));

	const redirectUrl = new URL(
		`/board/${taskId}/edit`,
		request.nextUrl.origin
	);

	const { data: task, error: taskError } = await supabase
		.from("tasks")
		.update({
			name: nameField,
			description: descriptionField.trim() || null,
			column_id: columnField,
		})
		.eq("id", taskId)
		.select("column_id")
		.single();

	if (taskError) {
		redirectUrl.searchParams.set("error_message", taskError.message);
		return NextResponse.redirect(redirectUrl, { status: 301 });
	}

	const { data: subtaskIds, error: subtaskError } = await supabase
		.from("subtasks")
		.select("id")
		.eq("task_id", taskId);

	if (subtaskError) {
		redirectUrl.searchParams.set("error_message", subtaskError.message);
		return NextResponse.redirect(redirectUrl, { status: 301 });
	}

	formData.delete("name");
	formData.delete("description");
	formData.delete("column");

	// Deleting subtasks with missing ID-s
	subtaskIds.map(async (subtask) => {
		if (!formData.has(subtask.id)) {
			const { error: deleteError } = await supabase
				.from("subtasks")
				.delete()
				.eq("id", subtask.id);

			if (deleteError) {
				redirectUrl.searchParams.set(
					"error_message",
					deleteError.message
				);
				return NextResponse.redirect(redirectUrl, { status: 301 });
			}
		}
	});

	for (const [key, value] of formData.entries()) {
		const { error: upsertError } = await supabase
			.from("subtasks")
			.upsert(
				{ id: key, name: String(value), task_id: taskId },
				{ onConflict: "id" }
			);

		if (upsertError) {
			redirectUrl.searchParams.set("error_message", upsertError.message);
			return NextResponse.redirect(redirectUrl, { status: 301 });
		}
	}

	const { data: column, error: columnError } = await supabase
		.from("columns")
		.select("board_id")
		.eq("id", task.column_id)
		.single();

	if (columnError) {
		redirectUrl.searchParams.set("error_message", columnError.message);
		return NextResponse.redirect(redirectUrl, { status: 301 });
	}

	const url = new URL(`board/${column.board_id}`, request.nextUrl.origin);
	url.searchParams.set("task_id", taskId);

	return NextResponse.redirect(url, { status: 301 });
}
