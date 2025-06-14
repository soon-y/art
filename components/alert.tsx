'use client'

import { TriangleAlert } from 'lucide-react'
import { ReactNode } from 'react'

export default function Alert({msg} : {msg: ReactNode}) {

  return (
      <div className='fixed left-0 top-0 w-screen h-screen flex backdrop-blur-sm z-10'>
        <div className='bg-muted border rounded-xl px-6 py-4 m-auto flex flex-col items-center shadow-xl'>
        <TriangleAlert className='w-20 h-10 text-[#ff9100]'/>
        <div className='text-center mt-2 text-foreground'>
          {msg}
        </div>
        </div>
      </div>
  )
}