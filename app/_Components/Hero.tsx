import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

const Hero = () => {
  return (
    <section>
  <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:items-center md:gap-8">
      <div>
        <div className="max-w-lg md:max-w-none">
          <h2 className="md:text-4xl font-bold text-gray-900 text-3xl">
           Find and Chanel your <span className='text-primary'>Doctor</span> easily
          </h2>

          <p className="mt-4 text-gray-700">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur doloremque saepe
            architecto maiores repudiandae amet perferendis repellendus, reprehenderit voluptas
            sequi.
          </p>
          <Button className='mt-8 p-3  text-white font-semibold cursor-pointer rounded-lg  w-96'>Get Started</Button>
        </div>
      </div>

      <div>
        <Image
          src="/doctor.jpg"
          className="rounded-3xl w-full object-cover mt-8 hidden md:block"
          alt="doctor"
          width={800}
          height={800}
        />
      </div>
    </div>
  </div>
</section>

  )
}

export default Hero