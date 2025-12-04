"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { 
  Menu, X, Github, Mail, Linkedin, Twitter, ExternalLink, ChevronDown, 
  ArrowRight, Send, Sparkles, Zap, Cpu, Terminal, Code2, Rocket, 
  Brain, Layers, Box, Eye, Star, Award, TrendingUp, Coffee, Heart
} from "lucide-react"
import { motion, useScroll, useTransform, AnimatePresence, useSpring, useInView } from "framer-motion"
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

export default function RedesignedPortfolio() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeSection, setActiveSection] = useState('home')
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [cursorVariant, setCursorVariant] = useState("default")

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

  // Custom Cursor Effect
  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", mouseMove)
    return () => window.removeEventListener("mousemove", mouseMove)
  }, [])

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
    },
    text: {
      height: 150,
      width: 150,
      x: mousePosition.x - 75,
      y: mousePosition.y - 75,
      backgroundColor: "rgba(6, 182, 212, 0.1)",
      mixBlendMode: "difference"
    }
  }

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
      
      // Active section detection
      const sections = ['home', 'about', 'skills', 'projects', 'contact']
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section)
            break
          }
        }
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Work", href: "#projects" },
    { label: "Contact", href: "#contact" },
    // { label: "Dashboard", href: "/Components/DashBoard" },
  ]

  const currentYear = new Date().getFullYear()

  // Enhanced Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  }

  const fadeInLeft = {
    hidden: { opacity: 0, x: -60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  }

  const fadeInRight = {
    hidden: { opacity: 0, x: 60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  }

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    }
  }

  const rotateIn = {
    hidden: { opacity: 0, rotate: -10 },
    visible: {
      opacity: 1,
      rotate: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [360, 180, 0],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"
          />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center z-10"
        >
          <motion.div className="relative w-32 h-32 mx-auto mb-8">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border-4 border-transparent border-t-cyan-400 border-r-blue-400 rounded-full"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute inset-4 border-4 border-transparent border-b-purple-400 border-l-pink-400 rounded-full"
            />
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Terminal className="text-cyan-400 w-12 h-12" />
            </motion.div>
          </motion.div>
          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-cyan-400 text-xl font-bold tracking-[0.3em]"
          >
            LOADING
          </motion.p>
        </motion.div>
      </div>
    )
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <X className="text-red-500 w-20 h-20 mx-auto mb-4" />
          <p className="text-red-400 text-2xl font-bold">SYSTEM ERROR</p>
          <p className="text-slate-500 mt-2">Failed to load portfolio data</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full bg-black text-white overflow-x-hidden relative">
      {/* Custom Cursor */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border-2 border-cyan-400 rounded-full pointer-events-none z-50 hidden md:block"
        variants={variants}
        animate={cursorVariant}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />

      {/* Gradient Mesh Background */}
      <div className="fixed inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950" />
        <motion.div
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(6, 182, 212, 0.1) 0%, transparent 50%),
                             radial-gradient(circle at 80% 80%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)`,
            backgroundSize: "200% 200%"
          }}
        />
      </div>

      {/* Floating Particles */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [null, Math.random() * window.innerHeight],
              x: [null, Math.random() * window.innerWidth],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 origin-left z-50"
        style={{ scaleX: scaleProgress }}
      />

      {/* Glassmorphic Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`fixed top-0 w-full z-40 transition-all duration-500 ${
          scrolled 
            ? "bg-black/40 backdrop-blur-2xl border-b border-white/10 shadow-lg" 
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3 cursor-pointer"
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="relative"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
                  <Code2 className="text-black" size={20} />
                </div>
                <motion.div
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 bg-cyan-400 rounded-lg blur-xl"
                />
              </motion.div>
              <div>
                <div className="text-xl font-black tracking-tight bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  {userName.toUpperCase()}
                </div>
                <div className="text-xs text-cyan-400/60 font-mono">DEVELOPER</div>
              </div>
            </motion.div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-2 bg-white/5 backdrop-blur-xl rounded-full px-2 py-2 border border-white/10">
              {navLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-6 py-2 rounded-full text-sm font-bold transition-all relative ${
                    activeSection === link.href.replace('#', '')
                      ? 'text-black'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  {activeSection === link.href.replace('#', '') && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </motion.a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-10 h-10 bg-white/10 backdrop-blur-xl rounded-lg flex items-center justify-center border border-white/20"
            >
              <AnimatePresence mode="wait">
                {mobileOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                  >
                    <X size={20} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                  >
                    <Menu size={20} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-black/95 backdrop-blur-2xl border-t border-white/10"
            >
              <div className="p-6 space-y-2">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={index}
                    href={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setMobileOpen(false)}
                    className="block px-6 py-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all border border-white/10 font-bold"
                  >
                    {link.label}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* HERO SECTION - Bento Grid Style */}
      <section id="home" className="relative min-h-screen pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-6 h-full">
            {/* Main Hero Card - Spans 8 columns */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="lg:col-span-8 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl rounded-3xl p-12 border border-white/10 relative overflow-hidden group"
              onMouseEnter={() => setCursorVariant("text")}
              onMouseLeave={() => setCursorVariant("default")}
            >
              {/* Animated Gradient Orb */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 90, 0],
                }}
                transition={{ duration: 8, repeat: Infinity }}
                className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl"
              />

              <motion.div variants={staggerContainer} className="relative z-10">
                {/* Badge */}
                <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-400/10 border border-cyan-400/30 rounded-full mb-8">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                  <span className="text-cyan-400 text-sm font-bold">AVAILABLE FOR OPPORTUNITIES</span>
                </motion.div>

                {/* Main Title */}
                <motion.h1
                  variants={fadeInUp}
                  className="text-6xl lg:text-8xl font-black mb-6 leading-none"
                >
                  <span className="block text-white/90">{userData.hero.title}</span>
                  <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                    {userData.hero.highlightText}
                  </span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                  variants={fadeInUp}
                  className="text-xl text-white/60 max-w-2xl mb-10 leading-relaxed"
                >
                  {userData.hero.subtitle}
                </motion.p>

                {/* CTAs */}
                <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
                  <motion.a
                    href="#projects"
                    whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(6, 182, 212, 0.4)" }}
                    whileTap={{ scale: 0.95 }}
                    className="group px-8 py-4 bg-gradient-to-r from-cyan-400 to-blue-500 text-black rounded-full font-bold flex items-center gap-2 relative overflow-hidden"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500"
                      initial={{ x: "100%" }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                    <span className="relative z-10">{userData.hero.primaryButtonText}</span>
                    <ArrowRight className="relative z-10 group-hover:translate-x-1 transition-transform" size={20} />
                  </motion.a>

                  <motion.a
                    href="#contact"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-white/5 backdrop-blur-xl border border-white/20 rounded-full font-bold hover:bg-white/10 transition-all"
                  >
                    {userData.hero.secondaryButtonText}
                  </motion.a>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Side Cards */}
            <div className="lg:col-span-4 space-y-6">
              {/* Status Card */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeInRight}
                className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-xl rounded-3xl p-8 border border-cyan-400/30 relative overflow-hidden"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute -right-10 -top-10 w-32 h-32 border border-cyan-400/20 rounded-full"
                />
                <Sparkles className="text-cyan-400 mb-4" size={32} />
                <h3 className="text-2xl font-black mb-2">Active Status</h3>
                <p className="text-white/60">Currently building amazing digital experiences</p>
              </motion.div>

              {/* Quick Stats */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeInRight}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-xl rounded-3xl p-8 border border-purple-400/30"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-3xl font-black text-cyan-400">{userData.aboutMe.stats.projectsCompleted}+</div>
                    <div className="text-sm text-white/60">Projects</div>
                  </div>
                  <div>
                    <div className="text-3xl font-black text-purple-400">{userData.aboutMe.stats.happyClients}+</div>
                    <div className="text-sm text-white/60">Clients</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="text-white/40 text-sm font-bold">SCROLL</span>
            <ChevronDown className="text-cyan-400" size={32} />
          </motion.div>
        </div>
      </section>

      {/* ABOUT SECTION - Split Screen Design */}
      <section id="about" className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeInLeft}>
                <div className="inline-flex items-center gap-2 mb-6">
                  <div className="w-12 h-0.5 bg-gradient-to-r from-cyan-400 to-transparent" />
                  <span className="text-cyan-400 font-bold text-sm uppercase tracking-widest">
                    {userData.aboutMe.sectionTitle}
                  </span>
                </div>

                <h2 className="text-5xl lg:text-6xl font-black mb-8 leading-tight">
                  {userData.aboutMe.headline.split(' ').map((word, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className={i % 2 === 0 ? "text-white" : "text-cyan-400"}
                    >
                      {word}{' '}
                    </motion.span>
                  ))}
                </h2>
              </motion.div>

              <motion.div variants={fadeInLeft} className="space-y-6 text-lg text-white/70 leading-relaxed">
                <p className="border-l-4 border-cyan-400 pl-6 italic">
                  {userData.aboutMe.introduction}
                </p>
                <p>{userData.aboutMe.description}</p>
              </motion.div>

              {/* Core Values */}
              {userData.aboutMe.coreValues.length > 0 && (
                <motion.div variants={fadeInLeft} className="mt-10 grid grid-cols-1 gap-4">
                  {userData.aboutMe.coreValues.map((value, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ x: 10 }}
                      className="flex items-center gap-4 p-4 bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 hover:border-cyan-400/50 transition-all cursor-pointer group"
                    >
                      <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <Zap size={20} className="text-black" />
                      </div>
                      <span className="font-bold">{value}</span>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </motion.div>

            {/* Right: 3D Stats Grid */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="relative"
            >
              {/* Background Decoration */}
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-2 border-cyan-400/10 rounded-full blur-xl"
              />

              <div className="grid grid-cols-2 gap-6 relative z-10">
                {[
                  { 
                    icon: <Rocket size={40} />, 
                    number: userData.aboutMe.stats.projectsCompleted, 
                    label: "Projects Completed",
                    gradient: "from-cyan-400 to-blue-500",
                    delay: 0
                  },
                  { 
                    icon: <Zap size={40} />, 
                    number: userData.aboutMe.stats.yearsExperience, 
                    label: "Years Experience",
                    gradient: "from-blue-500 to-purple-500",
                    delay: 0.1
                  },
                  { 
                    icon: <Heart size={40} />, 
                    number: userData.aboutMe.stats.happyClients, 
                    label: "Happy Clients",
                    gradient: "from-purple-500 to-pink-500",
                    delay: 0.2
                  },
                  { 
                    icon: <Brain size={40} />, 
                    number: userData.aboutMe.stats.techSkills, 
                    label: "Tech Skills",
                    gradient: "from-pink-500 to-cyan-400",
                    delay: 0.3
                  },
                ].filter(stat => stat.number > 0).map((stat, index) => (
                  <motion.div
                    key={index}
                    variants={scaleIn}
                    transition={{ delay: stat.delay }}
                    whileHover={{ 
                      y: -10, 
                      scale: 1.05,
                      rotateY: 10 
                    }}
                    className="relative p-8 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl border border-white/20 group cursor-pointer"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {/* Glow Effect */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-20 rounded-2xl blur-xl transition-opacity`}
                    />

                    {/* Content */}
                    <div className="relative z-10 text-center">
                      <motion.div
                        animate={{ rotateY: [0, 360] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        className={`text-transparent bg-gradient-to-r ${stat.gradient} bg-clip-text mb-4 flex justify-center`}
                      >
                        {stat.icon}
                      </motion.div>
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", stiffness: 100, delay: stat.delay + 0.3 }}
                        className={`text-5xl font-black bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-2`}
                      >
                        {stat.number}+
                      </motion.div>
                      <div className="text-white/60 text-sm font-bold uppercase tracking-wider">
                        {stat.label}
                      </div>
                    </div>

                    {/* Decorative Corner */}
                    <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-cyan-400/30 rounded-tr-2xl" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SKILLS SECTION - Card Carousel Style */}
      <section id="skills" className="relative py-32 px-6 bg-gradient-to-b from-transparent via-cyan-950/5 to-transparent">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-cyan-400/10 to-blue-500/10 border border-cyan-400/30 rounded-full mb-6"
            >
              <Layers className="text-cyan-400" size={20} />
              <span className="text-cyan-400 font-bold text-sm uppercase tracking-widest">Tech Stack</span>
            </motion.div>

            <h2 className="text-5xl lg:text-7xl font-black mb-6">
              <span className="text-white">My </span>
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Arsenal
              </span>
            </h2>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              Tools and technologies I wield to craft exceptional experiences
            </p>
          </motion.div>

          {/* Skills Grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="space-y-8"
          >
            {userData.skillCategories.length > 0 ? (
              userData.skillCategories.map((category, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.02 }}
                  className="relative group"
                >
                  {/* Card Container */}
                  <div className="relative p-8 lg:p-10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 overflow-hidden">
                    {/* Animated Background */}
                    <motion.div
                      animate={{
                        backgroundPosition: ["0% 0%", "100% 100%"],
                      }}
                      transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{
                        backgroundImage: `radial-gradient(circle at 30% 50%, ${category.color}10 0%, transparent 50%)`,
                        backgroundSize: "200% 200%"
                      }}
                    />

                    {/* Header */}
                    <div className="flex items-center gap-6 mb-8 relative z-10">
                      <motion.div
                        whileHover={{ rotate: 360, scale: 1.2 }}
                        transition={{ duration: 0.6 }}
                        className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center text-3xl shadow-lg shadow-cyan-500/50"
                      >
                        {category.icon}
                      </motion.div>
                      <div className="flex-1">
                        <h3 className="text-3xl lg:text-4xl font-black uppercase tracking-tight">
                          {category.category}
                        </h3>
                        <div className="h-1 w-24 bg-gradient-to-r from-cyan-400 to-transparent rounded-full mt-2" />
                      </div>
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="hidden lg:block w-12 h-12 border-2 border-dashed border-white/20 rounded-full"
                      />
                    </div>

                    {/* Skills Chips */}
                    <div className="flex flex-wrap gap-3 relative z-10">
                      {category.skills.map((skill, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, scale: 0, rotate: -10 }}
                          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                          viewport={{ once: true }}
                          transition={{ 
                            delay: idx * 0.05,
                            type: "spring",
                            stiffness: 200
                          }}
                          whileHover={{ 
                            scale: 1.1, 
                            y: -5,
                            boxShadow: "0 10px 30px rgba(6, 182, 212, 0.3)"
                          }}
                          className="group/chip relative px-6 py-3 bg-white/5 backdrop-blur-xl border border-white/20 rounded-full cursor-pointer overflow-hidden"
                        >
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover/chip:opacity-100 transition-opacity"
                          />
                          <span className="relative z-10 font-bold text-white group-hover/chip:text-black transition-colors">
                            {skill}
                          </span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-400/10 to-transparent rounded-full blur-2xl" />
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-400/10 to-transparent rounded-full blur-2xl" />
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-20">
                <Box className="mx-auto mb-4 text-white/20" size={64} />
                <p className="text-white/40 text-lg">No skills added yet</p>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* EXPERIENCE SECTION - Modern Timeline */}
      {userData.experiences && userData.experiences.length > 0 && (
        <section id="experience" className="relative py-32 px-6">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-20"
            >
              <h2 className="text-5xl lg:text-7xl font-black mb-6">
                <span className="text-white">Career </span>
                <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  Journey
                </span>
              </h2>
            </motion.div>

            {/* Timeline */}
            <div className="relative">
              {/* Center Line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-400 via-blue-500 to-purple-500 hidden lg:block" />

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerContainer}
                className="space-y-12"
              >
                {userData.experiences.map((exp, index) => {
                  const isEven = index % 2 === 0;
                  return (
                    <motion.div
                      key={index}
                      variants={isEven ? fadeInLeft : fadeInRight}
                      className={`relative flex items-center ${
                        isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                      } gap-8`}
                    >
                      {/* Content Card */}
                      <motion.div
                        whileHover={{ scale: 1.05, y: -5 }}
                        className="flex-1 p-8 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-2xl border border-white/10 relative overflow-hidden group"
                      >
                        {/* Hover Gradient */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity"
                        />

                        <div className="relative z-10">
                          {/* Period Badge */}
                          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 border border-cyan-400/30 rounded-full mb-4">
                            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                            <span className="text-cyan-400 text-sm font-bold">{exp.period}</span>
                          </div>

                          {/* Title */}
                          <h3 className="text-2xl lg:text-3xl font-black mb-2">{exp.role}</h3>
                          <p className="text-cyan-400 font-bold mb-4 flex items-center gap-2">
                            <TrendingUp size={16} />
                            {exp.company}
                          </p>

                          {/* Description */}
                          <p className="text-white/70 leading-relaxed mb-6">{exp.description}</p>

                          {/* Skills */}
                          <div className="flex flex-wrap gap-2">
                            {exp.skills.map((skill, idx) => (
                              <span
                                key={idx}
                                className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs font-bold text-cyan-400"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Corner Accent */}
                        <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-cyan-400/30 rounded-tr-2xl" />
                      </motion.div>

                      {/* Center Dot */}
                      <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-6 h-6 z-10">
                        <motion.div
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
                          className="w-full h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full border-4 border-black relative"
                        >
                          <motion.div
                            animate={{ 
                              scale: [1, 1.5, 1],
                              opacity: [0.5, 0, 0.5]
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute inset-0 bg-cyan-400 rounded-full"
                          />
                        </motion.div>
                      </div>

                      {/* Spacer for alignment */}
                      <div className="hidden lg:block flex-1" />
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* PROJECTS SECTION - Masonry Grid */}
      <section id="projects" className="relative py-32 px-6 bg-gradient-to-b from-transparent via-purple-950/5 to-transparent">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-400/10 to-pink-500/10 border border-purple-400/30 rounded-full mb-6"
            >
              <Rocket className="text-purple-400" size={20} />
              <span className="text-purple-400 font-bold text-sm uppercase tracking-widest">Featured Work</span>
            </motion.div>

            <h2 className="text-5xl lg:text-7xl font-black mb-6">
              <span className="text-white">Latest </span>
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                Projects
              </span>
            </h2>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              Showcasing innovative solutions and creative digital experiences
            </p>
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {userData.projects.length > 0 ? (
              userData.projects.map((project, index) => (
                <motion.div
                  key={index}
                  variants={scaleIn}
                  whileHover={{ y: -10 }}
                  className={`group relative ${index === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}
                >
                  <div className="relative h-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 overflow-hidden">
                    {/* Image Container */}
                    <div className={`relative overflow-hidden ${index === 0 ? 'h-96' : 'h-64'}`}>
                      {project.image ? (
                        <motion.img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.6 }}
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-cyan-500/20 via-blue-500/20 to-purple-500/20 flex items-center justify-center">
                          <Rocket size={80} className="text-cyan-400/50" />
                        </div>
                      )}

                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                      {/* Hover Actions */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        className="absolute inset-0 bg-gradient-to-br from-cyan-500/80 to-blue-500/80 backdrop-blur-sm flex items-center justify-center gap-4"
                      >
                        {project.links.live && (
                          <motion.a
                            href={project.links.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.2, rotate: 5 }}
                            whileTap={{ scale: 0.9 }}
                            className="w-14 h-14 bg-black rounded-full flex items-center justify-center border-2 border-white"
                          >
                            <ExternalLink className="text-cyan-400" size={24} />
                          </motion.a>
                        )}
                        {project.links.github && (
                          <motion.a
                            href={project.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.2, rotate: -5 }}
                            whileTap={{ scale: 0.9 }}
                            className="w-14 h-14 bg-black rounded-full flex items-center justify-center border-2 border-white"
                          >
                            <Github className="text-white" size={24} />
                          </motion.a>
                        )}
                      </motion.div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-2xl font-black group-hover:text-cyan-400 transition-colors flex-1">
                          {project.title}
                        </h3>
                        <motion.div
                          whileHover={{ rotate: 45 }}
                          className="text-cyan-400"
                        >
                          <ArrowRight size={24} />
                        </motion.div>
                      </div>

                      <p className="text-white/60 text-sm mb-4 line-clamp-2">
                        {project.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {project.tags.slice(0, 3).map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-gradient-to-r from-cyan-400/10 to-blue-500/10 border border-cyan-400/30 rounded-full text-xs font-bold text-cyan-400"
                          >
                            {tag}
                          </span>
                        ))}
                        {project.tags.length > 3 && (
                          <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-bold text-white/40">
                            +{project.tags.length - 3}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Corner Number */}
                    <div className="absolute top-4 left-4 w-12 h-12 bg-black/80 backdrop-blur-xl rounded-full flex items-center justify-center border border-cyan-400/30">
                      <span className="text-cyan-400 font-black">{String(index + 1).padStart(2, '0')}</span>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-20">
                <Eye className="mx-auto mb-4 text-white/20" size={64} />
                <p className="text-white/40 text-lg">No projects to display yet</p>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* CONTACT SECTION - Split Design */}
      <section id="contact" className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left: Info */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="space-y-8"
            >
              <motion.div variants={fadeInLeft}>
                <h2 className="text-5xl lg:text-7xl font-black mb-6 leading-tight">
                  <span className="text-white">Let's Create</span>
                  <br />
                  <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Together
                  </span>
                </h2>
                <p className="text-xl text-white/60 leading-relaxed">
                  Have a project in mind? Let's discuss how we can bring your vision to life.
                </p>
              </motion.div>

              {/* Contact Info Cards */}
              <motion.div variants={fadeInLeft} className="space-y-4">
                <motion.div
                  whileHover={{ x: 10 }}
                  className="p-6 bg-gradient-to-r from-cyan-400/10 to-blue-500/10 backdrop-blur-xl rounded-2xl border border-cyan-400/30 cursor-pointer"
                >
                  <Mail className="text-cyan-400 mb-3" size={32} />
                  <div className="text-sm text-white/60 mb-1">Email</div>
                  <div className="font-bold">{userEmail || 'contact@example.com'}</div>
                </motion.div>

                <motion.div
                  whileHover={{ x: 10 }}
                  className="p-6 bg-gradient-to-r from-purple-400/10 to-pink-500/10 backdrop-blur-xl rounded-2xl border border-purple-400/30 cursor-pointer"
                >
                  <Coffee className="text-purple-400 mb-3" size={32} />
                  <div className="text-sm text-white/60 mb-1">Response Time</div>
                  <div className="font-bold">Within 24 hours</div>
                </motion.div>
              </motion.div>

              {/* Social Links */}
              <motion.div variants={fadeInLeft}>
                <div className="text-sm font-bold text-white/60 mb-4 uppercase tracking-wider">Connect With Me</div>
                <div className="flex gap-4">
                  {userData.socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -5, scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-14 h-14 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl flex items-center justify-center hover:border-cyan-400/50 transition-all"
                      style={{ color: social.color }}
                    >
                      <span className="text-2xl">{social.icon}</span>
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Right: Form */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInRight}
            >
              <div className="p-8 lg:p-10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 relative overflow-hidden">
                {/* Background Decoration */}
                <motion.div
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{ duration: 20, repeat: Infinity }}
                  className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full blur-3xl"
                />

                <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
                  {/* Name & Email */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-white/60 mb-2 uppercase tracking-wider">
                        Name
                      </label>
                      <motion.input
                        whileFocus={{ scale: 1.02 }}
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-6 py-4 bg-white/5 backdrop-blur-xl border border-white/20 rounded-xl focus:border-cyan-400 focus:outline-none transition-all placeholder-white/30 font-medium"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-white/60 mb-2 uppercase tracking-wider">
                        Email
                      </label>
                      <motion.input
                        whileFocus={{ scale: 1.02 }}
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-6 py-4 bg-white/5 backdrop-blur-xl border border-white/20 rounded-xl focus:border-cyan-400 focus:outline-none transition-all placeholder-white/30 font-medium"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-bold text-white/60 mb-2 uppercase tracking-wider">
                      Message
                    </label>
                    <motion.textarea
                      whileFocus={{ scale: 1.02 }}
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-6 py-4 bg-white/5 backdrop-blur-xl border border-white/20 rounded-xl focus:border-cyan-400 focus:outline-none transition-all placeholder-white/30 font-medium resize-none"
                      placeholder="Tell me about your project..."
                    />
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={submitted}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full px-8 py-5 bg-gradient-to-r from-cyan-400 to-blue-500 text-black rounded-xl font-black text-lg uppercase tracking-wider flex items-center justify-center gap-3 disabled:opacity-50 relative overflow-hidden group"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500"
                      initial={{ x: "100%" }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                    <span className="relative z-10 flex items-center gap-3">
                      {submitted ? (
                        <>
                          <Award size={24} />
                          Message Sent!
                        </>
                      ) : (
                        <>
                          <Send size={24} />
                          Send Message
                        </>
                      )}
                    </span>
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative py-12 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Left */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
                <Terminal className="text-black" size={20} />
              </div>
              <div>
                <div className="font-bold">{userName}</div>
                <div className="text-xs text-white/40">© {currentYear} All rights reserved</div>
              </div>
            </div>

            {/* Center */}
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="flex items-center gap-2 text-sm text-white/60"
            >
              <div className="w-2 h-2 bg-cyan-400 rounded-full" />
              <span>Crafted with passion</span>
            </motion.div>

            {/* Right */}
            <div className="flex gap-6 text-sm text-white/40">
              <Link href="#" className="hover:text-cyan-400 transition-colors">Privacy</Link>
              <Link href="#" className="hover:text-cyan-400 transition-colors">Terms</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
