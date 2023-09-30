"use client";

import { useState } from "react";
import Image from "next/image";
import cross from "@/public/icon-cross.svg";
import { v4 as uuidv4 } from "uuid";

export default function CreateColumnField() {
	const [columnsIds, setColumnIds] = useState([uuidv4()]);

	const addField = () => {
		setColumnIds((prev) => [...prev, uuidv4()]);
	};

	const removeField = (id: string) => {
		setColumnIds((prev) => {
			const columnsIds = structuredClone(prev);
			const index = columnsIds.indexOf(id);
			delete columnsIds[index];
			return columnsIds.flat();
		});
	};

	return (
		<>
			<div className="mt-2 space-y-2">
				{columnsIds.map((id) => (
					<div key={id} className="flex items-center gap-4">
						<input
							id="column"
							name="column"
							maxLength={30}
							pattern=".*\S.*"
							title="Field must contain a value."
							placeholder=""
							required
							className="block w-full rounded-md border-0 py-1.5 bg-slate-800 shadow-sm ring-1 ring-inset ring-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
						/>
						{columnsIds.length > 1 ? (
							<Image
								src={cross}
								alt="cross"
								className="cursor-pointer"
								onClick={() => removeField(id)}
							/>
						) : null}
					</div>
				))}
			</div>
			{columnsIds.length < 8 ? (
				<button
					type="button"
					className="flex w-full justify-center rounded-md bg-slate-200 px-3 py-1.5 mt-3 text-sm font-semibold leading-6 text-indigo-500 shadow-sm transition-colors hover:bg-indigo-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
					onClick={addField}
				>
					+ Add New Column
				</button>
			) : null}
		</>
	);
}
