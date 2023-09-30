"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState, useTransition } from "react";
import classNames from "classnames";
import { useRouter } from "next/navigation";

export default function Subtask({ subtask }: { subtask: Tables<"subtasks"> }) {
	const router = useRouter();
	const supabase = createClientComponentClient();
	const [isPending, startTransition] = useTransition();
	const [isFetching, setIsFetching] = useState(false);

	const isMutating = isPending || isFetching;

	const subtaskUpdate = async () => {
		setIsFetching(true);
		await supabase
			.from("subtasks")
			.update({ is_completed: !subtask.is_completed })
			.eq("id", subtask.id);
		setIsFetching(false);

		startTransition(() => {
			router.refresh();
		});
	};

	const className = classNames(
		"flex items-center gap-4 text-sm bg-slate-900/80 rounded-lg px-3.5 py-2.5 cursor-pointer transition-colors hover:bg-indigo-500/20",
		{
			"text-slate-400 line-through": subtask.is_completed,
			"opacity-50 pointer-events-none": isMutating,
		}
	);

	return (
		<li>
			<label htmlFor={subtask.id} className={className}>
				<input
					id={subtask.id}
					name={subtask.id}
					type="checkbox"
					onChange={subtaskUpdate}
					checked={subtask.is_completed}
					className="text-indigo-500 bg-slate-700 focus:ring-offset-slate-700 focus:ring-indigo-500 border-indigo-500 rounded cursor-pointer"
				/>
				{subtask.name}
			</label>
		</li>
	);
}
