
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"

import { Button } from "../ui/button"
import { Heart, LayoutDashboard, Menu, Package, Search, Settings, ShoppingCart, Store, User } from "lucide-react"
import { Input } from "../ui/input"
import BioProfile from "./BioProfile"
import LogoutButton from "./LogoutButton"
import Link from "next/link";
import { BarTypeProps } from "./SidebarContent";
import GetNavigation from "./GetNavigation";
import Filter from "../Filter"

  
export default function MobileNav({type, navigation = []}: BarTypeProps) {
  
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
            {navigation.map((item: any) => (
              <li key={item.name} className="px-4 py-2">
                <Link href={item.href} className="flex gap-3">
                  <item.icon />
                  {item.name}
                </Link>

              </li>
            ))}
          </ul>
        ) : type === 'other' ? (
          <div className="flex flex-col gap-7 md:mt-20 mx-6 mt-8">
            <div className="flex gap-3">
              <User className="h-5 w-5 mb-4 text-gray-500" />
              <Link href="/profile" className="text-sm">My Profile</Link>
            </div>
            <div className="flex gap-3">
              <ShoppingCart className="h-5 w-5 mb-4 text-gray-500" />
              <Link href="/cart" className="text-sm">My Cart</Link>
            </div>
            <div className="flex gap-3">
              <Store className="h-5 w-5 mb-4 text-gray-500" />
              <Link href="/store" className="text-sm">My Store</Link>
            </div>
            <div className="flex gap-3">
              <LayoutDashboard className="h-5 w-5 mb-4 text-gray-500" />
              <Link href="/dashboard" className="text-sm">My Dashboard</Link>
            </div>
            
          </div>
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
        )
      }
      </SheetContent>
    </Sheet>
  )
}
