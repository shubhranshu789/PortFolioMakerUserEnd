'use client'

import React from 'react'

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        {/* Animated Shield Icon */}
        <div className="mb-8 relative">
          <div className="absolute inset-0 blur-3xl opacity-50">
            <div className="w-32 h-32 mx-auto bg-purple-500 rounded-full animate-pulse"></div>
          </div>
          <svg 
            className="w-32 h-32 mx-auto text-purple-400 animate-bounce relative z-10" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" 
            />
          </svg>
        </div>

        {/* Main Message */}
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight">
          Nice Try, Mate!
        </h1>
        
        <p className="text-xl md:text-2xl text-purple-300 mb-8 font-medium">
          But We Are Prepared 🛡️
        </p>

        {/* Subtext */}
        <p className="text-gray-400 mb-12 max-w-md mx-auto leading-relaxed">
          Looks like you stumbled upon a protected area. Our security systems are always watching, 
          and they're pretty good at their job.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => window.history.back()}
            className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50"
          >
            Go Back Safely
          </button>
          <button 
            onClick={() => window.location.href = '/'}
            className="px-8 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 border border-slate-700"
          >
            Return Home
          </button>
        </div>

        {/* Decorative Code Block */}
        <div className="mt-16 bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6 text-left max-w-md mx-auto">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <code className="text-sm text-green-400 font-mono">
            <div className="text-gray-500"># Security Status</div>
            <div>access: <span className="text-red-400">denied</span></div>
            <div>authentication: <span className="text-yellow-400">required</span></div>
            <div>threat_level: <span className="text-green-400">neutralized</span></div>
          </code>
        </div>
      </div>
    </div>
  )
}
