import { connectionSRT } from "@/app/lib/db";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOption } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { UserNote } from "@/app/lib/model/userdata";


export async function GET(){
    try {
        await mongoose.connect(connectionSRT)
        const session= await getServerSession(authOption)
        if(!session || !session.user?.email){
            return NextResponse.json({success: false,message:"not authenticated"})
        }

        const email=session.user.email
        const user=await UserNote.findOne({email})

        if(!user){
            return NextResponse.json({success:false,message:"user not found"})
        }

        console.log(user.comments);

        return NextResponse.json({
            success: true,
            comments: user.comments || [], // default to empty array if undefined
          });
    } catch (error) {
        console.error("fetch user comment error:",error)
        return NextResponse.json({ success: false, message: "Server error" });
    }
}