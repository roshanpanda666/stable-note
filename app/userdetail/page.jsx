"use client";
import React, { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Userinfo = () => {
  const { data: session } = useSession();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch("/api/profileroute")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setComments(data.comments);
        }
      });
  }, []);

  return (
    <div className="flex justify-center items-center flex-col px-4 py-8 min-h-screen">
      <div className="w-full max-w-md border border-blue-300 rounded-xl p-6 shadow-lg">
        <h2 className="text-center text-2xl text-white font-bold mb-6">
          Your Details
        </h2>

        <div className="mb-4">
          <div className="text-white font-medium">User:</div>
          <div className="text-blue-300 text-sm">{session?.user?.name}</div>
        </div>

        <div className="mb-4">
          <div className="text-white font-medium">E-mail:</div>
          <div className="text-blue-300 text-sm break-all">
            {session?.user?.email}
          </div>
        </div>

        <div className="mb-4">
          <div className="text-white font-medium">Comments:</div>
          <div className="ml-2 flex flex-col text-left text-sm mt-1">
            {comments.length > 0 ? (
              comments.map((c, i) => (
                <p key={i} className="text-blue-300">
                  • {c}
                </p>
              ))
            ) : (
              <p className="text-gray-400">No comments yet</p>
            )}
          </div>
        </div>

        <button
          className="w-full bg-red-500 hover:bg-red-600 py-2 mt-6 rounded-lg text-white transition duration-200"
          onClick={() => signOut()}
        >
          Log Out
        </button>

        <div className="text-center mt-4">
          <Link href="/note">
            <span className="text-blue-400 underline hover:text-blue-500 text-sm">
              Go to notes page
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Userinfo;
