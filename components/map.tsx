import { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOXGL

interface Props{
  lat: number,
  lon: number,
}

const Map: React.FC<Props> = ({lat, lon}) => {
  const mapContainer = useRef<HTMLDivElement | null>(null)
  const map = useRef<mapboxgl.Map | null>(null)

  useEffect(() => {
    if (map.current || !mapContainer.current) return

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [lat, lon],
      zoom: 14,
      scrollZoom: false,
      dragPan: true,
      dragRotate: true,
      touchZoomRotate: false,
      doubleClickZoom: false,
      keyboard: false,
    })

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right')

    new mapboxgl.Marker({
      color: "#ff9501",
    })
      .setLngLat([lat, lon])
      .addTo(map.current)
  }, [])

  return (
    <div
      ref={mapContainer}
      className='w-full h-[400px] rounded-2xl overflow-hidden mb-8'
    />
  )
}

export { Map }