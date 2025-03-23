import { useState, useEffect } from 'react'

export default function Calendar(props: any) {
  const months: string[] = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]
  const days: string[] = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  const theFirst = new Date(props.year, props.month, 1)
  const theFirstDayOfWeek = (theFirst.getDay() === 0 ? 6 : theFirst.getDay() - 1)
  const lastDate = new Date(props.year, props.month + 1, 0).getDate()
  const [daysInMonth, setDaysInMonth] = useState<string[]>([])
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [clickedIndex, setClickedIndex] = useState<number | null>(null)

  useEffect(() => {
    updateDateArray()
  }, [props.year, props.month])

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
      props.setValue(day + " " + months[props.month] + " " + props.year)
    }
  }

  return (
    <div className='w-[100%]'>
      <div className='font-bold text-center p-3 text-base'>{months[props.month]} {props.year}</div>
      <div className='grid grid-cols-7'>
        {days.map((day, index) => (
          <p style={{ fontSize: '0.9rem', textAlign: 'center', paddingBottom: '0.5rem' }} key={index}>{day}</p>
        ))}
        {daysInMonth.map((day, index) => (
          <p key={index} style={{
            cursor: day === '' ? 'auto' : 'pointer',
            fontSize: '1rem', textAlign: 'center', margin: '0.1rem', padding: '0.6rem 0.1rem', borderRadius: '50%',
            border: hoveredIndex === index || clickedIndex === index ? '2px solid black' : '2px solid white',
            background: clickedIndex === index ? 'black' : 'none',
            color: clickedIndex === index ? 'white' : 'black',
          }}
            onClick={() => updateValue(day, index)}
            onMouseOver={() => day !== '' ? setHoveredIndex(index) : setHoveredIndex(null)}
            onMouseLeave={() => setHoveredIndex(null)} >{day}</p>
        ))}
      </div>
    </div>
  )
}
