import { Suspense } from "react";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Column from "@/components/Column";
import Modal from "@/components/Modal";
import TaskModal from "@/components/TaskModal";
import cog from "@/public/icon-cog.svg";

export const dynamic = "force-dynamic";

type Params = {
	params: { boardId: string };
	searchParams: { task_id: string };
};

export default async function BoardPage({
	params: { boardId },
	searchParams: { task_id: taskId },
}: Params) {
	const supabase = createServerComponentClient<Database>({ cookies });

	const currentBoardQuery = supabase
		.from("boards")
		.select()
		.eq("id", boardId)
		.single();
	const columnsQuery = supabase
		.from("columns")
		.select()
		.eq("board_id", boardId)
		.order("created_at");

	const [currentBoard, columns] = await Promise.all([
		currentBoardQuery,
		columnsQuery,
	]);

	if (currentBoard.error) {
		if (
			currentBoard.error.code === "22P02" ||
			currentBoard.error.code === "PGRST116"
		) {
			notFound();
		}

		throw new Error(currentBoard.error.message);
	} else if (columns.error) {
		throw new Error(columns.error.message);
	}

	return (
		<>
			{taskId ? (
				<Modal boardId={boardId}>
					<TaskModal taskId={taskId} />
				</Modal>
			) : null}
			<div className="flex-grow flex flex-col overflow-x-auto">
				<header className="flex items-center justify-between gap-4 px-8 py-6 bg-slate-800 border-b border-b-slate-700">
					<h1 className="min-w-0 text-3xl font-bold break-words">
						{currentBoard.data.name}
					</h1>
					<Link href={`/edit/board/${boardId}`}>
						<Image
							src={cog}
							alt="edit board"
							className="min-w-[30px] transition-transform duration-300 hover:rotate-90"
						/>
					</Link>
				</header>
				<main className="flex flex-grow px-8 py-6 pb-10 gap-8 bg-slate-900 overflow-x-auto">
					{columns.data.map((column, index) => (
						<Column key={column.id} column={column} index={index} />
					))}
				</main>
			</div>
			<small className="absolute hidden md:inline bottom-3 right-3 animate-pulse pointer-events-none opacity-30">
				Hold{" "}
				<kbd className="px-1.5 py-0.5 text-gray-300 bg-gray-700 border border-gray-500 rounded">
					shift
				</kbd>{" "}
				for horizontal scrolling.
			</small>
		</>
	);
}
