// app/api/editnotes/route.js

import { UserNote } from "@/app/lib/model/userdata";
import { connectionSRT } from "@/app/lib/db";
import mongoose from "mongoose";

export async function Delete(request) {
  try {

    await mongoose.connect(connectionSRT);

    const result = await UserNote.deleteOne({ email },
        { $set: { [`comments.${index}`]: newComment } });

    if (result.modifiedCount > 0) {
      return new Response(JSON.stringify({ success: true }), { status: 200 });
    } else {
      return new Response(JSON.stringify({ success: false, message: "No comment updated" }), {
        status: 404,
      });
    }
  } catch (error) {
    console.error("Error updating comment:", error);
    return new Response(JSON.stringify({ success: false, message: "Server error" }), {
      status: 500,
    });
  }
}
