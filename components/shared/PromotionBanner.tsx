import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";
import Countdown from "./Countdown";


export default function PromotionBanner() {
  return (
    <div className="relative w-full min-h-[600px] bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden mb-8">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-purple-500/15 to-pink-500/15 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-lg animate-pulse delay-500"></div>

        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent animate-slide-right"></div>
        <div className="absolute bottom-0 right-0 w-full h-px bg-gradient-to-l from-transparent via-red-500/50 to-transparent animate-slide-left"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-16 h-full">
        <div className="flex flex-col gap-12 items-center justify-center min-h-[500px] md:flex-row">
          <div className="text-white w-full flex flex-col gap-6 animate-fade-in-up md:pl-12">
            <div className="space-y-2">
              <span className="inline-block px-4 py-2 text-sm font-medium bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent border border-orange-500/30 rounded-full backdrop-blur-sm animate-glow">
                ✨ Discount 30%
              </span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold leading-tight">
              <span className="block bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent animate-text-shimmer">
                Elevate Your
              </span>
              <span className="block bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 bg-clip-text text-transparent animate-text-shimmer delay-200">
                Sneakers Game
              </span>
            </h1>
            
            <Countdown />
            
            <div className="flex gap-4 animate-fade-in-up delay-500">
              <Button asChild className="group relative bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 !text-white px-8 py-4 rounded-xl font-semibold flex items-center justify-center space-x-2 hover:shadow-2xl hover:shadow-orange-500/30 transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 border border-orange-500/20">
                <Link href="/shop">
                  <span className="relative z-10 ">Buy Now</span>
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                </Link>
              </Button>
              
              
            </div>
          </div>

          <div className="w-full relative animate-fade-in-right">
            <div className="relative group">
              <div className="relative ">
                <Image 
                  src="/img/shoes.png" 
                  width={600} 
                  height={500} 
                  alt="Premium Sneakers" 
                  className="w-full h-auto rounded-2xl group-hover:scale-105 transition-transform duration-700 drop-shadow-xl custom-white-shadow"
                />

                <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-bounce delay-1500"></div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
