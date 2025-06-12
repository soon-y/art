'use client'

import Navigation from "@/components/navigation"
import Exhibition from '@/components/exhibition'
import { useState, useEffect } from 'react'
import Searchbar from "@/components/searchbar"
import Alert from "@/components/alert"
import { ExhibitionData } from "@/types"

export default function Explore() {
  const [error, setError] = useState<boolean>(false)
  const [data, setData] = useState<ExhibitionData[] | null>(null)
  const [searchDataUpdated, setSearchDataUpdated] = useState<boolean>(false)

  const fetchData = async () => {
    const res = await fetch('/api/home/fetch')
    const result = await res.json()
    if (result.success) {
      setData(result.filteredExhibition)
    } else {
      setError(true)
      setTimeout(() => setError(false), 3000)
    }
  }

  const filterData = async () => {
    const res = await fetch('/api/home/search/filter')
    const result = await res.json()
    if (result.success) {
      setSearchDataUpdated(false)
      setData(result.filteredExhibition)
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
        {data !== null ?
          (data.map((exhibition: ExhibitionData) => (
            <Exhibition key={exhibition.id} json={exhibition} />
          )))
          :
          Array.from({ length: 20 }).map((_, i) => (
            <div className='w-full relative' key={i}>
              <div className='bg-muted w-[100%] rounded-2xl aspect-[1] animate-pulse'></div>
              <div className="animate-pulse bg-muted w-48 h-6 rounded-md mt-2"></div>
              <div className="animate-pulse bg-muted w-40 h-4 rounded-sm mt-2"></div>
              <div className="animate-pulse bg-muted w-48 h-4 rounded-sm mt-2"></div>
              <div className="animate-pulse bg-muted w-12 h-4 rounded-sm mt-2"></div>
            </div >
          ))
        }
      </div>
      <Navigation />
      <Searchbar setSearchDataUpdated={setSearchDataUpdated} />

      {error && <Alert msg={
        <>
          Something went wrong.<br />
          Please try again.
        </>
      } />}
    </>
  )
}