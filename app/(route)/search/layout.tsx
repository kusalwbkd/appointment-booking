import React from 'react'
import CategoryList from './[category]/_components/CategoryList';

const layout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
  return (
    <div className='grid grid-cols-4'>
       
        <div className='col-span-1 hidden md:block'>
          <CategoryList/>
        </div>

        <div className='col-span-3'>
        {children}
        </div>
    </div>
  )
}

export default layout