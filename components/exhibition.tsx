'use client'

import { useEffect, useState } from 'react';
import { Bookmark } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface props {
  json: {
    id: number
    name: string
    title: string
    price: number
    imgid: number
    content: string
    bookmark: boolean
    address: string
    bookmark_time: string
  }
}

const Exhibition: React.FC<props> = ({ json }) => {
  const [isBookmarked, setIsBookmarked] = useState(json.bookmark)
  const pathname = usePathname()
  const [currentPath, setPath] = useState(pathname)
  
  useEffect(()=> {
    if(pathname !== '/')
    {
      setPath(currentPath + '/')
    }
  },[pathname])

  const toggleBookmark = async (id: number) => {
    try {
      const response = await fetch('/api/bookmark', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, bookmark: isBookmarked, time: new Date().toISOString() }),
      })

      const data = await response.json();
      if (response.ok) {
        setIsBookmarked(!isBookmarked);
      } else {
        console.error('Failed to update bookmark:', data.error)
      }
    } catch (error) {
      console.error('Error updating bookmark:', error)
    }
  }

  return (
    <div className='w-full relative'>
      <Link href={`${currentPath}${encodeURIComponent(json.title.replace(/ /g, "_"))}`}>
        <div className='bg-cover bg-center w-[100%] rounded-2xl aspect-[1]' style={{
          backgroundImage: `url('https://picsum.photos/id/${json.imgid}/1500/1500')`
        }}>
        </div>
        <div className='py-2'>
          <h3 className='text-base/5 font-bold'>{json.title}</h3>
          <p className='font-medium text-sm/4 py-1 text-muted-foreground'>{json.name}</p>
          <p className='font-medium text-sm/4'>€ {json.price.toFixed(2)}</p>
        </div>
      </Link>
      <Bookmark className={`cursor-pointer absolute left-[calc(100%-2.4rem)] top-3 text-white ${isBookmarked ? 'fill-primary' : 'fill-black'}`}
        onClick={() => toggleBookmark(json.id)} />
    </div >
  )
}

export default Exhibition
