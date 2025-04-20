import { Button } from '@/components/ui/button';
import { BookingData } from '@/types'
import { Calendar, Clock } from 'lucide-react';
import Image from 'next/image';
import React from 'react'
import CancelAppointment from './CancelAppointment';

const BookingList = ({list,type}:{list:BookingData[],type:string}) => {
  
 
  return(
    <div>
        {list?.map((item:BookingData,index:number)=>{
            return(
                 <div key={index}
                 className={`flex gap-4 items-center border p-3 m-3 rounded-lg ${type==='upcoming'?'bg-blue-50':'bg-gray-100'}
                 flex-col md:flex-row
                 `}>
                    <Image src={item?.doctor?.image?.url} alt={item?.doctor?.name} width={70} height={70}
                    className='rounded-full h-[70px] w-[70px] object-cover'
                    />
                    <div className='flex flex-col gap-2 items-baseline w-full '>
                        <h2 className='font-bold text-[18px] text-primary'>{item?.doctor?.name}

                     
                        </h2>
                        <h2 className='p-2 bg-blue-100 rounded-full px-2 text-primary text-xs font-semibold'>{item?.doctor?.category[0]?.name}</h2>

                        <h2 className='flex gap-2'>
                            <Calendar className='text-primary'/>
                            {item?.date}
                            
                            </h2>

                           

                            <h2 className='flex gap-2'>
                            <Clock className='text-primary'/>
                            {item?.time}
                            
                            </h2>
                    </div>

                    {type==='upcoming' && <CancelAppointment id={item?.id}/>} 
                 </div>
            )
        })}
    </div>
  )
}

export default BookingList