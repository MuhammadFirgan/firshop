
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Button } from "../ui/button"
import { Heart, Menu, Package, Search, Settings, User } from "lucide-react"
import { Input } from "../ui/input"
import BioProfile from "./BioProfile"
import LogoutButton from "./LogoutButton"
import Link from "next/link";
import { BarTypeProps } from "./SidebarContent";
import { navigation } from "./Sidebar";
  
export default function MobileNav({type}: BarTypeProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="md:hidden hover:bg-orange-50 hover:text-orange-600">
          <Menu className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-80 bg-white/95 backdrop-blur-md">
        {type === "dashboard" ? (
          <ul className="flex flex-col gap-4 pt-10">
            {navigation.map((item) => (
              <li key={item.name} className="px-4 py-2">
                <Link href={item.href} className="flex gap-3">
                  <item.icon />
                  {item.name}
                </Link>

              </li>
            ))}
          </ul>
        ) : (
        <div className="flex flex-col px-6 space-y-6 mt-12">
  
          <div className="relative">
            <Input
              type="text"
              placeholder="Search products..."
              className="pl-10 border-gray-200 focus:border-orange-400 focus:ring-orange-400/20"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>

          {/* <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="hover:bg-red-50 hover:text-red-600 transition-all duration-200 hover:scale-105 hidden md:block">
                  <User className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-white/95 backdrop-blur-md border border-gray-200/50">
              <DropdownMenuSeparator />
                <DropdownMenuItem className="hover:bg-orange-50 hover:text-orange-600 transition-colors py-2">
                  <BioProfile />
                  <Link href="" className='flex'>
            
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-orange-50 hover:text-orange-600 transition-colors py-2">
                <Link href="" className='flex'>
                  <Package className="mr-2 h-4 w-4" />
                  <span>Orders</span>
                </Link>
              </DropdownMenuItem>
              
              <DropdownMenuSeparator />
              <LogoutButton />
                <DropdownMenuItem >
                </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu> */}
          <div className="pt-6 border-t border-gray-200">
            <BioProfile type="mobile" />
            <div className="space-y-2">
              <Button variant="ghost" className="w-full justify-start hover:bg-orange-50 hover:text-orange-600">
                <Package className="mr-2 h-4 w-4" />
                Orders
              </Button>
              <Button variant="ghost" className="w-full justify-start hover:bg-pink-50 hover:text-pink-600">
                <Heart className="mr-2 h-4 w-4" />
                Wishlist
              </Button>
              <LogoutButton />
            </div>
          </div>
        </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
