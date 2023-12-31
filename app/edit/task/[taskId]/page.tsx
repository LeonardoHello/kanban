import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import GoBack from "@/components/GoBack";
import ColumnSelect from "@/components/ColumnSelect";
import TaskDeleteButton from "@/components/TaskDeleteButton";
import EditSubtaskField from "@/components/EditSubtaskField";
import logo from "@/public/logo-mobile.svg";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
	title: "Edit Task | Kanban",
	description: "Generated by create next app",
};

type Params = {
	params: { taskId: string };
	searchParams: { error_message?: string };
};

export default async function TaskEditPage({
	params: { taskId },
	searchParams: { error_message: errorMessage },
}: Params) {
	const supabase = createServerComponentClient<Database>({ cookies });

	const currentTaskQuery = supabase
		.from("tasks")
		.select()
		.eq("id", taskId)
		.single();
	const subtasksQuery = supabase
		.from("subtasks")
		.select("id, name")
		.eq("task_id", taskId)
		.order("created_at");

	const [currentTask, subtasks] = await Promise.all([
		currentTaskQuery,
		subtasksQuery,
	]);

	if (currentTask.error) {
		console.log(currentTask.error);

		throw new Error(currentTask.error.message);
	} else if (subtasks.error) {
		throw new Error(subtasks.error.message);
	}

	return (
		<div className="min-h-screen grid">
			<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
				<div className="relative sm:mx-auto sm:w-full sm:max-w-sm">
					<Image
						className="mx-auto h-8 w-auto"
						src={logo}
						alt="Your Company"
					/>
					<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">
						Edit Task
					</h2>
				</div>

				<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
					{errorMessage ? (
						<p className="text-red-500 text-center text-lg mb-4">
							{errorMessage}
						</p>
					) : null}
					<form
						action={`/api/task/${taskId}/edit`}
						method="post"
						autoComplete="off"
						className="space-y-6"
					>
						<GoBack />
						<div>
							<label
								htmlFor="name"
								className="block text-sm font-medium leading-6"
							>
								Name
							</label>
							<div className="mt-2">
								<input
									id="name"
									name="name"
									maxLength={30}
									defaultValue={currentTask.data.name}
									pattern=".*\S.*"
									title="Field must contain a value."
									placeholder=""
									required
									className="block w-full rounded-md border-0 py-1.5 bg-slate-800 shadow-sm ring-1 ring-inset ring-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>
						<div>
							<label
								htmlFor="description"
								className="block text-sm font-medium leading-6"
							>
								Description
							</label>
							<div className="mt-2">
								<textarea
									id="description"
									name="description"
									defaultValue={
										currentTask.data.description ??
										"No description"
									}
									className="block w-full rounded-md border-0 py-1.5 bg-slate-800 shadow-sm ring-1 ring-inset ring-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>
						<div>
							<label
								htmlFor="subtasks"
								className="block text-sm font-medium leading-6"
							>
								Subtasks
							</label>
							<EditSubtaskField subtaskData={subtasks.data} />
						</div>
						<div>
							<label
								htmlFor="column"
								className="block text-sm font-medium leading-6"
							>
								Column
							</label>
							<div className="mt-2">
								<ColumnSelect
									columnId={currentTask.data.column_id}
								/>
							</div>
						</div>
						<div>
							<button
								type="submit"
								className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 mb-3 text-sm font-semibold leading-6 text-white shadow-sm transition-colors hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
							>
								Save Changes
							</button>
							<TaskDeleteButton taskId={taskId} />
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
