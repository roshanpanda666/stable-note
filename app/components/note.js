"use client"
import Link from 'next/link'
import React, { useRef, useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'

const Note = () => {
  const { data: session, status } = useSession();
  const username = session?.user?.name || "...";
  const noteData = useRef();
  const [comments, setComments] = useState([]);

  // Function to fetch user notes
  const fetchNotes = async () => {
    try {
      const response = await fetch("/api/getusernote");
      const data = await response.json();

      if (data.success) {
        setComments(data.comments);
      } else {
        console.warn("Failed to fetch notes:", data.message);
      }
    } catch (err) {
      console.error("Error fetching notes:", err);
    }
  };

  // Call fetchNotes when session is available
  useEffect(() => {
    if (status === "authenticated") {
      fetchNotes();
    }
  }, [status]);

  // Function to add a note
  const noteaddfunction = async () => {
    const comment = noteData.current.value;
    const email = session?.user?.email;

    if (!comment || !email) {
      alert("Note or email missing!");
      return;
    }

    try {
      const response = await fetch("/api/noteDataAddApi", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, comment }),
      });

      const result = await response.json();

      if (result.success) {
        alert("Note added ✅");
        noteData.current.value = "";
        fetchNotes(); // Refresh comments
      } else {
        alert("Failed to add note ❌");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong 💥");
    }
  };

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
              <input ref={noteData} type="text" className='lg:w-[50vw] w-[70vw] h-11 rounded-3xl border-0 lg:text-3xl text-2xl' />
            </div>
            <div className='h-11 mt-6 mb-6 ml-6 text-3xl'>
              <button onClick={noteaddfunction} className='cursor-pointer'>+</button>
            </div>
          </div>

          {/* Render user comments here */}
          <div className="text-white p-4 w-full flex flex-col items-center gap-2">
            {comments.length === 0 ? (
              <div>No notes yet ✏️</div>
            ) : (
              comments.map((comment, index) => (
                <div
                  key={index}
                  className="border-b-gray-600 border-b-[0.5px] rounded-b-none mt-2 text-white px-4 py-2 rounded-xl shadow-md w-[80%] text-center"
                >
                  {comment}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Note;
