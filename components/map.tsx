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
      center: [9.921424, 53.544866],
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
      .setLngLat([9.921424, 53.544866])
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