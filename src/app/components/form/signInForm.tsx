"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';


export default function SignInForm() {
  
  const FormSchema = z.object({
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must have than 8 characters'),
  });
  
  const { register, handleSubmit } = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  
  const [error, setError] = useState('');
  const router = useRouter();
  
  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    try {
      const signInData = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false
      });

      if (signInData && signInData.error) {
        const errorMessage = 'incorrect email or password'
        setError(errorMessage);
      } else {
        router.push('/profile');
      }
    } catch (error) {
      console.error('Error during signIn:', error);
    }
  };

  return (
    <div className='flex items-center justify-center'>
        <div className='flex sm:w-3/5 lg:w-1/4 overflow-scroll mx-5 sm:mx-10 h-screen items-center justify-center w-full mt-0 flex-col'>
          <h1 className='sm:text-4xl mb-5 text-slate-700 text-center font-semibold'>Log In</h1>
          <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
            <label
              htmlFor='email'
              className="block my-2 text-base font-medium leading-6 text-slate-700"
            >
              Email:
              <input
                type="email" {...register('email')}
                placeholder='example@yahoo.com'
                className="mt-1 px-3 py-5 block min-w-full placeholder-gray-500 placeholder-opacity-50 border-b-2 shadow-sm border-sky-600" />
            </label>
            <label
              htmlFor='password'
              className="block my-2 text-base font-medium leading-6 text-slate-700"
            >
              Password:
              <input
                type="password" {...register('password')}
                placeholder='************'
                className="mt-1 px-3 py-5 block min-w-full placeholder-gray-500 placeholder-opacity-50 border-b-2 shadow-sm border-sky-600" />
            </label>
            {error && <p>{error}</p>}
            <button
              type="submit"
              className='mt-10 px-3 py-5 block min-w-full shadow-sm m1-1 font-medium text-white bg-sky-600 hover:bg-sky-900'
            >
              Sign in
            </button>
            <p className='mt-5 text-center'>or</p>
            <p className='mt-5 text-center text-slate-700'>Don&apos;t have an account?
              <span>
                <Link
                  className='text-sky-600 hover:text-sky-900 font-semibold'
                  href={'/signup'}> Sign Up
                </Link>
              </span>
            </p>
          </form>
          <Link
              href="/"
              className="mt-5 text-sky-600 text-center font-semibold hover:text-sky-900">
              Homepage
            </ Link>
        </div>
        <div className='h-screen sm:w-3/5 lg:w-3/4 overflow-hidden hidden sm:flex'>
          <Image
            src="/images/side-photo-6.jpg"
            width={1700}
            height={1000}
            alt="a photo"
            className='sm:object-cover'
          />
        </div>
    </div>
  );
}