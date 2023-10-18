"use client";

import { signIn, signOut, useSession } from 'next-auth/react';

const SignInButton = () => {
  const { data: session } = useSession();
  console.log(session?.user);

  if (session && session.user) {
    return (
      <div>
        <a href="/profile">{session.user.name}</a>
        <button onClick={() => signOut()} className='text-red-600'>
          Sign Out
        </button>
      </div>
    );
  }
  return (
    <button onClick={() => signIn()} className='text-indigo-300'>
      Sign In
    </button>
  );
};


export default SignInButton;