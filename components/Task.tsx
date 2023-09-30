import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";

export default async function Task({ task }: { task: Tables<"tasks"> }) {
	const supabase = createServerComponentClient<Database>({ cookies });

	const subtasks = await supabase
		.from("subtasks")
		.select("task_id, is_completed", { count: "exact" })
		.eq("task_id", task.id);

	if (subtasks.error) {
		throw new Error(subtasks.error.message);
	}

	const completedSubtaskCount = subtasks.data.filter(
		(subtask) => subtask.is_completed
	).length;

	return (
		<Link href={`?task_id=${task.id}`}>
			<div className="rounded-lg px-4 py-5 flex flex-col gap-2 transition-colors bg-slate-800 hover:bg-slate-800/60">
				<h3 className="text-sm font-semibold break-words line-clamp-2">
					{task.name}
				</h3>
				<p className="text-xs text-slate-400">
					{completedSubtaskCount} of {subtasks.count ?? 0} subtasks
				</p>
			</div>
		</Link>
	);
}
