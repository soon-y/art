import Searchbar from "@/components/searchbar"
import Navigation from "@/components/navigation"
// import Exhibition from '@/components/exhibition'

// interface Exhibition {
//   id: number
//   name: string
//   title: string
//   price: number
//   imgID: number
//   content: string
//   bookmark: boolean
//   address: string
// }


export default async function Home() {
  return (
    <>
      <Navigation />
      <Searchbar />

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-5 gap-y-8'>
      {/* {exhibitions.map((exhibition) => (
            <Exhibition key={exhibition.id} json={exhibition} update={setExhibitions}/>
            ))} */}

      </div>
    </>
  )
}