import React from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { toast } from 'sonner'
  

const CancelAppointment = ({id}:{id:string}) => {
 

  const cancelAppointmentCall = async () => {
    try {
      const result = await axios.delete('/api/delete-booking', {
        data: { id }, // ✅ Send as an object
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log("deleted results", result);
      toast.success('Booking deleted');
    } catch (error) {
      toast.error('Error while canceling appointment');
      console.log(error);
    }
  };
  
  return (
    <AlertDialog>
    <AlertDialogTrigger asChild>
    <Button className='cursor-pointer' variant={'destructive'}>Cancel Appointment</Button>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete your appointment
          and remove your data from our servers.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel className='cursor-pointer'>Cancel</AlertDialogCancel>
        <AlertDialogAction
        onClick={cancelAppointmentCall}
        className='bg-red-600 font-semibold hover:bg-red-700 cursor-pointer'>Continue</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
  
  )
}

export default CancelAppointment