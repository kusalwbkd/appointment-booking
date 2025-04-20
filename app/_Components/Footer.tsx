import React from 'react'
import Logo from './Logo'

const Footer = () => {
  return (
    <footer className="bg-gray-100 shadow-lg">
  <div className="mx-auto max-w-screen-xl px-3 py-8 sm:px-3 lg:px-3">
    <div className="sm:flex sm:items-center sm:justify-between">
       <Logo/>
      <p className="mt-4 text-center text-sm text-gray-500 lg:mt-0 lg:text-right">
        Copyright &copy; {new Date().getFullYear()}
      </p>
    </div>
  </div>
</footer>

  )
}

export default Footer