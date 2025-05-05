import { getSessionEmail } from "@/app/lib/auth";
import { connectionSRT } from "@/app/lib/db";
import { UserNote } from "@/app/lib/model/userdata";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
export async function PUT(req){
    try {
        await mongoose.connect(connectionSRT)
        const email= await getSessionEmail(req)

        if(!email){
            alert("please log in to add data")
            return NextResponse.json({ success: false, message: "Not logged in" }, { status: 401 });
            
        }
        const{ comment }=await req.json()
        if (!comment) {
            return NextResponse.json({ success: false, message: "Comment missing" }, { status: 400 });
          }

        const result= await UserNote.findOneAndUpdate(
            {email},
            { $push: { comments: comment } }, // ✅ push to array
            { new: true }
        )

        if (!result) {
            return NextResponse.json({ success: false, message: "User not found" });
          }

          return NextResponse.json({ success: true, message: "Comment added", comments: result.comments });
    } catch (error) {
        console.error("Update error:", error);
        return NextResponse.json({ success: false, error: error.message });
    }
}