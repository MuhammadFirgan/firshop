'use client';

import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, User, Menu, X, Package, Heart, Settings, LogOut, Bell } from 'lucide-react';
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
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems] = useState(3); // Mock cart count
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Products', href: '#' },
    { name: 'Categories', href: '#' },
    { name: 'Deals', href: '#' },
    { name: 'About', href: '#' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/90 backdrop-blur-lg border-b border-gray-200/50 shadow-lg' 
        : 'bg-gradient-to-r from-white via-blue-50/30 to-white backdrop-blur-md'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2 group cursor-pointer">
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-2 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <Package className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              StorePro
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-700 hover:text-blue-600 font-medium transition-all duration-200 hover:scale-105 relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* Search, Cart, Profile */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="hidden sm:block relative">
              <div className={`flex items-center transition-all duration-300 ${
                isSearchOpen ? 'w-64' : 'w-10'
              }`}>
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`transition-all duration-300 border-gray-200 focus:border-blue-400 focus:ring-blue-400/20 ${
                    isSearchOpen ? 'opacity-100 pl-10 pr-4' : 'opacity-0 w-0'
                  }`}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className={`${isSearchOpen ? 'absolute left-2' : ''} hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 hover:scale-105`}
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Mobile Search Button */}
            <Button
              variant="ghost"
              size="sm"
              className="sm:hidden hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
            >
              <Search className="h-4 w-4" />
            </Button>

            {/* Notifications */}
            <Button
              variant="ghost"
              size="sm"
              className="relative hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 hover:scale-105"
            >
              <Bell className="h-4 w-4" />
              <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 text-xs bg-red-500 hover:bg-red-500">
                2
              </Badge>
            </Button>

            {/* Cart */}
            <Button
              variant="ghost"
              size="sm"
              className="relative hover:bg-green-50 hover:text-green-600 transition-all duration-200 hover:scale-105"
            >
              <ShoppingCart className="h-4 w-4" />
              {cartItems > 0 && (
                <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 text-xs bg-green-500 hover:bg-green-500 animate-pulse">
                  {cartItems}
                </Badge>
              )}
            </Button>

            {/* Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="hover:bg-purple-50 hover:text-purple-600 transition-all duration-200 hover:scale-105">
                  <User className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-white/95 backdrop-blur-md border border-gray-200/50">
                <div className="px-3 py-2">
                  <p className="text-sm font-medium text-gray-900">John Doe</p>
                  <p className="text-xs text-gray-500">john@example.com</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="hover:bg-blue-50 hover:text-blue-600 transition-colors">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-green-50 hover:text-green-600 transition-colors">
                  <Package className="mr-2 h-4 w-4" />
                  Orders
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-pink-50 hover:text-pink-600 transition-colors">
                  <Heart className="mr-2 h-4 w-4" />
                  Wishlist
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-gray-50 hover:text-gray-600 transition-colors">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="hover:bg-red-50 hover:text-red-600 transition-colors">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden hover:bg-blue-50 hover:text-blue-600">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-white/95 backdrop-blur-md">
                <div className="flex flex-col space-y-6 mt-6">
                  {/* Mobile Search */}
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="Search products..."
                      className="pl-10 border-gray-200 focus:border-blue-400 focus:ring-blue-400/20"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>

                  {/* Mobile Navigation Links */}
                  <div className="flex flex-col space-y-4">
                    {navLinks.map((link) => (
                      <a
                        key={link.name}
                        href={link.href}
                        className="text-gray-700 hover:text-blue-600 font-medium py-2 px-4 rounded-lg hover:bg-blue-50 transition-all duration-200"
                      >
                        {link.name}
                      </a>
                    ))}
                  </div>

                  {/* Mobile Profile Section */}
                  <div className="pt-6 border-t border-gray-200">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-2 rounded-full">
                        <User className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">John Doe</p>
                        <p className="text-xs text-gray-500">john@example.com</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Button variant="ghost" className="w-full justify-start hover:bg-blue-50 hover:text-blue-600">
                        <Package className="mr-2 h-4 w-4" />
                        Orders
                      </Button>
                      <Button variant="ghost" className="w-full justify-start hover:bg-pink-50 hover:text-pink-600">
                        <Heart className="mr-2 h-4 w-4" />
                        Wishlist
                      </Button>
                      <Button variant="ghost" className="w-full justify-start hover:bg-gray-50 hover:text-gray-600">
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                      </Button>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;