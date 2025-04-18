import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface props {
  selDay: number
  selMonth: number
  selYear: number
  setDay: React.Dispatch<React.SetStateAction<number>>
  setMonthSelected: React.Dispatch<React.SetStateAction<number>>
  setYearSelected: React.Dispatch<React.SetStateAction<number>>
}

const Calendar: React.FC<props> = ({ selDay, selMonth, selYear, setDay, setMonthSelected, setYearSelected }) => {
  const months: string[] = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]
  const days: string[] = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  const [daysInMonth, setDaysInMonth] = useState<string[]>([])
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [clickedIndex, setClickedIndex] = useState<number | null>(null)
  const [theFirst, setTheFirst] = useState<Date>(new Date(selYear, selMonth, 1))
  const [theFirstDayOfWeek, setTheFirstDayOfWeek] = useState<number>(theFirst.getDay() === 0 ? 6 : theFirst.getDay() - 1)
  const today = new Date()
  const [month, setMonth] = useState<number>(selMonth)
  const [year, setYear] = useState<number>(selYear)

  useEffect(() => {
    setTheFirst(new Date(year, month, 1))
    setTheFirstDayOfWeek(theFirst.getDay() === 0 ? 6 : theFirst.getDay() - 1)
    updateDateArray()
    if ((selMonth === month && selYear === year && selDay !== 0)) {
      setClickedIndex(selDay + theFirstDayOfWeek - 1)
    } else {
      setClickedIndex(null)
    }
  }, [year, month])

  const updateDateArray = () => {
    const lastDate = new Date(year, month + 1, 0).getDate()
    let daycount: number = 1
    const newDaysInMonth: string[] = []

    for (let i = 0; i < 42; i++) {
      if (i >= theFirstDayOfWeek && daycount <= lastDate) {
        newDaysInMonth.push(daycount.toString())
        daycount++
      } else {
        newDaysInMonth.push('')
      }
    }
    setDaysInMonth(newDaysInMonth)
  }

  const updateValue = (day: string, index: number) => {
    if (day !== '') {
      setClickedIndex(index)
      setDay(parseInt(day))
      setMonthSelected(month)
      setYearSelected(year)
      setMonth(month)
      setYear(year)
    }
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
    if (month === today.getMonth() && year === today.getFullYear()) return
    if (month === 0) {
      setMonth(11)
      setYear((prev) => prev - 1)
    } else {
      setMonth((prev) => prev - 1)
    }
  }

  const reset = () => {
    setClickedIndex(null)
    setDay(0)
  }

  return (
    <>
      <div className='grid grid-cols-[20px_1fr_20px] justify-center py-4'>
        <ChevronLeft className={`opacity-50 cursor-pointer ${month === today.getMonth() && year === today.getFullYear() ? 'opacity-10 cursor-auto' : ''}`} onClick={decrement} />
        <p className="text-center font-bold select-none">{months[month]} {year}</p>
        <ChevronRight className='opacity-50 cursor-pointer' onClick={increment} />
      </div>
      <div className='grid grid-cols-7 select-none'>
        {days.map((day, index) => (
          <p className="text-sm text-center " key={index}>{day}</p>
        ))}
        {daysInMonth.map((day, index) => (
          <button key={index} disabled={today.getMonth() === month && today.getFullYear() === year && index < today.getDate() + theFirstDayOfWeek - 1 || day == ''}
            className={`
              rounded-full aspect-[1/1] disabled:opacity-25
              ${day === '' ? 'h-[0px]' : 'h-44px]'} 
              ${hoveredIndex === index && !(today.getMonth() === month && today.getFullYear() === year && index < today.getDate() + theFirstDayOfWeek - 1) ? 'border' : ''}
              ${clickedIndex === index ? 'bg-foreground text-primary-foreground' : 'text-foreground'}
            `}
            onClick={() => updateValue(day, index)}
            onMouseOver={() => day !== '' ? setHoveredIndex(index) : setHoveredIndex(null)}
            onMouseLeave={() => setHoveredIndex(null)} >
            <span>{day}</span>
          </button>
        ))}
      </div>
      <div className='flex justify-self-end'>{selDay !== 0 && 
        <span className='pb-4 px-4 cursor-pointer select-none' onClick={reset}> reset 
        </span>}
      </div>
    </>
  )
}

export default Calendar