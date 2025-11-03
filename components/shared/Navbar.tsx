'use client';

import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, User, Package, LogOut, Bell, Settings, Store, LayoutDashboard} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

import InputSearch from './InputSearch';
import { BarTypeProps } from './SidebarContent';
import LogoutButton from './LogoutButton';
import dynamic from 'next/dynamic';


const Navbar = ({type}: BarTypeProps) => {

  const [cartItems] = useState(3); 
  const [isScrolled, setIsScrolled] = useState(false);

  

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const DynamicMobileNav = dynamic(() => import('./MobileNav'), { ssr: false })


  return (
    <>
      {type === "dashboard" ? (
        <header className="fixed top-0 left-0 md:left-64 right-0 h-16 bg-white/70 backdrop-blur-sm border-b border-white/20 px-6 items-center justify-between md:z-[99999] flex">
          <div className="flex items-center flex-1 max-w-xl">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search products, orders, customers..."
                className="w-full pl-10 pr-4 py-2 bg-white/60 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
              />
            </div>
          </div>
    
          <div className="flex items-center space-x-4">
            <Button className="relative p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50/50 rounded-xl transition-all duration-200">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </Button>
            
            <Button className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50/50 rounded-xl transition-all duration-200">
              <Settings className="w-5 h-5" />
            </Button>
          </div>
          {/* <MobileNav type='dashboard'/> */}
          <DynamicMobileNav type='dashboard'/>
        </header>
      ) : (

        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/90 backdrop-blur-lg border-b border-gray-200/50 shadow-lg' 
            : 'bg-gradient-to-r from-white via-orange-50/30 to-white backdrop-blur-md'
        }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">

              <div className="flex items-center space-x-2 group cursor-pointer">
                <div className="bg-gradient-to-br from-orange-600 to-red-600 p-2 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <Package className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Firshop
                </span>
              </div>

              <div className="flex items-center space-x-4">
        
                <div className="hidden sm:block relative">
                  <InputSearch />
                </div>
    
                <Button
                  variant="ghost"
                  size="sm"
                  className="relative hover:bg-orange-50 hover:text-orange-600 transition-all duration-200 hover:scale-105"
                >
                  <ShoppingCart className="h-4 w-4" />
                  {cartItems > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 text-xs bg-orange-500 hover:bg-orange-500 animate-pulse">
                      {cartItems}
                    </Badge>
                  )}
                </Button>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="hover:bg-red-50 hover:text-red-600 transition-all duration-200 hover:scale-105 hidden md:block">
                        <User className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 bg-white/95 backdrop-blur-md border border-gray-200/50">
                    <DropdownMenuSeparator />
                      <DropdownMenuItem className="hover:bg-orange-50 hover:text-orange-600 transition-colors py-2">
                        {/* <BioProfile /> */}
                        <Link href="" className='flex'>
                  
                          <User className="mr-2 h-4 w-4" />
                          <span>Profile</span>
                        </Link>
                      </DropdownMenuItem>
                    
                    <DropdownMenuItem className="hover:bg-orange-50 hover:text-orange-600 transition-colors py-2">
                      <Link href="" className='flex'>
                        <Store className="mr-2 h-4 w-4" />
                        <span>Store</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-orange-50 hover:text-orange-600 transition-colors py-2">
                      <Link href="" className='flex'>
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        <span>Dashboard</span>
                      </Link>
                    </DropdownMenuItem>
                    
                    <DropdownMenuSeparator />
                      <DropdownMenuItem >
                        <LogoutButton />
                      </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <DynamicMobileNav type="other"/>
                {/* <MobileNav type="other"/> */}
              </div>
            </div>
          </div>
        </nav>
      )}    
    </>
  );
};

export default Navbar;