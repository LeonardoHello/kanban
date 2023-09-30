"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import cancel from "@/public/icon-cross.svg";

export default function ModalCloseButton() {
	const router = useRouter();

	return (
		<Image
			src={cancel}
			alt="cancel button"
			className="cursor-pointer"
			onClick={() => router.back()}
		/>
	);
}
