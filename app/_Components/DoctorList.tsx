import { Doctor } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const DoctorList = ({doctorsList,loading}:{doctorsList:Doctor[],loading:Boolean}) => {
  return (
    <div className='mt-5 mb-10 '>
   <h2 className='font-bold text-2xl'> Here are popular doctors</h2>
    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-5'>
        {loading && doctorsList?.length <1 &&   [1,2,3,4,5,6,7,8].map((item,index)=>(
      <div className=' h-[200px] bg-slate-200 rounded-lg animate-pulse' key={index}></div>
    ))}

     {!loading && doctorsList?.length <1 && <h2 className='text-center text-2xl font-bold text-red-500'>No Doctor's found....</h2>}
        {doctorsList?.length >=1 &&doctorsList?.map((doctor:Doctor,index:number)=>{
         return(
            <div key={index} className='shadow-md rounded-lg hover:shadow-lg hover:shadow-primary cursor-pointer hover:scale-105
            transition-all p-3 ease-in-out'>
                <Image src={doctor?.image?.url||'/default.jpg'} alt={doctor?.name}
                width={500}
                height={200}
                className='h-[150px] md:h-[220px] object-cover rounded-lg border-2'
                />
                
                <div className='flex flex-col items-baseline p-3 gap-1'>
                <h2 className='p-2 bg-blue-100 rounded-full px-2 text-primary text-xs font-semibold'>{doctor?.category[0]?.name}</h2>
                <h2 className='text-lg  font-semibold'>{doctor?.name}</h2>
                <h2 className=' text-[14px] text-primary font-bold'>{doctor.yearsOfExperaince} years of experiance</h2>
                <h2 className='text-gray-800 font-semibold text-sm'>{doctor.patients} patients treated</h2>
               
                <Link href={`/details/${doctor?.id}`}
                 className='rounded-full mt-3 font-semibold hover:bg-blue-700 hover:font-bold text-center bg-primary text-white p-3 mx-auto w-full'>
                Book Now</Link>

                
                </div>
               
            </div>
         )
        })}
    </div>
</div>
  )
}

export default DoctorList