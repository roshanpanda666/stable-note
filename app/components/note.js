import React from 'react'

const Note = () => {
  return (
    <div>
      <div className='text-2xl text-white font-mono flex flex-col justify-center items-center '>
         <div>
            your notes
         </div>
         <div className='border-2 border-blue-400 w-full mt-3 flex justify-center flex-col items-center rounded-2xl'>
                <div className='flex '>
                    <div className='border-1 border-white shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)]  lg:hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] lg:w-[50vw] w-[70vw] h-11 mt-6 mb-6 rounded-3xl'>
                        <input type="text" className='lg:w-[50vw] w-[70vw] h-11 rounded-3xl border-0 lg:text-3xl text-2xl' />
                    </div>
                    <div className='h-11 mt-6 mb-6 ml-6 text-3xl'>
                        <button>+</button>
                    </div>
                </div>

                <div>
                    {/* users's comments here */}
                </div>
                
         </div>
      </div>
    </div>
  )
}

export default Note
