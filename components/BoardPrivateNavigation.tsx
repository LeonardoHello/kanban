import Link from "next/link";
import Image from "next/image";
import BoardListItem from "@/components/BoardListItem";
import purpleBoard from "@/public/icon-board-purple.svg";
import user from "@/public/icon-user.svg";
import type { Session } from "@supabase/supabase-js";

type Prop = {
	boards: Tables<"boards">[];
	count: number | null;
	session: Session | null;
};

export default function BoardNavigation({ boards, count, session }: Prop) {
	const href = "/create/board?" + new URLSearchParams({ is_private: "1" });

	return (
		<nav className="flex flex-col gap-3 text-slate-400">
			<h2 className="text-xs font-semibold tracking-extreme">
				PRIVATE BOARDS ({count ?? 0})
			</h2>
			<ul className="flex flex-col items-end">
				{boards.map((board) => (
					<BoardListItem key={board.id} board={board} />
				))}

				<li>
					{session ? (
						<Link
							href={href}
							className={
								"w-72 flex items-center gap-3 pl-8 pr-6 py-3 rounded-e-full opacity-80 text-indigo-400 transition-opacity hover:opacity-60"
							}
						>
							<Image
								src={purpleBoard}
								width={16}
								alt="board icon"
							/>
							+ New Private Board
						</Link>
					) : (
						<Link
							href="/login"
							className={
								"w-72 flex items-center gap-3 pl-8 pr-6 py-3 rounded-e-full opacity-80 text-indigo-400 transition-opacity hover:opacity-60"
							}
						>
							<Image src={user} width={24} alt="user icon" />
							Authentication Required
						</Link>
					)}
				</li>
			</ul>
		</nav>
	);
}
