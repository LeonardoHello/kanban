"use client";

import { useState } from "react";
import Image from "next/image";
import cross from "@/public/icon-cross.svg";
import { v4 as uuidv4 } from "uuid";

export default function CreateSubtaskField() {
	const [subtaskIds, setSubtaskIds] = useState([uuidv4()]);

	const addField = () => {
		setSubtaskIds((prev) => [...prev, uuidv4()]);
	};

	const removeField = (id: string) => {
		setSubtaskIds((prev) => {
			const subtaskIds = structuredClone(prev);
			const index = subtaskIds.indexOf(id);
			delete subtaskIds[index];
			return subtaskIds.flat();
		});
	};

	return (
		<>
			<div className="mt-2 space-y-2">
				{subtaskIds.map((id) => (
					<div key={id} className="flex items-center gap-4">
						<input
							id="subtask"
							name="subtask"
							maxLength={30}
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
							onClick={() => removeField(id)}
						/>
					</div>
				))}
			</div>
			<button
				type="button"
				className="flex w-full justify-center rounded-md bg-slate-200 px-3 py-1.5 mt-3 text-sm font-semibold leading-6 text-indigo-500 shadow-sm transition-colors hover:bg-indigo-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
				onClick={addField}
			>
				+ Add New Subtask
			</button>
		</>
	);
}
