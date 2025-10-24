import { getDataUser } from "@/lib/action/auth.action"
import { Mail, Store } from "lucide-react"
import Image from "next/image"

export default async function page() {
  const resultUser = await getDataUser()
  return (
    <section className="mt-24 md:mt-0">
      
      <div className="p-8 backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-xl hover:bg-white/15 transition-all duration-300 hover:shadow-2xl hover:border-white/30">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
          <div className="flex flex-col items-center lg:items-start gap-6">
            <Image 
              src={resultUser.avatar}
              alt={resultUser.fullName}
              width={200}
              height={200}
            />
          </div>
        
          <div className="flex flex-col justify-start gap-4">
            <h1 className="text-2xl lg:text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent pb-3">
              {resultUser.fullName}
            </h1>
          
            <div className="flex items-center gap-3 group">
              <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-400/20 to-blue-500/20 group-hover:from-cyan-400/30 group-hover:to-blue-500/30 transition-all duration-300">
                <Store className="h-5 w-5 text-cyan-500" />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">Store Name</p>
                <span 
                  className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-200"
                >
                  -
                </span>
              </div>
            </div>
          
            <div className="flex items-center gap-3 group">
              <div className="p-2 rounded-lg bg-gradient-to-br from-purple-400/20 to-pink-500/20 group-hover:from-purple-400/30 group-hover:to-pink-500/30 transition-all duration-300">
                <Mail className="h-5 w-5 text-purple-500" />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">Email Address</p>
                <span 
                  className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-200"
                >
                  {resultUser.email}
                </span>
              </div>
            </div>
          
          </div>
        </div>
      </div>

    </section>
  )
}
