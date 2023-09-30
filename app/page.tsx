import Image from "next/image";
import emptyBoard from "@/public/icon-empty-board.svg";
import AsideSlide from "@/components/AsideSlide";
import Aside from "@/components/Aside";

export const dynamic = "force-dynamic";

export default async function Homepage() {
	return (
		<div className="flex min-h-screen gap-[1px] bg-slate-700 ">
			<AsideSlide>
				<Aside />
			</AsideSlide>

			<main className="flex-grow flex flex-col items-center justify-center p-16 gap-24 bg-slate-900">
				<h1 className="text-5xl text-center font-thin tracking-extreme text-slate-700 text uppercase">
					Please select a board
				</h1>
				<Image
					src={emptyBoard}
					width={450}
					height={450}
					alt="unselected board"
				/>
			</main>
		</div>
	);
}
