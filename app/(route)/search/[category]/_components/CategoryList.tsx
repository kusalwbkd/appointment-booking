"use client"
import React, { useEffect, useState } from 'react'
import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command"
import { DoctorCategory } from '@/types'
import { getCategories } from '@/app/_services/GlobalApi'
import Link from 'next/link'
import Image from 'next/image'
import { useParams } from 'next/navigation'

 
const CategoryList = () => {
    const[categories,setCategories]=useState<DoctorCategory[]>([])
    const[loading,setLoading]=useState(false)
    const { category:CategoryName } = useParams() as { category: string }
    
    useEffect(()=>{
      getCategoriesData()
     
    },[])
  
    const getCategoriesData=async()=>{
      setLoading(true)
      try {
        const result=await getCategories()
        
         setCategories(result?.categories)
      } catch (error) {
        console.log(error);
        
      }finally{
        setLoading(false)
      }
      
      
    }
    return (
        <div className='h-screen flex   flex-col mt-8'>
            <Command>
                <CommandInput placeholder="Type a category.." />
                <CommandList className='overflow-visible'>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Suggestions">
                        {categories?.map((category:DoctorCategory,index:number)=>(
                        <CommandItem key={index} >
                        <Link href={`/search/${category?.name}`}
                         className={`p-2 flex gap-2 text-[16px] 
                         font-medium w-full text-primary cursor-pointer rounded-lg items-center
                         ${CategoryName === category?.name && 'bg-blue-100' }
                         hover:bg-blue-100`}>
                        <Image src={category?.icon?.url} alt={category?.name} width={25} height={25}/>
                           <label>{category?.name}</label>
                        </Link>
                        </CommandItem>

                        ))}
                      
                    </CommandGroup>
                 
                 
                </CommandList>
            </Command>

        </div>
    )
}

export default CategoryList