'use client'

import * as React from "react"
import { useState, useEffect, useRef } from 'react'
import SearchAddress from "./searchAddress"
import NumInput from "./numInput"
import Calendar from "./calendar"
import { Button } from "./ui/button"
import { Search } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger"
gsap.registerPlugin(ScrollTrigger, useGSAP)

interface SearchItem {
  json: {
    id: number
    address: string
    date: string
    who: number
  }
}

const SearchbarHeader: React.FC<SearchItem> = ({ json }) => {
  const pathname = usePathname()
  const whereRef = useRef<HTMLDivElement>(null)
  const whenRef = useRef<HTMLDivElement>(null)
  const whoRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLDivElement>(null)
  const calendarRef = useRef<HTMLDivElement>(null)
  const numInput = useRef<HTMLDivElement>(null)
  const [whereClicked, setwhereClicked] = useState<boolean>(false)
  const [whenClicked, setwhenClicked] = useState<boolean>(false)
  const [whoClicked, setwhoClicked] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(false)
  const [openWhere, setOpenWhere] = useState<boolean>(false)
  const [openWhen, setOpenWhen] = useState<boolean>(false)
  const [openWho, setOpenWho] = useState<boolean>(false)
  const [whereTo, setWhereTo] = useState<string>('')
  const today = new Date()
  const [whenDay, setWhenDay] = useState<number>(0)
  const [whenMonth, setWhenMonth] = useState<number>(today.getMonth())
  const [whenYear, setWhenYear] = useState<number>(today.getFullYear())
  const [whoNum, setWhoNum] = useState<number>(1)
  const months: string[] = [
    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
  ]

  useEffect(()=>{
    if (json){
      setWhereTo(json.address)
      setWhenDay(Number(json?.date.split('-')[2]))
      setWhenMonth(Number(json?.date.split('-')[1]))
      setWhenYear(Number(json?.date.split('-')[0]))
      setWhoNum(json.who)
    }
  }, [json])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (whereRef.current && searchRef.current &&
        !(whereRef.current.contains(event.target as Node) || (searchRef.current.contains(event.target as Node)))) {
        setwhereClicked(false)
      }
      if (whenRef.current && calendarRef.current &&
        !(whenRef.current.contains(event.target as Node) || (calendarRef.current.contains(event.target as Node)))) {
        setwhenClicked(false)
      }
      if (whoRef.current && numInput.current &&
        !(whoRef.current.contains(event.target as Node) || (numInput.current.contains(event.target as Node)))) {
        setwhoClicked(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const update = async (id: number) => {
    const newData = {
      address: whereTo,
      who: whoNum,
      ...(whenDay !== 0
        ? { date: `${whenYear}-${whenMonth}-${whenDay}` }
        : {})
    }

    const response = await fetch('/api/search/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, newData }),
    })

    const result = await response.json()
    console.log(result)
  }

  return (
    <div className={`${pathname === '/' ? '' : 'hidden'}`}>
      <div className='hidden md:block pt-1 '>
        <div className='flex justify-center'>
          <div className={`searchbar cursor-pointer inline-flex items-center rounded-full text-sm border border-border text-primary-background h-[70px] shadow-lg w-[690px] transform translate-x-[26px] grid grid-cols-[1fr_1fr_1fr] 
            ${whereClicked || whenClicked || whoClicked ? 'bg-accent' : 'bg-background'}`}>
            <div className={`overflow-hidden h-[100%] rounded-full search-item ${whereClicked ? 'bg-background' : 'hover:bg-muted'}`} ref={whereRef} onClick={() => {
              setwhereClicked(true)
              setwhenClicked(false)
              setwhoClicked(false)
            }}>
              <p className="pt-3 pb-1 pl-6 font-bold">Where</p>
              <div ref={searchRef} >
                <SearchAddress whereTo={whereTo} setWhereTo={setWhereTo} />
              </div>
            </div>
            <div className={`h-[100%] rounded-full search-item  ${whenClicked ? 'bg-background' : 'hover:bg-muted'}`} ref={whenRef} onClick={() => {
              setwhereClicked(false)
              setwhenClicked(true)
              setwhoClicked(false)
            }}>
              <div>
                <p className="pt-3 pb-1 pl-6 font-bold">When</p>
                {whenDay !== 0 ?
                  <p className="pl-6">{whenDay} {months[whenMonth]} {whenYear}</p> :
                  <p className="pl-6 text-muted-foreground">Add date</p>}
              </div>
            </div>
            <div className={`h-[100%] rounded-full search-item  ${whoClicked ? 'bg-background' : 'hover:bg-muted'}`} ref={whoRef} onClick={() => {
              setwhereClicked(false)
              setwhenClicked(false)
              setwhoClicked(true)
            }}>
              <div>
                <p className="pt-3 pb-1 pl-6 font-bold">Who</p>
                <p className="pl-6">{whoNum}</p>
              </div>
            </div>
          </div>
          <Button className="web p-1 w-[46px] h-[46px] rounded-full transform -translate-x-[35px] translate-y-1/4 searchBtn" onClick={() => update(1)}>
            <Search />
          </Button>

          {whenClicked &&
            <div className="fixed top-[130px] left-[50%] border transform -translate-x-1/2 web w-[350px] mt-4 p-4 bg-background shadow-xl rounded-2xl" ref={calendarRef}>
              <Calendar selDay={whenDay} selMonth={whenMonth} selYear={whenYear}
                setDay={setWhenDay} setMonthSelected={setWhenMonth} setYearSelected={setWhenYear}
                dateFrom={''} dateTo={''} />
            </div>
          }
          {
            whoClicked &&
            <div className="fixed top-[130px] left-[calc(50%+227px)] border transform -translate-x-1/2 web w-content mt-4 p-4 bg-background shadow-xl rounded-2xl" ref={numInput}>
              <NumInput setValue={setWhoNum} initial={whoNum} />
            </div>
          }
        </div>
      </div>

      <div className='fixed top-10 pt-4 md:top-20 left-0 w-screen bg-background md:hidden z-10'>
        <div className='flex pb-6 border-b justify-center'>
          <div className='cursor-pointer overflow-hidden inline-flex items-center rounded-full text-sm border border-border text-primary-background h-[70px] shadow-lg w-[90vw]'>
            <div className="md:hidden inline-flex items-center m-auto" onClick={() => setOpen(prev => !prev)}>
              {whereTo === '' && whoNum === 1 && whenDay === 0 ?
                <div className="flex items-center">
                  <p className="font-bold text-muted-foreground">Start your search &nbsp; </p>
                  <Search className="text-muted-foreground" size={18} />
                </div>
                :
                <div className='justify-center items-center text-center'>
                  <p className="font-bold"> {whereTo === '' ? 'Where to?' : whereTo} </p>
                  <p >
                    {whenDay === 0 ? 'Anytime ' : `${whenDay} ${months[whenMonth]}`} &nbsp;&#183;&nbsp;&nbsp;
                    {whoNum === 0 ? '' : whoNum === 1 ? `1 person` : `${whoNum} people`}
                  </p>
                </div>}
            </div>
          </div>
          <Button className="web p-1 w-[46px] h-[46px] rounded-full transform -translate-x-[35px] translate-y-1/4">
            <Search width='100%' />
          </Button>
        </div>

        {open &&
          <div className="mobile fixed top-0 left-0 w-screen h-screen z-1000 bg-muted pt-16">
            <div className="w-[90vw] bg-card rounded-xl m-auto py-4 px-6 shadow-md cursor-pointer">
              <div className="flex justify-between" onClick={() => {
                setOpenWhere(true)
                setOpenWhen(false)
                setOpenWho(false)
              }}>
                {openWhere ? <p className="font-bold text-xl">Where to?</p> : <p>Where</p>}
                {!openWhere && (whereTo === '' ? <p className="text-muted-foreground font-bold">I&apos;m flexible</p> : <p className="font-bold">{whereTo.split(',').slice(0, 2).join(', ').trim()}</p>)}
              </div>
              {openWhere &&
                <div>
                  <SearchAddress whereTo={whereTo} setWhereTo={setWhereTo} />
                </div>}
            </div>

            <div className="w-[90vw] bg-card rounded-xl m-auto py-4 px-6 mt-5 shadow-md cursor-pointer ">
              <div className="flex justify-between" onClick={() => {
                setOpenWhen(true)
                setOpenWhere(false)
                setOpenWho(false)
              }}>
                {openWhen ? <p className="font-bold text-xl pb-2">When&apos;s your plan?</p> : <p>When</p>}
                {!openWhen && (whenDay !== 0 ?
                  <p className="font-bold">{whenDay} {months[whenMonth]} {whenYear}</p> :
                  <p className="text-muted-foreground font-bold">Add date</p>)}
              </div>
              {openWhen && <Calendar selDay={whenDay} selMonth={whenMonth} selYear={whenYear}
                setDay={setWhenDay} setMonthSelected={setWhenMonth} setYearSelected={setWhenYear}
                dateFrom={''} dateTo={''} />}
            </div>

            <div className="w-[90vw] bg-card rounded-xl m-auto py-4 px-6 mt-5 shadow-md cursor-pointer">
              <div className="flex justify-between" onClick={() => {
                setOpenWho(true)
                setOpenWhere(false)
                setOpenWhen(false)
              }}>
                {openWho ? <p className="font-bold text-xl pb-2">Who&apos;s coming?</p> : <p>Who</p>}
                {!openWho && <p className="font-bold">{whoNum}</p>}
              </div>
              {openWho && <NumInput setValue={setWhoNum} initial={whoNum} />}
            </div>

            <Button className="m-auto w-[90vw] mt-8 py-6 flex items-center gap-2" size={"sm"} onClick={() => { setOpen(false) }}>
              <Search size={15} />
              <span>Search</span>
            </Button>
          </div>}
      </div>
    </div>
  )
}

export default SearchbarHeader