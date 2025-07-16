'use client'

import { useRef, useState } from "react";
import { Button } from "../ui/button";
import { Hand, Search } from "lucide-react";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";



export default function InputSearch() {
   const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [name, setName] = useState('')
    const [category, setCategory] = useState('')
    const [maxPrice, setMaxPrice] = useState('')

    // const inputRef = useRef<HTMLInputElement | null>(null);
    const router = useRouter();
  
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const params = new URLSearchParams()
      // const query = inputRef.current?.value;
      if (name) params.set('name', name)
      if (category) params.set('category', category)
      if (maxPrice) params.set('max_price', maxPrice)
      
      router.push(`/inventory?${params.toString()}`)
    };

    const handleClearFilter = () => {
      setName("")
      setCategory("")
      setMaxPrice("")
      router.push("/inventory")
    }
  return (
    <div className="hidden sm:block relative">
      <div className={`flex items-center transition-all duration-300 ${
        isSearchOpen ? 'w-64' : 'w-10'
      }`}>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`transition-all duration-300 border-gray-200 focus:border-orange-400 focus:ring-orange-400/20 ${
              isSearchOpen ? 'opacity-100 pl-10 pr-4' : 'opacity-0 w-0'
            }`}
          />
        </form>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsSearchOpen(!isSearchOpen)}
          className={`${isSearchOpen ? 'absolute left-2' : ''} hover:bg-orange-50 hover:text-orange-600 transition-all duration-200 hover:scale-105`}
        >
          <Search className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
