"use client"
import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Calendar } from "@/components/ui/calendar"
import { CalendarDays, Clock } from 'lucide-react'
import { useUser } from '@clerk/nextjs'
import axios from 'axios'
import { toast } from 'sonner'
import { getTimeSlots } from '@/app/_services/GlobalApi'
import { Appoitment } from '@/types'
import Loading from '@/app/_Components/Loading'


const Appointment = ({timeSlots,doctorId}:{timeSlots:string[],doctorId:string}) => {
    const [date, setDate] = React.useState<Date | undefined>(new Date())
    const [isMounted, setIsMounted] = useState(false)
    const[selectedTimeSlot,setSelectedTimeSlot]=useState<string>('')
    const[bookedTimeSlots,setBookedTimeSlots]=useState<Appoitment[]>([])
    const[loading,setLoading]=useState(false)
    const{user}=useUser()

    const checkTimeSlots=async()=>{
        try {
            const response=await getTimeSlots({date:formattedDate,id:doctorId})
             setBookedTimeSlots(response?.appoitments)
        } catch (error) {
            
        }
    }
    useEffect(() => {
        setIsMounted(true)

        setDate(new Date())
    }, [])
    useEffect(()=>{
      
        checkTimeSlots()
     },[date])
    if (!isMounted) return null  // 👈 Prevents rendering on the server
    const formattedDate = date?.toISOString().split('T')[0] || new Date().toISOString().split('T')[0]


    const createBooking=async()=>{
       setLoading(true)
        try {
            const result=await axios.post('/api/create-booking',{
                doctorId,
                userName: user?.fullName || user?.username || 'Anonymous',
                email:user?.primaryEmailAddress?.emailAddress,
                date:formattedDate,
                time:selectedTimeSlot,
              })
            
                if (result?.status === 200) {
                   // setBookedTimeSlots('')
                    setBookedTimeSlots((prev) => [
                        ...prev,
                        { time: selectedTimeSlot!, id: new Date().getTime().toString() }, // Dummy ID
                      ]);
                      setSelectedTimeSlot('');
                    try {
                      const emailResp = await axios.post('/api/SendMail', {
                        email: user?.primaryEmailAddress?.emailAddress,
                        userName: user?.fullName || user?.username || 'Anonymous',
                      });
                  
                      console.log("emailResp", emailResp);
                  
                      if (emailResp?.data?.error) {
                        console.error("Email sending failed:", emailResp.data.error);
                        toast.error('Email sending failed');
                      } else {
                        toast.success('Booking scheduled and email sent successfully');
                      }
                    } catch (e) {
                      console.error("Failed to send confirmation email:", e);
                      toast.error('Failed to send confirmation email');
                    }
                  }
                  
        } catch (error) {
            console.log(error);
            
               toast.error('Error while booking')
        }finally{
            setLoading(false)

        }
       
          
    }

    const selectedTime=bookedTimeSlots.map((item)=>item?.time)
    if(loading){
    return <Loading/>
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className='rounded-full mt-3 font-bold mb-3 cursor-pointer'>Book Appointment</Button>
            </DialogTrigger>
            <DialogContent>
    <DialogHeader>
        <DialogTitle>Book Appointment</DialogTitle>
        <DialogDescription>
            Select a date for your appointment.
        </DialogDescription>

        {/* Move this block content OUT of DialogDescription */}
        <div className='grid grid-cols-1 md:grid-cols-2 mt-4'>
            <div className='flex flex-col gap-3 items-baseline'>
                <div className='flex gap-2 items-center'>
                    <CalendarDays className='text-primary h-5 w-5'/>
                    <span>Select days</span>
                </div>
                {date && (
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={(day) => day && setDate(day)}
                        className="rounded-md border"
                        disabled={{ before: new Date() }}
                    />
                )}
            </div>
            <div className='mt-3 md:mt-0'>
            <div className='flex gap-2 items-center'>
                    <Clock className='text-primary h-5 w-5'/>
                    <span>Select a time slot</span>
                </div>
                <div className='grid grid-cols-3 gap-3 mt-3 '>
                    {timeSlots?.map((item:string,index:number)=>{
                        return (
                            <Button key={item} 
                            onClick={()=>setSelectedTimeSlot(item)}
                            variant={selectedTimeSlot === item ? "default" : "outline"}
                            disabled={selectedTime.includes(item)}
                            className={`p-3 rounded-full border text-xs text-center
                            cursor-pointer hover:bg-primary hover:text-white
                            ${selectedTimeSlot === item && 'bg-primary text-white'}
                            `}>
                        
                               {item}
                            </Button>
                        )
                    })}
                </div>
            </div>
        </div>
    </DialogHeader>
    <DialogFooter>
        <DialogClose asChild>
            <div className='flex gap-2'>
            <Button variant={'destructive'} className='cursor-pointer'>Cancel</Button>
            <Button className='cursor-pointer' disabled={!(date && selectedTimeSlot)} onClick={createBooking}>Book Now</Button>
            </div>
          

           

        </DialogClose>
    </DialogFooter>
</DialogContent>

        </Dialog>

    )
}

export default Appointment