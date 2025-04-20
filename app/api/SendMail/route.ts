import Email from '@/emails/my-email';
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(req:NextRequest) {
    const {email,userName}=await req.json()
    const resend = new Resend(process.env.RESEND_API_KEY);
    try {
       const response= await resend.emails.send({
            from: 'dhananjayakusal975@gmail.com',
            to: email,
            subject: 'Booking appointment Confirmation',
            react: Email({ userFirstname:userName }) 

          });
        return NextResponse.json({response})
    } catch (error) {
        console.error("Error sending email:", error);

        // Properly set 500 status code and include error message
        return NextResponse.json({ error: "Failed to send email", details: error }, { status: 500 });
    }
    
}
