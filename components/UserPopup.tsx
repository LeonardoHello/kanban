import Link from "next/link";
import type { Session } from "@supabase/auth-helpers-nextjs";

export default async function UserPopup({
	session,
}: {
	session: Session | null;
}) {
	if (session) {
		return (
			<form action="/api/auth/logout" method="post">
				<button className="cursor-pointer text-lg font-medium  transition-colors duration-200 hover:text-red-500">
					Logout
				</button>
			</form>
		);
	}

	return (
		<>
			<p>
				<Link
					href={"/login"}
					className="text-lg font-medium hover:text-indigo-400"
				>
					Login
				</Link>
			</p>
			<p>
				<Link
					href={"/sign-up"}
					className="text-lg font-medium hover:text-indigo-400"
				>
					Sign up
				</Link>
			</p>
		</>
	);
}
