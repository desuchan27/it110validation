"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Image from 'next/image';

export default function SignUpForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    if (username.length < 1) {
      setError("Please enter a username.");
      return;
    }
    if (name.length < 1) {
      setError("Please enter your name.");
      return;
    }
    if (email.length < 1) {
      setError("Please enter your email.");
      return;
    }
    if (!email.includes("@")) {
      setError("Invalid email address.");
      return;
    }
    if (password.length < 1) {
      setError("Please enter a password.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    // If all validation checks pass, clear any previous error message and proceed with form submission.
    setError("");

    const user = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username, name, email, password
      }),
    });

    if (user.ok) {
      router.push("/signin");
    } else {
      if (user.status === 409) {
        setError("Email or username already exists.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className='flex sm:w-3/5 lg:w-1/4 overflow-scroll mx-5 sm:mx-10 h-screen items-center justify-center w-full mt-0 flex-col'>
        <h1 className='text-3xl sm:text-4xl mb-5 text-slate-700 text-center font-semibold'>Sign Up</h1>
        <form onSubmit={handleSubmit} method="POST" className="min-w-full">
          <label
            htmlFor="username"
            className="block my-2 text-base font-medium leading-6 text-slate-700"
          >
            Username:
          </label>
            <input
              className="mt-1 px-3 py-5 block min-w-full placeholder-gray-500 placeholder-opacity-50 border-b-2 shadow-sm border-sky-600"
              type="text"
              placeholder="characters must be more than 20"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          <label
            htmlFor="name"
            className="block my-2 text-base font-medium leading-6 text-slate-700"
          >
            Name:
            <input
              className="mt-1 px-3 py-5 block min-w-full placeholder-gray-500 placeholder-opacity-50 border-b-2 shadow-sm border-sky-600"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label
            htmlFor="email"
            className="block my-2 text-base font-medium leading-6 text-slate-700"
          >
            Email:
            <input
              className="mt-1 px-3 py-5 block min-w-full placeholder-gray-500 placeholder-opacity-50 border-b-2 shadow-sm border-sky-600"
              type="email"
              placeholder="johndoe@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label
            htmlFor="password"
            className="block my-2 text-base font-medium leading-6 text-slate-700"
          >
            Password:
            <input
              type="password"
              placeholder="Must be more than 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 px-3 py-5 block min-w-full placeholder-gray-500 placeholder-opacity-50 border-b-2 shadow-sm border-sky-600"
            />
          </label>
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            className='mt-10 px-3 py-5 block min-w-full shadow-sm m1-1 font-medium text-white bg-sky-600 hover:bg-sky-900'
          >
            Sign Up
          </button>
          <p className='mt-5 text-center'>or</p>
          <p className='mt-5 text-center text-slate-700'>have an account
            <span>
              <Link
                className='text-sky-600 hover:text-sky-900 font-semibold'
                href={'/signin'}> Sign In
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
