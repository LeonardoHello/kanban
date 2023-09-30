"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import authenticatedUserIcon from "@/public/icon-user-authenticated.svg";
import unauthenticatedUserIcon from "@/public/icon-user-unauthenticated.svg";
import type { Session } from "@supabase/supabase-js";

export default function User({
	children,
	session,
}: {
	children: React.ReactNode;
	session: Session | null;
}) {
	const [popup, setPopup] = useState(false);

	useEffect(() => {
		return () => setPopup(false);
	}, []);

	const userIcon = session ? authenticatedUserIcon : unauthenticatedUserIcon;

	const userText = session ? "Authenticated" : "Unauthenticated";

	return (
		<abbr
			title={userText}
			className="relative self-start mt-auto cursor-pointer"
			onClick={() => setPopup((prev) => !prev)}
		>
			<Image src={userIcon} width={60} alt="user icon" />
			{popup ? (
				<div
					className="absolute w-max px-4 py-3 pr-12 ml-6 min-h-full flex flex-col gap-2 justify-center bottom-0 left-full bg-slate-900 rounded-md border border-slate-700"
					onClick={(e) => e.stopPropagation()}
				>
					{children}
				</div>
			) : null}
		</abbr>
	);
}
