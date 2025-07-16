
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"

import { Button } from "../ui/button"
import { Heart, Menu, Package, Search, Settings, User } from "lucide-react"
import { Input } from "../ui/input"
import BioProfile from "./BioProfile"
import LogoutButton from "./LogoutButton"
  
export default function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="md:hidden hover:bg-orange-50 hover:text-orange-600">
          <Menu className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-80 bg-white/95 backdrop-blur-md">
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
      </SheetContent>
    </Sheet>
  )
}
