"use client"
import Link from 'next/link'
import React from 'react'
import { useSession } from 'next-auth/react'

const Note = () => {
  const { data: session } = useSession();
  const username = session?.user?.name || "profile";

  return (
    <div>
      <div className='flex gap-60 lg:gap-[70rem]'>
        <Link href="/note">
          <div className='text-1xl text-blue-300 font-bold font-mono lg:text-3xl'>Stable-Note</div>
        </Link>

        <Link href="/userdetail">
          <div className='text-blue-300 mt-2'>profile : {username}</div>
        </Link>
      </div>

      <div className='text-2xl text-white font-mono flex flex-col justify-center items-center '>
        <div>your notes</div>
        <div className='border-2 border-blue-400 w-full mt-3 flex justify-center flex-col items-center rounded-2xl'>
          <div className='flex'>
            <div className='border-1 border-white shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] lg:hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] lg:w-[50vw] w-[70vw] h-11 mt-6 mb-6 rounded-3xl'>
              <input type="text" className='lg:w-[50vw] w-[70vw] h-11 rounded-3xl border-0 lg:text-3xl text-2xl' />
            </div>
            <div className='h-11 mt-6 mb-6 ml-6 text-3xl'>
              <button>+</button>
            </div>
            
          </div>

          <div>
            {/* user's comments here */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Note
