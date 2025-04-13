import { Bookmark } from 'lucide-react'

interface props_json {
  id: number
  name: string
  title: string
  price: number
  imgid: number
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
    imgid: number
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
    // try {
    //   const res = await fetch(`/api/exhibition/${id}`, {
    //     method: 'PATCH',
    //   })
  
    //   if (!res.ok) throw new Error('Failed to update bookmark')
  
    //   const updatedExhibition = await res.json()
  
    //   update((prev) =>
    //     prev.map((ex) =>
    //       ex.id === id ? { ...ex, bookmark: updatedExhibition.bookmark } : ex
    //     )
    //   )
  
    //   updated(true)
    // } catch (error) {
    //   console.error('Error toggling bookmark:', error)
    // }
  }
  

  return (
    <div className='w-[100%]'>
      <div className='bg-cover bg-center w-[100%] rounded-2xl aspect-[1]' style={{
        backgroundImage: `url('https://picsum.photos/id/${json.imgid}/300/300')`
      }}>
        <Bookmark className={`duration-500 cursor-pointer relative left-[calc(100%-2.2rem)] top-3 text-white ${json.bookmark ? 'fill-primary' : 'opacity-50'}`}
          onClick={() => toggleBookmark(json.id)} />
      </div>
      <div className='py-4'>
        <h3 className='text-lg font-bold'>{json.title}</h3>
        <p style={{ color: 'gray' }}>{json.name}</p>
        <h3>€ {json.price}</h3>
      </div>
    </div>
  )
}

export default Exhibition
