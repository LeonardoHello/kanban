"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import classNames from "classnames";
import boardIcon from "@/public/icon-board.svg";
import whiteBoardIcon from "@/public/icon-board-white.svg";

export default function BoardLink({ board }: { board: Tables<"boards"> }) {
	const { boardId } = useParams();
	const currentBoard = boardId === board.id;

	const cN = classNames(
		"flex items-center gap-3 w-72 pl-8 pr-6 py-2.5 rounded-e-full",
		{
			"bg-indigo-500 text-slate-200": currentBoard,
			"transition-opacity hover:bg-indigo-500/40": !currentBoard,
		}
	);

	return (
		<li>
			<Link href={`/board/${board.id}`} className={cN}>
				<Image
					src={currentBoard ? whiteBoardIcon : boardIcon}
					width={16}
					alt="board icon"
					priority
				/>
				<span className="min-w-0 break-words">{board.name}</span>
			</Link>
		</li>
	);
}
