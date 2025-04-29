import { connectionSRT } from "@/app/lib/db"
import { UserNote } from "@/app/lib/model/userdata"
import mongoose from "mongoose"
import { NextResponse } from "next/server"

export async function POST(request){
    const payload=await request.json()
    await mongoose.connect(connectionSRT)
    let userr= new UserNote(payload)
    const result=await userr.save()
    return NextResponse.json({result,success:true})
}