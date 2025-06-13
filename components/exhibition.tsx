'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Bookmarking from './bookmark'
import { Bookmark } from 'lucide-react'

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
    date_from: string
    date_to: string
  }
}

const Exhibition: React.FC<props> = ({ json }) => {
  const pathname = usePathname()
  const [currentPath, setPath] = useState(pathname)

  const formatDate = (timestamp: string): string => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  }

  useEffect(() => {
    if (pathname !== '/') {
      setPath(currentPath + '/')
    }
  }, [pathname])

  return (
    <div className='w-full relative'>
      <Link href={`${currentPath}${encodeURIComponent(json.title.replace(/ /g, "_"))}`}>
        <div className='bg-cover bg-center w-[100%] rounded-2xl aspect-[1]' style={{
          backgroundImage: `url('https://picsum.photos/id/${json.imgid}/1500/1500')`
        }}>
        </div>
        <div className='py-2'>
          <h3 className='text-lg/5 font-bold mt-1'>{json.title}</h3>
          <p className='font-medium text-sm/5 mt-1'>{formatDate(json.date_from)} - {formatDate(json.date_to)}</p>
          <p className='font-medium text-sm/5 mt-1 text-muted-foreground'>{json.name}</p>
          <p className='font-medium text-sm/5 mt-1'>€ {json.price.toFixed(2)}</p>
          {pathname === '/bookmarks' &&
            <div className='flex items-center'>
              <Bookmark size={18} className='mr-1 text-muted-foreground' />
              <p className='font-medium text-sm/6 text-muted-foreground'>on {formatDate(json?.bookmark_time)}</p>
            </div>
          }
        </div>
      </Link>
      <Bookmarking json={json} />
    </div >
  )
}

export default Exhibition
