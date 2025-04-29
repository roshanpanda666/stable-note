'use client'
import React, { useState } from 'react'
import { useRef } from 'react';
const page = () => {
    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const[error,seterror]=useState("")

    async function submitButtonFunction(){
        const name = usernameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;



        alert(name);
        alert(email);
        alert(password);

        

        if(!name){
            seterror("fill the username")
        }
        if(!email){
            seterror("fill the email")
        }
        if(!password){
            seterror("fill the password")
        }
        else{
            seterror("")
        }
        const comments = ["comment"];

        const res=await fetch("/api/register",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({ 
                name, 
                email, 
                password, 
                comments, 
              })
              
        })
        if (res.ok){
            usernameRef.current.value = '';
            emailRef.current.value = '';
            passwordRef.current.value = '';
        }


        

    }

   
    const handleClear = () => {
        usernameRef.current.value = '';
        emailRef.current.value = '';
        passwordRef.current.value = '';

        seterror("")
        
      };
    
  return (
    <div>
        <div className='flex justify-center items-center h-[100vh]'>
            <div className='border-2 h-96 w-96 border-blue-300 flex justify-center items-center flex-col rounded-3xl'>
                <div className='text-white'>
                    register yourself
                </div>
                <div className='text-white mt-6'> 
                    <input type="text" placeholder='User Name' ref={usernameRef} className='border-b-2 border-blue-300'/>
                </div>
                <div className='text-white mt-6'> 
                    <input type="text" placeholder='E-mail' ref={emailRef} className='border-b-2 border-blue-300'/>
                </div>

                <div className='text-white mt-6'> 
                    <input type="text" placeholder='password'ref={passwordRef} className='border-b-2 border-blue-300'/>
                </div>

                <button className='bg-blue-300 text-black mt-6 rounded-2xl w-40 hover:bg-gray-950 hover:border-2 hover:border-blue-300 hover:text-white'onClick={submitButtonFunction}>submit</button>

                <button className='bg-red-400 text-black mt-6 rounded-2xl w-40 hover:bg-gray-950 hover:border-2 hover:border-red-400 hover:text-white'onClick={handleClear}>clear</button>


                <div className='bg-red-400 text-white mt-6 rounded-1xl w-72 text-center'>{error}</div>

            </div>  
        </div>
      
    </div>
  )
}

export default page
