"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

const Nav = () => {
  const { data: session } = useSession();

  const [toggleDropdown, setToggleDropdown] = useState(false);

  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href='/' className='flex gap-2 flex-center'>
        <Image
          src='/assets/images/logo.svg'
          alt='logo'
          width={30}
          height={30}
          className='object-contain'
        />
        <p className='logo_text '>Promptify</p>
      </Link>

      {/* Desktop Navigation */}
      <div className='md:flex hidden'>
        {session && session.user ? (
          <div className='flex gap-4  lg:gap-6'>
            <Link href='/' className='nav_link'>
              Home
            </Link>
            <Link href='/community' className='nav_link'>
              Community
            </Link>
            <Link href='/about' className='nav_link'>
              About
            </Link>
            <Link href='/create-prompt' className='black_btn'>
              Create Prompt
            </Link>
            <button type='button' onClick={() => signOut()} className='outline_btn'>
              Sign Out
            </button>

            <Link href={`/profile?username=${session?.user.name}&id=${session?.user.id}`}>
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                className='rounded-full'
                alt='profile'
              />
            </Link>
          </div>
        ) : (
          <>

            <button
              type='button'
              onClick={() => {
                signIn();
              }}
              className='rounded-2xl py-3 bg-[var(--color-heading)]  px-7 text-white transition-all hover:bg-transparent hover:border hover:border-[var(--color-heading)] hover:text-black text-center text-lg font-inter'>
              Sign in
            </button>

          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className='md:hidden flex relative'>
        {session && session.user ? (
          <div className='flex'>
            <Image
              src={"/assets/icons/menu.svg"}
              width={37}
              height={37}
              className='rounded-full'
              alt='profile'
              onClick={() => setToggleDropdown(!toggleDropdown)}
            />

            {toggleDropdown && (
              <div className='dropdown'>
                <Link
                  href='/profile'
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href='/create-prompt'
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>
                <Link href='/' className='dropdown_link'>
                  Home
                </Link>
                <Link href='/community' className='dropdown_link'>
                  Community
                </Link>
                <Link href='/about' className='dropdown_link'>
                  About
                </Link>
                <button
                  type='button'
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className='mt-5 w-full black_btn'
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>

            <button
              type='button'
              onClick={() => {
                signIn(provider.id);
              }}
              className='black_btn'
            >
              Sign in
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;