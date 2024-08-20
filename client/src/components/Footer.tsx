import Link from "next/link";

export function Footer() {
	return (
		<>
			<footer className="footer bg-base-200 text-base-content border-base-300 border-t px-10 py-4 mt-10">
				<aside className="grid-flow-col items-center">
					<p>
						Highest-Wealth &copy;.
						<br />
						Providing most luxurious jewelry since 1945.
					</p>
				</aside>
				<nav className="md:place-self-center md:justify-self-end">
					<div className="grid grid-flow-col gap-4">
						<Link
							href="https://www.youtube.com/watch?v=xvFZjo5PgG0"
							className="tooltip tooltip-primary tooltip-top"
							data-tip="Don't click!"
							target="blank"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								className="fill-current"
							>
								<path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
							</svg>
						</Link>
					</div>
				</nav>
			</footer>
		</>
	);
}
