import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import Image from "next/image";
import Task from "./Task";
import plus from "@/public/icon-add-task-mobile.svg";
import classNames from "classnames";

export default async function Column({
	column,
	index,
}: {
	column: Tables<"columns">;
	index: number;
}) {
	const supabase = createServerComponentClient<Database>({ cookies });

	const {
		data: task,
		count,
		error,
	} = await supabase
		.from("tasks")
		.select("*", { count: "exact" })
		.eq("column_id", column.id)
		.order("created_at");

	if (error) {
		throw new Error(error.message);
	}

	const columnColorCN = classNames(
		"min-w-[0.75rem] min-h-[0.75rem] rounded-full",
		{
			"bg-indigo-200/80": index === 0,
			"bg-indigo-300/80": index === 1,
			"bg-indigo-400/80": index === 2,
			"bg-indigo-500/80": index === 3,
			"bg-indigo-600/80": index === 4,
			"bg-indigo-700/80": index === 5,
			"bg-indigo-800/80": index === 6,
			"bg-indigo-900/80": index === 7,
		}
	);

	const plusIconCN = classNames(
		"block p-1 transition-colors duration-200 bg-opacity-60 rounded-full font-semibold",
		{
			"hover:bg-indigo-200/50": index === 0,
			"hover:bg-indigo-300/50": index === 1,
			"hover:bg-indigo-400/50": index === 2,
			"hover:bg-indigo-500/50": index === 3,
			"hover:bg-indigo-600/50": index === 4,
			"hover:bg-indigo-700/50": index === 5,
			"hover:bg-indigo-800/50": index === 6,
			"hover:bg-indigo-900/50": index === 7,
		}
	);

	const columnBodyCN = classNames(
		"flex-grow flex flex-col gap-4 h-0 overflow-y-auto",
		{
			"border-2 border-dashed border-slate-700 rounded-lg": count === 0,
		}
	);

	return (
		<div className="min-w-[18rem] max-w-[18rem] flex flex-col gap-4">
			<div className="flex items-center gap-2">
				<div className={columnColorCN} />
				<h2 className="min-w-0 flex-grow text-xs tracking-widest font-semibold text-slate-400 uppercase break-words">
					{column.name}
				</h2>
				<Link
					href={`/create/task?column_id=${column.id}`}
					className={plusIconCN}
				>
					<Image
						src={plus}
						width={12}
						alt="plus"
						className="min-w-[12px]"
					/>
				</Link>
			</div>

			<div className={columnBodyCN}>
				{task.map((task) => (
					<Task key={task.id} task={task} />
				))}
			</div>
		</div>
	);
}
