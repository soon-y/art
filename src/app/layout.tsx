import type { Metadata } from "next"
import Image from "next/image"
import { Quicksand } from "next/font/google"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faReact, faGithub } from "@fortawesome/free-brands-svg-icons"
import { faFontAwesome } from '@fortawesome/free-regular-svg-icons'
import "./globals.css"

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "art",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${quicksand.className} antialiased`}
      >
        {children}
        <footer className={`web p-4 xl:px-16 lg:px-8 grid grid-cols-[1fr_60px_24px_24px_24px] gap-4 items-center ${quicksand.className}`}>
        <a href="https://soonyoung-portfolio.vercel.app/" target="_blank"><p>© 2025 Soonyoung</p></a>
          <a href="https://nextjs.org/" target="_blank"><Image src="/next.svg" alt="art logo" width={60} height={20} priority /></a>
          <a href="https://react.dev/" target="_blank"><FontAwesomeIcon className='nav-icon' style={{ color: 'deepSkyBlue' }} icon={faReact} /></a>
          <a href="https://fontawesome.com/" target="_blank"><FontAwesomeIcon className='nav-icon' icon={faFontAwesome} /></a>
          <a href="https://github.com/soon-y/art" target="_blank"><FontAwesomeIcon className='nav-icon' icon={faGithub} /></a>
        </footer>
      </body>
    </html>
  );
}
