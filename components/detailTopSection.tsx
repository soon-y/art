"use client"

import { useState, useEffect } from 'react'
import { Bookmark, ChevronLeft, Share } from 'lucide-react'
import { ExhibitionData } from "@/types"
import Link from 'next/link'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { usePathname } from 'next/navigation'
gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function DetailTopSection({ id }: { id: string }) {
  const [data, setData] = useState<ExhibitionData | null>(null)
  const [isBookmarked, setIsBookmarked] = useState<boolean | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const res = await fetch(`/api/home/${id}`)
    const result = await res.json()
    if (result.success) {
      setData(result.exhibition)
    }
  }

  function getBasePath(pathname: string | null): string {
    if (!pathname || pathname === '/') return '/'
    const segments = pathname.split('/').filter(Boolean)
    return segments.length > 1 ? `/${segments[0]}` : '/'
  }

  const toggleBookmark = async (id: number) => {
    const response = await fetch('/api/bookmark', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
        bookmark: isBookmarked,
        time: new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000)).toISOString()
      }),
    })

    const result = await response.json()
    if (result.success) {
      setIsBookmarked(!isBookmarked)
    } else {
      console.error('Failed to update bookmark:', result.error)
    }
  }

  useGSAP(() => {
    const sec1 = gsap.timeline({
      scrollTrigger: {
        trigger: '.imgID',
        start: 'bottom 140px',
        end: 'bottom 100px',
        scrub: true,
      }
    })
    sec1.from('.top-nav', { opacity: 0 })
  }, [])

  return (
    <>
      <div className='mt-4 mb-6 hidden md:grid grid-cols-[1fr_24px_24px] md:grid-cols-[1fr_100px_150px] gap-5 items-center'>
        {data !== null ?
          <h3 className='text-2xl font-bold'>{data.title}</h3>
          :
          <div className="animate-pulse bg-muted w-48 h-8 rounded-lg"></div>
        }

        {data !== null ?
          <div className='flex'>
            <Share size={20} />
            <span className='font-medium underline text-sm pl-2 cursor-pointer'>Share</span>
          </div>
          :
          <div className="animate-pulse bg-muted w-full h-8 rounded-lg"></div>
        }

        {data !== null ?
          <div className='flex' onClick={() => toggleBookmark(data?.id)}>
            <Bookmark className={`cursor-pointer ${isBookmarked ? 'fill-primary text-primary' : 'fill-background text-foreground'}`} />
            <span className='font-medium underline text-sm pl-2 cursor-pointer'>Bookmark</span>
          </div>
          :
          <div className="animate-pulse bg-muted w-full h-8 rounded-lg"></div>
        }
      </div>

      <div className='imgID'>
        {data !== null ?
          <div className='absolute left-0 top-0 bg-cover bg-center w-full md:relative md:rounded-2xl h-[400px] md:h-[500px]' style={{
            backgroundImage: `url('https://picsum.photos/id/${data.imgid}/2000/2000')`
          }}>
          </div>
          :
          <div className="absolute left-0 top-0 animate-pulse bg-muted w-full md:relative h-[400px] md:h-[500px] md:rounded-lg"></div>
        }
      </div>

      <div className='md:hidden w-full fixed top-0 left-0 h-[100px] bg-background top-nav z-10'></div>
      <div className='md:hidden w-full fixed top-0 left-0 pt-14 px-4 py-3 grid grid-cols-[1fr_30px_30px] gap-3 items-center z-10'>
        <Link href={getBasePath(pathname)}>
          <ChevronLeft size={28} className='text-foreground p-1 bg-background rounded-full' />
        </Link>

        {data !== null ?
          <div className='bg-background rounded-full'>
            <Share size={28} className='text-foreground p-1 bg-background rounded-full cursor-pointer' />
          </div>
          :
          <></>
        }

        {data !== null ?
          <div onClick={() => toggleBookmark(data.id)}>
            <Bookmark size={28} className={`text-foreground p-1 bg-background rounded-full cursor-pointer ${isBookmarked ? 'fill-primary text-primary' : 'text-foreground'}`} />
          </div>
          :
          <div></div>
        }
      </div>
    </>)
}