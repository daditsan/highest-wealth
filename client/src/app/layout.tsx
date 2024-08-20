import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";

// const inter = Inter({ subsets: ["latin"] });
const montserrat = Montserrat({
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Highest-Wealth",
	description: "Providing the most luxurious jewelry since 1945.",
	openGraph: {
		title: `Highest-Wealth`,
		description: `Providing the most luxurious jewelry since 1945.`,
		images: [
			{
				url: `https://logowik.com/content/uploads/images/harry-winston6345.logowik.com.webp`,
				width: 800,
				height: 600
			}
		]
	}
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		// <html lang="en">
			// <html lang="en" data-theme="dark">
			<html lang="en" data-theme="light">
				{/* <head>
				<link rel="icon" href="https://logowik.com/content/uploads/images/harry-winston6345.logowik.com.webp" />
				</head> */}
			<body className={montserrat.className}>{children}</body>
		</html>
	);
}