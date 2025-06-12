'use client'

import Navigation from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { BellDot, CircleUserRound, Settings, ChevronRight, CircleHelp, MessageCircleWarning } from 'lucide-react'
import Link from "next/link"
import { ReactNode } from "react"

export default function Home() {
  return (
    <>
      <div className="py-4 flex justify-between items-center w-full">
        <h2 className="text-2xl font-bold">Profile</h2>
        <Link href="/profile/notifications">
          <BellDot className="text-primary" />
        </Link>
      </div>

      <div className="md:hidden grid grid-cols-[60px_1fr] gap-5 pb-6 border-b items-center">
        <div
          className="bg-cover bg-center w-full rounded-full aspect-[1]"
          style={{
            backgroundImage: `url('https://picsum.photos/id/64/100/100')`,
          }}
        />
        <div>
          <h3 className="font-bold">Suzi</h3>
          <p className="text-sm text-muted-foreground">suzi@email.com</p>
        </div>
      </div>

      <div className="py-2 text-muted-foreground">
        <ul className="md:grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <List
            link=""
            title="Personal Information"
            desc="Update your name, email, and contact details"
            icon={<CircleUserRound size={24} />}
          />
          <List
            link=""
            title="Account Settings"
            desc="Manage your password, security, and login options"
            icon={<Settings size={24} />}
          />
        </ul>
      </div>

      <h2 className="pt-8 text-2xl font-bold">Support</h2>
      <div className="py-2 text-muted-foreground">
        <ul className="md:grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <List
            link=""
            title="Help Center"
            desc="Browse FAQs or get in touch with support"
            icon={<CircleHelp size={24} />}
          />
          <List
            link=""
            title="Report a Problem"
            desc="Let us know if something isn’t working right"
            icon={<MessageCircleWarning size={24} />}
          />
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

const List = ({ link, title, desc, icon }: {
  link: string,
  title: string,
  desc: string,
  icon: ReactNode

}) => {

  return (
    <Link href={link}>
      <li className="grid grid-cols-[24px_1fr_24px] gap-2 py-3 md:shadow-lg md:rounded-xl md:p-4 md:grid-cols-none md:grid-rows md:border border-gray-100">
        {icon}
        <span className="font-bold md:pt-6">{title}</span>
        <ChevronRight className="float-right md:hidden" size={24} />
        <p className="hidden md:block text-sm">{desc}</p>
      </li>
    </Link>
  )
}