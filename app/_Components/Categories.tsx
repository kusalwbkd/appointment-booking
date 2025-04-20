import { DoctorCategory } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Categories = ({categories}:{categories:DoctorCategory[]}) => {
  return (
    <div className='mx-4 md:mx-20 lg:mx-52 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-8'>
            {categories?.length < 1 && [1,2,3,4,5,6].map((item,index)=>(
         <div className='h-[120px] w-full bg-slate-400 rounded-lg animate-pulse' key={index}>

         </div>
        ))}
    {categories?.map((category:DoctorCategory,index:number)=>{
       return(
        <Link key={index} href={`/search/${category?.name}`}
        className='flex flex-col gap-2 items-center p-4 bg-blue-100 rounded-lg 
        justify-center text-center text-sm md:text-md text-primary font-semibold hover:bg-primary hover:text-white
        cursor-pointer hover:scale-110 transition-all ease-in-out
        '>
         <Image src={category?.icon?.url} alt='icon' width={40} height={40}/>
         <h2>{category?.name}</h2>
        </Link>
       )
    })}
    </div>
  )
}

export default Categories