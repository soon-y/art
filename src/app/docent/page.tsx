'use client'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFaceLaughWink } from '@fortawesome/free-regular-svg-icons'

export default function Home() {
  return (
    <div className='content-wrapper-wo-searchbar '>
      <div className='mobile bg-cover bg-center w-screen h-screen  p-6 xl:px-16 lg:px-8' style={{
        backgroundImage: `url('/background-sl.jpg')`
      }}>

        <div></div>

      <div className="w-[50px] h-[50px] bg-white rounded-full" style={{
        position: 'absolute', left: '50%' ,bottom: 'var(--nav-height)', transform: 'translate(-50%, -50%)'
       }}>

      </div>











      </div>

      <div className="web h-[90vh] text-center flex flex-col items-center justify-center bg-gray-100">
        <div>
        <FontAwesomeIcon icon={faFaceLaughWink} style={{ fontSize: '4rem'}}/>
        <h2 className="p-3">Only available on app</h2>
        </div>
        </div>
    </div>
  )
}