'use client'

import Image from 'next/image'
import Link from 'next/link'
import { X, Smile, Play, Pause } from 'lucide-react'
import { useState, useEffect } from 'react'
import { Slider } from '@/components/ui/slider'
import { usePathname } from 'next/navigation'

export default function Home() {
  const [on, setOn] = useState<boolean>(false)
  const [play, setPlay] = useState<boolean>(false)
  const [value, setValue] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      if (play) {
        if (value === 90) {
          setPlay(false)
          setValue(0)
        } else {
          setValue(prev => prev + 1)
        }
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [play, value])

  const convertTime = () => {
    const m = Math.floor((90 - value) / 60)
    const s = (90 - value) % 60
    return `${m}:${s.toString().padStart(2, '0')}`
  }

  return (
    <>
      <div className='md:hidden fixed left-0 top-0 w-full h-screen overflow-hidden'>
        <Image priority className={`fixed top-0 left-0 duration-500 object-cover ${on ? 'brightness-50' : 'brightness-100'}`}
          src="/background-sl.jpg" fill
          sizes='100vw'
          alt="artwork"
        />
        <Image priority className={`fixed bottom-0 left-[50%] transform -translate-x-1/2 duration-500 ${on ? 'opacity-100' : 'opacity-0'}`}
          src="/docent-sl.png"
          width={425} height={591}
          alt="sign language"
        />

        <Link href={'/docent'}>
          <X className="text-white fixed top-14 right-6" size={24} />
        </Link>

        {!on ?
          <div className="w-[50px] h-[50px] bg-white rounded-full fixed bottom-10 left-[50%] transform -translate-x-1/2 cursor-pointer"
            onClick={() => setOn(true)}>
          </div> :
          <div>
            <div className='font-sans text-lg text-white fixed top-14 left-[50%] transform -translate-x-1/2'>
              {convertTime()}
            </div>
            <div className='fixed bottom-10 w-[86vw] ml-[10vw] grid grid-cols-[1fr_40px] gap-4 items-center'>
              <Slider value={[value]}
                onValueChange={([val]) => setValue(val)}
                max={90}
                step={1}
              />
              {play ?
                <Pause size={30} className="text-white cursor-pointer" onClick={() => setPlay(false)} /> :
                <Play size={30} className="text-white cursor-pointer" onClick={() => setPlay(true)} />}
            </div>
          </div>
        }
      </div>
      <div className="web w-full h-[80vh] text-muted-foreground flex flex-col items-center justify-center text-center">
        <Smile size={30} />
        <p className="text-xl py-3">Only available on app</p>
      </div>
    </>
  )
}