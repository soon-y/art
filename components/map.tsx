import { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
mapboxgl.accessToken = 'pk.eyJ1Ijoic29vbnkiLCJhIjoiY204bmxwZzFsMDIxZDJqc2MyajBrdmFoOSJ9.socb5Bc_Z_DNEfwbgfR18w'

const Map: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null)
  const map = useRef<mapboxgl.Map | null>(null)

  useEffect(() => {
    if (map.current || !mapContainer.current) return

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [127.024612, 37.532600],
      zoom: 14,
      scrollZoom: false,
      dragPan: true,
      dragRotate: true,
      touchZoomRotate: false,
      doubleClickZoom: false,
      keyboard: false,
    })

    new mapboxgl.Marker({
      color: "#ff9501",
    })
      .setLngLat([127.024612, 37.532600])
      .addTo(map.current)
  }, [])

  return (
    <div
      ref={mapContainer}
      className='w-full h-[400px] rounded-2xl overflow-hidden mb-8'
    />
  )
}

export {Map}