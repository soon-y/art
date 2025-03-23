"use client"
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark, faCalendar, faCircleUser, faUser } from '@fortawesome/free-regular-svg-icons'
import { faMagnifyingGlass, faLocationDot, faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import Calendar from '@/components/Calendar'
import NumInput from '@/components/NumInput'

export default function Home() {
  const [showWhere, setWhere] = useState<boolean>(false)
  const [showWhen, setWhen] = useState<boolean>(false)
  const [showWho, setWho] = useState<boolean>(false)
  const [searchClicked, setsearchClicked] = useState<boolean>(false)
  const [whoNum, setWhoNum] = useState<number>(0)
  const whereRef = useRef<HTMLDivElement>(null)
  const whenRef = useRef<HTMLDivElement>(null)
  const whoRef = useRef<HTMLDivElement>(null)
  const today = new Date()
  const [month, setMonth] = useState<number>(today.getMonth())
  const [year, setYear] = useState<number>(today.getFullYear())
  const [whenDay, setWhenDay] = useState<number>(0)
  const [whenMonth, setWhenMonth] = useState<number>(today.getMonth())
  const [whenYear, setWhenYear] = useState<number>(today.getFullYear())
  const months: string[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  const increment = () => {
    if (month === 11) {
      setMonth(0)
      setYear((prev) => prev + 1)
    } else {
      setMonth((prev) => prev + 1)
    }

  }
  const decrement = () => {
    if (month === 0) {
      setMonth(11)
      setYear((prev) => prev - 1)
    } else {
      setMonth((prev) => prev - 1)
    }
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (whereRef.current && !whereRef.current.contains(event.target as Node)) {
        setWhere(false)
      }
      if (whenRef.current && !whenRef.current.contains(event.target as Node)) {
        setWhen(false)
      }
      if (whoRef.current && (!whoRef.current.contains(event.target as Node))) {
        setWho(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <>
      <div className='flex flex-col w-screen h-auto'>
        <header className='p-6 xl:px-16 lg:px-8 w-screen'>
          <div className='web w-[100%] grid grid-cols-[70px_1fr_30px] gap-1 items-center'>
            <Image src='/art.svg' alt='art logo' width={70} height={35} priority />
            <div></div>
            <div>
              <FontAwesomeIcon icon={faCircleUser} style={{ color: 'var(--darkgrey)', backgroundColor: 'rgba(255,255,255,0.5)', borderRadius: '50%', fontSize: '2rem' }} />
            </div>
          </div>
          <div>
            <div className='web search-bar grid grid-cols-[1fr_1fr_1fr]' style={{ backgroundColor: showWhere || showWhen || showWho ? '#edededb4' : 'white' }}>
              <div className={`search-item ${showWhere ? 'clicked' : ''}`} ref={whereRef} onClick={() => { setWhere(true) }} style={{
                backgroundColor: showWhere ? "white" : "transparent"
              }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = showWhere ? 'trnaparent' : '#d5d5d5b4'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = showWhere ? 'white' : 'transparent'} >
                <h3>Where</h3>
                <input type="text" placeholder='Search' />
              </div>
              <div className={`search-item ${showWhen ? 'clicked' : ''}`} ref={whenRef} onClick={() => { setWhen(true) }} style={{
                backgroundColor: showWhen ? "white" : "transparent"
              }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = showWhen ? 'trnaparent' : '#d5d5d5b4'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = showWhen ? 'white' : 'transparent'} >
                <h3>When</h3>
                {whenDay === 0 && <p>Add date</p>}
                {whenDay !== 0 && <p>{whenDay} {months[whenMonth]} {whenYear}</p>}
                {showWhen &&
                  <div className='web px-4 py-3' style={{
                    backgroundColor: 'white', width: '380px', borderRadius: '2rem', zIndex: 100,
                    boxShadow: '0 4px 10px rgba(0,0,0,0.4)', position: 'fixed', top: '148px', left: '50%', transform: 'translateX(-50%)',
                  }}>
                    {!(month === today.getMonth() && year === today.getFullYear()) && 
                    <FontAwesomeIcon onClick={decrement} icon={faChevronLeft} className='p-6' style={{ position: 'absolute', top: '4px', left: 0 }} />}
                    <FontAwesomeIcon onClick={increment} icon={faChevronRight} className='p-6' style={{ position: 'absolute', top: '4px', right: 0 }} />
                    <Calendar year={year} month={month} selDay={whenDay} selMonth={whenMonth} selYear={whenYear} setDay={setWhenDay} setMonth={setWhenMonth} setYear={setWhenYear} />
                  </div>}
              </div>
              <div className={`search-item ${showWho ? 'clicked' : ''}`} ref={whoRef} onClick={() => { setWho(true) }} style={{
                backgroundColor: showWho ? "white" : "transparent"
              }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = showWho ? 'trnaparent' : '#d5d5d5b4'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = showWho ? 'white' : 'transparent'} >
                <h3>Who</h3>
                {whoNum === 0 && <p>Add number</p>}
                {whoNum > 0 && <p>{whoNum}</p>}
                {showWho &&
                  <div className='web web-who-box' style={{
                    backgroundColor: 'white', width: 'auto', height: '60px', borderRadius: '2rem', zIndex: 100,
                    boxShadow: '0 4px 10px rgba(0,0,0,0.4)', position: 'fixed', top: '148px', transform: 'translateX(-75%)',
                  }}>
                    <NumInput setValue={setWhoNum} initial={whoNum} />
                  </div>}
              </div>
            </div>
            <FontAwesomeIcon icon={faMagnifyingGlass} className='search-icon' style={{
              color: 'white', padding: '0.8rem', borderRadius: '50%', transform: 'translate(0%,-50%)'
            }} />
          </div>
          <div className='mobile search-bar cursor-pointer' onClick={() => { setsearchClicked(true) }}>
            <div className='flex flex-row justify-center items-center'>
              <FontAwesomeIcon className='w-4' icon={faMagnifyingGlass} />
              <p className='p-2'>Start your search</p>
            </div>
          </div>
        </header>
        <div className='content-wrapper p-6 xl:px-16 lg:px-8 w-screen'>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-5 gap-y-8'>

          </div>
        </div>
      </div>
      <div className='mobile nav-bar pt-3 pb-8'>
        <div className='flex flex-row items-center justify-center'>
          <div className='flex-1 flex flex-col items-center justify-center '>
            <FontAwesomeIcon className='nav-icon' icon={faMagnifyingGlass} />
            <p>Explore</p>
          </div>
          <div className='flex-1 flex flex-col items-center justify-center '>
            <FontAwesomeIcon className='nav-icon' icon={faBookmark} />
            <p>Saved</p>
          </div>
          <div className='flex-1 flex flex-col items-center justify-center '>
            <FontAwesomeIcon className='nav-icon' icon={faCalendar} />
            <p>e</p>
          </div>
          <div className='flex-1 flex flex-col items-center justify-center '>
            <Image src='/ar.svg' width={30} height={24} alt='ar' />
            <p>Docent</p>
          </div>
          <div className='flex-1 flex flex-col items-center justify-center '>
            <FontAwesomeIcon className='nav-icon' icon={faUser} />
            <p>Profile</p>
          </div>
        </div>
      </div>
      {showWhere &&
        <div className='web p-3 web-where-box rounded-4xl' style={{
          overflowY: 'scroll',
          backgroundColor: 'white', width: '300px', maxHeight: '50%', height: 'auto', zIndex: 100,
          boxShadow: '0 4px 10px rgba(0,0,0,0.4)', position: 'fixed', top: '148px'
        }}>
          <div className='flex items-center hover:bg-gray-100 p-3 rounded-3xl'>
            <FontAwesomeIcon icon={faLocationDot} className='pr-2' /> <p>postcode</p>
          </div>
        </div>}
      {searchClicked &&
        <div className='mobile' style={{
          position: 'fixed', top: 0, left: 0, zIndex: 100,
          width: '100vw', height: '100vh', backgroundColor: 'white'
        }}>
        </div>
      }
    </>
  )
}