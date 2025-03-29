import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark } from '@fortawesome/free-solid-svg-icons'

interface props_json {
  id: number
  name: string
  title: string
  price: number
  imgID: number
  content: string
  bookmark: boolean
  address: string
}

interface props {
  json: {
    id: number
    name: string
    title: string
    price: number
    imgID: number
    content: string
    bookmark: boolean
    address: string
  }
  update?: React.Dispatch<React.SetStateAction<props_json[]>>
  updated?: React.Dispatch<React.SetStateAction<boolean>>
}

const Exhibition: React.FC<props> = ({
  json,
  update = () => { },
  updated = () => { },
}) => {
  const toggleBookmark = async (id: number) => {
    try {
      const res = await fetch(`/api/exhibition/${id}`, {
        method: 'PATCH',
      });

      if (!res.ok) throw new Error('Failed to update bookmark');

      const updatedExhibition = await res.json();

      update((prev) =>
        prev.map((ex) =>
          ex.id === id ? { ...ex, bookmark: updatedExhibition.bookmark } : ex
        )
      )
      updated(true)
    } catch (error) {
      console.error('Error toggling bookmark:', error);
    }
  }

  return (
    <div className='w-[100%]'>
      <div className='bg-cover bg-center w-[100%] rounded-2xl aspect-[1]' style={{
        backgroundImage: `url('https://picsum.photos/id/${json.imgID}/300/300')`
      }}>
        <FontAwesomeIcon icon={faBookmark} onClick={() => toggleBookmark(json.id)} style={{
          position: 'relative', left: 'calc(100% - 2rem)', top: '1rem', cursor: 'pointer',
          color: json.bookmark ? 'var(--main)' : 'rgba(0, 0, 0, 0.27)', stroke: 'rgba(255,255,255,1)', strokeWidth: '50px',
          paintOrder: 'fill', fontSize: '1.2rem', transitionDuration: '500ms'
        }} />
      </div>
      <div style={{ padding: '0 0.2rem', lineHeight: 1.4 }}>
        <h3 style={{ marginTop: '0.5rem' }}>{json.title}</h3>
        <p style={{ color: 'gray' }}>{json.name}</p>
        <h3>€ {json.price}</h3>
      </div>
    </div>
  )
}

export default Exhibition
