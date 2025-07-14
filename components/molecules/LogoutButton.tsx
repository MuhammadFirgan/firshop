'use client'

import { LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { useEffect, useState } from "react";
import { userLogout } from "@/lib/action/auth.action";
import { useRouter } from "next/navigation";


export default function LogoutButton() {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      const res = await userLogout()
      if(res) {
        router.push('/login')
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    handleLogout()
  }, [])

  return (
    <DropdownMenuItem onClick={handleLogout} className="hover:bg-red-50 hover:text-red-600 transition-colors flex items-center">
      <LogOut className="mr-2 h-4 w-4 md:mr-0" />
      <span>Logout</span>
    </DropdownMenuItem>
  )
}
