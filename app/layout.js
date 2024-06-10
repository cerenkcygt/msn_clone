import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import NotifBox from "./components/notifBox";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "MSN Clone",
	description: "",
};

export default function RootLayout({ children }) {
	return (
		<ClerkProvider>
			<html lang="en">
				<body className={inter.className}>
					<header className='relative flex gap-4 items-center justify-between w-full max-w-[1600px] mx-auto px-[164px] py-8 shadow-[0_-35px_40px_-15px_rgba(0,0,0,0.3)] bg-[#f4f4f2]'>
						<Link href="/" className='logo flex gap-2 items-center min-w-[100px] h-[30px]'>
							<svg fill="black" viewBox="0 0 124.66 168.19" width={24} xmlns="http://www.w3.org/2000/svg">
								<title>MSN Clone</title>
								<g id="Layer_2" data-name="Layer 2">
									<g id="Layer_1-2" data-name="Layer 1">
										<path d="M82,91.65c4.37-9.67,9-19.47,15.26-28.08a62.89,62.89,0,0,1,10.59-11.63c3.19-2.64,8.68-6.68,13-4.53s3.93,9,3.35,13a60,60,0,0,1-4.45,14.85c-5.44,12.75-14,24.19-22.79,34.8-1.61,1.94-3.24,3.87-4.93,5.76a91.06,91.06,0,0,1-1,9.88,60.69,60.69,0,0,1-12.4,29c-2.8,3.44-7.74,8.81-12.77,7.81-5.31-1.06-5.32-8.77-5-12.87a57.14,57.14,0,0,1,3.78-15.39C72,115.8,79.9,96.68,82,91.65"></path><path d="M71,105.76c-5.37,18.4-16.84,44.69-33.28,55.66-7.45,5-17.46,8.8-26.36,5.6C1.47,163.53-1.09,152.5.38,143.16,2,132.72,7.75,123.65,14.49,115.75a54.18,54.18,0,0,1,12.67-10.13c7.47,4.14,16.59,8.72,24.27,11.15A99.3,99.3,0,0,1,34,102.35c-5.72-6.66-14.92-19.81-17.78-30.09-2.93-10.55-5.37-21.58-5.08-32.58.27-10,2.75-20.5,8.77-28.68C26.14,2.62,36.09-2,46.41.86,56.2,3.59,63.73,11.6,68.72,20.13a68.58,68.58,0,0,1,8.86,29.44A154.72,154.72,0,0,1,71,105.76Z"></path>
									</g>
								</g>
							</svg>
							<span className='font-semibold text-black text-xl text-center'>Crn</span>
						</Link>
						<div className='searchbar-area flex w-full max-w-[700px] h-[40px] bg-orange-500'>
							<form action="/news" method="get" className='search-form flex items-center justify-between w-full h-full'>
								<input type="text" name="q" className='search-bar h-full w-11/12 border-2 indent-' />
								<button className='search-button flex items-center justify-center h-full w-1/12 bg-blue-500'>
									<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#d9d9d9" className="max-w-[24px]">
										<path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
									</svg>
								</button>
							</form>
						</div>
						<div className='header-icons-area flex items-center gap-2'>
							<SignedOut>
								<SignInButton className='login-button w-12 h-12 rounded-full'>
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" stroke="#707070"><g fill="none"><circle cx="32" cy="32" r="30.25" strokeWidth="1.5" /><g transform="matrix(.9 0 0 .9 10.431 10.431)" strokeWidth="2"><circle cx="24.25" cy="18" r="9" /><path d="M11.2 40a1 1 0 1126.1 0" /></g></g></svg>
								</SignInButton>
							</SignedOut>
							<SignedIn>
								<UserButton />
							</SignedIn>
							<NotifBox />
							<div className='settings-button flex items-center justify-center w-8 h-8 rounded-full'>
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#454545" className="size-6">
									<path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z" />
									<path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
								</svg>
							</div>
						</div>
					</header>
					<main>
						{children}
					</main>
				</body>
			</html>
		</ClerkProvider>
	);
}
