"use client";

import Link from "next/link";

type Params = {
	error: Error;
	reset: () => void;
};

export default function Error({ error, reset }: Params) {
	return (
		<main className="grid min-h-screen place-items-center px-6 py-24 sm:py-32 lg:px-8">
			<div className="text-center">
				<p className="text-base font-semibold text-rose-500">
					Oops! Something Went Wrong
				</p>
				<h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-200 sm:text-6xl">
					{error.message}
				</h1>
				<p className="mt-6 text-base leading-7 text-gray-400">
					Please try again later or contact support if the problem
					persists.
				</p>
				<div className="mt-10 flex items-center justify-center gap-x-6">
					<button
						onClick={reset}
						className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
					>
						Try again
					</button>
					<Link
						href="/"
						className="text-sm font-semibold text-gray-200"
					>
						Go back home <span aria-hidden="true">&rarr;</span>
					</Link>
				</div>
			</div>
		</main>
	);
}
