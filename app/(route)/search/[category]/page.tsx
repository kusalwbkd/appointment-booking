"use client"
import DoctorList from '@/app/_Components/DoctorList'
import { getDoctoresbyCategory } from '@/app/_services/GlobalApi'
import { Doctor } from '@/types'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const DoctorsByCategoryPage = () => {
  const { category } = useParams() as { category: string }
  const[loading,setLoading]=useState(false)
    const[doctorsList,setDoctorsList]=useState<Doctor[]>([])

    useEffect(()=>{
      getCategoriedDoctors()
    },[category])

  const getCategoriedDoctors=async()=>{
    setLoading(true)
    try {
      const response= await getDoctoresbyCategory({categoryName:category}) 
      setDoctorsList(response?.doctors)
   
     
    } catch (error) {
      console.log(error);
      
    }finally{
      setLoading(false)
    }
  }

  if(!loading && !doctorsList?.length){
    return <h1 className='text-center text-4xl font-bold text-primary'>No Doctors are in for  {category} </h1>
}
  return (
    <div>
       <DoctorList doctorsList={doctorsList} loading={loading} />
    </div>
  )
}

export default DoctorsByCategoryPage