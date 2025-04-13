import { Quicksand } from "next/font/google"
import { ThemeProvider } from "next-themes"
import Header from "@/components/header"
import Footer from "@/components/footer"
import "./globals.css"

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000"

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "art",
  description: "art",
}

const quicksand = Quicksand({
  display: "swap",
  weight: ['300', '400', '500', '600', '700'],
  subsets: ["latin"],
})

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={quicksand.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="min-h-screen flex flex-col items-center">
            <Header />
            <div className="w-screen min-h-screen pb-1 pt-10 md:pb-0 md:pt-24 px-6 lg:px-20 xl:px-28">
              {children}
            </div>
            <Footer />
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}
