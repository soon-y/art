"use client"
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { usePathname, useRouter } from "next/navigation"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark, faCalendar, faCircleUser, faUser } from '@fortawesome/free-regular-svg-icons'
import { faMagnifyingGlass, faLocationDot, faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import Exhibition from '@/components/Exhibition'
import Calendar from '@/components/Calendar'

export default function Home() {
  // const router = useRouter()
  // const pathname = usePathname()
  const [showWhere, setWhere] = useState<boolean>(false)
  const [showWhen, setWhen] = useState<boolean>(false)
  const [showWho, setWho] = useState<boolean>(false)
  const [searchClicked, setsearchClicked] = useState<boolean>(false)
  const [where, setWhereValue] = useState<string>('Search')
  const [when, setWhenValue] = useState<string>('Add dates')
  const [who, setWhoValue] = useState<string>('Add number')
  const whereRef = useRef<HTMLDivElement>(null)
  const whenRef = useRef<HTMLDivElement>(null)
  const whoRef = useRef<HTMLDivElement>(null)

  console.log(searchClicked)

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
                <p>{when}</p>
                {showWhen && 'Add dates' && <SelectWhen width={'var(--serachbar-width)'} setValue={setWhenValue} />}
              </div>
              <div className={`search-item ${showWho ? 'clicked' : ''}`} ref={whoRef} onClick={() => { setWho(true) }} style={{
                backgroundColor: showWho ? "white" : "transparent"
              }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = showWho ? 'trnaparent' : '#d5d5d5b4'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = showWho ? 'white' : 'transparent'} >
                <h3>Who</h3>
                <p>{who === '0' ? 'Add number' : who}</p>
                {showWho &&
                  <div className='web' style={{
                    backgroundColor: 'white', width: 'var(--serachbar-width)', height: '60px', borderRadius: '2rem', zIndex: 100,
                    boxShadow: '0 4px 10px rgba(0,0,0,0.4)', position: 'fixed', top: '148px', left: '50%', transform: 'translateX(-50%)',
                  }}>
                    <SelectWho setValue={setWhoValue} initial={who === 'Add number' ? 0 : who} />
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
      {showWhere && <SelectWhere width={'var(--serachbar-width)'} height={'50%'} />}
      {searchClicked && 
      
      <div className='mobile' style={{
        position: 'fixed', top: 0, left: 0, zIndex: 100,
        width: '100vw', height: '100vh', backgroundColor: 'white'
      }}>
        <SelectWho setValue={setWhoValue} initial={who === 'Add number' ? 0 : who} />
      </div>
      
      
      }
    </>
  )
}

function SelectWhere(props: any) {
  return (
    <>
      <div className='web p-4' style={{
        overflowY: 'scroll',
        backgroundColor: 'white', width: props.width, maxHeight: props.height, height: 'auto', borderRadius: '2rem', zIndex: 100,
        boxShadow: '0 4px 10px rgba(0,0,0,0.4)', position: 'fixed', top: '148px', left: '50%', transform: 'translateX(-50%)',
      }}>
        <div className='flex items-center hover:bg-gray-100 p-4 rounded-3xl'>
          <FontAwesomeIcon icon={faLocationDot} className='pr-2' /> <p>passcode</p>
        </div>
      </div>

    </>
  )
}

function SelectWhen(props: any) {
  const today = new Date()
  const [month, setMonth] = useState<number>(2)
  const [year, setYear] = useState<number>(today.getFullYear())

  const increment = () => {
    if (month === 11) {
      console.log(month)
      setMonth(0)
      setYear((prev) => prev + 1)
    } else {
      setMonth((prev) => prev + 1)
    }

  }
  const decrement = () => {
    if (month === 0) {
      console.log(month)
      setMonth(11)
      setYear((prev) => prev - 1)
    } else {
      setMonth((prev) => prev - 1)
    }

  }

  return (
    <>
      <div className='web grid grid-cols-[1fr_1fr] gap-4 p-4' style={{
        backgroundColor: 'white', width: props.width, borderRadius: '2rem', zIndex: 100,
        boxShadow: '0 4px 10px rgba(0,0,0,0.4)', position: 'fixed', top: '148px', left: '50%', transform: 'translateX(-50%)',
      }}>
        {!(month === today.getMonth() && year === today.getFullYear()) && <FontAwesomeIcon onClick={decrement} icon={faChevronLeft} style={{ position: 'absolute', top: '2rem', left: '2rem' }} />}
        <FontAwesomeIcon onClick={increment} icon={faChevronRight} style={{ position: 'absolute', top: '2rem', right: '2rem' }} />
        <Calendar year={year} month={month} setValue={props.setValue} />
        <Calendar year={month === 11 ? year + 1 : year} month={month === 11 ? 0 : month + 1} setValue={props.setValue} />
      </div>
    </>
  )
}

function SelectWho(props: any) {
  const [value, setValue] = useState<number>(parseInt(props.initial))
  const increment = () => {
    setValue((prev) => prev + 1)
    props.setValue((value + 1).toString())
  }
  const decrement = () => {
    setValue((prev) => (prev > 0 ? prev - 1 : 0))
    props.setValue((value > 0 ? value - 1 : 0).toString())
  }
  return (
    <>

      <div className='p-3 flex justify-center'>
        <button onClick={decrement} style={{ marginRight: '0.6rem', opacity: value === 0 ? 0 : 1 }}
          className="text-xl border border-gray-300 text-gray-600 px-3 py-[3px] hover:border-gray-500 rounded-full cursor-pointer">
          −
        </button>
        <input type="number" value={value} onChange={(e) => setValue(Number(e.target.value))} className="w-16 text-center" />
        <button onClick={increment}
          className="text-xl border border-gray-300 text-gray-600 px-3 py-[3px] hover:border-gray-500 rounded-full cursor-pointer" >
          +
        </button>
      </div>
    </>
  )
}
