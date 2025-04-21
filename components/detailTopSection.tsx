import { useState, useEffect } from 'react'
import { Bookmark, ChevronLeft, Share } from 'lucide-react'
import Link from 'next/link'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { usePathname } from 'next/navigation'
gsap.registerPlugin(ScrollTrigger, useGSAP)

interface props {
  json: {
    id: number
    name: string
    title: string
    price: number
    imgid: number
    content: string
    bookmark: boolean
    bookmark_time: string
  }
}

const DetailTopSection: React.FC<props> = ({ json }) => {
  const [isBookmarked, setIsBookmarked] = useState(json?.bookmark)
  const [size, setSize] = useState({ width: 0, height: 0 })
  const pathname = usePathname()

  function getBasePath(pathname: string | null): string {
    if (!pathname || pathname === '/') return '/'
    const segments = pathname.split('/').filter(Boolean)
    return segments.length > 1 ? `/${segments[0]}` : '/'
  }

  useEffect(() => {
    const header = document.querySelector('.mobileHeader') as HTMLElement
    if (header) {
      if (window.innerWidth < 768) header.style.opacity = '0'
      else header.style.opacity = '1'
    }
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [size])

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
      console.log(response)
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
    if (window.innerWidth < 768) {
      sec1.from('.top-nav', { opacity: 0 })
    }
  }, [size])

  return (
    <>
      <div className='mt-4 mb-6 hidden md:grid grid-cols-[1fr_24px_24px] md:grid-cols-[1fr_100px_150px] gap-5 items-center'>
        <h3 className='text-2xl font-bold'>{json?.title}</h3>
        <div className='flex'>
          <Share size={20} />
          <span className='font-medium underline text-sm pl-2 cursor-pointer'>Share</span>
        </div>
        <div className='flex' onClick={() => toggleBookmark(json?.id)}>
          <Bookmark className={`cursor-pointer ${isBookmarked ? 'fill-primary text-primary' : 'fill-background text-foreground'}`} />
          <span className='font-medium underline text-sm pl-2 cursor-pointer'>Bookmark</span>
        </div>
      </div>
      <div className='absolute left-0 top-0 bg-cover bg-center w-[100%] md:relative md:rounded-2xl h-[400px] md:h-[500px] imgID' style={{
        backgroundImage: `url('https://picsum.photos/id/${json?.imgid}/2000/2000')`
      }}>
      </div>
      <div className='md:hidden w-full fixed top-0 left-0 h-[100px] bg-background top-nav z-10'>
      </div>
      <div className='md:hidden w-full fixed top-0 left-0 pt-14 px-4 py-3 grid grid-cols-[1fr_30px_30px] gap-3 items-center z-10'>
        <Link href={getBasePath(pathname)}>
          <ChevronLeft size={28} className='text-foreground p-1 bg-background rounded-full' />
        </Link>
        <div className='bg-background rounded-full'>
          <Share size={28} className='text-foreground p-1 bg-background rounded-full cursor-pointer' />
        </div>
        <div onClick={() => toggleBookmark(json?.id)}>
          <Bookmark size={28} className={`text-foreground p-1 bg-background rounded-full cursor-pointer ${isBookmarked ? 'fill-primary text-primary' : 'text-foreground'}`} />
        </div>
      </div>
    </>)
}

export default DetailTopSection