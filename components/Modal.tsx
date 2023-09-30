"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

type Params = { children: React.ReactNode; boardId: string };

export default function Modal({ children, boardId }: Params) {
	const router = useRouter();

	useEffect(() => {
		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") router.replace(`/board/${boardId}`);
		};

		document.addEventListener("keydown", onKeyDown);
		return () => document.removeEventListener("keydown", onKeyDown);
	}, [boardId, router]);

	return (
		<div
			className="z-10 absolute min-h-screen w-screen grid place-content-center bg-slate-950/60 animate-fade-in"
			onClick={() => router.replace(`/board/${boardId}`)}
		>
			<div
				className="w-[min(100vw_-_4rem,_28rem)] max-h-[calc(100vh_-_4rem)] overflow-y-auto rounded-lg animate-drop"
				onClick={(e) => e.stopPropagation()}
			>
				{children}
			</div>
		</div>
	);
}
