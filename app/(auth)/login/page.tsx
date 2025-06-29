
import GoogleLogin from '@/components/molecules/GoogleLogin';
import { Eye, EyeOff, User, Mail, Lock, Chrome, Github, Linkedin, Code, Briefcase, Zap, TrendingUp, Users, Globe } from 'lucide-react'
import Image from 'next/image';

export default function page() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Elements */}
      {/* <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-20 left-20 w-72 h-72 bg-orange-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-red-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
       */}
      {/* Main Container */}
      <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 items-center">
        
        {/* Left Side - Branding & Info */}
        <div className="hidden lg:block space-y-8 p-8">
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                <Code className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  WebDev Pro
                </h1>
                <p className="text-gray-500 text-sm">Project Management Excellence</p>
              </div>
            </div>
            
            <div className="space-y-4">
              {/* <h2 className="text-4xl font-bold text-gray-900 leading-tight">
                Welcome to the Future of
                <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent block">
                  Web Development
                </span>
              </h2> */}
              <h2 className="text-4xl font-bold text-gray-900 ">
                Where <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">Trends</span> Meet You.
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
              Stay ahead without the hassle. We bring you the latest styles, must-have items, and trending products all in one place, let the trends come to you.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-6">
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">500+</div>
                  <div className="text-sm text-gray-600 font-medium">Projects Delivered</div>
                </div>
              </div>
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">50K+</div>
                  <div className="text-sm text-gray-600 font-medium">Active Users</div>
                </div>
              </div>
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">25+</div>
                  <div className="text-sm text-gray-600 font-medium">Countries</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full max-w-md mx-auto">
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8 space-y-8">

            <div className="text-center space-y-4">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl flex items-center justify-center">
                  <User className="w-8 h-8 text-white" />
                </div>
              </div>
              
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">
                  Welcome Back
                </h3>
                <p className="text-gray-600">
                  Continue your journey in web development excellence
                </p>
              </div>
            </div>

            {/* <div className="flex bg-gray-100 rounded-2xl p-1">
              <button
                
                className="flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-all duration-300 bg-white text-gray-900 shadow-s"
              >
                Sign In
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-all duration-300 ${
                  !isLogin
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Sign Up
              </button>
            </div> */}

            <GoogleLogin />

            

            <div className="text-center">
              <p className="text-xs text-gray-500">
                By continuing, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
