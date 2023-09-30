"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

export default function TaskDeleteButton({ taskId }: { taskId: string }) {
	const router = useRouter();

	const taskDelete = async () => {
		const supabase = createClientComponentClient();

		const taskDelete = await supabase
			.from("tasks")
			.delete()
			.eq("id", taskId);

		if (taskDelete.error) {
			const searchParams = new URLSearchParams({
				error_message: taskDelete.error.message,
			});
			const redirectUrl = `/task/${taskId}/edit?${searchParams}`;

			router.replace(redirectUrl);
		}

		router.refresh();
		router.back();
	};
	return (
		<button
			type="button"
			className="flex w-full justify-center rounded-md bg-red-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm transition-colors hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:bg-red-600"
			onClick={taskDelete}
		>
			Delete Task
		</button>
	);
}
