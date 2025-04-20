"use client"
import Loading from '@/app/_Components/Loading'
import { getDoctoresDetailsbyId } from '@/app/_services/GlobalApi'
import { Button } from '@/components/ui/button'
import { Doctor } from '@/types'
import { Clock, GraduationCap, User } from 'lucide-react'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Appointment from './_components/Appointment'
import { generateTimeSlots } from '@/lib/timeSlots'

const DetailsPage = () => {
  const { doctorId } = useParams() as { doctorId: string }
  const [doctorDetails, setDoctorDetails] = useState<Doctor>()
  const [loading, setLoading] = useState(false)
  const [timeSlots, setTimeSlots] = useState<string[]>([])
  useEffect(()=>{
    doctorId && getDoctorDetails()
  },[doctorId])
  const getDoctorDetails = async () => {
    setLoading(true)
    try {
      const result = await getDoctoresDetailsbyId({ doctorId: doctorId })
      setDoctorDetails(result?.doctors[0])
     console.log(result);
     
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false)
    }

  }

  useEffect(()=>{
     setTimeSlots(generateTimeSlots(doctorDetails?.startTime||'12',doctorDetails?.endTime||'13'))
  },[doctorDetails,doctorId])

  if (!doctorDetails && !loading) {
    return null
  }
  if (loading) {
    return <Loading />
  }


  
  return (
    <>
      <div className=' px-10 md:px-36 mx-auto max-w-screen my-6 h-screen'>
        <h2 className='font-bold text-3xl text-center'>Doctor details</h2>
    <div className=' grid grid-cols-1 md:grid-cols-3 mt-6 rounded-lg  border-[2px] gap-4' >
 
       <div>
     
         <Image src={doctorDetails?.image?.url ||'/doctor.jpg'} width={200} height={200} alt='doctor-img' className='rounded-lg object-cover h-[350px] w-full '/>
       </div>

       <div className=' col-span-2 mt-8 flex flex-col gap-3 items-baseline px-4 md:px-8'> 
        <h2 className='font-bold text-xl'>{doctorDetails?.name}</h2>
        <h2 className='p-2 bg-blue-100 rounded-full px-2 text-primary text-xs font-semibold'>{doctorDetails?.category[0]?.name}</h2>
        <h2 className='flex gap-2 items-center '><GraduationCap/><span className='text-primary'>{doctorDetails?.yearsOfExperaince}</span> years of experaince</h2>
        <h2 className='flex gap-2 items-center '><User/><span className='text-primary'>{doctorDetails?.patients}</span> patients treated</h2>
        <h2 className='flex gap-2 items-center '><Clock/><span className='text-primary'>{doctorDetails?.startTime}</span> - <span className='text-primary'>{doctorDetails?.endTime}</span></h2>
      
         <Appointment timeSlots={timeSlots} doctorId={doctorId}/>
       </div>
    
    </div>

    <div className='border-[1px] rounded-lg mt-5 p-5'>
        <h2 className='font-bold text-2xl mt-2'>About me</h2>
        <p className='text-gray-500 tracking-wide mt-2'>{doctorDetails?.about}</p>
       </div>
    </div>

     
    </>
  
  )
}

export default DetailsPage