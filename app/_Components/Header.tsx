"use client"
import React from 'react'
import Logo from './Logo'
import Link from 'next/link'
import { UserButton, useUser } from '@clerk/nextjs'
import { LogIn, Stethoscope } from 'lucide-react'

const Header = () => {
  const { user } = useUser()
  return (
    <div className='flex items-center gap-8 p-5 shadow-sm justify-between'>
      <Logo />
      <div className='md:flex gap-6 hidden'>
        <h2 className='hover:scale-105 font-semibold hover:text-primary cursor-pointer ease-in-out transition-all text-md md:text-xl'>Home</h2>
        <h2 className='hover:scale-105 font-semibold hover:text-primary cursor-pointer  ease-in-out transition-all text-md md:text-xl'>Services</h2>
        <h2 className='hover:scale-105 font-semibold hover:text-primary cursor-pointer  ease-in-out transition-all text-md md:text-xl'>About us</h2>
      </div>
      {user ? (
        <Link href={'/myBooking'} className='cursor-pointer flex gap-1 items-center justify-center bg-primary font-semibold text-white p-3 rounded-lg text-sm'>
         My Bookings <Stethoscope/>
        </Link>
      ) : (
        <Link href={'/sign-in'} className='flex gap-1 items-center justify-center cursor-pointer bg-primary font-semibold text-white p-3 rounded-lg text-sm'>
         Login <LogIn/>
        </Link>
      )}
      {user && <UserButton/>}

    </div>
  )
}

export default Header