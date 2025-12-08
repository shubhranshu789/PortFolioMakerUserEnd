"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, Github, Mail, Linkedin, Twitter, ExternalLink, ChevronDown, ArrowRight, Send, Sparkles, Zap, Cpu, Terminal, Code2, Rocket, Circle, Square, Triangle } from "lucide-react"
import { motion, useScroll, useTransform, AnimatePresence, useSpring } from "framer-motion"
import type React from "react"
import { useRouter } from 'next/navigation'
import emailjs from '@emailjs/browser';
import { useParams } from 'next/navigation'

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

export default function UltraModernPortfolio() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeSection, setActiveSection] = useState('home')
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const router = useRouter()
  const params = useParams()
  const { scrollYProgress } = useScroll()
  const scaleProgress = useTransform(scrollYProgress, [0, 1], [0, 1])
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

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

  // Mouse tracking for parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      })
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
    const usernameFromUrl = params.username as string

    if (usernameFromUrl) {
      fetchUserData(usernameFromUrl)
    } else {
      alert('❌ Username not found in URL')
      router.push('/Components/Auth/SignIn')
    }
  }, [params.username])

 const fetchUserData = async (username: string) => {
    try {
      setLoading(true)
      const response = await fetch(`${API_BASE}/profile/${username}`)

      if (response.ok) {
        const data = await response.json()

        // Set all user information from the API response
        setUserData(data)
        setUsername(data.userName || data.username || '')
        setUserName(data.userName || data.name || 'Portfolio')
        setuserEmail(data.email || '')
      } else {
        // alert('❌ User not found')
        router.push('/Components/Auth/SignIn')
      }
    } catch (error) {
      console.error('Error fetching user data:', error)
      alert('❌ Error loading portfolio')
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
      transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }
    }
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  }

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  }

  const slideIn = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: "easeOut" }
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-emerald-950 to-violet-950 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <motion.div className="relative w-24 h-24 mx-auto mb-8">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border-4 border-transparent border-t-emerald-400 border-r-orange-400 rounded-full"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute inset-2 border-4 border-transparent border-b-violet-400 border-l-orange-400 rounded-full"
            />
          </motion.div>
          <p className="text-emerald-400 text-lg font-bold tracking-widest">LOADING EXPERIENCE...</p>
        </motion.div>
      </div>
    )
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-emerald-950 to-violet-950 flex items-center justify-center">
        <p className="text-orange-400 text-xl font-bold">ERROR: Portfolio data unavailable</p>
      </div>
    )
  }

  return (
    <div className="w-full bg-gradient-to-br from-slate-950 via-emerald-950 to-violet-950 text-slate-100 overflow-x-hidden relative">
      {/* Animated Geometric Background */}
      <div className="fixed inset-0 z-0 opacity-10">
        <motion.div
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(30deg, rgba(16, 185, 129, 0.1) 12%, transparent 12.5%, transparent 87%, rgba(16, 185, 129, 0.1) 87.5%, rgba(16, 185, 129, 0.1)),
              linear-gradient(150deg, rgba(16, 185, 129, 0.1) 12%, transparent 12.5%, transparent 87%, rgba(16, 185, 129, 0.1) 87.5%, rgba(16, 185, 129, 0.1)),
              linear-gradient(30deg, rgba(16, 185, 129, 0.1) 12%, transparent 12.5%, transparent 87%, rgba(16, 185, 129, 0.1) 87.5%, rgba(16, 185, 129, 0.1)),
              linear-gradient(150deg, rgba(16, 185, 129, 0.1) 12%, transparent 12.5%, transparent 87%, rgba(16, 185, 129, 0.1) 87.5%, rgba(16, 185, 129, 0.1))
            `,
            backgroundSize: '80px 140px',
          }}
        />
      </div>

      {/* Multi-Color Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-400 via-orange-400 to-violet-500 origin-left z-50"
        style={{ 
          scaleX: scaleProgress,
          boxShadow: "0 0 30px rgba(16, 185, 129, 0.6)"
        }}
      />

      {/* Floating Geometric Shapes */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
            rotate: [0, 360],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 right-20 w-32 h-32 border-4 border-emerald-400/20 rounded-3xl"
        />
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 120, 0],
            rotate: [0, -360],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-40 left-20 w-40 h-40 border-4 border-orange-400/20"
          style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/3 left-1/4 w-64 h-64 bg-gradient-to-br from-emerald-400/10 to-violet-400/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.15, 0.3, 0.15],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-gradient-to-br from-orange-400/10 to-violet-400/10 rounded-full blur-3xl"
        />
      </div>

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 w-full z-40 transition-all duration-500 ${
          scrolled 
            ? "bg-slate-950/70 backdrop-blur-2xl border-b border-emerald-400/20 shadow-2xl shadow-emerald-500/5" 
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-violet-500 rounded-lg flex items-center justify-center"
            >
              <Code2 size={20} className="text-slate-950" />
            </motion.div>
            <span className="text-2xl font-black bg-gradient-to-r from-emerald-400 via-orange-400 to-violet-400 bg-clip-text text-transparent">
              {userName}
            </span>
          </motion.div>

          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -2 }}
                className="relative px-5 py-2.5 text-slate-300 hover:text-emerald-400 transition-all font-bold group"
              >
                <span className="relative z-10">{link.label}</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-violet-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                  whileHover={{ scale: 1.05 }}
                />
              </motion.a>
            ))}
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-emerald-400"
          >
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden bg-slate-950/95 backdrop-blur-2xl border-b border-emerald-400/20"
            >
              <div className="p-6 space-y-3">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={index}
                    href={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setMobileOpen(false)}
                    className="block text-slate-300 hover:text-emerald-400 transition-colors py-2 text-lg font-bold"
                  >
                    {link.label}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section - Diagonal Split Layout */}
      <section style={{ marginTop: "80px" }} id="home" className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
        {/* Diagonal Background Split */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0 origin-left"
          style={{
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(251, 146, 60, 0.05) 100%)',
            clipPath: 'polygon(0 0, 60% 0, 40% 100%, 0 100%)'
          }}
        />

        <div className="max-w-7xl w-full relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            {/* Floating Badge */}
            <motion.div 
              variants={fadeInUp} 
              className="mb-10 flex justify-center"
            >
              <motion.span 
                whileHover={{ scale: 1.05, rotate: 2 }}
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-500/10 via-orange-500/10 to-violet-500/10 border-2 border-emerald-400/30 rounded-2xl text-emerald-400 text-sm font-black tracking-widest backdrop-blur-xl"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles size={20} />
                </motion.div>
                AVAILABLE FOR PROJECTS
                <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse shadow-lg shadow-emerald-400/50" />
              </motion.span>
            </motion.div>

            {/* Main Heading with Staggered Words */}
            <motion.div variants={fadeInUp} className="text-center mb-8">
              <motion.h1 className="text-6xl md:text-7xl lg:text-9xl font-black leading-tight mb-6">
                <motion.span 
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="block text-slate-200"
                >
                  CREATIVE
                </motion.span>
                <motion.span 
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="block relative"
                >
                  <span className="bg-gradient-to-r from-emerald-400 via-orange-400 to-violet-400 bg-clip-text text-transparent">
                    {userData.hero.highlightText}
                  </span>
                  {/* Animated Underline */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="absolute -bottom-4 left-0 right-0 h-2 bg-gradient-to-r from-emerald-400 to-violet-400 origin-left"
                  />
                </motion.span>
              </motion.h1>
            </motion.div>

            {/* Subtitle with Typewriter Effect */}
            <motion.p
              variants={fadeInUp}
              className="text-xl md:text-2xl text-slate-400 max-w-4xl mx-auto mb-14 leading-relaxed text-center font-light"
            >
              {userData.hero.subtitle}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.08, rotate: 1 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-12 py-5 bg-gradient-to-r from-emerald-500 via-orange-500 to-violet-500 text-white font-black rounded-2xl flex items-center gap-3 text-lg overflow-hidden shadow-2xl shadow-emerald-500/30"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-violet-500 via-orange-500 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
                <span className="relative z-10">{userData.hero.primaryButtonText}</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="relative z-10"
                >
                  <ArrowRight size={24} />
                </motion.div>
              </motion.a>
              
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.08, rotate: -1 }}
                whileTap={{ scale: 0.95 }}
                className="px-12 py-5 bg-slate-900/50 border-2 border-emerald-400/50 text-emerald-400 font-black rounded-2xl hover:bg-slate-900 hover:border-emerald-400 transition-all text-lg backdrop-blur-xl shadow-xl shadow-emerald-500/10"
              >
                {userData.hero.secondaryButtonText}
              </motion.a>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
        >
          <ChevronDown className="text-emerald-400" size={48} />
        </motion.div>
      </section>

      {/* About Section - Bento Grid Layout */}
      <section id="about" className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {/* Section Header */}
            <motion.div variants={fadeInUp} className="mb-20">
              <div className="flex items-center gap-4 mb-6">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="w-3 h-3 bg-emerald-400 rounded-full"
                />
                <span className="text-emerald-400 font-black text-sm uppercase tracking-[0.3em]">
                  {userData.aboutMe.sectionTitle}
                </span>
                <div className="flex-1 h-px bg-gradient-to-r from-emerald-400/50 to-transparent" />
              </div>
              <h2 className="text-5xl md:text-7xl font-black text-slate-100 mb-6">
                {userData.aboutMe.headline}
              </h2>
            </motion.div>

            {/* Bento Grid */}
            <div className="grid md:grid-cols-3 gap-6">
              {/* Large Story Card */}
              <motion.div
                variants={scaleIn}
                whileHover={{ y: -10, scale: 1.02 }}
                className="md:col-span-2 md:row-span-2 p-10 bg-gradient-to-br from-slate-900/50 to-emerald-950/30 border-2 border-emerald-400/20 rounded-3xl backdrop-blur-xl relative overflow-hidden group"
              >
                <motion.div
                  className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-emerald-400/10 to-transparent rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"
                />
                <div className="relative z-10">
                  <h3 className="text-3xl font-black text-slate-100 mb-6 border-l-4 border-orange-400 pl-6">
                    My Story
                  </h3>
                  <div className="space-y-6 text-slate-400 text-lg leading-relaxed">
                    <p>{userData.aboutMe.introduction}</p>
                    <p>{userData.aboutMe.description}</p>
                  </div>

                  {userData.aboutMe.coreValues.length > 0 && (
                    <div className="mt-8 space-y-4">
                      {userData.aboutMe.coreValues.map((value, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.15 }}
                          whileHover={{ x: 10 }}
                          className="flex items-center gap-4 group/item"
                        >
                          <motion.div
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.5 }}
                            className="w-2 h-2 bg-emerald-400 rounded-full"
                          />
                          <span className="text-slate-300 text-lg font-semibold group-hover/item:text-emerald-400 transition-colors">
                            {value}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Stats Cards - Floating Style */}
              {(() => {
                const validStats = [
                  { 
                    number: userData.aboutMe.stats.projectsCompleted, 
                    label: "Projects", 
                    icon: <Rocket size={40} />, 
                    gradient: "from-emerald-400 to-emerald-600",
                    shadow: "shadow-emerald-400/30"
                  },
                  { 
                    number: userData.aboutMe.stats.yearsExperience, 
                    label: "Years", 
                    icon: <Zap size={40} />, 
                    gradient: "from-orange-400 to-orange-600",
                    shadow: "shadow-orange-400/30"
                  },
                  { 
                    number: userData.aboutMe.stats.happyClients, 
                    label: "Clients", 
                    icon: <Code2 size={40} />, 
                    gradient: "from-violet-400 to-violet-600",
                    shadow: "shadow-violet-400/30"
                  },
                  { 
                    number: userData.aboutMe.stats.techSkills, 
                    label: "Skills", 
                    icon: <Cpu size={40} />, 
                    gradient: "from-emerald-400 to-violet-600",
                    shadow: "shadow-emerald-400/30"
                  },
                ].filter(stat => stat.number > 0);

                return validStats.map((stat, index) => (
                  <motion.div
                    key={index}
                    variants={scaleIn}
                    whileHover={{ y: -15, rotate: 3, scale: 1.05 }}
                    className={`p-8 bg-gradient-to-br from-slate-900/80 to-slate-950/80 border-2 border-emerald-400/20 rounded-3xl backdrop-blur-xl relative overflow-hidden group ${stat.shadow} shadow-2xl`}
                  >
                    <motion.div
                      animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.6, 0.3]
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-10`}
                    />
                    <div className="relative z-10 text-center">
                      <motion.div 
                        className={`text-transparent bg-gradient-to-r ${stat.gradient} bg-clip-text mb-4 flex justify-center`}
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        {stat.icon}
                      </motion.div>
                      <motion.div 
                        className={`text-6xl font-black bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-2`}
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2, type: "spring" }}
                      >
                        {stat.number}+
                      </motion.div>
                      <div className="text-slate-400 text-sm uppercase tracking-widest font-black">
                        {stat.label}
                      </div>
                    </div>
                  </motion.div>
                ));
              })()}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section - Hexagonal Grid */}
      <section id="skills" className="relative py-32 px-6 bg-slate-950/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-20">
              <h2 className="text-5xl md:text-7xl font-black mb-6 text-slate-100">
                TECH <span className="bg-gradient-to-r from-emerald-400 via-orange-400 to-violet-400 bg-clip-text text-transparent">STACK</span>
              </h2>
              <p className="text-slate-400 text-xl max-w-3xl mx-auto">
                My arsenal of cutting-edge technologies and frameworks
              </p>
            </motion.div>

            <motion.div variants={staggerContainer} className="space-y-12">
              {userData.skillCategories.length > 0 ? (
                userData.skillCategories.map((category, index) => (
                  <motion.div
                    key={index}
                    variants={slideIn}
                    whileHover={{ x: 10 }}
                    className="relative p-10 bg-gradient-to-r from-slate-900/40 via-emerald-950/20 to-violet-950/20 border-l-4 border-emerald-400 rounded-2xl backdrop-blur-xl overflow-hidden group"
                  >
                    <motion.div
                      className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-emerald-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    />
                    
                    <div className="flex items-center gap-6 mb-8 relative z-10">
                      <motion.div 
                        whileHover={{ rotate: 360, scale: 1.2 }}
                        transition={{ duration: 0.6 }}
                        className="w-20 h-20 bg-gradient-to-br from-emerald-500 via-orange-500 to-violet-500 rounded-2xl flex items-center justify-center text-4xl shadow-2xl shadow-emerald-500/30"
                      >
                        {category.icon}
                      </motion.div>
                      <div>
                        <h3 className="text-4xl font-black text-slate-100 uppercase tracking-wide">
                          {category.category}
                        </h3>
                        <motion.div 
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3, duration: 0.6 }}
                          className="h-1 bg-gradient-to-r from-emerald-400 to-orange-400 origin-left mt-2"
                        />
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4 relative z-10">
                      {category.skills.map((skill, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: idx * 0.05 }}
                          whileHover={{ 
                            y: -5, 
                            scale: 1.1,
                            boxShadow: "0 10px 40px rgba(16, 185, 129, 0.4)"
                          }}
                          className="px-6 py-3 bg-slate-900/60 border-2 border-emerald-400/30 rounded-xl hover:border-emerald-400 hover:bg-slate-800/60 transition-all cursor-pointer backdrop-blur-sm"
                        >
                          <span className="font-black text-emerald-400">{skill}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ))
              ) : (
                <p className="text-center text-slate-500">No skills added yet</p>
              )}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Experience Section - Card Carousel */}
      {userData.experiences && userData.experiences.length > 0 && (
        <section id="experience" className="relative py-32 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp} className="text-center mb-20">
                <h2 className="text-5xl md:text-7xl font-black mb-6 text-slate-100">
                  CAREER <span className="bg-gradient-to-r from-emerald-400 to-violet-400 bg-clip-text text-transparent">JOURNEY</span>
                </h2>
              </motion.div>

              <div className="space-y-12">
                {userData.experiences.map((exp, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    whileHover={{ scale: 1.02, x: 20 }}
                    className="relative"
                  >
                    <div className="flex gap-8">
                      {/* Timeline Dot */}
                      <div className="relative flex-shrink-0">
                        <motion.div 
                          className="sticky top-32 w-6 h-6 bg-gradient-to-r from-emerald-400 to-violet-400 rounded-full"
                          whileHover={{ scale: 1.5 }}
                        >
                          <motion.div
                            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute inset-0 bg-emerald-400 rounded-full"
                          />
                        </motion.div>
                        {index < userData.experiences.length - 1 && (
                          <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-emerald-400 to-violet-400" />
                        )}
                      </div>

                      {/* Content Card */}
                      <div className="flex-1 p-10 bg-gradient-to-br from-slate-900/60 to-violet-950/30 border-2 border-emerald-400/20 rounded-3xl backdrop-blur-xl hover:border-emerald-400/50 transition-all">
                        <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                          <div>
                            <h3 className="text-3xl font-black text-slate-100 mb-2">
                              {exp.role}
                            </h3>
                            <p className="text-2xl text-emerald-400 font-bold">{exp.company}</p>
                          </div>
                          <span className="px-6 py-3 bg-gradient-to-r from-orange-500/20 to-violet-500/20 border-2 border-orange-400/30 rounded-full text-orange-400 text-sm font-black">
                            {exp.period}
                          </span>
                        </div>
                        <p className="text-slate-400 leading-relaxed mb-6 text-lg">{exp.description}</p>
                        <div className="flex flex-wrap gap-3">
                          {exp.skills.map((skill, idx) => (
                            <motion.span
                              key={idx}
                              whileHover={{ y: -3, scale: 1.1 }}
                              className="px-4 py-2 bg-slate-800/50 text-emerald-400 rounded-lg text-sm font-bold border border-emerald-500/30"
                            >
                              {skill}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Projects Section - Masonry Grid */}
      <section id="projects" className="relative py-32 px-6 bg-slate-950/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-20">
              <h2 className="text-5xl md:text-7xl font-black mb-6 text-slate-100">
                FEATURED <span className="bg-gradient-to-r from-emerald-400 via-orange-400 to-violet-400 bg-clip-text text-transparent">WORK</span>
              </h2>
              <p className="text-slate-400 text-xl max-w-3xl mx-auto">
                Innovative solutions crafted with passion and precision
              </p>
            </motion.div>

            <motion.div variants={staggerContainer} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {userData.projects.length > 0 ? (
                userData.projects.map((project, index) => (
                  <motion.div
                    key={index}
                    variants={scaleIn}
                    whileHover={{ y: -15, rotate: index % 2 === 0 ? 2 : -2 }}
                    className="group relative"
                  >
                    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900/60 to-violet-950/40 border-2 border-emerald-400/20 hover:border-emerald-400/60 backdrop-blur-xl transition-all">
                      {/* Project Image with Gradient Overlay */}
                      <div className="relative h-80 overflow-hidden">
                        {project.image ? (
                          <motion.img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover"
                            whileHover={{ scale: 1.15 }}
                            transition={{ duration: 0.6 }}
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-emerald-500/20 via-orange-500/20 to-violet-500/20 flex items-center justify-center">
                            <Rocket size={100} className="text-emerald-400" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
                        
                        {/* Hover Action Buttons */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileHover={{ opacity: 1, y: 0 }}
                          className="absolute inset-0 bg-gradient-to-br from-emerald-500/30 to-violet-500/30 flex items-center justify-center gap-6 backdrop-blur-sm"
                        >
                          {project.links.live && (
                            <motion.a
                              href={project.links.live}
                              target="_blank"
                              rel="noopener noreferrer"
                              whileHover={{ scale: 1.2, rotate: 5 }}
                              className="p-4 bg-slate-950 border-2 border-emerald-400 rounded-2xl text-emerald-400 hover:bg-emerald-400 hover:text-slate-950 transition-all"
                            >
                              <ExternalLink size={24} />
                            </motion.a>
                          )}
                          {project.links.github && (
                            <motion.a
                              href={project.links.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              whileHover={{ scale: 1.2, rotate: -5 }}
                              className="p-4 bg-slate-950 border-2 border-orange-400 rounded-2xl text-orange-400 hover:bg-orange-400 hover:text-slate-950 transition-all"
                            >
                              <Github size={24} />
                            </motion.a>
                          )}
                        </motion.div>
                      </div>

                      {/* Project Info */}
                      <div className="p-8">
                        <h3 className="text-2xl font-black text-slate-100 mb-4 group-hover:text-emerald-400 transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-slate-400 text-sm mb-6 line-clamp-2">
                          {project.description}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-3">
                          {project.tags.slice(0, 3).map((tag, idx) => (
                            <span
                              key={idx}
                              className="px-4 py-2 bg-slate-800/60 text-emerald-400 rounded-lg text-xs font-bold border border-emerald-500/30"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Decorative Corner */}
                      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-emerald-400/20 to-transparent" style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }} />
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full text-center text-slate-500">
                  No projects added yet
                </div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section - Split Layout */}
      <section id="contact" className="relative py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-20">
              <h2 className="text-5xl md:text-7xl font-black mb-6 text-slate-100">
                LET'S <span className="bg-gradient-to-r from-emerald-400 via-orange-400 to-violet-400 bg-clip-text text-transparent">COLLABORATE</span>
              </h2>
              <p className="text-slate-400 text-xl">
                Have an idea? Let's bring it to life together
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-5 gap-12">
              {/* Contact Info */}
              <motion.div variants={slideIn} className="lg:col-span-2 space-y-8">
                <div className="p-8 bg-gradient-to-br from-emerald-500/10 to-violet-500/10 border-2 border-emerald-400/20 rounded-3xl backdrop-blur-xl">
                  <h3 className="text-2xl font-black text-slate-100 mb-6">Get in Touch</h3>
                  <p className="text-slate-400 leading-relaxed mb-8">
                    I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
                  </p>
                  
                  {/* Social Links */}
                  <div className="space-y-4">
                    {userData.socialLinks.map((social, index) => (
                      <motion.a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ x: 10, scale: 1.05 }}
                        className="flex items-center gap-4 p-4 bg-slate-900/50 border-2 border-emerald-400/20 rounded-2xl hover:border-emerald-400 transition-all group"
                      >
                        <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-violet-500 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                          {social.icon}
                        </div>
                        <span className="text-slate-300 font-bold group-hover:text-emerald-400 transition-colors">
                          {social.label}
                        </span>
                      </motion.a>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Contact Form */}
              <motion.form
                variants={fadeInUp}
                onSubmit={handleSubmit}
                className="lg:col-span-3 space-y-6"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <motion.input
                    whileFocus={{ scale: 1.02, borderColor: "rgb(16, 185, 129)" }}
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="px-8 py-5 bg-slate-900/50 backdrop-blur-md border-2 border-emerald-400/30 rounded-2xl focus:border-emerald-400 focus:outline-none transition-all placeholder-slate-500 text-slate-100 font-semibold"
                    required
                  />
                  <motion.input
                    whileFocus={{ scale: 1.02, borderColor: "rgb(16, 185, 129)" }}
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="px-8 py-5 bg-slate-900/50 backdrop-blur-md border-2 border-emerald-400/30 rounded-2xl focus:border-emerald-400 focus:outline-none transition-all placeholder-slate-500 text-slate-100 font-semibold"
                    required
                  />
                </div>

                <motion.textarea
                  whileFocus={{ scale: 1.02, borderColor: "rgb(16, 185, 129)" }}
                  name="message"
                  placeholder="Tell me about your project..."
                  value={formData.message}
                  onChange={handleChange}
                  rows={8}
                  className="w-full px-8 py-5 bg-slate-900/50 backdrop-blur-md border-2 border-emerald-400/30 rounded-2xl focus:border-emerald-400 focus:outline-none transition-all placeholder-slate-500 text-slate-100 font-semibold resize-none"
                  required
                />

                <motion.button
                  whileHover={{ scale: 1.03, boxShadow: "0 20px 60px rgba(16, 185, 129, 0.4)" }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  disabled={submitted}
                  className="w-full px-10 py-6 bg-gradient-to-r from-emerald-500 via-orange-500 to-violet-500 text-white font-black rounded-2xl hover:from-emerald-400 hover:to-violet-400 transition-all disabled:opacity-50 flex items-center justify-center gap-4 text-lg uppercase tracking-wider shadow-2xl shadow-emerald-500/30"
                >
                  {submitted ? (
                    <>
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring" }}
                      >
                        ✓
                      </motion.span>
                      MESSAGE SENT
                    </>
                  ) : (
                    <>
                      <Send size={24} />
                      SEND MESSAGE
                    </>
                  )}
                </motion.button>
              </motion.form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 px-6 bg-slate-950/50 backdrop-blur-md border-t-2 border-emerald-400/20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-violet-500 rounded-lg"
              />
              <p className="text-slate-400 text-sm font-mono">
                © {currentYear} {userName}. Crafted with passion.
              </p>
            </div>
            <div className="flex gap-8 text-sm text-slate-400 font-semibold">
              <Link href="#" className="hover:text-emerald-400 transition-colors">
                Privacy
              </Link>
              <Link href="#" className="hover:text-emerald-400 transition-colors">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
