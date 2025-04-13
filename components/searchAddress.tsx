import { useState, useEffect } from 'react'
import mapboxgl from 'mapbox-gl'
import { MapPin } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from './ui/input'

mapboxgl.accessToken = 'pk.eyJ1Ijoic29vbnkiLCJhIjoiY204bmxwZzFsMDIxZDJqc2MyajBrdmFoOSJ9.socb5Bc_Z_DNEfwbgfR18w'

interface props {
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

const SearchAddress: React.FC<props> = ({ whereTo, setWhereTo }) => {
  const [query, setQuery] = useState(whereTo)
  const [places, setPlaces] = useState<Place[]>([])
  
  const searchAddress = async (q: string) => {
    if (q.trim() === '') return
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${q}.json?access_token=${mapboxgl.accessToken}`
    )
    const data = await response.json()
    setPlaces(data.features) // Store the results in state
  }

  return (
    <>
      <div className='web'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Input className='border-none px-6 focus:outline-none focus-visible:ring-0'
              type="text"
              name="Address"
              placeholder="Search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                searchAddress(e.target.value)
              }}
            />
          </DropdownMenuTrigger>
          {places.length > 0 &&
            <DropdownMenuContent className="web w-content mt-4" align="start">
              <DropdownMenuRadioGroup>
                {(places.map((place) => (
                  <DropdownMenuRadioItem key={place.id} className="flex gap-2" value="light" onClick={() => {
                    setWhereTo(place.place_name)
                    setQuery(place.place_name)
                  }}>
                    <MapPin size={14} />
                    <span>{place.place_name}</span>
                  </DropdownMenuRadioItem>)
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>}
        </DropdownMenu>
      </div>
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
            }}>
              <MapPin size={20}/>
              <span>{place.place_name}</span>
            </div>)
          ))}
      </div>
    </>
  )
}

export default SearchAddress
