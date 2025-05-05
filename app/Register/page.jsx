'use client'
import React, { useState, useRef } from 'react'
import { useRouter } from "next/navigation"

const Page = () => {
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const router=useRouter()

  const showSuccessMessage = () => {
    setMessage("Registration successful ✅");
    setTimeout(() => {
      setMessage("");
    }, 2000);
  };

  const submitButtonFunction = async () => {
    const name = usernameRef.current.value.trim();
    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value.trim();

    if (!name || !email || !password) {
      setError("Please fill all credentials ❗");
      return; // Stop here if invalid
    }

    setError(""); // clear previous error

    const comments = ["demo note"];

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, password, comments })
      });

      if (res.ok) {
        showSuccessMessage();
        usernameRef.current.value = '';
        emailRef.current.value = '';
        passwordRef.current.value = '';
        router.replace("/loginform")
      } else {
        setMessage("Registration failed ❌");
        setTimeout(() => setMessage(""), 2000);
      }

    } catch (err) {
      setMessage("Something went wrong ❌");
      setTimeout(() => setMessage(""), 2000);
    }
  };

  const handleClear = () => {
    usernameRef.current.value = '';
    emailRef.current.value = '';
    passwordRef.current.value = '';
    setError("");
    setMessage("");
  };

  return (
    <div className='flex justify-center items-center h-[100vh] flex-col'>
      <div className='text-white mb-6'>{message}</div>
      <div className='border-2 h-96 w-96 border-blue-300 flex justify-center items-center flex-col rounded-3xl'>
        <div className='text-white'>Register yourself</div>

        <div className='text-white mt-6'>
          <input type="text" placeholder='User Name' ref={usernameRef} className='border-b-2 border-blue-300' />
        </div>

        <div className='text-white mt-6'>
          <input type="text" placeholder='E-mail' ref={emailRef} className='border-b-2 border-blue-300' />
        </div>

        <div className='text-white mt-6'>
          <input type="text" placeholder='Password' ref={passwordRef} className='border-b-2 border-blue-300' />
        </div>

        <button className='bg-blue-300 text-black mt-6 rounded-2xl w-40 hover:bg-gray-950 hover:border-2 hover:border-blue-300 hover:text-white' onClick={submitButtonFunction}>
          Submit
        </button>

        <button className='bg-red-400 text-black mt-4 rounded-2xl w-40 hover:bg-gray-950 hover:border-2 hover:border-red-400 hover:text-white' onClick={handleClear}>
          Clear
        </button>

        {error && <div className='bg-red-400 text-white mt-4 rounded-xl w-72 text-center'>{error}</div>}
      </div>
    </div>
  );
};

export default Page;
