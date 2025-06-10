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
  who: number
  exhibition: ExhibitionData 
}

export interface BookingData {
  id: number
  address: string
  latitude: number
  longitude: number
  who: number
  booked_time: string
  booking_time: string
  exhibition: ExhibitionData
}

export interface SearchItem {
  id: number
  address: string
  date: string
  who: number
  latitude: number
  longitude: number
}