'use client'
import { loginWithOAuth } from "@/lib/action/auth.action"
import Image from "next/image"
import { useEffect, useState } from "react"
import { Skeleton } from "../ui/skeleton"

type BioProfileProps = {
    type?: "mobile" | "desktop"
    withName?: boolean
}

export default function BioProfile({ type = "desktop" }: BioProfileProps) {

    const [user, setUser] = useState<{
        full_name: string
        email: string
        avatar_url: string
      } | null>(null)
    
      useEffect(() => {
        const fetchUser = async () => {
          try {
            const res = await loginWithOAuth()
            const identity = res.data.user?.identities?.[0]?.identity_data;
            if (identity) {
              setUser({
                full_name: identity.full_name,
                email: identity.email,
                avatar_url: identity.avatar_url
              });
            }
          } catch (err) {
            console.error("Error fetching user", err)
          }
        }
    
        fetchUser()
      }, [])



   
  return (
    <div className={`flex items-center md:pt-4 ${type !== "mobile" && 'flex flex-col justify-center text-center'}`}>
        {!user?.avatar_url ? (
            <Skeleton className="h-12 w-12 rounded-full" />
        ) : (
            <Image src={user?.avatar_url} width={20} height={20} alt="profile" className="rounded-full w-12 h-12" />
        )}
        
        <div className="px-3 py-2">
            <p className="text-sm font-medium text-gray-900">{user?.full_name}</p>
            <p className="text-xs font-medium text-gray-500">{user?.email}</p>
        </div>
    </div>
    
  )
}
