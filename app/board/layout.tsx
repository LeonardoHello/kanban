import Aside from "@/components/Aside";
import AsideSlide from "@/components/AsideSlide";

export default function BoardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="flex min-h-screen">
			<AsideSlide>
				<Aside />
			</AsideSlide>
			{children}
		</div>
	);
}
