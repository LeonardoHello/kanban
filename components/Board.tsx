import Column from "./Column";
import Image from "next/image";
import box from "@/public/icon-select-board.svg";

export default function Board({ columns }: { columns: Tables<"columns">[] }) {
	if (columns.length === 0)
		return (
			<main className="flex-grow flex flex-col items-center justify-center p-16 gap-16 bg-slate-900">
				<h1 className="text-5xl text-center font-thin tracking-extreme text-slate-700 text uppercase">
					Selected board is empty
				</h1>
				<Image src={box} width={450} height={450} alt="empty board" />
			</main>
		);

	return (
		<main className="flex-grow flex px-8 py-6 pb-10 gap-8 bg-slate-900 overflow-x-auto">
			{columns.map((column, index) => (
				<Column key={column.id} column={column} index={index} />
			))}
		</main>
	);
}
