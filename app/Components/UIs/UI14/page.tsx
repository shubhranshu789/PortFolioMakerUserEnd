"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, Github, Mail, Linkedin, Twitter, ExternalLink, ChevronDown, ArrowRight, Send, Sparkles, Heart, Star, Flower2, Eye, Code, Zap, Globe } from "lucide-react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import type React from "react"
import { useRouter } from 'next/navigation'
import emailjs from '@emailjs/browser';

interface UserData {
  hero: {
    title: string
    highlightText: string
    subtitle: string
    primaryButtonText: string
    secondaryButtonText: string
  }
  aboutMe: {
    sectionTitle: string
    headline: string
    introduction: string
    description: string
    coreValues: string[]
    stats: {
      projectsCompleted: number
      yearsExperience: number
      happyClients: number
      techSkills: number
    }
  }
  skillCategories: Array<{
    category: string
    skills: string[]
    color: string
    icon: string
  }>
  experiences: Array<{
    role: string
    company: string
    period: string
    description: string
    skills: string[]
  }>
  projects: Array<{
    title: string
    description: string
    image: string
    tags: string[]
    links: {
      live: string
      github: string
    }
  }>
  socialLinks: Array<{
    icon: string
    label: string
    href: string
    color: string
  }>
}

export default function LuminescentPortfolio() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeSection, setActiveSection] = useState('home')
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const router = useRouter()
  const { scrollYProgress } = useScroll()
  const scaleProgress = useTransform(scrollYProgress, [0, 1], [0, 1])

  const [USERNAME, setUsername] = useState('')
  const [userName, setUserName] = useState('Portfolio')
  const [userEmail, setuserEmail] = useState('')
  const API_BASE = `${process.env.NEXT_PUBLIC_API_URL}`;

  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  // Mouse tracking for glow effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const storedUser = localStorage.getItem('user');

      if (!storedUser) {
        alert('Portfolio owner information not found');
        return;
      }

      const userData = JSON.parse(storedUser);
      const portfolioOwnerEmail = userData.email;

      const templateParams = {
        to_email: portfolioOwnerEmail,
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
      };

      await emailjs.send(
        'service_girqhvt',
        'template_u847pee',
        templateParams,
        'O8RoSh1QrCmKJeJn7'
      );

      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', message: '' });
      }, 3000);

    } catch (error) {
      console.error('Error sending email:', error);
      alert('Failed to send message. Please try again.');
    }
  };

  useEffect(() => {
    const getUserFromStorage = () => {
      try {
        const userStr = localStorage.getItem('user')
        if (userStr) {
          const user = JSON.parse(userStr)
          setUsername(user.userName || user.username || '')
          setUserName(user.userName || user.name || 'Portfolio')
          setuserEmail(user.email || '')
          return user.userName || user.username || ''
        }
      } catch (error) {
        console.error('Error parsing user from localStorage:', error)
      }
      return ''
    }

    const currentUsername = getUserFromStorage()

    if (currentUsername) {
      fetchUserData(currentUsername)
    } else {
      alert('❌ Please login first')
      router.push(`/Components/Auth/SignIn`)
    }
  }, [])

  const fetchUserData = async (username: string) => {
    try {
      setLoading(true)
      const response = await fetch(`${API_BASE}/profile/${username}`)
      if (response.ok) {
        const data = await response.json()
        setUserData(data)
      }
    } catch (error) {
      console.error('Error fetching user data:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { label: "HOME", href: "#home" },
    { label: "ABOUT", href: "#about" },
    { label: "SKILLS", href: "#skills" },
    { label: "WORK", href: "#projects" },
    { label: "CONTACT", href: "#contact" },
    // { label: "DASHBOARD", href: "/Components/DashBoard" },
  ]

  const currentYear = new Date().getFullYear()

  // Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  }

  const glowEffect = {
    boxShadow: '0 0 40px rgba(236, 72, 153, 0.6), 0 0 80px rgba(236, 72, 153, 0.3), inset 0 0 20px rgba(236, 72, 153, 0.2)'
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{
              rotate: 360,
              scale: [1, 1.2, 1],
            }}
            transition={{ 
              rotate: { duration: 2, repeat: Infinity, ease: "linear" },
              scale: { duration: 1.5, repeat: Infinity }
            }}
            className="w-32 h-32 border-4 border-pink-500/20 border-t-pink-500 rounded-lg mx-auto mb-8"
            style={{ boxShadow: '0 0 60px rgba(236, 72, 153, 0.8)' }}
          />
          <motion.p 
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-pink-500 text-2xl font-black tracking-[0.3em] uppercase"
            style={{ textShadow: '0 0 20px rgba(236, 72, 153, 0.8)' }}
          >
            LOADING PORTFOLIO
          </motion.p>
        </motion.div>
      </div>
    )
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-pink-500 text-2xl font-black">SYSTEM ERROR</p>
      </div>
    )
  }

  return (
    <div className="w-full bg-black text-white overflow-x-hidden relative">
      {/* Animated Grid Background */}
      <div className="fixed inset-0 z-0 opacity-20">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `
              linear-gradient(rgba(236, 72, 153, 0.3) 2px, transparent 2px),
              linear-gradient(90deg, rgba(236, 72, 153, 0.3) 2px, transparent 2px)
            `,
            backgroundSize: '60px 60px',
            animation: 'gridMove 20s linear infinite'
          }} 
        />
      </div>

      {/* Cursor Glow Effect */}
      <motion.div
        className="fixed w-96 h-96 rounded-full pointer-events-none z-0 mix-blend-screen"
        style={{
          background: 'radial-gradient(circle, rgba(236, 72, 153, 0.15) 0%, transparent 70%)',
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
        }}
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      {/* Neon Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 origin-left z-50"
        style={{ 
          scaleX: scaleProgress,
          boxShadow: '0 0 20px rgba(236, 72, 153, 1), 0 0 40px rgba(236, 72, 153, 0.6)'
        }}
      />

      {/* Top Navigation Bar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 w-full z-40 transition-all duration-300 ${
          scrolled 
            ? "bg-black/90 backdrop-blur-xl border-b border-pink-500/30" 
            : "bg-transparent"
        }`}
        style={scrolled ? { boxShadow: '0 4px 30px rgba(236, 72, 153, 0.2)' } : {}}
      >
        <div className="max-w-[95%] mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="relative"
          >
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 bg-pink-500 blur-xl opacity-50"
            />
            <span 
              className="relative text-3xl font-black tracking-wider text-pink-500 uppercase"
              style={{ textShadow: '0 0 30px rgba(236, 72, 153, 0.8)' }}
            >
              {userName}
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative px-5 py-2 text-sm font-black tracking-wider text-gray-400 hover:text-pink-500 transition-all group"
              >
                {link.label}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-pink-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"
                  style={{ boxShadow: '0 0 10px rgba(236, 72, 153, 0.8)' }}
                />
              </motion.a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-pink-500"
          >
            {mobileOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden bg-black/95 backdrop-blur-xl border-b border-pink-500/30 overflow-hidden"
            >
              <div className="p-6 space-y-4">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={index}
                    href={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setMobileOpen(false)}
                    className="block text-gray-400 hover:text-pink-500 transition-colors py-3 text-lg font-black tracking-wider"
                  >
                    {link.label}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <style jsx global>{`
        @keyframes gridMove {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(60px);
          }
        }
      `}</style>

      {/* HERO SECTION - Large Typography Grid Layout */}
      <section 
        style={{ marginTop: "80px" }} 
        id="home" 
        className="relative min-h-screen flex items-center px-6 overflow-hidden"
      >
        {/* Glowing Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-20 right-20 w-[600px] h-[600px] bg-pink-500/30 rounded-full blur-[150px]"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute bottom-20 left-20 w-[500px] h-[500px] bg-purple-500/30 rounded-full blur-[150px]"
        />

        <div className="max-w-[95%] mx-auto w-full relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            {/* Status Badge */}
            <motion.div variants={fadeInUp} className="mb-12">
              <motion.span 
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center gap-3 px-6 py-3 bg-pink-500/10 border-2 border-pink-500/50 rounded-lg text-pink-500 text-sm font-black tracking-widest uppercase backdrop-blur-md"
                style={glowEffect}
              >
                <motion.div
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-3 h-3 bg-pink-500 rounded-full"
                />
                AVAILABLE FOR WORK
              </motion.span>
            </motion.div>

            {/* Main Grid Layout */}
            <div className="grid lg:grid-cols-12 gap-8">
              {/* Large Title - Takes up majority of space */}
              <motion.div 
                variants={fadeInUp}
                className="lg:col-span-8"
              >
                <motion.h1
                  className="text-7xl md:text-8xl lg:text-9xl font-black leading-[0.9] mb-8"
                  style={{ 
                    fontFamily: 'system-ui',
                    letterSpacing: '-0.02em'
                  }}
                >
                  <motion.span 
                    className="block text-white mb-4"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    BUILDING
                  </motion.span>
                  <motion.span 
                    className="block text-pink-500 relative inline-block"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    style={{ 
                      textShadow: '0 0 40px rgba(236, 72, 153, 0.8), 0 0 80px rgba(236, 72, 153, 0.5)' 
                    }}
                  >
                    {userData.hero.highlightText.toUpperCase()}
                  </motion.span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                  variants={fadeInUp}
                  className="text-xl md:text-2xl text-gray-400 max-w-3xl leading-relaxed mb-10 font-light"
                >
                  {userData.hero.subtitle}
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                  variants={fadeInUp}
                  className="flex flex-wrap gap-6"
                >
                  <motion.a
                    href="#projects"
                    whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(236, 72, 153, 0.8)' }}
                    whileTap={{ scale: 0.95 }}
                    className="group px-10 py-5 bg-pink-500 text-black font-black rounded-lg flex items-center gap-3 text-lg uppercase tracking-wider relative overflow-hidden"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-500"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                    <span className="relative z-10">{userData.hero.primaryButtonText}</span>
                    <ArrowRight className="relative z-10" size={22} />
                  </motion.a>

                  <motion.a
                    href="#contact"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-10 py-5 bg-transparent border-2 border-pink-500 text-pink-500 font-black rounded-lg hover:bg-pink-500/10 transition-all text-lg uppercase tracking-wider"
                  >
                    {userData.hero.secondaryButtonText}
                  </motion.a>
                </motion.div>
              </motion.div>

              {/* Side Info Cards */}
              <motion.div 
                variants={fadeInUp}
                className="lg:col-span-4 space-y-6"
              >
                {/* Info Card 1 */}
                <motion.div
                  whileHover={{ scale: 1.03, y: -5 }}
                  className="p-8 bg-pink-500/5 border border-pink-500/30 rounded-2xl backdrop-blur-md relative overflow-hidden group"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                  <div className="relative z-10">
                    <Eye className="text-pink-500 mb-4" size={32} />
                    <h3 className="text-2xl font-black text-white mb-2 uppercase">VISION</h3>
                    <p className="text-gray-400 text-sm">
                      Creating digital experiences that merge aesthetics with functionality
                    </p>
                  </div>
                </motion.div>

                {/* Info Card 2 */}
                <motion.div
                  whileHover={{ scale: 1.03, y: -5 }}
                  className="p-8 bg-purple-500/5 border border-purple-500/30 rounded-2xl backdrop-blur-md relative overflow-hidden group"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                  <div className="relative z-10">
                    <Zap className="text-purple-500 mb-4" size={32} />
                    <h3 className="text-2xl font-black text-white mb-2 uppercase">APPROACH</h3>
                    <p className="text-gray-400 text-sm">
                      Fast, efficient, and cutting-edge solutions for modern challenges
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-pink-500 text-xs font-black tracking-widest">SCROLL</span>
          <ChevronDown className="text-pink-500" size={32} />
        </motion.div>
      </section>

      {/* ABOUT SECTION - Grid Masonry Layout */}
      <section id="about" className="relative py-32 px-6">
        <div className="max-w-[95%] mx-auto">
          {/* Section Header */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mb-20"
          >
            <span className="text-pink-500 text-sm font-black tracking-[0.3em] uppercase mb-4 block">
              {userData.aboutMe.sectionTitle}
            </span>
            <h2 className="text-6xl md:text-8xl font-black text-white mb-6 uppercase leading-tight">
              {userData.aboutMe.headline.split(' ').map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={i % 2 === 1 ? "text-pink-500" : ""}
                  style={i % 2 === 1 ? { textShadow: '0 0 40px rgba(236, 72, 153, 0.8)' } : {}}
                >
                  {word}{' '}
                </motion.span>
              ))}
            </h2>
          </motion.div>

          {/* Masonry Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Large Story Card */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={scaleIn}
              className="lg:col-span-2 lg:row-span-2 p-12 bg-gradient-to-br from-pink-500/10 to-purple-500/10 border-2 border-pink-500/30 rounded-3xl backdrop-blur-md relative overflow-hidden group"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />
              
              <div className="relative z-10">
                <div className="mb-8">
                  <div className="w-20 h-20 bg-pink-500/20 border-2 border-pink-500 rounded-2xl flex items-center justify-center mb-6">
                    <Code className="text-pink-500" size={40} />
                  </div>
                  <h3 className="text-4xl font-black text-white mb-8 uppercase">My Journey</h3>
                </div>

                <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                  <p className="border-l-4 border-pink-500 pl-6 italic text-xl">
                    {userData.aboutMe.introduction}
                  </p>
                  <p>{userData.aboutMe.description}</p>
                </div>

                {/* Core Values */}
                {userData.aboutMe.coreValues.length > 0 && (
                  <div className="mt-10 grid grid-cols-2 gap-4">
                    {userData.aboutMe.coreValues.map((value, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.05, x: 5 }}
                        className="flex items-center gap-3 p-4 bg-black/30 rounded-xl border border-pink-500/20"
                      >
                        <div className="w-2 h-2 bg-pink-500 rounded-full" />
                        <span className="text-white font-bold text-sm uppercase">{value}</span>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Decorative Corner */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute -top-20 -right-20 w-60 h-60 border-2 border-pink-500/20 rounded-full"
              />
            </motion.div>

            {/* Stats Cards */}
            {(() => {
              const statsConfig = [
                { key: 'projectsCompleted', label: 'PROJECTS', icon: '⚡', gradient: 'from-pink-500 to-rose-500' },
                { key: 'yearsExperience', label: 'YEARS', icon: '🔥', gradient: 'from-purple-500 to-pink-500' },
                { key: 'happyClients', label: 'CLIENTS', icon: '💎', gradient: 'from-rose-500 to-pink-500' },
                { key: 'techSkills', label: 'SKILLS', icon: '⭐', gradient: 'from-pink-500 to-purple-500' },
              ];

              return statsConfig
                .filter(stat => userData.aboutMe.stats[stat.key as keyof typeof userData.aboutMe.stats] > 0)
                .map((stat, index) => (
                  <motion.div
                    key={index}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={scaleIn}
                    whileHover={{ y: -10, scale: 1.05 }}
                    className="p-10 bg-black/50 border-2 border-pink-500/30 rounded-3xl backdrop-blur-md relative overflow-hidden group"
                  >
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
                    />
                    
                    <div className="relative z-10 text-center">
                      <div className="text-6xl mb-6">{stat.icon}</div>
                      <motion.div 
                        className={`text-6xl font-black bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-4`}
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", stiffness: 100 }}
                      >
                        {userData.aboutMe.stats[stat.key as keyof typeof userData.aboutMe.stats]}+
                      </motion.div>
                      <div className="text-gray-400 text-xs uppercase tracking-[0.2em] font-black">
                        {stat.label}
                      </div>
                    </div>

                    <motion.div
                      animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.6, 0.3]
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="absolute -bottom-10 -right-10 w-40 h-40 border-2 border-pink-500/20 rounded-full"
                    />
                  </motion.div>
                ));
            })()}
          </div>
        </div>
      </section>

      {/* SKILLS SECTION - Grid Cards */}
      <section id="skills" className="relative py-32 px-6 bg-black/50">
        <div className="max-w-[95%] mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-20"
          >
            <h2 className="text-6xl md:text-8xl font-black text-white mb-6 uppercase">
              TECH <span className="text-pink-500" style={{ textShadow: '0 0 40px rgba(236, 72, 153, 0.8)' }}>STACK</span>
            </h2>
            <p className="text-gray-400 text-xl">
              Tools powering my creative arsenal
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {userData.skillCategories.length > 0 ? (
              userData.skillCategories.map((category, index) => (
                <motion.div
                  key={index}
                  variants={scaleIn}
                  whileHover={{ y: -10, scale: 1.03 }}
                  className="group p-10 bg-gradient-to-br from-pink-500/5 to-purple-500/5 border-2 border-pink-500/30 rounded-3xl backdrop-blur-md overflow-hidden relative"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  />

                  {/* Header */}
                  <div className="relative z-10 mb-8">
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                      className="w-20 h-20 bg-gradient-to-br from-pink-500 to-purple-500 rounded-2xl flex items-center justify-center text-4xl mb-6 border-2 border-pink-500"
                      style={{ boxShadow: '0 0 30px rgba(236, 72, 153, 0.6)' }}
                    >
                      {category.icon}
                    </motion.div>
                    <h3 className="text-3xl font-black text-white uppercase tracking-wider">
                      {category.category}
                    </h3>
                  </div>

                  {/* Skills Tags */}
                  <div className="relative z-10 flex flex-wrap gap-3">
                    {category.skills.map((skill, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.05 }}
                        whileHover={{ y: -3, scale: 1.1 }}
                        className="px-4 py-2 bg-black/50 border border-pink-500/30 rounded-lg hover:border-pink-500 hover:bg-pink-500/10 transition-all cursor-pointer"
                      >
                        <span className="font-bold text-pink-500 text-sm uppercase tracking-wide">{skill}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Corner Decoration */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-pink-500/20 to-transparent rounded-bl-[100px]" />
                </motion.div>
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500 text-xl">No skills added yet</p>
            )}
          </motion.div>
        </div>
      </section>

      {/* EXPERIENCE SECTION - Timeline Cards */}
      {userData.experiences && userData.experiences.length > 0 && (
        <section id="experience" className="relative py-32 px-6">
          <div className="max-w-[95%] mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-20"
            >
              <h2 className="text-6xl md:text-8xl font-black text-white mb-6 uppercase">
                CAREER <span className="text-pink-500" style={{ textShadow: '0 0 40px rgba(236, 72, 153, 0.8)' }}>PATH</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {userData.experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={scaleIn}
                  whileHover={{ y: -10, scale: 1.03 }}
                  className="p-10 bg-gradient-to-br from-pink-500/10 to-purple-500/10 border-2 border-pink-500/30 rounded-3xl backdrop-blur-md relative overflow-hidden group"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  />

                  <div className="relative z-10">
                    {/* Period Badge */}
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="inline-block px-5 py-2 bg-pink-500/20 border border-pink-500/50 rounded-lg text-pink-500 text-xs font-black uppercase tracking-wider mb-6"
                    >
                      {exp.period}
                    </motion.div>

                    <h3 className="text-3xl font-black text-white mb-3 uppercase group-hover:text-pink-500 transition-colors">
                      {exp.role}
                    </h3>
                    <p className="text-pink-500 font-black mb-6 text-lg flex items-center gap-2 uppercase tracking-wide">
                      {exp.company}
                    </p>
                    <p className="text-gray-400 leading-relaxed mb-8 text-base">
                      {exp.description}
                    </p>

                    {/* Skills Tags */}
                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((skill, idx) => (
                        <motion.span
                          key={idx}
                          whileHover={{ scale: 1.1, y: -2 }}
                          className="px-3 py-1 bg-black/50 text-pink-500 rounded-lg text-xs font-black border border-pink-500/20 uppercase"
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* Corner Accent */}
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-pink-500/20 to-transparent rounded-tr-[80px]" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* PROJECTS SECTION - Large Image Grid */}
      <section id="projects" className="relative py-32 px-6 bg-black/50">
        <div className="max-w-[95%] mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-20"
          >
            <h2 className="text-6xl md:text-8xl font-black text-white mb-6 uppercase">
              FEATURED <span className="text-pink-500" style={{ textShadow: '0 0 40px rgba(236, 72, 153, 0.8)' }}>WORK</span>
            </h2>
            <p className="text-gray-400 text-xl">
              Projects that define my creative journey
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {userData.projects.length > 0 ? (
              userData.projects.map((project, index) => (
                <motion.div
                  key={index}
                  variants={scaleIn}
                  whileHover={{ y: -15, scale: 1.02 }}
                  className="group relative"
                  style={{
                    gridRow: index === 0 || index === 3 ? 'span 2' : 'span 1'
                  }}
                >
                  <div className="relative h-full overflow-hidden rounded-3xl bg-black border-2 border-pink-500/30 hover:border-pink-500 transition-all">
                    {/* Project Image */}
                    <div className="relative h-96 overflow-hidden">
                      {project.image ? (
                        <motion.img
                          whileHover={{ scale: 1.15 }}
                          transition={{ duration: 0.6 }}
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-pink-500/30 to-purple-500/30 flex items-center justify-center">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                          >
                            <Globe size={100} className="text-pink-500/50" />
                          </motion.div>
                        </div>
                      )}
                      
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                      
                      {/* Hover Action Buttons */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        className="absolute inset-0 bg-pink-500/20 backdrop-blur-sm flex items-center justify-center gap-4"
                      >
                        {project.links.live && (
                          <motion.a
                            href={project.links.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.2, rotate: 5 }}
                            className="p-5 bg-black border-2 border-pink-500 rounded-2xl text-pink-500 hover:bg-pink-500 hover:text-black transition-all"
                            style={{ boxShadow: '0 0 30px rgba(236, 72, 153, 0.6)' }}
                          >
                            <ExternalLink size={28} />
                          </motion.a>
                        )}
                        {project.links.github && (
                          <motion.a
                            href={project.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.2, rotate: -5 }}
                            className="p-5 bg-black border-2 border-pink-500 rounded-2xl text-pink-500 hover:bg-pink-500 hover:text-black transition-all"
                            style={{ boxShadow: '0 0 30px rgba(236, 72, 153, 0.6)' }}
                          >
                            <Github size={28} />
                          </motion.a>
                        )}
                      </motion.div>

                      {/* Featured Badge */}
                      {index < 2 && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute top-6 right-6 px-4 py-2 bg-pink-500 rounded-lg text-black font-black text-xs uppercase tracking-wider"
                          style={{ boxShadow: '0 0 20px rgba(236, 72, 153, 0.8)' }}
                        >
                          ⭐ FEATURED
                        </motion.div>
                      )}
                    </div>

                    {/* Project Info */}
                    <div className="p-8 bg-gradient-to-b from-black/80 to-black">
                      <motion.h3 
                        className="text-3xl font-black text-white mb-4 uppercase group-hover:text-pink-500 transition-colors"
                        whileHover={{ x: 5 }}
                      >
                        {project.title}
                      </motion.h3>
                      
                      <p className="text-gray-400 text-sm mb-6 line-clamp-2">
                        {project.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {project.tags.slice(0, 3).map((tag, idx) => (
                          <motion.span
                            key={idx}
                            whileHover={{ y: -2, scale: 1.05 }}
                            className="px-3 py-1.5 bg-pink-500/10 text-pink-500 rounded-lg text-xs font-black border border-pink-500/30 uppercase tracking-wide"
                          >
                            {tag}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500 text-xl py-20">
                No projects added yet
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* CONTACT SECTION - Bold Form */}
      <section id="contact" className="relative py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-20">
              <h2 className="text-6xl md:text-8xl font-black text-white mb-6 uppercase">
                LET'S <span className="text-pink-500" style={{ textShadow: '0 0 40px rgba(236, 72, 153, 0.8)' }}>CONNECT</span>
              </h2>
              <p className="text-gray-400 text-xl">
                Ready to create something extraordinary?
              </p>
            </motion.div>

            <motion.form
              variants={fadeInUp}
              onSubmit={handleSubmit}
              className="space-y-8 p-12 bg-gradient-to-br from-pink-500/10 to-purple-500/10 border-2 border-pink-500/30 rounded-3xl backdrop-blur-md relative overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-transparent"
              />

              <div className="relative z-10 space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-pink-500 text-sm font-black mb-3 uppercase tracking-widest">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-6 py-5 bg-black/50 border-2 border-pink-500/30 rounded-xl focus:border-pink-500 focus:outline-none transition-all placeholder-gray-600 text-white font-medium"
                      style={{ boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)' }}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-pink-500 text-sm font-black mb-3 uppercase tracking-widest">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-6 py-5 bg-black/50 border-2 border-pink-500/30 rounded-xl focus:border-pink-500 focus:outline-none transition-all placeholder-gray-600 text-white font-medium"
                      style={{ boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)' }}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-pink-500 text-sm font-black mb-3 uppercase tracking-widest">
                    Message
                  </label>
                  <textarea
                    name="message"
                    placeholder="Tell me about your project..."
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-6 py-5 bg-black/50 border-2 border-pink-500/30 rounded-xl focus:border-pink-500 focus:outline-none transition-all placeholder-gray-600 text-white font-medium resize-none"
                    style={{ boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)' }}
                    required
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02, boxShadow: '0 0 60px rgba(236, 72, 153, 0.8)' }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={submitted}
                  className="w-full px-10 py-6 bg-gradient-to-r from-pink-500 to-purple-500 text-black font-black rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-4 text-xl uppercase tracking-wider relative overflow-hidden"
                >
                  {submitted ? (
                    <>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="text-2xl"
                      >
                        ✓
                      </motion.div>
                      MESSAGE SENT!
                    </>
                  ) : (
                    <>
                      <Send size={24} />
                      SEND MESSAGE
                      <ArrowRight size={24} />
                    </>
                  )}
                </motion.button>
              </div>
            </motion.form>

            {/* Social Links */}
            <motion.div
              variants={fadeInUp}
              className="mt-20 text-center"
            >
              <h3 className="text-3xl font-black text-white mb-10 uppercase tracking-wider">Connect</h3>
              <div className="flex justify-center gap-6 flex-wrap">
                {userData.socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -8, scale: 1.15 }}
                    className="w-20 h-20 bg-pink-500/10 border-2 border-pink-500/30 rounded-2xl flex items-center justify-center text-3xl hover:border-pink-500 hover:bg-pink-500/20 transition-all"
                    style={{ color: social.color }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER - Minimalist */}
      <footer className="relative py-12 px-6 border-t-2 border-pink-500/20">
        <div className="max-w-[95%] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">
              © {currentYear} {userName}. All Rights Reserved.
            </p>
            <div className="flex gap-8 text-sm text-gray-500 font-medium uppercase tracking-wider">
              <Link href="#" className="hover:text-pink-500 transition-colors">
                Privacy
              </Link>
              <Link href="#" className="hover:text-pink-500 transition-colors">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
