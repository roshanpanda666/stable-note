import React from 'react'
import Note from './components/note'
const page = () => {
  return (
    <div>
      <div className='flex gap-60 lg:gap-[70rem]'>
      <div className='text-1xl text-blue-300 font-bold font-mono lg:text-3xl'>Stable-Note</div>
        <div className='text-blue-300 mt-2'>profile</div>
      </div>
      <div>
        {/* components */}
        <Note></Note>
      </div>
    </div>
  )
}

export default page
