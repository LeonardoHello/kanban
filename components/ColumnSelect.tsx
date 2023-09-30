import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export default async function ColumnSelect({ columnId }: { columnId: string }) {
	const supabase = createServerComponentClient<Database>({ cookies });

	const column = await supabase
		.from("columns")
		.select("id, board_id")
		.eq("id", columnId)
		.single();

	if (column.error) {
		throw new Error(column.error.message);
	}

	const columns = await supabase
		.from("columns")
		.select()
		.eq("board_id", column.data.board_id)
		.order("created_at");

	if (columns.error) {
		throw new Error(columns.error.message);
	}

	return (
		<select
			name="column"
			id="column"
			defaultValue={column.data.id}
			className="block w-full rounded-md border-0 py-1.5 bg-slate-800 shadow-sm ring-1 ring-inset ring-slate-700 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
		>
			{columns.data.map((column) => (
				<option key={column.id} value={column.id}>
					{column.name}
				</option>
			))}
		</select>
	);
}
