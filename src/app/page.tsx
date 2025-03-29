'use client'

import { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import Calendar from '@/components/Calendar'
import NumInput from '@/components/NumInput'
import SearchAddress from '@/components/SearchAddress'
import Exhibition from '@/components/Exhibition'

interface Exhibition {
  id: number
  name: string
  title: string
  price: number
  imgID: number
  content: string
  bookmark: boolean
  address: string
}

export default function Home() {
  const [showWhere, setWhere] = useState<boolean>(false)
  const [showWhen, setWhen] = useState<boolean>(false)
  const [showWho, setWho] = useState<boolean>(false)
  const [openWhere, setOpenWhere] = useState<boolean>(true)
  const [openWhen, setOpenWhen] = useState<boolean>(false)
  const [openWho, setOpenWho] = useState<boolean>(false)
  const [searchClicked, setsearchClicked] = useState<boolean>(false)
  const [whoNum, setWhoNum] = useState<number>(0)
  const [whereTo, setWhereTo] = useState<string>('')
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
  const [exhibitions, setExhibitions] = useState<Exhibition[]>([])

  useEffect(() => {
    fetch('/api/exhibition') // Fetch from API route
      .then((res) => res.json())
      .then((data) => setExhibitions(data))
      .catch((error) => console.error('Error fetching exhibitions:', error))

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

  const openTab = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget.id === 'tabWhere') { setOpenWhere(true) } else { setOpenWhere(false) }
    if (e.currentTarget.id === 'tabWhen') { setOpenWhen(true) } else { setOpenWhen(false) }
    if (e.currentTarget.id === 'tabWho') { setOpenWho(true) } else { setOpenWho(false) }
  }

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

  return (
    <>
      <div className='w-screen h-auto'>
        <div className='web search-bar-area header-top'>
          <div className='search-bar grid grid-cols-[1fr_1fr_1fr]' style={{ backgroundColor: showWhere || showWhen || showWho ? '#edededb4' : 'white' }}>
            <div className={`search-item ${showWhere ? 'clicked' : ''}`} ref={whereRef} onClick={() => { setWhere(true) }} style={{
              backgroundColor: showWhere ? "white" : "transparent"
            }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = showWhere ? 'trnaparent' : '#d5d5d5b4'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = showWhere ? 'white' : 'transparent'} >
              <h3>Where</h3>
              <SearchAddress showWhere={showWhere} openWhere={openWhere} whereTo={whereTo} setWhereTo={setWhereTo} />
            </div>
            <div className={`search-item ${showWhen ? 'clicked' : ''}`} ref={whenRef} onClick={() => { setWhen(true) }} style={{
              backgroundColor: showWhen ? "white" : "transparent"
            }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = showWhen ? 'trnaparent' : '#d5d5d5b4'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = showWhen ? 'white' : 'transparent'} >
              <h3>When</h3>
              {whenDay === 0 ? <p style={{ color: 'gray' }}>Add date</p> : <p>{whenDay} {months[whenMonth]} {whenYear}</p>}
              {showWhen &&
                <div className='web px-4 py-3' style={{
                  backgroundColor: 'white', width: '380px', borderRadius: '2rem', zIndex: 100,
                  boxShadow: '0 1px 10px rgba(0,0,0,0.1)', position: 'fixed', top: 'var(--header-mobile)', left: '50%', transform: 'translateX(-50%)',
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
              {whoNum === 0 ? <p style={{ color: 'gray' }}>Add number</p> : <p>{whoNum}</p>}
              {showWho &&
                <div className='web web-who-box' style={{
                  backgroundColor: 'white', width: 'auto', height: '60px', borderRadius: '2rem', zIndex: 100,
                  boxShadow: '0 1px 10px rgba(0,0,0,0.1)', position: 'fixed', top: 'var(--header-mobile)', transform: 'translateX(-75%)',
                }}>
                  <NumInput setValue={setWhoNum} initial={whoNum} />
                </div>}
            </div>
          </div>
          <FontAwesomeIcon icon={faMagnifyingGlass} className='web search-icon duration-500' style={{
            color: 'white', padding: '0.8rem', borderRadius: '50%', transform: 'translate(0%,-50%)'
          }} />
        </div>
        <div className='mobile px-6 xl:px-16 lg:px-8 search-bar-area header-top' style={{ top: '0px', paddingTop: '60px'}}>
          <div className='search-bar cursor-pointer' onClick={() => { setsearchClicked(true) }}>
            <div>
              {whereTo === '' && whoNum === 0 && whenDay === 0 ?
                <div className='flex flex-row justify-center items-center'>
                  <FontAwesomeIcon className='w-4' icon={faMagnifyingGlass} />
                  <p className='p-2'>Start your search</p>
                </div> :
                <div className='justify-center items-center text-center'>
                  <p>
                    {whereTo === '' ? 'Where to?' : whereTo}
                  </p>
                  <p style={{ fontSize: '0.9rem', color: 'gray' }}>
                    {whenDay === 0 ? 'Anytime ' : `${whenDay} ${months[whenMonth]}`} &#160;
                    {whoNum === 0 ? '' : whoNum === 1 ? `1 person` : `${whoNum} people`}
                  </p>
                </div>}
            </div>
          </div>
        </div>
        <div className='content-wrapper p-6 xl:px-16 lg:px-8 w-screen'>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-5 gap-y-8'>
            {exhibitions.map((exhibition) => (
            <Exhibition key={exhibition.id} json={exhibition} update={setExhibitions}/>
            ))}
          </div>
        </div>
      </div>
      {searchClicked &&
        <div className='mobile pt-12 p-4 sm:p-16 sm:pt-8 bg-gray-100 overflow-y-auto' style={{
          position: 'fixed', top: 0, left: 0, zIndex: 10, width: '100vw', height: '100vh'
        }}>
          <div id='tabWhere' className='cursor-pointer shadow-[0_1px_10px_rgba(0,0,0,0.1)] rounded-xl p-4 bg-white' style={{ margin: '1rem 0' }} onClick={openTab}>
            <div className='flex justify-between'>
              {openWhere ? <h2 style={{ marginBottom: '0.5rem' }}>Where to?</h2> : <h3>Where</h3>}
              {!openWhere &&
                <div>
                  {whereTo === '' ? <p>I&apos;m flexible</p> : <h3>{whereTo}</h3>}
                </div>}
            </div>
            <div>
              <SearchAddress showWhere={showWhere} openWhere={openWhere} whereTo={whereTo} setWhereTo={setWhereTo} />
            </div>
          </div>
          <div id='tabWhen' className='cursor-pointer shadow-[0_1px_10px_rgba(0,0,0,0.1)] rounded-xl p-4 bg-white' style={{ margin: '1rem 0' }} onClick={openTab}>
            <div className='flex justify-between'>
              {openWhen ? <h2>When are you available?</h2> : <h3>When</h3>}
              {!openWhen &&
                <div>
                  {whenDay === 0 ? <p>Add date</p> : <h3>{whenDay} {months[whenMonth]} {whenYear}</h3>}
                </div>}
            </div>
            {openWhen &&
              <div style={{ position: 'relative' }}>
                {!(month === today.getMonth() && year === today.getFullYear()) &&
                  <FontAwesomeIcon onClick={decrement} icon={faChevronLeft} className='p-4' style={{ position: 'absolute', top: '4px', left: 0 }} />}
                <FontAwesomeIcon onClick={increment} icon={faChevronRight} className='p-4' style={{ position: 'absolute', top: '4px', right: 0 }} />
                <Calendar year={year} month={month} selDay={whenDay} selMonth={whenMonth} selYear={whenYear} setDay={setWhenDay} setMonth={setWhenMonth} setYear={setWhenYear} />
              </div>}
          </div>
          <div id='tabWho' className='cursor-pointer shadow-[0_1px_10px_rgba(0,0,0,0.1)] rounded-xl p-4 bg-white' style={{ margin: '1rem 0' }} onClick={openTab}>
            <div className='flex justify-between'>
              {openWho ? <h2>Who&apos;s coming?</h2> : <h3>Who</h3>}
              {!openWho &&
                <div>
                  {whoNum === 0 ? <p>Add number</p> : <h3>{whoNum}</h3>}
                </div>}
            </div>
            {openWho &&
              <div>
                <NumInput setValue={setWhoNum} initial={whoNum} />
              </div>}
          </div>
          <div onClick={() => {
            setsearchClicked(false)
            setOpenWhere(true)
            setOpenWhen(false)
            setOpenWho(false)
          }} className='duration-200 cursor-pointer bg-gray-300 p-4 text-center rounded-xl hover:text-white hover:bg-[var(--main)]' style={{
            width: '100%'
          }}>Search</div>
        </div>
      }
    </>
  )
}