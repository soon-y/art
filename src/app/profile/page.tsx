'use client'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBell } from '@fortawesome/free-regular-svg-icons'

export default function Home() {
  return (
    <div className='w-screen min-h-screen'>
      <div className='content-wrapper-wo-searchbar pt-12 p-6 xl:px-16 lg:px-8'>
        <div className="pb-4 flex justify-between items-center w-full">
          <h1>Profile</h1>
          <FontAwesomeIcon icon={faBell} style={{ fontSize: '1.3rem', color: 'gray' }} />
        </div>


        <div className='grid grid-cols-[70px_1fr] gap-4'>
          <div className='bg-cover bg-center w-[100%] rounded-full aspect-[1]' style={{
            backgroundImage: `url('https://picsum.photos/id/64/100/100')`
          }}>
          </div>
          <div className="flex flex-col items-left text-left">
            <div>
              <h3>Suzi</h3>
              <p>suzi@email.com</p>
              <p>Joined in May 2020</p>
            </div>
          </div>
        </div>


        <h2>Support</h2>
        <ul>
          <li>
            Visit the Help Centre
          </li>
          <li>
            Get help with a safety issue
          </li>
          <li>
            How art works
          </li>
        </ul>
        <div>
          <button className='text-center px-4 py-3 text-black rounded-xl border w-[100%]'>Log out</button>
        </div>

      </div>
    </div>
  )
}