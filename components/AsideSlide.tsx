"use client";

import classNames from "classnames";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function AsideSlide({
	children,
}: {
	children: React.ReactNode;
}) {
	const [isVisible, setIsVisible] = useState(false);
	const { boardId } = useParams();

	useEffect(() => {
		setIsVisible(false);
	}, [boardId]);

	const slideClass = classNames(
		"absolute border-r border-slate-700 transition-transform md:-translate-x-0 md:static",
		{ "-translate-x-full": !isVisible }
	);

	const buttonClass = classNames(
		"absolute bottom-10 px-6 py-3 rounded-lg animate-pulse md:hidden",
		{
			"bg-slate-900 right-8": isVisible,
			"bg-slate-800 -right-24": !isVisible,
		}
	);

	return (
		<div className={slideClass}>
			{children}
			<button
				onClick={() => setIsVisible((prev) => !prev)}
				className={buttonClass}
			>
				{isVisible ? "<--" : "-->"}
			</button>
		</div>
	);
}
