import { useState, useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
import { MapPin } from 'lucide-react'
import { Input } from './ui/input'

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOXGL

interface props {
  whereTo: string
  setWhereTo: React.Dispatch<React.SetStateAction<string>>
  setLatitude: React.Dispatch<React.SetStateAction<number>>
  setLongitude: React.Dispatch<React.SetStateAction<number>>
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

const SearchAddress: React.FC<props> = ({ whereTo, setWhereTo, setLatitude, setLongitude }) => {
  const [query, setQuery] = useState(whereTo)
  const [places, setPlaces] = useState<Place[]>([])
  const [whereClicked, setwhereClicked] = useState<boolean>(false)
  const searchInput = useRef<HTMLDivElement>(null)
  const searchResult = useRef<HTMLDivElement>(null)

  const searchAddress = async (q: string) => {
    if (q.trim() === '') return
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${q}.json?access_token=${mapboxgl.accessToken}`
    )
    const data = await response.json()
    setPlaces(data.features)
  }

  useEffect(() => {
    setQuery(whereTo)
  }, [whereTo])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchInput.current && searchResult.current &&
        !(searchInput.current.contains(event.target as Node) || (searchResult.current.contains(event.target as Node)))) {
        setwhereClicked(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <>
      <div className='web' ref={searchInput} onClick={() => setwhereClicked(true)}>
        {whereTo ? <input className='ml-6 w-[80%] bg-transparent border-none focus:outline-none focus-visible:ring-0'
          type="text"
          name="Address"
          placeholder="Search"
          value={query}
          onChange={(e) => {
            setwhereClicked(true)
            setQuery(e.target.value)
            searchAddress(e.target.value)
          }}
        /> :
          <div className="ml-5 animate-pulse bg-muted w-24 h-5 rounded-lg"></div>
        }
      </div>
      {whereClicked &&
        <div className='web fixed top-[60px] left-0 max-w-full' ref={searchResult}>
          {places.length > 0 &&
            <div className='mt-4 bg-background p-3 rounded-2xl border shadow-xl'>
              {(places.map((place) => (
                <div key={place.id} className="grid grid-cols-[20px_1fr] hover:bg-muted p-3 rounded-xl" onClick={() => {
                  setWhereTo(place.place_name)
                  setQuery(place.place_name)
                  setwhereClicked(false)
                  setLatitude(place.center[0])
                  setLongitude(place.center[1])
                }}>
                  <MapPin size={20} />
                  <span className='pl-2'>{place.place_name}</span>
                </div>)
              ))}
            </div>}
        </div>
      }

      <div className='mobile'>
        <Input className='my-3 p-3'
          type="text"
          name="Address"
          placeholder="Search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            searchAddress(e.target.value)
          }}
        />
        {places.length > 0 &&
          (places.map((place) => (
            <div key={place.id} className="grid grid-cols-[20px_1fr] gap-2 py-2" onClick={() => {
              setWhereTo(place.place_name)
              setQuery(place.place_name)
              setLatitude(place.center[0])
              setLongitude(place.center[1])
            }}>
              <MapPin size={20} />
              <span>{place.place_name}</span>
            </div>)
          ))}
      </div>
    </>
  )
}

export default SearchAddress