'use client'

import Image from "next/image"
import { Button } from "../ui/button"
import { createClient } from "@/lib/supabase/client"

export default function GoogleLogin() {

    const handleLogin = async () => {
        const supabase = await createClient()
        await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback`
            }
        })
    }
  return (
    <div className="space-y-4">
        <Button onClick={handleLogin} className="w-full flex items-center justify-center space-x-3 bg-white border-2 border-gray-200 rounded-2xl py-4 px-6 hover:border-gray-300 hover:shadow-lg transition-all duration-300 group">
            <Image src="/img/google.svg" width={28} height={28} alt="google" className="w-5 h-5" />
            <span className="text-gray-700 font-medium group-hover:text-gray-800 transition-colors">
                Continue with Google
                
            </span>
        </Button>

        
    </div>
  )
}
