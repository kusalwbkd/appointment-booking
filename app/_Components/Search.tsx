"use state"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Doctor } from '@/types'
import { SearchIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const Search = ({filteredDoctorList,setFilteredDoctorList,doctorsList}:
  {filteredDoctorList:Doctor[],doctorsList:Doctor[],setFilteredDoctorList:React.Dispatch<React.SetStateAction<Doctor[]>>}) => {
  const[text,setText]=useState('')
  
  useEffect(() => {
    if (text === '') {
      setFilteredDoctorList(doctorsList)
    }
  }, [text, doctorsList, setFilteredDoctorList])


  const  filterFn=()=>{
    const filtered=filteredDoctorList?.filter((doctor:Doctor)=>{
      const name=doctor.name.replace(/^Dr\.?\s*/i, '')
      return name.toLowerCase().includes(text.toLowerCase())
    })
    setFilteredDoctorList(filtered)
    if(text===''){
      setFilteredDoctorList(doctorsList)
  }

  
  }

  
  return (
    <div className='flex items-center gap-4 flex-col'>
        <h2 className='font-bold text-4xl tracking-wider'>Search <span className='text-primary'>Doctors</span></h2>
        <h2 className='text-lg text-gray-600'>Search your doctor and book an appointment</h2>
        <div className="flex w-full max-w-sm items-center space-x-2">
      <Input type="text" placeholder="Search" onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setText(e.target.value)} value={text} />
      <Button className='cursor-pointer' onClick={filterFn} >
        <SearchIcon className='h-4 w-4 '/>
        Search</Button>
    </div>
    </div>
  )
}

export default Search