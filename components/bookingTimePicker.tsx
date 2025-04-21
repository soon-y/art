'use client'

import { Button } from "@/components/ui/button"
import Calendar from '@/components/calendar'

interface BookingTimePickerProps {
  whenDay: number
  whenMonth: number
  whenYear: number
  whenHour: number
  setWhenDay: React.Dispatch<React.SetStateAction<number>>
  setWhenMonth: React.Dispatch<React.SetStateAction<number>>
  setWhenYear: React.Dispatch<React.SetStateAction<number>>
  setWhenHour: React.Dispatch<React.SetStateAction<number>>
  dateFrom: string
  dateTo: string
}

const BookingTimePicker: React.FC<BookingTimePickerProps> = ({
  whenDay, whenMonth, whenYear, whenHour,
  setWhenDay, setWhenMonth, setWhenYear, setWhenHour,
  dateFrom, dateTo }) => {
  const timeSlots = [10, 11, 13, 14, 15, 16]
  const now = new Date()
  const isToday =
    whenDay === now.getDate() &&
    whenMonth === now.getMonth() &&
    whenYear === now.getFullYear()

  const reset = () => { setWhenHour(0) }

  return (
    <>
      <div className='border-t' id='selectDate'>
        <h3 className='mt-6 text-xl font-semibold'>When you&apos;ll visit</h3>
        <div className='grid grid-cols-1 md:grid md:grid-cols-[7fr_3fr] md:gap-8 lg:grid-cols-[6fr_4fr] lg:gap-10'>
          <div onClick={reset}>
            <Calendar selDay={whenDay} selMonth={whenMonth} selYear={whenYear}
              setDay={setWhenDay} setMonthSelected={setWhenMonth} setYearSelected={setWhenYear}
              dateFrom={dateFrom} dateTo={dateTo} />
          </div>
          {whenDay !== 0 && (
            <div className='grid grid-cols-3 gap-4 my-4 md:gap-4 md:grid-cols-1 md:grid-rows-6 lg:gap-6'>
              {timeSlots.map((hour) => {
                const isPast = isToday && hour <= now.getHours()
                return (
                  <Button key={hour} className='md:h-full border'
                    variant={whenHour === hour ? 'secondary' : 'outline'}
                    onClick={() => setWhenHour(hour)}
                    disabled={isPast}
                  >
                    {hour}:00
                  </Button>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default BookingTimePicker
