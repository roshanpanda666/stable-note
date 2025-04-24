import React from 'react'
import Note from './components/note'
const page = () => {
  return (
    <div>
      <div className='text-1xl text-blue-300 font-bold font-mono lg:text-3xl'>Stable-Note</div>
      <div>
        {/* components */}
        <Note></Note>
      </div>
    </div>
  )
}

export default page
