import Link from 'next/link'
import React from 'react'

const Profile = () => {
  return (
    <div className='flex items-center justify-center'>
      <div className='flex mx-5 h-screen my-5 items-center justify-center min-w-fit mt-0 sm:w-1/4 flex-col'>
        <h1 className='text-3xl sm:text-4xl mb-5 text-slate-700 text-center font-semibold'>Welcome! Have a nice day!</h1>
        <Link
          href="/"
          className='mt-10 px-3 py-5 block min-w-full shadow-sm m1-1 font-medium text-sky-600 border-2 border-sky-600 text-center hover:border-sky-900 hover:text-sky-900'>
          Go Back
        </ Link>
      </div>
    </div>
  )
}

export default Profile