'use client'

import Navigation from "@/components/navigation"
import Exhibition from '@/components/exhibition'
import { useState, useEffect } from 'react'
import Searchbar from "@/components/searchbar"

type SearchItem = {
  id: number
  address: string
  date?: string
  who: number
}

interface ExhibitionData {
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

export default function Explore({ initialData = [] }: { initialData: ExhibitionData[] }) {
  const [result, setResult] = useState(initialData)
  const [searchData, setSearchData] = useState<SearchItem | null>(null)
  const [searchDataUpdated, setSearchDataUpdated] = useState<boolean>(false)
  const fetchData = async () => {
      const res = await fetch('/api/search/fetch')
      const result = await res.json()
      if (result.success) {
        setSearchData(result.data[0])
        console.log(result)
      }
    }

  const filterData = async () => {
      const res = await fetch('/api/search/filter')
      const result = await res.json()
      if (result.success) {
        setSearchDataUpdated(false)
        setResult(result.data)
      }
    }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    filterData()
  }, [searchDataUpdated])
  
  return (
    <>
      <div className='exhibition mt-28 mb-24 md:mt-16 md:mb-4 py-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-x-5 gap-y-8'>
        {result.map((exhibition) => (
          <Exhibition key={exhibition.id} json={exhibition} />
        ))}
      </div>
      <Navigation />
      {searchData && <Searchbar json={searchData} setSearchDataUpdated={setSearchDataUpdated}/>}
    </>
  )
}