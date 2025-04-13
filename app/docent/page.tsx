'use client'

import Navigation from "@/components/navigation"
import { Switch } from "@/components/ui/switch"
import { useState } from 'react'
import Link from 'next/link'
import { BluetoothSearching, Camera } from 'lucide-react'
import { Button } from "@/components/ui/button"

export default function Home() {
  const [isChecked, setIsChecked] = useState(true)
  return (
    <>
      <div className="md:hidden w-full h-[80vh] text-muted-background flex flex-col items-center text-center">
        <p className="mt-[30vh]">Turn on Bluetooth to discover nearby artwork.</p>
        <div className="flex gap-2 p-4 items-center">
          <BluetoothSearching size={20} className="opacity-80" />
          <Switch
            checked={isChecked}
            onCheckedChange={(checked) => setIsChecked(checked)}
          />

        </div>
        {isChecked &&
          <div className="p-4">
            <p>Take a photo of the artwork to access sign language explanations for a more inclusive experience.</p>
            <Link href={'/docent/ar'}>
              <Button className="rounded-full h-[50px] w-[50px] p-0 m-4">
                <Camera size={24} />
              </Button>
            </Link>
          </div>}
      </div>

      <div className="web w-full h-[80vh] text-muted-foreground flex flex-col items-center justify-center text-center">
        <h1 className="p-6 text-3xl font-bold text-center text-primary">How to Use the Beacon Guide</h1>

        <div className="space-y-6 max-w-md w-full">
          <div className="flex gap-4 items-start">
            <div className="font-bold text-xl">1</div>
            <p className="text-left">Turn on Bluetooth to detect nearby artworks using our smart beacon system.</p>
          </div>

          <div className="flex gap-4 items-start">
            <div className="font-bold text-xl">2</div>
            <p className="text-left">Just tap the camera button in the app to snap a photo of the artwork you&apos;re looking at.</p>
          </div>

          <div className="flex gap-4 items-start">
            <div className="font-bold text-xl">3</div>
            <p className="text-left">We&apos;ll identify the artwork and provide instant access to <strong>sign language explanations</strong> for a more inclusive experience.</p>

          </div>
        </div>
      </div>
      <Navigation />
    </>
  )
}