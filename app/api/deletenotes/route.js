import { UserNote } from "@/app/lib/model/userdata";
import { connectionSRT } from "@/app/lib/db";
import mongoose from "mongoose";

export async function DELETE(request) {
  try {
    const { email, index } = await request.json();

    await mongoose.connect(connectionSRT);

    const user = await UserNote.findOne({ email });

    if (!user || !user.comments || index >= user.comments.length) {
      return new Response(JSON.stringify({ success: false, message: "Invalid user or index" }), {
        status: 400,
      });
    }

    user.comments.splice(index, 1);
    await user.save();

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Error deleting note:", error);
    return new Response(JSON.stringify({ success: false, message: "Server error" }), {
      status: 500,
    });
  }
}
