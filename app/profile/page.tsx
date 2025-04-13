'use client'

import Navigation from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Bell, CircleUserRound, Settings, ChevronRight, CircleHelp, MessageCircleWarning } from 'lucide-react'
import Link from "next/link"

export default function Home() {
  return (
    <>
      <div className="py-4 flex justify-between items-center w-full">
        <h2 className='text-2xl font-bold'>Profile</h2>
        <Link href={'/profile'}>
          <Bell className="text-muted-foreground" />
        </Link>
      </div>

      <div className='md:hidden grid grid-cols-[60px_1fr] gap-5 py-6 border-b items-center'>
        <div className='bg-cover bg-center w-[100%] rounded-full aspect-[1]' style={{
          backgroundImage: `url('https://picsum.photos/id/64/100/100')`
        }}>
        </div>
        <div>
          <h3 className="font-bold">Suzi</h3>
          <p>suzi@email.com</p>
        </div>
      </div>

      <div className="py-2 text-muted-foreground">
        <ul className="md:grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link href={'/profile'}>
            <li className="grid grid-cols-[24px_1fr_24px] gap-2 py-3 md:shadow-lg md:rounded-xl md:p-4 md:grid-cols-none md:grid-rows">
              <CircleUserRound size={24} />
              <span className="font-bold md:pt-6">Personal Info</span>
              <ChevronRight className="float-right md:hidden" size={24} />
              <p className="hidden md:block text-sm">Provide personal details and how we can reach you</p>
            </li>
          </Link>
          <Link href={'/profile'}>
            <li className="grid grid-cols-[24px_1fr_24px] gap-2 py-3 md:shadow-lg md:rounded-xl md:p-4 md:grid-cols-none md:grid-rows border-b pb-7 md:border-none">
              <Settings size={24} />
              <span className="font-bold md:pt-6">Account</span>
              <ChevronRight className="float-right md:hidden" size={24} />
              <p className="hidden md:block text-sm">Provide personal details and how we can reach you</p>
            </li>
          </Link>
        </ul>
      </div>

      <h2 className='pt-8 text-2xl font-bold'>Support</h2>
      <div className="py-2 text-muted-foreground">
        <ul className="md:grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link href={'/profile'}>
            <li className="grid grid-cols-[24px_1fr_24px] gap-2 py-3 md:shadow-lg md:rounded-xl md:p-4 md:grid-cols-none md:grid-rows">
              <CircleHelp size={24} />
              <span className="font-bold md:pt-6">Visit the Help Centre</span>
              <ChevronRight className="float-right md:hidden" size={24} />
              <p className="hidden md:block text-sm">Provide personal details and how we can reach you</p>
            </li>
          </Link>
          <Link href={'/profile'}>
            <li className="grid grid-cols-[24px_1fr_24px] gap-2 py-3 md:shadow-lg md:rounded-xl md:p-4 md:grid-cols-none md:grid-rows border-b pb-7 md:border-none">
              <MessageCircleWarning size={24} />
              <span className="font-bold md:pt-6">Report</span>
              <ChevronRight className="float-right md:hidden" size={24} />
              <p className="hidden md:block text-sm">Provide personal details and how we can reach you</p>
            </li>
          </Link>
        </ul>
      </div>

      <div className="py-6 md:hidden">
        <Button className="w-full" variant={'outline'}>
          <span>Log out</span>
        </Button>
      </div>

      <Navigation />
    </>
  )
}