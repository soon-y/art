'use client'

import { TriangleAlert } from 'lucide-react'
import { ReactNode } from 'react'

export default function Alert({msg} : {msg: ReactNode}) {

  return (
      <div className='fixed left-0 top-0 w-screen h-screen flex backdrop-blur-sm z-10'>
        <div className='bg-white border rounded-xl p-6 m-auto flex flex-col items-center shadow-xl'>
        <TriangleAlert className='w-20 h-10 text-[#ff9100]'/>
        <p className='text-center font-medium mt-2 text-gray-800'>
          {msg}
        </p>
        </div>
      </div>
  )
}