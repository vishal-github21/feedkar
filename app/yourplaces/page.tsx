
'use client'
import axios from 'axios';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
interface Place{
  id:string,
  link:string,
  name:string,
  balance:BigInteger  
}
const YourPlaces = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const clerk_id = searchParams.get('clerk_id');
  const name = searchParams.get('name');
  const [places,setplaces]=useState<Place[]>([])
  useEffect(() => {
    const fetchplaces = async () => {
      try {
        const response = await axios.get("/api/fetchyourplaces", {
          params: { userId: id }
        });
        const data = response.data;
        console.log(data);
        setplaces(data);
      } catch (err) {
        console.error("Error:", err);
      }
    };
    fetchplaces()
  }, []);
  return (
      
          <div className='shadow-xl bg-gradient-to-r from-[#dcd0da] pb-5 to-[#ccc5e3] min-h-screen w-full'>
            <div className='h-[28vh] bg-violet-950 shadow-md  text-5xl flex items-center px-24'>
              <div className='flex-col'>
                <div>Dashboard</div>
                <div className='text-base mt-2 pl-1'>user id : {id}</div>
              </div>
              <div className='float-right w-[70%]'>
              <Link href={{
        pathname: "/addplace",
        query: {
            id: id,
            clerk_id: clerk_id,
            name:name
        }}
    }>
                  <button className='px-3 py-1 rounded bg-orange-500 text-sm float-right'>Add place</button>
                </Link>
              </div>
            </div>
            <div>
            <div className=" mx-[18%] mt-8 h-[65vh] overflow-y-scroll custom-scrollbar scroll ">
          {places ? (
            places.map((place) => (
              <div
            key={place.id}
                className=" bg-gradient-to-bl from-[#ececec] to-[#ffffff] p-4 w-[100%] rounded-lg mt-4 shadow-md"
              >
                <h3 className="text-xl text-black font-bold">{place.name}</h3>
                <a href={place.link} className="text-sm font-mono border border-gray-400 border-dotted w-full py-1 px-4 rounded-md mt-1 flex items-center bg-gray-100 text-blue-600">
                  {place.link}
                </a>
                <span className='text-green-500 font-mono ml-[70%] mt-2'>BALANCE : {place.balance}</span>
                <span className='bg-blue-500 px-3 py-1 rounded-md ml-5 text-xs mt-12'><Link href={{
        pathname: "/addbalance",
        query: {
            placeid:place.id,
        }}
    }>Add balance</Link></span>
              </div>
            ))
          ) : (
            <div>No places found</div>
          )}
        </div>
            </div>
          </div>
      
  );
};

export default YourPlaces;
