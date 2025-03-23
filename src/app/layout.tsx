import type { Metadata } from "next"
import Image from "next/image"
import { Quicksand } from "next/font/google"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faReact, faGithub } from "@fortawesome/free-brands-svg-icons"
import { faFontAwesome, faBookmark, faCalendar, faUser } from '@fortawesome/free-regular-svg-icons'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
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
        <div className='mobile nav-bar pt-3 pb-8'>
                <div className='flex flex-row items-center justify-center'>
                  <div className='flex-1 flex flex-col items-center justify-center '>
                    <FontAwesomeIcon className='nav-icon' icon={faMagnifyingGlass} />
                    <p>Explore</p>
                  </div>
                  <div className='flex-1 flex flex-col items-center justify-center '>
                    <FontAwesomeIcon className='nav-icon' icon={faBookmark} />
                    <p>Saved</p>
                  </div>
                  <div className='flex-1 flex flex-col items-center justify-center '>
                    <FontAwesomeIcon className='nav-icon' icon={faCalendar} />
                    <p>e</p>
                  </div>
                  <div className='flex-1 flex flex-col items-center justify-center '>
                    <Image src='/ar.svg' width={30} height={24} alt='ar' />
                    <p>Docent</p>
                  </div>
                  <div className='flex-1 flex flex-col items-center justify-center '>
                    <FontAwesomeIcon className='nav-icon' icon={faUser} />
                    <p>Profile</p>
                  </div>
                </div>
              </div>
      </body>
    </html>
  );
}
