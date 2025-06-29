'use client'
import React, { useRef } from 'react'
import { BiSearch } from 'react-icons/bi'

import { useRouter } from 'next/navigation'
import { Input } from '../ui/input'

export default function SearchInput() {
    const inputRef = useRef<HTMLInputElement | null>(null)
    const router = useRouter()

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        router.push(`/search/${inputRef.current?.value}`)
    }


  return (
    <form onSubmit={handleSubmit} className="relative md:w-1/2">
        <BiSearch className="text-xl text-stone-600 absolute right-5 z-50 top-1/2 -translate-y-1/2"/>
        <Input type="text" placeholder="Find something..." className="border border-stone-400 px-8 py-2 w-full rounded-lg md:w-full relative z-10" ref={inputRef} />
    </form>
  )
}
