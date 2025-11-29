'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
// import "../../../Components/UIs/SelectUI/page"
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';

export default function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userData, setUserData] = useState(null);

  const router = useRouter()

  useEffect(() => {
    // Get user from localStorage
    try {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        const user = JSON.parse(userStr);
        setUserData(user);
      }
    } catch (error) {
      console.error('Error parsing user from localStorage:', error);
    }
  }, []);

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('token');

    // Redirect to login
    router.push(`/Components/Auth/SignIn`)
  };





  const [userName, setUserName] = useState('Portfolio');
  const [selectedTemplate, setSelectedTemplate] = useState('UI1');
  const pathname = usePathname();

  useEffect(() => {
    // Get username and selected template from localStorage
    try {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        const user = JSON.parse(userStr);
        setUserName(user.userName || user.name || 'Portfolio');

        // Fetch user's selected template
        fetchSelectedTemplate(user.userName);
      }
    } catch (error) {
      console.error('Error parsing user from localStorage:', error);
    }
  }, []);

  const fetchSelectedTemplate = async (username: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile/${username}/templates`);
      if (response.ok) {
        const data = await response.json();
        setSelectedTemplate(data.selectedTemplate || 'UI1');
      }
    } catch (error) {
      console.error('Error fetching template:', error);
    }
  };

  const navItems = [
    { name: 'Dashboard', href: '/Components/DashBoard', icon: '' },
    { name: 'Templates', href: '/Components/UIs/SelectUI', icon: '' },
    { name: 'My Portfolio', href: `/portfolio/${userName}`, icon: '', isExternal: true },
  ];














  // const navItems = [
  //   { name: 'UI', href: '/Components/UIs/SelectUI', icon: '📊' },
  //   { name: 'Profile', href: '/Components/UIs/UI2', icon: '👤' },
  //   // { name: 'Projects', href: '/projects', icon: '🚀' },
  // ];


  useEffect(() => {
    // Get username from localStorage
    try {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        const user = JSON.parse(userStr);
        setUserName(user.userName || user.name || 'Portfolio');
      }
    } catch (error) {
      console.error('Error parsing user from localStorage:', error);
    }
  }, []);


  return (
    <nav className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-lg border-b border-slate-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/Components/DashBoard" className="flex items-center space-x-3 group">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg"
            >
              <span className="text-white font-bold text-xl">
                {userName.charAt(0).toUpperCase()}
              </span>
            </motion.div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              {userName}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200 group"
              >
                <span className="group-hover:scale-110 transition-transform">
                  {item.icon}
                </span>
                <span className="font-medium">{item.name}</span>
              </Link>
            ))}
          </div>

          {/* User Section & Logout - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {userData && (
              <div className="flex items-center space-x-3 px-4 py-2 bg-slate-800/50 rounded-lg border border-slate-700">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">
                    {userData.name?.charAt(0).toUpperCase() || 'U'}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-white">
                    {userData.name || 'User'}
                  </span>
                  <span className="text-xs text-gray-400">
                    @{userData.userName}
                  </span>
                </div>
              </div>
            )}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/30 rounded-lg transition-all duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              <span className="font-medium">Logout</span>
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-gray-300 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-slate-800/50 backdrop-blur-lg border-t border-slate-700"
          >
            <div className="px-4 py-6 space-y-4">
              {/* User Info Mobile */}
              {userData && (
                <div className="flex items-center space-x-3 px-4 py-3 bg-slate-900/50 rounded-lg border border-slate-700 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">
                      {userData.name?.charAt(0).toUpperCase() || 'U'}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-white">
                      {userData.name || 'User'}
                    </span>
                    <span className="text-xs text-gray-400">
                      @{userData.userName}
                    </span>
                  </div>
                </div>
              )}

              {/* Navigation Links Mobile */}
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-slate-900/50 rounded-lg transition-all duration-200"
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="font-medium">{item.name}</span>
                </Link>
              ))}

              {/* Logout Button Mobile */}
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/30 rounded-lg transition-all duration-200 mt-4"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
