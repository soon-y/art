import { useState, useEffect } from 'react'
import mapboxgl from 'mapbox-gl'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'

mapboxgl.accessToken = 'pk.eyJ1Ijoic29vbnkiLCJhIjoiY204bmxwZzFsMDIxZDJqc2MyajBrdmFoOSJ9.socb5Bc_Z_DNEfwbgfR18w'

interface props {
  showWhere: boolean
  openWhere: boolean
  whereTo: string
  setWhereTo: React.Dispatch<React.SetStateAction<string>>
}

type Place = {
  bbox: [number, number, number, number]
  center: [number, number]
  context: {
    id: string
    mapbox_id: string
    text: string
  }[]
  geometry: {
    type: string
    coordinates: [number, number]
  }
  id: string
  place_name: string
  place_type: string
  properties: {
    mapbox_id: string
    [key: string]: string | number | boolean | null
  }
  relevance: number
  text: string
  type: string
}

const SearchAddress: React.FC<props> = ({ showWhere, openWhere, whereTo, setWhereTo }) => {
  const [query, setQuery] = useState(whereTo)
  const [places, setPlaces] = useState<Place[]>([])

  // Fetch the search results from Mapbox Geocoding API
  const searchAddress = async (q: string) => {
    if (q.trim() === '') return
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${q}.json?access_token=${mapboxgl.accessToken}`
    )
    const data = await response.json()
    setPlaces(data.features) // Store the results in state
  }

  useEffect(() => {
  }, [query])

  return (
    <>
      <div>
        <input
          type="text" value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            searchAddress(e.target.value)
          }}
          placeholder="Search"
          className={`py-3 px-4 w-full border-gray-300 border rounded-xl text-[1rem]
              transition-all duration-300 
              md:w-[90%] md:px-[1px] md:py-[1px] md:border-none
              ${openWhere ? "block" : "hidden md:block"}`}
        />
      </div>

      {showWhere && places.length > 0 &&
        <div className='web p-3 web-where-box rounded-4xl' style={{
          overflowY: 'scroll',
          backgroundColor: 'white', width: 'var(--searchbar-width)', maxHeight: '500px', height: 'auto', zIndex: 100,
          boxShadow: '0 1px 10px rgba(0,0,0,0.1)', position: 'fixed', top: 'var(--header-mobile)'
        }}>
          {places.length > 0 ?
            (places.map((place) => (
              <div key={place.id} className='duration-500 cursor-pointer flex items-center hover:bg-gray-100 p-3 rounded-3xl' onClick={() => {
                setQuery(place.place_name)
                setWhereTo(place.place_name.split(", ").slice(0, 2).join(", "))
              }}>
                <FontAwesomeIcon icon={faLocationDot} className='pr-4' />
                <p>{place.place_name}</p>
              </div>))) :
            <p className='px-4 pt-3 pb-1' style={{ color: 'gray' }}>No results</p>}
        </div>}

      {openWhere &&
        <div className='mobile'>
          {(places.map((place) => (
            <div key={place.id} className='duration-500 cursor-pointer flex items-center hover:bg-gray-100 p-3 rounded-3xl' onClick={() => {
              setQuery(place.place_name)
              setWhereTo(place.place_name.split(", ").slice(0, 2).join(", "))
            }}>
              <FontAwesomeIcon icon={faLocationDot} className='pr-4' />
              <p>{place.place_name}</p>
            </div>)))}
        </div>}
    </>
  )
}

export default SearchAddress
