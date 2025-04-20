"use client"
import React from 'react'
import Header from './_Components/Header';
import { usePathname } from 'next/navigation';
import Footer from './_Components/Footer';

const Provider = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const path = usePathname()
    const headerShown = path == '/sign-in' || path == '/sign-up' ? false : true
  
    return (
        <div>
              {headerShown && <Header />}
            <div className='mx-6 md:mx-16'>

                {children}
            </div>
        
        </div>
    )
}

export default Provider