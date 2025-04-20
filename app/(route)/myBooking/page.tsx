"use client"
import { BookingData, Doctor } from '@/types'
import { useUser } from '@clerk/nextjs'
import axios from 'axios'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import React, { useEffect, useState } from 'react'
import BookingList from './_components/BookingList'
import { X } from 'lucide-react'
import Loading from '@/app/_Components/Loading'

const Booking = () => {
  const { user } = useUser()
  const [loading, setLoading] = useState(false)
  const [bookings, setMyBookings] = useState<BookingData[]>([])
  const [oldBookings,setOldBookings] = useState<BookingData[]>([])
  const [upcomingBookings, setUpcomingBookings] = useState<BookingData[]>([])

  useEffect(() => {
    if (user?.primaryEmailAddress?.emailAddress) {
      bookingData()
    }
  }, [user])
  


  const bookingData = async () => {
    setLoading(true)
    try {

      const result = await axios.get(`/api/booking`, {
        params: {
          email: user?.primaryEmailAddress?.emailAddress
        }
      })
    
    const fetchedBookings = result?.data?.result?.appoitments || [];
      setMyBookings(fetchedBookings)
      splitBookingsByDate(fetchedBookings)
    } catch (error) {
      console.log(error);

    }finally{
      setLoading(false)
    }

  }

  
  
  const splitBookingsByDate = (data: BookingData[]) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize today's date (no time)
  
    const oldBookings: BookingData[] = [];
    const upcomingBookings: BookingData[] = [];
  
    data.forEach((booking) => {
    
      
      const bookingDate = new Date(booking?.date || Date.now());
      bookingDate.setHours(0, 0, 0, 0); // Normalize booking date too
  
      if (bookingDate < today) {
        oldBookings.push(booking);
      } else {
        upcomingBookings.push(booking);
      }
    });
 
   setOldBookings(oldBookings)
   setUpcomingBookings(upcomingBookings)
  };

  if(loading || !user){
    return <Loading/>
  }
  
  if(!bookings.length && !loading){
      return (
        <div > 
          <h2 className='flex items-center justify-center text-4xl text-primary font-bold'>You don't have any bookings
            <X className='w-24 h-24'/>
          </h2>
        </div>
      )
  }

  if(bookings.length && (oldBookings.length || upcomingBookings.length)){
    return (
      <div className='px-4 sm:px-10 mt-10'>
        <h2 className='font-bold text-2xl'>My Booking</h2>
        <Tabs defaultValue="account" className="w-full mt-5">
          <TabsList  className='w-full justify-start'>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="expired">Expired</TabsTrigger>
          </TabsList>
          <TabsContent value="upcoming">
            <BookingList list={upcomingBookings} type="upcoming"/>
          </TabsContent>
          <TabsContent value="expired">
          <BookingList list={oldBookings} type="expired"/>
          </TabsContent>
        </Tabs>
  
      </div>
    )
  }

 
}

export default Booking