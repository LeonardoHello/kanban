"use client";

import { useState } from "react";
import Image from "next/image";
import cross from "@/public/icon-cross.svg";
import { v4 as uuidv4 } from "uuid";

export default function EditColumnField({
	columnData,
}: {
	columnData: Pick<Tables<"columns">, "id" | "name">[];
}) {
	const [columns, setColumns] = useState(columnData);

	const addColumn = () => {
		setColumns((prev) => [...prev, { id: uuidv4(), name: "" }]);
	};

	const removeColumn = (id: string) => {
		setColumns((prev) => {
			const columns = structuredClone(prev);
			const index = columns.findIndex((column) => column.id === id);
			delete columns[index];
			return columns.flat();
		});
	};

	return (
		<>
			<div className="mt-2 space-y-2">
				{columns.map((column) => (
					<div key={column.id} className="flex items-center gap-4">
						<input
							id={column.id}
							name={column.id}
							defaultValue={column.name}
							maxLength={30}
							pattern=".*\S.*"
							title="Field must contain a value."
							placeholder=""
							required
							className="block w-full rounded-md border-0 py-1.5 bg-slate-800 shadow-sm ring-1 ring-inset ring-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
						/>
						{columns.length > 1 ? (
							<Image
								src={cross}
								alt="cross"
								className="cursor-pointer"
								onClick={() => removeColumn(column.id)}
							/>
						) : null}
					</div>
				))}
			</div>
			{columns.length < 8 ? (
				<button
					type="button"
					className="flex w-full justify-center rounded-md bg-slate-200 px-3 py-1.5 mt-3 text-sm font-semibold leading-6 text-indigo-500 shadow-sm transition-colors hover:bg-indigo-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
					onClick={addColumn}
				>
					+ Add New Column
				</button>
			) : null}
		</>
	);
}
