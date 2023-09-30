"use client";

import { useRouter } from "next/navigation";

export default function GoBack() {
	const router = useRouter();

	return (
		<p
			className="cursor-pointer w-fit font-semibold"
			onClick={() => router.back()}
		>
			{"<-"} Go back
		</p>
	);
}
