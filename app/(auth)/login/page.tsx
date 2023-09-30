import Link from "next/link";
import Image from "next/image";
import GoBack from "@/components/GoBack";
import logo from "@/public/logo-mobile.svg";
import type { Metadata } from "next";

export const runtime = "edge";

export const metadata: Metadata = {
	title: "Login | Kanban",
	description: "Generated by create next app",
};

type Params = {
	searchParams: { error_message: string };
};

export default function LoginPage({
	searchParams: { error_message: errorMessage },
}: Params) {
	return (
		<div className="min-h-screen grid">
			<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
				<div className="sm:mx-auto sm:w-full sm:max-w-sm">
					<Image
						className="mx-auto h-8 w-auto"
						src={logo}
						alt="Your Company"
					/>
					<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">
						Sign in to your account
					</h2>
				</div>

				<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
					{errorMessage ? (
						<p className="text-red-500 text-center text-lg font-semibold mb-8">
							{errorMessage}
						</p>
					) : null}
					<form
						className="space-y-6"
						action="/api/auth/login"
						method="POST"
					>
						<GoBack />
						<div>
							<label
								htmlFor="email"
								className="block text-sm font-medium leading-6"
							>
								Email address
							</label>
							<div className="mt-2">
								<input
									id="email"
									name="email"
									type="email"
									autoComplete="email"
									placeholder=""
									required
									className="block w-full rounded-md border-0 py-1.5 bg-slate-800 shadow-sm ring-1 ring-inset ring-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>
						<div>
							<div className="flex items-center justify-between">
								<label
									htmlFor="password"
									className="block text-sm font-medium leading-6"
								>
									Password
								</label>
								{/* <div className="text-sm">
									<a
										href="#"
										className="font-semibold text-indigo-500 hover:text-indigo-500"
									>
										Forgot password?
									</a>
								</div> */}
							</div>
							<div className="mt-2">
								<input
									id="password"
									name="password"
									type="password"
									autoComplete="current-password"
									placeholder=""
									required
									className="block w-full rounded-md border-0 py-1.5 bg-slate-800 shadow-sm ring-1 ring-inset ring-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>
						<div>
							<button
								type="submit"
								className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
							>
								Sign in
							</button>
						</div>
					</form>

					<p className="mt-10 text-center text-sm text-slate-500">
						Not a member?{" "}
						<Link
							href="/sign-up"
							className="font-semibold leading-6 text-indigo-500 hover:text-indigo-500"
						>
							Create an account
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}
