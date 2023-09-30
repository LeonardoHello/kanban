import Link from "next/link";
import Image from "next/image";
import BoardListItem from "@/components/BoardListItem";
import purpleBoard from "@/public/icon-board-purple.svg";

type Prop = {
	boards: Tables<"boards">[];
	count: number | null;
};

export default function BoardNavigation({ boards, count }: Prop) {
	const href = "/create/board?" + new URLSearchParams({ is_private: "0" });

	return (
		<nav className="flex flex-col gap-3 text-slate-400">
			<h2 className="text-xs font-semibold tracking-extreme">
				PUBLIC BOARDS ({count ?? 0})
			</h2>
			<ul className="flex flex-col items-end gap-1">
				{boards.map((board) => (
					<BoardListItem key={board.id} board={board} />
				))}
				<li>
					<Link
						href={href}
						className={
							"w-72 flex items-center gap-3 pl-8 pr-6 py-3 rounded-e-full opacity-80 text-indigo-400 transition-opacity hover:opacity-60"
						}
					>
						<Image src={purpleBoard} width={16} alt="board icon" />+
						New Public Board
					</Link>
				</li>
			</ul>
		</nav>
	);
}
