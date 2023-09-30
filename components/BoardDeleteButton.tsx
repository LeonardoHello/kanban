"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

export default function BoardDeleteButton({ boardId }: { boardId: string }) {
	const router = useRouter();

	const boardDelete = async () => {
		const supabase = createClientComponentClient();

		const boardDelete = await supabase
			.from("boards")
			.delete()
			.eq("id", boardId);

		if (boardDelete.error) {
			const searchParams = new URLSearchParams({
				error_message: boardDelete.error.message,
			});
			const redirectUrl = `/board/${boardId}/edit?${searchParams}`;

			router.replace(redirectUrl);
		}

		router.refresh();
		router.push("/");
	};
	return (
		<button
			type="button"
			className="flex w-full justify-center rounded-md bg-red-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm transition-colors hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:bg-red-600"
			onClick={boardDelete}
		>
			Delete Board
		</button>
	);
}
