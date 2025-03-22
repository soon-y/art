import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faCalendar, faCircleUser, faUser } from '@fortawesome/free-regular-svg-icons';
import { faMagnifyingGlass, faLocationDot  } from '@fortawesome/free-solid-svg-icons';

export default function Home() {
  return (
    <>
      <div className="flex flex-col w-screen h-auto">
        <header className="p-6 xl:px-16 lg:px-8 w-screen">
          <div className="web w-[100%] grid grid-cols-[70px_1fr_30px] gap-16 items-center">
            <Image src="/art.svg" alt="art logo" width={70} height={35} priority />
            <div className="search-bar grid grid-cols-[1fr_1fr_1fr]">
              <div className="search-item flex items-center"><FontAwesomeIcon className="nav-icon" icon={faLocationDot} style={{ margin: '0 0.5rem 0 1rem' }}/><p>Where</p></div>
              <div className="search-item flex items-center"><FontAwesomeIcon className="nav-icon" icon={faCalendar} style={{ margin: '0 0.5rem 0 1rem' }}/><p>When</p></div>
              <div className="search-item flex items-center">
                <FontAwesomeIcon className="nav-icon" icon={faUser} style={{ margin: '0 0.5rem 0 1rem' }}/><p>Who</p>
                <FontAwesomeIcon className="w-[36px] p-2 rounded-full text-white" style={{ 
                  backgroundColor: 'var(--main)', position:'absolute' , right: '.5rem'
                  }} icon={faMagnifyingGlass} />
              </div>
            </div>
            <div className="w-[30px]">
              <FontAwesomeIcon style={{ color: 'var(--darkgrey)' }} icon={faCircleUser} />
            </div>
          </div>
          <div className="mobile search-bar">
            <div className="flex flex-row justify-center">
              <FontAwesomeIcon className="w-4" icon={faMagnifyingGlass} />
              <p className="p-2">Start your search</p>
            </div>
          </div>
        </header>
        <div className="container">
          <div>
            <div></div>
          </div>
        </div>
      </div>
      <div className="mobile nav-bar pt-3 pb-8">
        <div className="flex flex-row items-center justify-center">
          <div className="flex-1 flex flex-col items-center justify-center ">
            <FontAwesomeIcon className="nav-icon" icon={faMagnifyingGlass} />
            <p>Explore</p>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center ">
            <FontAwesomeIcon className="nav-icon" icon={faBookmark} />
            <p>Explore</p>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center ">
            <FontAwesomeIcon className="nav-icon" icon={faCalendar} />
            <p>Explore</p>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center ">
            <FontAwesomeIcon className="nav-icon" icon={faCalendar} />
            <p>Explore</p>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center ">
            <Image src="/ar.svg" width={30} height={24} alt="ar" />
            <p>Docent</p>
          </div>
        </div>
      </div>
    </>
  );
}
