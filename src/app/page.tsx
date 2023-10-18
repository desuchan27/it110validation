import Link from 'next/link'
import Image from 'next/image';

export default function Home() {
  return (
    <div className='flex items-center justify-center'>
      <div className='flex mx-5 h-screen my-5 items-center justify-center min-w-fit mt-0 sm:w-1/4 flex-col'>
        <Link
          href="/signin"
          className='mt-10 px-3 py-5 text-center block min-w-full shadow-sm m1-1 font-medium text-sky-600 border-2 border-sky-600 hover:border-sky-900 hover:text-sky-900'>
          Sign In
        </ Link>
        <Link
          href="/signup"
          className='mt-10 px-3 py-5 text-center block min-w-full shadow-sm m1-1 font-medium text-sky-600 border-2 border-sky-600 hover:border-sky-900 hover:text-sky-900'>
          Sign Up
        </ Link>
      </div>

      <div className='h-screen sm:w-3/4 overflow-hidden hidden sm:flex'>
        <Image
          src="/images/side-photo-6.jpg"
          width={1700}
          height={1000}
          alt="a photo"
          className='sm:object-cover'
        />
      </div>

    </div>
  )
}
