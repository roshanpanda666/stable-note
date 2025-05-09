"use client";
import Link from 'next/link';
import React, { useRef, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

const Note = () => {
  const { data: session, status } = useSession();
  const username = session?.user?.name || "...";
  const noteData = useRef();
  const [comments, setComments] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedComment, setEditedComment] = useState("");

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

  useEffect(() => {
    if (status === "authenticated") {
      fetchNotes();
    }
  }, [status]);

  const noteaddfunction = async () => {
    if (typeof window !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate(80);
    }

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
        noteData.current.value = "";
        fetchNotes();
      } else {
        alert("Failed to add note ❌");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong 💥");
    }
  };

  const updateNote = async (index) => {
    const email = session?.user?.email;
    if (!email || !editedComment.trim()) {
      alert("Missing data");
      return;
    }

    try {
      const res = await fetch("/api/editnotes", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, index, newComment: editedComment }),
      });

      const data = await res.json();

      if (data.success) {
        setEditingIndex(null);
        setEditedComment("");
        fetchNotes();
      } else {
        alert("Failed to update note ❌");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong 💥");
    }
  };

  const deleteNote = async (index) => {
    const email = session?.user?.email;
    if (!email) return alert("User not logged in!");

    try {
      const res = await fetch("/api/deletenotes", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, index }),
      });

      const data = await res.json();
      if (data.success) {
        fetchNotes();
      } else {
        alert("Failed to delete note ❌");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Error deleting note");
    }
  };

  return (
    <div>
      <div className='flex w-[95vw] gap-30 lg:gap-[60rem] text-center'>
        <Link href="/note">
          <div className='text-[1rem] text-blue-300 font-bold font-mono lg:text-2xl w-[7rem] lg:w-[15rem]'>Stable-Note</div>
        </Link>

        <Link href="/userdetail">
          <div className='text-[1rem] text-end text-blue-300 font-bold font-mono lg:text-2xl w-[10rem] lg:w-[15rem]'>Hello {username}</div>
        </Link>
      </div>

      <div className='text-2xl text-white font-mono flex flex-col justify-center items-center '>
        <div>Your notes</div>
        <div className='border-1 border-blue-300 w-full mt-3 flex justify-center flex-col items-center rounded-2xl'>
          <div className='flex'>
            <div className='border-1 border-white shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] lg:hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] lg:w-[50vw] w-[70vw] h-11 mt-6 mb-6 rounded-3xl'>
              <input
                ref={noteData}
                type="text"
                placeholder='write your note'
                className='lg:w-[50vw] w-[70vw] text-start h-11 rounded-3xl border-0 lg:text-3xl text-2xl'
              />
            </div>
            <div className='h-11 mt-6 mb-6 ml-6 text-3xl'>
              <button onClick={noteaddfunction} className='cursor-pointer'>+</button>
            </div>
          </div>

          <div className="text-white p-4 w-full flex flex-col items-center gap-2">
            {comments.length === 0 ? (
              <div>No notes yet ✏️</div>
            ) : (
              comments.map((comment, index) => (
                <div
                  onDoubleClick={() => {
                    setEditingIndex(index);
                    setEditedComment(comment);
                  }}
                  key={index}
                  className="border-b-gray-600 border-b-[0.5px] mt-2 px-4 py-2 rounded-xl shadow-md w-[80%] flex justify-between items-center"
                >
                  {editingIndex === index ? (
                    <>
                      <input
                        value={editedComment}
                        onChange={(e) => setEditedComment(e.target.value)}
                        className="w-full text-gray p-2 rounded lg:text-3xl text-[16px]"
                      />
                      <button
                        onClick={() => updateNote(index)}
                        className="ml-2 bg-green-500 text-white rounded h-6 w-12 text-[16px]"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => {
                          setEditingIndex(null);
                          setEditedComment("");
                        }}
                        className="ml-2 bg-gray-500 text-white rounded h-6 w-16 text-[16px]"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <div className="w-full text-center flex justify-between items-center px-2">
                      <span>{comment}</span>
                      <button
                        onClick={() => deleteNote(index)}
                        className="ml-4 bg-red-500 text-white rounded px-2 py-1 text-sm hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  )}
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
