import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark } from '@fortawesome/free-solid-svg-icons'

export default function Exhibition() {
  const [bookmarked, setBookmark] = useState<boolean>(false)

  return (
    <div className='w-[100%]'>
      <div className='bg-cover bg-center w-[100%] rounded-2xl aspect-[1]' style={{ 
        backgroundImage: `url('https://picsum.photos/id/128/300/300')`
        }}>
          <FontAwesomeIcon icon={faBookmark} onClick={() => setBookmark((prev) => !prev)} style={{ 
            position: 'relative', left: 'calc(100% - 2rem)', top: '1rem', cursor: 'pointer',
            color: bookmarked ? 'var(--main)' : 'rgba(0, 0, 0, 0.27)', stroke: 'rgba(255,255,255,1)', strokeWidth: '50px',
            paintOrder: 'fill', fontSize: '1.2rem', transitionDuration: '500ms'}}/>
        </div>
      <div style={{ padding: '0 0.2rem', lineHeight: 1.4 }}>
        <h3 style={{ marginTop: '0.5rem'}}>Title</h3>
        <p style={{ color: 'gray' }}>exhibition name</p>
        <p style={{ color: 'gray' }}>period</p>
        <h3>€ Price</h3>
      </div>
    </div>
  )
}
