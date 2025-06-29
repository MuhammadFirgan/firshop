
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import { bebas_neue } from "@/constans"
import Link from "next/link"
  
export default function MobileNav() {
  return (
    <Sheet>
        <SheetTrigger asChild>
            <button className="block text-stone-800 hover:text-stone-600 focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>
        </SheetTrigger>
        <SheetContent side="left">
            <Link href="/" className="text-stone-800 font-bold text-xl b-8">
                <h1 className={`text-4xl ${bebas_neue.className}`}>FirShop</h1>
            </Link>
            
            <Link href="/sign-in">
              <span className="text-stone-800 hover:text-stone-600 px-4 border-r border-stone-300 ">Login</span>
            </Link>
            <Link href="/sign-up">
              <span className="text-stone-800 hover:text-stone-600 px-4 ">Register</span>
            </Link>
        </SheetContent>
    </Sheet>
  )
}
