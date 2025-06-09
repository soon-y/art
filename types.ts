export interface ExhibitionData {
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

export interface HistoryData {
  id: number
  ex_id: number
  booked_time: string
  booking_time: string
  exhibition: ExhibitionData 
}

export interface BookingData {
  id: number
  address: string
  who: number
  booked_time: string
  booking_time: string
  exhibition: ExhibitionData
}
