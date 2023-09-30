import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
	const supabase = createRouteHandlerClient<Database>({ cookies });

	const columnId = request.nextUrl.searchParams.get("column_id") as string;
	const formData = await request.formData();
	const nameField = String(formData.get("name"));
	const descriptionField = String(formData.get("description"));
	const columnField = String(formData.get("column"));
	const subtaskFields = formData.getAll("subtask");

	const redirectUrl = new URL("/task/create", request.nextUrl.origin);
	redirectUrl.searchParams.set("column_id", columnId);

	const { data: task, error: taskError } = await supabase
		.from("tasks")
		.insert({
			name: nameField,
			description: descriptionField.trim() || null,
			column_id: columnField,
		})
		.select()
		.single();

	if (taskError) {
		redirectUrl.searchParams.set("error_message", taskError.message);
		return NextResponse.redirect(redirectUrl, { status: 301 });
	}
	const toInsert = subtaskFields.map((subtask, index) => {
		const createdAt = new Date();
		createdAt.setMilliseconds(createdAt.getMilliseconds() + index);

		return {
			name: String(subtask),
			task_id: task.id,
			created_at: createdAt.toISOString(),
		};
	});

	const { error: subtaskError } = await supabase
		.from("subtasks")
		.insert(toInsert);

	if (subtaskError) {
		redirectUrl.searchParams.set("error_message", subtaskError.message);
		return NextResponse.redirect(redirectUrl, { status: 301 });
	}

	const { data: column, error: columnError } = await supabase
		.from("columns")
		.select("board_id")
		.eq("id", columnId)
		.single();

	if (columnError) {
		redirectUrl.searchParams.set("error_message", columnError.message);
		return NextResponse.redirect(redirectUrl, { status: 301 });
	}

	const url = new URL(`board/${column.board_id}`, request.nextUrl.origin);
	url.searchParams.set("task_id", task.id);

	return NextResponse.redirect(url, { status: 301 });
}
