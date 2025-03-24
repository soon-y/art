import { useState, useEffect } from 'react'

interface props {
  year: number
  month: number
  selDay: number
  selMonth: number
  selYear: number
  setDay: React.Dispatch<React.SetStateAction<number>>
  setMonth: React.Dispatch<React.SetStateAction<number>>
  setYear: React.Dispatch<React.SetStateAction<number>>
}

const Calendar: React.FC<props> = ({ year, month, selDay, selMonth, selYear, setDay, setMonth, setYear }) => {
  const months: string[] = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]
  const days: string[] = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  const theFirst = new Date(year, month, 1)
  const theFirstDayOfWeek = (theFirst.getDay() === 0 ? 6 : theFirst.getDay() - 1)
  const lastDate = new Date(year, month + 1, 0).getDate()
  const [daysInMonth, setDaysInMonth] = useState<string[]>([])
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [clickedIndex, setClickedIndex] = useState<number | null>(null)
  const today = new Date()

  useEffect(() => {
      updateDateArray()
    if ((selMonth === month && selYear === year && selDay !== 0)) {
      setClickedIndex(selDay + theFirstDayOfWeek - 1)
    } else {
      setClickedIndex(null)
    }
  }, [year, month])

  const updateDateArray = () => {
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
      setMonth(month)
      setYear(year)
    }
  }

  const reset = () => {
    setClickedIndex(null)
    setDay(0)
  }

  return (
    <div className='w-[100%]'>
      <div className='font-bold text-center p-3 text-base'>{months[month]} {year}</div>
      <div className='grid grid-cols-7'>
        {days.map((day, index) => (
          <p style={{ fontSize: '0.9rem', textAlign: 'center', paddingBottom: '0.5rem' }} key={index}>{day}</p>
        ))}
        {daysInMonth.map((day, index) => (
          <button key={index} disabled={ selMonth === month && selYear === year && index < today.getDate() + theFirstDayOfWeek-1 || day == '' } style={{
            msTransitionDuration: '300ms', transitionDuration: '300ms', WebkitTransitionDuration: '300ms',
            fontSize: '1rem', textAlign: 'center', borderRadius: '50%', width: '100%', aspectRatio: day === '' ? 0 : 1,
            border: hoveredIndex === index && !(selMonth === month && selYear === year && index < today.getDate() + theFirstDayOfWeek-1) ? '2px solid black' : 'none',
            background: clickedIndex === index ? 'black' : 'none',
            color: selMonth === month && selYear === year && index < today.getDate() + theFirstDayOfWeek - 1 ? 'var(--deactivate)' : (clickedIndex === index ? 'white' : 'black')
          }} 
            onClick={() => updateValue(day, index)}
            onMouseOver={() => day !== '' ? setHoveredIndex(index) : setHoveredIndex(null)}
            onMouseLeave={() => setHoveredIndex(null)} >{day}</button>
        ))}
        {selDay !== 0 && <p className='px-4 pb-1 pointer-cursor' onClick={reset}> reset </p>}
      </div>
    </div>
  )
}

export default Calendar