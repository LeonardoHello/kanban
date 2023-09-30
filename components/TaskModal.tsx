import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import Image from "next/image";
import Subtask from "@/components/Subtask";
import ModalCloseButton from "@/components/ModalCloseButton";
import cog from "@/public/icon-cog.svg";

export default async function TaskModal({ taskId }: { taskId: string }) {
	const supabase = createServerComponentClient<Database>({ cookies });

	const currentTaskQuery = supabase
		.from("tasks")
		.select()
		.eq("id", taskId)
		.single();
	const subtasksQuery = supabase
		.from("subtasks")
		.select("*", { count: "exact" })
		.eq("task_id", taskId)
		.order("created_at");

	const [currentTask, subtasks] = await Promise.all([
		currentTaskQuery,
		subtasksQuery,
	]);

	if (currentTask.error) {
		throw new Error(currentTask.error.message);
	} else if (subtasks.error) {
		throw new Error(subtasks.error.message);
	}

	const currentColumn = await supabase
		.from("columns")
		.select()
		.eq("id", currentTask.data.column_id)
		.single();

	if (currentColumn.error) {
		throw new Error(currentColumn.error.message);
	}

	const completedSubtaskCount = subtasks.data.filter(
		(subtask) => subtask.is_completed
	).length;

	return (
		<div className="flex flex-col gap-7 p-8 bg-slate-800 rounded-lg">
			<div className="flex items-center justify-between gap-4">
				<h1 className="text-lg font-bold">{currentTask.data.name}</h1>
				<div className="flex items-center gap-3 min-w-fit">
					<Link href={`/edit/task/${taskId}`} replace>
						<Image
							src={cog}
							alt="cog"
							width={20}
							className="min-w-[20px] transition-transform duration-300 hover:rotate-90"
						/>
					</Link>
					<ModalCloseButton />
				</div>
			</div>
			<div className="flex flex-col gap-2">
				<h2 className="text-sm font-semibold">Description</h2>
				<p className="text-sm text-slate-400">
					{currentTask.data.description ?? "No description"}
				</p>
			</div>

			<div className="flex flex-col gap-2">
				<h2 className="text-sm font-semibold">
					Subtasks ({completedSubtaskCount} of {subtasks.data.length})
				</h2>
				{subtasks.count ? (
					<ul className="flex flex-col gap-2">
						{subtasks.data.map((subtask) => (
							<Subtask key={subtask.id} subtask={subtask} />
						))}
					</ul>
				) : null}
			</div>
			<div className="flex flex-col gap-2">
				<h2 className="text-sm font-semibold">Current status</h2>
				<select
					name="column"
					id="column"
					disabled
					className="block w-full rounded-md border-0 py-1.5 bg-slate-800 shadow-sm ring-1 ring-inset ring-slate-700 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
				>
					<option
						key={currentColumn.data.id}
						value={currentColumn.data.id}
					>
						{currentColumn.data.name}
					</option>
				</select>
			</div>
		</div>
	);
}
