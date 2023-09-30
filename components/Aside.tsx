import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Image from "next/image";
import User from "@/components/User";
import UserPopup from "@/components/UserPopup";
import BoardPrivateNavigation from "@/components/BoardPrivateNavigation";
import BoardPublicNavigation from "@/components/BoardPublicNavigation";
import logo from "@/public/logo-light.svg";

export default async function Aside() {
	const supabase = createServerComponentClient<Database>({ cookies });

	const {
		data: { session },
	} = await supabase.auth.getSession();

	const privateBoardQuery = supabase
		.from("boards")
		.select("*", { count: "exact" })
		.not("user_id", "is", null)
		.order("created_at");
	const publicBoardQuery = supabase
		.from("boards")
		.select("*", { count: "exact" })
		.is("user_id", null)
		.order("created_at");

	const [privateBoard, publicBoard] = await Promise.all([
		privateBoardQuery,
		publicBoardQuery,
	]);

	if (privateBoard.error) {
		throw new Error(privateBoard.error.message);
	} else if (publicBoard.error) {
		throw new Error(publicBoard.error.message);
	}

	return (
		<aside className="min-w-[20rem] max-w-[20rem] h-screen p-8 flex flex-col gap-16 bg-slate-800 overflow-y-auto">
			<Image src={logo} alt="logo icon" width={175} priority />
			<div className="flex flex-col gap-10">
				<BoardPrivateNavigation
					boards={privateBoard.data}
					count={privateBoard.count}
					session={session}
				/>
				<BoardPublicNavigation
					boards={publicBoard.data}
					count={publicBoard.count}
				/>
			</div>

			<User session={session}>
				<UserPopup session={session} />
			</User>
		</aside>
	);
}
