import mongoose from "mongoose";
import { connectionSRT } from "../../lib/db";
import { NextResponse } from "next/server";
import { UserNote } from "@/app/lib/model/userdata";

export async function GET(){
    await mongoose.connect(connectionSRT)
    const udata= await UserNote.find()
    console.log(udata);
    return NextResponse.json({result:udata})
}