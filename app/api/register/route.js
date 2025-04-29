import { connectionSRT } from "@/app/lib/db";
import { UserNote } from "@/app/lib/model/userdata";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request) {
  const payload = await request.json();
  await mongoose.connect(connectionSRT);

  try {
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(payload.password, 10); // 10 is the salt rounds

    // Replace plain password with hashed one
    const userr = new UserNote({
      name: payload.name, // assuming you're sending 'username' from frontend
      email: payload.email,
      password: hashedPassword,
      comments: payload.comments, // wrap in array, since schema expects array
    });

    const result = await userr.save();
    return NextResponse.json({ result, success: true });

  } catch (err) {
    console.error("Error saving user:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
