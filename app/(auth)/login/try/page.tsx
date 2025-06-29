'use client'

import React, { useState } from 'react';
import { ShoppingBag, User, Chrome, Github, Linkedin, Code, TrendingUp, Shield, Zap, Globe, Database, Users } from 'lucide-react';

function App() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-20 left-20 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-500"></div>
      
      {/* Main Container */}
      <div className="w-full max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Side - Professional Showcase */}
        <div className="hidden lg:block space-y-10 p-8">
          <div className="space-y-8">
            {/* Brand Header */}
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <ShoppingBag className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 bg-clip-text text-transparent">
                  EcommercePro
                </h1>
                <p className="text-gray-600 text-base font-medium">Enterprise Commerce Solutions</p>
              </div>
            </div>
            
            {/* Main Headline */}
            <div className="space-y-6">
              <h2 className="text-5xl font-bold text-gray-900 leading-tight">
                Next-Generation
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent block">
                  Ecommerce Platform
                </span>
              </h2>
              <p className="text-xl text-gray-700 leading-relaxed font-medium">
                Built by Information Systems professionals for enterprise-level web development. 
                Experience the future of digital commerce with cutting-edge project management integration.
              </p>
            </div>

            {/* Professional Stats */}
            <div className="grid grid-cols-3 gap-8 pt-6">
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">500+</div>
                  <div className="text-sm text-gray-600 font-medium">Projects Delivered</div>
                </div>
              </div>
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">50K+</div>
                  <div className="text-sm text-gray-600 font-medium">Active Users</div>
                </div>
              </div>
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">25+</div>
                  <div className="text-sm text-gray-600 font-medium">Countries</div>
                </div>
              </div>
            </div>

            {/* Technology Stack */}
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-3xl p-8 space-y-6 border border-gray-100 shadow-sm">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                  <Database className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900">Enterprise Architecture</h4>
                  <p className="text-gray-600">Built with modern web development standards</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
                  <span className="text-gray-700 font-medium">Microservices Architecture</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
                  <span className="text-gray-700 font-medium">Cloud-Native Solutions</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                  <span className="text-gray-700 font-medium">Real-time Analytics</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-full"></div>
                  <span className="text-gray-700 font-medium">AI-Powered Insights</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Authentication Form */}
        <div className="w-full max-w-lg mx-auto">
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 p-10 space-y-8 relative">
            
            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full opacity-60"></div>
            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full opacity-60"></div>
            
            {/* Header */}
            <div className="text-center space-y-6">
              <div className="flex items-center justify-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 rounded-3xl flex items-center justify-center shadow-xl">
                  <User className="w-10 h-10 text-white" />
                </div>
              </div>
              
              <div>
                <h3 className="text-4xl font-bold text-gray-900 mb-3">
                  {isLogin ? 'Welcome Back' : 'Join the Platform'}
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {isLogin 
                    ? 'Access your professional ecommerce dashboard and continue building exceptional digital experiences' 
                    : 'Start your journey with enterprise-grade ecommerce solutions designed by Information Systems experts'
                  }
                </p>
              </div>
            </div>

            {/* Auth Toggle */}
            <div className="flex bg-gray-100 rounded-2xl p-1.5 shadow-inner">
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-4 px-6 rounded-xl text-base font-semibold transition-all duration-300 ${
                  isLogin
                    ? 'bg-white text-gray-900 shadow-lg transform scale-105'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-4 px-6 rounded-xl text-base font-semibold transition-all duration-300 ${
                  !isLogin
                    ? 'bg-white text-gray-900 shadow-lg transform scale-105'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* Google Authentication */}
            <div className="space-y-6">
              <button className="w-full flex items-center justify-center space-x-4 bg-white border-2 border-gray-200 rounded-2xl py-5 px-8 hover:border-blue-300 hover:shadow-xl transition-all duration-300 group transform hover:-translate-y-1">
                <Chrome className="w-6 h-6 text-gray-700 group-hover:text-blue-600 transition-colors" />
                <span className="text-gray-700 font-semibold text-lg group-hover:text-gray-900 transition-colors">
                  {isLogin ? 'Continue with Google' : 'Sign up with Google'}
                </span>
              </button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-base">
                  <span className="px-6 bg-white text-gray-500 font-medium">Secure Professional Access</span>
                </div>
              </div>
            </div>

            {/* Professional Features */}
            <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-2xl p-8 space-y-6 border border-blue-100">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900">Enterprise Security</h4>
                  <p className="text-gray-600">Built for Information Systems professionals</p>
                </div>
              </div>
              
              <div className="space-y-4 text-base">
                <div className="flex items-center space-x-3">
                  <div className="w-2.5 h-2.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
                  <span className="text-gray-700 font-medium">Enterprise-grade authentication & SSO</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2.5 h-2.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
                  <span className="text-gray-700 font-medium">Advanced project management integration</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2.5 h-2.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                  <span className="text-gray-700 font-medium">Real-time collaboration tools</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2.5 h-2.5 bg-gradient-to-r from-green-500 to-blue-500 rounded-full"></div>
                  <span className="text-gray-700 font-medium">AI-powered business insights</span>
                </div>
              </div>
            </div>

            {/* Professional Network */}
            <div className="flex items-center justify-center space-x-8 pt-6">
              <a href="#" className="text-gray-400 hover:text-blue-600 transition-all duration-300 transform hover:scale-110">
                <Github className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-600 transition-all duration-300 transform hover:scale-110">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-600 transition-all duration-300 transform hover:scale-110">
                <Code className="w-6 h-6" />
              </a>
            </div>

            {/* Footer */}
            <div className="text-center pt-4">
              <p className="text-sm text-gray-500 leading-relaxed">
                By continuing, you agree to our <span className="text-blue-600 hover:text-blue-700 cursor-pointer">Terms of Service</span> and <span className="text-blue-600 hover:text-blue-700 cursor-pointer">Privacy Policy</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;