'use client'

import { useState } from 'react';
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
  }
}

const Bookmarking: React.FC<props> = ({ json }) => {
  const [isBookmarked, setIsBookmarked] = useState(json.bookmark)

  const toggleBookmark = async (id: number) => {
    try {
      const response = await fetch('/api/bookmark', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          id, 
          bookmark: isBookmarked, 
          time: new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000)).toISOString()}),
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
    <Bookmark className={`cursor-pointer absolute left-[calc(100%-2.4rem)] top-3 text-white ${isBookmarked ? 'fill-primary' : 'fill-black'}`}
        onClick={() => toggleBookmark(json.id)} />
  )
}

export default Bookmarking
