"use client";

import { useState } from "react";
import Image from "next/image";
import cross from "@/public/icon-cross.svg";
import { v4 as uuidv4 } from "uuid";

export default function EditSubtaskField({
	subtaskData,
}: {
	subtaskData: Pick<Tables<"subtasks">, "id" | "name">[];
}) {
	const [subtasks, setSubtasks] = useState(subtaskData);

	const addSubtask = () => {
		setSubtasks((prev) => [...prev, { id: uuidv4(), name: "" }]);
	};

	const removeSubtask = (id: string) => {
		setSubtasks((prev) => {
			const subtasks = structuredClone(prev);
			const index = subtasks.findIndex((subtask) => subtask.id === id);
			delete subtasks[index];
			return subtasks.flat();
		});
	};

	return (
		<>
			<div className="mt-2 space-y-2">
				{subtasks.map((subtask) => (
					<div key={subtask.id} className="flex items-center gap-4">
						<input
							id={subtask.id}
							name={subtask.id}
							defaultValue={subtask.name}
							pattern=".*\S.*"
							title="Field must contain a value."
							placeholder=""
							required
							className="block w-full rounded-md border-0 py-1.5 bg-slate-800 shadow-sm ring-1 ring-inset ring-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
						/>
						<Image
							src={cross}
							alt="cross"
							className="cursor-pointer"
							onClick={() => removeSubtask(subtask.id)}
						/>
					</div>
				))}
			</div>
			<button
				type="button"
				className="flex w-full justify-center rounded-md bg-slate-200 px-3 py-1.5 mt-3 text-sm font-semibold leading-6 text-indigo-500 shadow-sm transition-colors hover:bg-indigo-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
				onClick={addSubtask}
			>
				+ Add New Subtask
			</button>
		</>
	);
}
