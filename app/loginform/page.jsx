"use client"

import Link from "next/link"
import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function Loginform(){
    
    const router=useRouter()

    const [email,setemail]=useState("")
    const [password,setpassword]=useState("")
    const [error, setError] = useState("")

    const handleSubmit=async(e)=>{
        e.preventDefault()

        try{
            const res=await signIn("credentials",{
                email,
                password,
                redirect:false,
            })
            if(res.error){
                setError("invalid credentials")
                return
            }

            router.replace("/")
        }
        catch(error){
            console.log("error");
        }
    }



    return(
        <div>
            <div className="text-white flex justify-center items-center h-screen">

                <div className="w-[40rem] border-2 border-blue-300 h-[20rem] rounded-2xl">
                    <div className="text-center text-white mt-16">
                        Enter the details to log-in
                    </div>
                    
                    <div className="flex justify-center items-center mt-10">
                        <input placeholder="email" onChange={e=>setemail(e.target.value)} type="text" className="border-b-2 border-b-blue-300 text-white "/>
                    </div>
                    <div className="flex justify-center items-center mt-6">
                        <input onChange={e=>setpassword(e.target.value)} type="password" placeholder="Password" className="border-b-2 border-b-blue-300 text-white "/>
                    </div>
                    <div className="text-center flex justify-center items-center h-10">
                        <button className="mt-5 hover:border-white hover:border-2 w-28"onClick={handleSubmit}>Login</button>
                    </div>
                    {error &&(
                        <div className="border-2 border-red-500 w-40 text-center bg-red-500 text-white rounded-sm">
                                {error}
                        </div>
                    )}
                    <div className="text-center mt-3 relative">
                        <div>
                            don't have an account?<span className="border-b-[1.5px] border-gray-5"><Link href={"/Register"}><button>Register</button></Link></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}