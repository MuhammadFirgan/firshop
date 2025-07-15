
import Link from 'next/link'
import Filter from '../Filter'
import { BarChart3, Bell, Home, Menu, Package, Settings, ShoppingCart, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { Button } from '../ui/button';
import SidebarContent, { BarTypeProps } from '../atoms/SidebarContent';



export const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home, current: true },
  { name: 'Products', href: '/dashboard/product', icon: Package, current: false },
  { name: 'Orders', href: '#', icon: ShoppingCart, current: false },
  { name: 'Customers', href: '#', icon: Users, current: false },
  { name: 'Analytics', href: '#', icon: BarChart3, current: false },
  { name: 'Marketing', href: '#', icon: Bell, current: false },
  { name: 'Settings', href: '#', icon: Settings, current: false },
];

export default function Sidebar({type} : BarTypeProps) {

  return (
    <>
      
      <Sheet>
        <SheetTrigger asChild className="lg:hidden">
          <Button variant="ghost" size="icon" className="lg:hidden">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-72 p-0">
          <SidebarContent type={type} />
        </SheetContent>
      </Sheet>

      <aside className="fixed left-0 top-0 h-screen p-6 w-[256px] z-[99999]">
        <div className='flex-col gap-5 hidden lg:flex'>
          <SidebarContent type={type}/>
        </div>
      </aside>
    </>

  )
}
