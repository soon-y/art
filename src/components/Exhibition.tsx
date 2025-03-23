import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark  } from '@fortawesome/free-solid-svg-icons'

export default function Exhibition() {
  return (
    <div className='w-[100%]'>
      <div className='bg-cover bg-center w-[100%] rounded-2xl aspect-[1]' style={{ 
        backgroundImage: `url('https://picsum.photos/id/122/300/300')`
        }}>
          <FontAwesomeIcon className='w-[1rem]' icon={faBookmark} style={{ 
            position: 'relative', left: 'calc(100% - 2rem)', top: '1rem',  
            color:'rgba(0, 0, 0, 0.27)', stroke: 'rgba(255,255,255,1)', strokeWidth: '50px',
            paintOrder: 'fill'}}/>
        </div>
      <div style={{ padding: '0 0.2rem' }}>
        <h3 style={{ marginTop: '0.5rem'}}>Title</h3>
        <p>exhibition name</p>
        <p>Period</p>
        <p>address</p>
        <h3>€ Price</h3>
      </div>
    </div>
  )
}
