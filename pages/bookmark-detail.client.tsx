'use client'

import Description from '@/components/description'

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

const BookmarkDetailPage: React.FC<props> = ({ json }) => {
  return (
    <>
     <Description json={json} />
    </>
  )
}

export default BookmarkDetailPage
