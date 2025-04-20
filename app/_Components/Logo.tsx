import { Home, Stethoscope } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Logo = () => {
  return (
    <Link href={'/'}>
    
    <div className='flex items-center gap-1'>
        <h2 className='md:text-3xl text-2xl font-bold text-primary'>DocTime</h2>
        <Stethoscope className='text-primary md:h-8 md:w-8'/>
    </div>
    </Link>
   
  )
}

export default Logo