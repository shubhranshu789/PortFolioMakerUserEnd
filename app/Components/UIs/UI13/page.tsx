"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Menu, X, Github, Mail, Linkedin, Twitter, ExternalLink, ChevronDown, ArrowRight, Send, Sparkles, Zap, Cpu, Terminal, Code2, Rocket, Briefcase, Award, Star, Eye, Heart, TrendingUp } from "lucide-react"
import { motion, useScroll, useTransform, AnimatePresence, useInView, useMotionValue, useSpring } from "framer-motion"
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

  certifications: Array<{
    title: string
    description: string
    issueDate: string
  }>
}

export default function FuturisticPortfolio() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeSection, setActiveSection] = useState('home')
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })

  const router = useRouter()
  const params = useParams()
  const { scrollYProgress } = useScroll()
  const scaleProgress = useTransform(scrollYProgress, [0, 1], [0, 1])

  const [USERNAME, setUsername] = useState('')
  const [userName, setUserName] = useState('Portfolio')
  const [userEmail, setuserEmail] = useState('')
  const API_BASE = `${process.env.NEXT_PUBLIC_API_URL}`;

  const [submitted, setSubmitted] = useState(false);
  const [showAllCertificates, setShowAllCertificates] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  // Custom cursor following effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY })
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
    { label: "Certifications", href: "#certifications" },
    { label: "Contact", href: "#contact" },
    { label: "Dashboard", href: "/Components/DashBoard" },
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
        delayChildren: 0.1
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
    hidden: { opacity: 0, rotate: -10, scale: 0.9 },
    visible: {
      opacity: 1,
      rotate: 0,
      scale: 1,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 flex items-center justify-center">
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
              rotate: { duration: 1.5, repeat: Infinity, ease: "linear" },
              scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
            }}
            className="w-24 h-24 border-4 border-slate-700 border-t-cyan-400 border-r-purple-500 rounded-2xl mx-auto mb-8"
          />
          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-cyan-400 text-lg font-bold tracking-wider"
          >
            INITIALIZING SYSTEM...
          </motion.p>
        </motion.div>
      </div>
    )
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 flex items-center justify-center">
        <p className="text-red-400 text-xl font-bold">SYSTEM ERROR: Failed to load portfolio</p>
      </div>
    )
  }

  return (
    <div className="w-full bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 text-slate-100 overflow-x-hidden relative">
      {/* Dynamic Mesh Gradient Background */}
      <div className="fixed inset-0 z-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 20% 50%, rgba(6, 182, 212, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(168, 85, 247, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 40% 20%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)
          `
        }} />
      </div>

      {/* Animated Particles */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Gradient Progress Bar with Glow */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 origin-left z-50"
        style={{
          scaleX: scaleProgress,
          boxShadow: '0 0 20px rgba(6,182,212,0.8), 0 0 40px rgba(6,182,212,0.4)'
        }}
      />

      {/* Floating Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 w-full z-40 transition-all duration-500 ${scrolled
          ? "bg-slate-900/70 backdrop-blur-2xl border-b border-cyan-500/20 shadow-2xl shadow-cyan-500/10"
          : "bg-transparent"
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-2xl font-bold flex items-center gap-3 cursor-pointer"
          >
            <motion.div
              className="relative"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Terminal className="text-cyan-400" size={32} />
              <motion.div
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 bg-cyan-400 blur-xl"
              />
            </motion.div>
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent font-black tracking-wider">
              {userName.toUpperCase()}
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
                className="relative px-5 py-2.5 text-slate-300 hover:text-cyan-400 transition-all font-semibold group overflow-hidden"
              >
                <span className="relative z-10">{link.label}</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/20 to-cyan-500/0 rounded-lg"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"
                />
              </motion.a>
            ))}
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-cyan-400 relative z-50"
          >
            <motion.div
              animate={{ rotate: mobileOpen ? 90 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {mobileOpen ? <X size={28} /> : <Menu size={28} />}
            </motion.div>
          </button>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-slate-900/98 backdrop-blur-2xl border-b border-cyan-500/20 overflow-hidden"
            >
              <div className="p-6 space-y-4">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={index}
                    href={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setMobileOpen(false)}
                    className="block text-slate-300 hover:text-cyan-400 transition-colors py-3 text-lg font-semibold border-b border-slate-800 hover:border-cyan-500/30"
                  >
                    {link.label}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* REDESIGNED HERO SECTION - Split Screen with Floating Elements */}
      <section style={{ marginTop: "80px" }} id="home" className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
        <div className="max-w-7xl w-full relative z-10 grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={fadeInLeft} className="mb-6">
              <motion.span
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/40 rounded-full text-cyan-400 text-sm font-bold tracking-wider backdrop-blur-sm"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles size={18} />
                </motion.div>
                AVAILABLE FOR OPPORTUNITIES
                <motion.div
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-2 h-2 bg-cyan-400 rounded-full"
                />
              </motion.span>
            </motion.div>

            <motion.div variants={fadeInLeft}>
              <motion.h1
                className="text-6xl md:text-7xl lg:text-8xl font-black mb-6 leading-[1.1]"
              >
                <motion.span
                  className="block text-slate-100"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  HI, I'M
                </motion.span>
                <motion.span
                  className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  {userName.toUpperCase()}
                </motion.span>
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="h-2 w-32 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full mt-4"
                  style={{ boxShadow: '0 0 20px rgba(6,182,212,0.6)' }}
                />
              </motion.h1>
            </motion.div>

            <motion.p
              variants={fadeInLeft}
              className="text-2xl md:text-3xl text-slate-300 mb-8 font-light leading-relaxed"
            >
              {userData.hero.subtitle}
            </motion.p>

            <motion.div
              variants={fadeInLeft}
              className="flex flex-wrap gap-4"
            >
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-900 font-bold rounded-xl flex items-center gap-3 text-lg overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500"
                  initial={{ x: '100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10">{userData.hero.primaryButtonText}</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="relative z-10"
                >
                  <ArrowRight size={22} />
                </motion.div>
              </motion.a>

              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-slate-800/50 border-2 border-cyan-400/50 text-cyan-400 font-bold rounded-xl hover:bg-slate-800 hover:border-cyan-400 transition-all text-lg backdrop-blur-sm"
              >
                {userData.hero.secondaryButtonText}
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right Side - Floating 3D Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <motion.div
              animate={{
                y: [0, -20, 0],
                rotateZ: [0, 2, 0, -2, 0]
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              {/* Main Card */}
              <div className="relative p-12 bg-gradient-to-br from-slate-800/60 to-slate-900/60 border-2 border-cyan-500/30 rounded-3xl backdrop-blur-2xl overflow-hidden">
                {/* Animated Background */}
                <motion.div
                  animate={{
                    background: [
                      'radial-gradient(circle at 0% 0%, rgba(6, 182, 212, 0.15) 0%, transparent 50%)',
                      'radial-gradient(circle at 100% 100%, rgba(168, 85, 247, 0.15) 0%, transparent 50%)',
                      'radial-gradient(circle at 0% 0%, rgba(6, 182, 212, 0.15) 0%, transparent 50%)',
                    ]
                  }}
                  transition={{ duration: 5, repeat: Infinity }}
                  className="absolute inset-0"
                />

                {/* Content */}
                <div className="relative z-10 space-y-6">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="w-24 h-24 mx-auto bg-gradient-to-br from-cyan-400 to-purple-500 rounded-2xl flex items-center justify-center"
                  >
                    <Code2 size={48} className="text-white" />
                  </motion.div>

                  <div className="text-center">
                    <h3 className="text-3xl font-black bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">
                      {userData.hero.highlightText}
                    </h3>
                    <p className="text-slate-400 text-sm">Developer & Designer</p>
                  </div>

                  {/* Floating Icons */}
                  <div className="grid grid-cols-3 gap-4 pt-6">
                    {[Zap, Cpu, Rocket].map((Icon, i) => (
                      <motion.div
                        key={i}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        animate={{ y: [0, -10, 0] }}
                        transition={{
                          y: { duration: 2 + i, repeat: Infinity, delay: i * 0.3 }
                        }}
                        className="p-4 bg-slate-800/50 border border-cyan-500/30 rounded-xl flex items-center justify-center"
                      >
                        <Icon className="text-cyan-400" size={28} />
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Decorative Elements */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-20 -right-20 w-60 h-60 border border-cyan-500/20 rounded-full"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                  className="absolute -bottom-20 -left-20 w-60 h-60 border border-purple-500/20 rounded-full"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-cyan-400 text-sm font-mono">SCROLL</span>
          <ChevronDown className="text-cyan-400" size={36} />
        </motion.div>
      </section>

      {/* REDESIGNED ABOUT SECTION - Bento Grid Style */}
      <section id="about" className="relative py-32 px-6 bg-slate-900/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center mb-20"
          >
            <motion.span
              className="inline-block px-6 py-2 bg-cyan-500/10 border border-cyan-400/30 rounded-full text-cyan-400 text-sm font-bold mb-6 uppercase tracking-wider"
              whileHover={{ scale: 1.05 }}
            >
              {userData.aboutMe.sectionTitle}
            </motion.span>
            <h2 className="text-5xl md:text-7xl font-black mb-6 text-slate-100">
              {userData.aboutMe.headline.split(' ').map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={i % 2 === 0 ? "inline-block" : "inline-block bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"}
                >
                  {word}{' '}
                </motion.span>
              ))}
            </h2>
          </motion.div>

          {/* Bento Grid Layout */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {/* Large Story Card */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={scaleIn}
              className="md:col-span-2 md:row-span-2 p-8 bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-cyan-500/20 rounded-3xl backdrop-blur-sm relative overflow-hidden group"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />

              <div className="relative z-10">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center mb-6"
                >
                  <Terminal size={32} className="text-white" />
                </motion.div>

                <h3 className="text-3xl font-black text-slate-100 mb-6">My Story</h3>

                <div className="space-y-4 text-slate-400 text-lg leading-relaxed">
                  <p className="border-l-4 border-cyan-400 pl-6 italic">
                    {userData.aboutMe.introduction}
                  </p>
                  <p>{userData.aboutMe.description}</p>
                </div>

                {userData.aboutMe.coreValues.length > 0 && (
                  <div className="mt-8 grid grid-cols-2 gap-3">
                    {userData.aboutMe.coreValues.map((value, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.05, x: 5 }}
                        className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg border border-cyan-500/20"
                      >
                        <Zap size={16} className="text-cyan-400" />
                        <span className="text-slate-300 font-medium">{value}</span>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>

            {/* Stats Cards */}
            {(() => {
              const statsConfig = [
                { key: 'projectsCompleted', label: 'Projects', icon: <Rocket size={28} />, gradient: 'from-cyan-400 to-blue-500' },
                { key: 'yearsExperience', label: 'Years', icon: <Zap size={28} />, gradient: 'from-blue-500 to-purple-500' },
                { key: 'happyClients', label: 'Clients', icon: <Heart size={28} />, gradient: 'from-purple-500 to-pink-500' },
                { key: 'techSkills', label: 'Skills', icon: <Cpu size={28} />, gradient: 'from-cyan-400 to-purple-500' },
              ];

              return statsConfig
                .filter(stat => userData.aboutMe.stats[stat.key as keyof typeof userData.aboutMe.stats] > 0)
                .map((stat, index) => (
                  <motion.div
                    key={index}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={rotateIn}
                    whileHover={{ y: -8, scale: 1.05 }}
                    className="p-6 bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-cyan-500/20 rounded-3xl backdrop-blur-sm relative overflow-hidden group"
                  >
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                    />

                    <div className="relative z-10">
                      <div className="text-cyan-400 mb-4">{stat.icon}</div>
                      <motion.div
                        className={`text-5xl font-black bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-2`}
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", stiffness: 100 }}
                      >
                        {userData.aboutMe.stats[stat.key as keyof typeof userData.aboutMe.stats]}+
                      </motion.div>
                      <div className="text-slate-400 text-sm uppercase tracking-wider font-bold">
                        {stat.label}
                      </div>
                    </div>

                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="absolute -bottom-6 -right-6 w-32 h-32 border border-cyan-500/10 rounded-full"
                    />
                  </motion.div>
                ));
            })()}
          </div>
        </div>
      </section>

      {/* REDESIGNED SKILLS SECTION - Card Grid with Hover Effects */}
      <section id="skills" className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-7xl font-black mb-6 text-slate-100">
              MY <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">EXPERTISE</span>
            </h2>
            <p className="text-slate-400 text-xl max-w-2xl mx-auto">
              Technologies and tools I use to bring ideas to life
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {userData.skillCategories.length > 0 ? (
              userData.skillCategories.map((category, index) => (
                <motion.div
                  key={index}
                  variants={scaleIn}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="group p-8 bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-cyan-500/20 rounded-3xl backdrop-blur-sm overflow-hidden relative"
                >
                  {/* Animated Background on Hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  />

                  {/* Header */}
                  <div className="relative z-10 mb-6">
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                      className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center text-3xl mb-4"
                      style={{ boxShadow: '0 0 30px rgba(6, 182, 212, 0.4)' }}
                    >
                      {category.icon}
                    </motion.div>
                    <h3 className="text-2xl font-black text-slate-100 uppercase">
                      {category.category}
                    </h3>
                  </div>

                  {/* Skills Tags */}
                  <div className="relative z-10 flex flex-wrap gap-2">
                    {category.skills.map((skill, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.05 }}
                        whileHover={{ y: -3, scale: 1.1 }}
                        className="px-4 py-2 bg-slate-800/70 border border-cyan-500/30 rounded-lg hover:border-cyan-400 hover:bg-cyan-500/10 transition-all cursor-pointer backdrop-blur-sm"
                      >
                        <span className="font-semibold text-cyan-400 text-sm">{skill}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Decorative Corner */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-10 -right-10 w-32 h-32 border-2 border-cyan-500/10 rounded-full"
                  />
                </motion.div>
              ))
            ) : (
              <p className="col-span-full text-center text-slate-500 text-xl">No skills added yet</p>
            )}
          </motion.div>
        </div>
      </section>

      {/* REDESIGNED EXPERIENCE SECTION - Horizontal Timeline */}
      {userData.experiences && userData.experiences.length > 0 && (
        <section id="experience" className="relative py-32 px-6 bg-slate-900/40 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-20"
            >
              <h2 className="text-5xl md:text-7xl font-black mb-6 text-slate-100">
                PROFESSIONAL <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">JOURNEY</span>
              </h2>
              <p className="text-slate-400 text-xl">My career path and milestones</p>
            </motion.div>

            {/* Horizontal Scrolling Timeline */}
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 rounded-full"
                style={{ boxShadow: '0 0 20px rgba(6, 182, 212, 0.6)' }}
              />

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerContainer}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {userData.experiences.map((exp, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    className="relative"
                  >
                    {/* Glowing Timeline Dot */}
                    <motion.div
                      animate={{
                        scale: [1, 1.3, 1],
                        boxShadow: [
                          '0 0 20px rgba(6, 182, 212, 0.8)',
                          '0 0 40px rgba(6, 182, 212, 1)',
                          '0 0 20px rgba(6, 182, 212, 0.8)'
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute top-20 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full border-4 border-slate-900 z-10"
                    />

                    <motion.div
                      whileHover={{ y: -10, scale: 1.03 }}
                      className="mt-32 p-8 bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-cyan-500/20 rounded-3xl backdrop-blur-sm hover:border-cyan-400/50 transition-all relative overflow-hidden group"
                    >
                      {/* Hover Glow Effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      />

                      <div className="relative z-10">
                        {/* Period Badge */}
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          className="inline-block px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/40 rounded-full text-cyan-400 text-xs font-bold mb-4"
                        >
                          {exp.period}
                        </motion.div>

                        <h3 className="text-2xl font-black text-slate-100 mb-2 group-hover:text-cyan-400 transition-colors">
                          {exp.role}
                        </h3>
                        <p className="text-cyan-400 font-bold mb-4 flex items-center gap-2">
                          <Briefcase size={16} />
                          {exp.company}
                        </p>
                        <p className="text-slate-400 leading-relaxed mb-6">
                          {exp.description}
                        </p>

                        {/* Skills Tags */}
                        <div className="flex flex-wrap gap-2">
                          {exp.skills.map((skill, idx) => (
                            <motion.span
                              key={idx}
                              whileHover={{ scale: 1.1, y: -2 }}
                              className="px-3 py-1 bg-slate-700/50 text-cyan-400 rounded-lg text-xs font-bold border border-cyan-500/20"
                            >
                              {skill}
                            </motion.span>
                          ))}
                        </div>
                      </div>

                      {/* Corner Accent */}
                      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-cyan-400/20 to-transparent rounded-bl-[60px]" />
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* CERTIFICATIONS SECTION - Futuristic Holographic Design */}
      {userData.certifications && userData.certifications.length > 0 && (
        <section id="certifications" className="relative py-32 px-6 bg-slate-900/40 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto">
            {/* Header with Glowing Effect */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-20"
            >
              <motion.span
                className="inline-block px-6 py-2 bg-cyan-500/10 border border-cyan-400/30 rounded-full text-cyan-400 text-sm font-bold mb-6 uppercase tracking-wider"
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(6, 182, 212, 0.5)' }}
              >
                <motion.span className="inline-flex items-center gap-2">
                  <Award size={16} />
                  ACHIEVEMENTS
                </motion.span>
              </motion.span>

              <h2 className="text-5xl md:text-7xl font-black mb-6 text-slate-100">
                CERTIFIED <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">EXPERTISE</span>
              </h2>
              <p className="text-slate-400 text-xl max-w-2xl mx-auto">
                Professional credentials and verified achievements
              </p>

              {/* Decorative Line */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                className="h-1 w-32 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full mx-auto mt-6"
                style={{ boxShadow: '0 0 20px rgba(6, 182, 212, 0.6)' }}
              />
            </motion.div>

            {/* Certifications Grid with Holographic Effects */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {userData.certifications.slice(0, 6).map((cert, index) => (
                <motion.div
                  key={index}
                  variants={scaleIn}
                  whileHover={{ y: -15, scale: 1.03 }}
                  className="group relative"
                >
                  <div className="relative h-full p-8 bg-gradient-to-br from-slate-800/60 to-slate-900/60 border-2 border-cyan-500/20 rounded-3xl backdrop-blur-sm overflow-hidden hover:border-cyan-400/50 transition-all">

                    {/* Animated Holographic Background */}
                    <motion.div
                      animate={{
                        background: [
                          'radial-gradient(circle at 0% 0%, rgba(6, 182, 212, 0.15) 0%, transparent 50%)',
                          'radial-gradient(circle at 100% 100%, rgba(168, 85, 247, 0.15) 0%, transparent 50%)',
                          'radial-gradient(circle at 0% 0%, rgba(6, 182, 212, 0.15) 0%, transparent 50%)',
                        ]
                      }}
                      transition={{ duration: 5, repeat: Infinity }}
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    />

                    {/* Glowing Trophy Badge */}
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: index * 0.1 + 0.2,
                        type: "spring",
                        stiffness: 200
                      }}
                      animate={{
                        boxShadow: [
                          '0 0 20px rgba(6, 182, 212, 0.6)',
                          '0 0 40px rgba(6, 182, 212, 0.8)',
                          '0 0 20px rgba(6, 182, 212, 0.6)',
                        ]
                      }}
                      transition={{
                        boxShadow: { duration: 2, repeat: Infinity }
                      }}
                      className="absolute top-6 right-6 z-10"
                    >
                      <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center">
                        <span className="text-2xl">🏆</span>
                      </div>
                    </motion.div>

                    <div className="relative z-10 flex flex-col h-full">
                      {/* Rotating Certificate Icon with Glow */}
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          delay: index * 0.1 + 0.3,
                          type: "spring",
                          stiffness: 150
                        }}
                        className="mb-6 relative"
                      >
                        <div className="relative w-24 h-24">
                          {/* Rotating Outer Ring */}
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 border-4 border-transparent border-t-cyan-400 border-r-blue-500 rounded-2xl"
                          />
                          <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-1 border-4 border-transparent border-b-purple-500 border-l-blue-400 rounded-2xl"
                          />

                          {/* Inner Icon Container */}
                          <div className="absolute inset-4 bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-md rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Star size={32} className="text-cyan-400" />
                          </div>

                          {/* Pulsing Glow Effect */}
                          <motion.div
                            animate={{
                              scale: [1, 1.3, 1],
                              opacity: [0.3, 0.6, 0.3]
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute inset-0 bg-cyan-400 rounded-2xl blur-xl"
                          />
                        </div>
                      </motion.div>

                      {/* Title with Cyber Underline */}
                      <motion.h3
                        whileHover={{ x: 5 }}
                        className="text-2xl font-black text-slate-100 mb-4 leading-tight group-hover:text-cyan-400 transition-colors relative"
                      >
                        {cert.title}
                        <motion.div
                          initial={{ scaleX: 0 }}
                          whileHover={{ scaleX: 1 }}
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 origin-left"
                          style={{ boxShadow: '0 0 10px rgba(6, 182, 212, 0.8)' }}
                        />
                      </motion.h3>

                      {/* Glowing Date Badge */}
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 + 0.4 }}
                        className="mb-5"
                      >
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          className="inline-flex items-center gap-3 px-5 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/40 rounded-full backdrop-blur-sm"
                        >
                          <motion.div
                            animate={{
                              scale: [1, 1.3, 1],
                              boxShadow: [
                                '0 0 10px rgba(6, 182, 212, 0.5)',
                                '0 0 20px rgba(6, 182, 212, 0.8)',
                                '0 0 10px rgba(6, 182, 212, 0.5)',
                              ]
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="w-2 h-2 bg-cyan-400 rounded-full"
                          />
                          <span className="text-cyan-400 text-sm font-bold tracking-wider">
                            {cert.issueDate}
                          </span>
                        </motion.div>
                      </motion.div>

                      {/* Description with Neon Border */}
                      <p className="text-slate-400 leading-relaxed flex-grow text-sm mb-6 border-l-2 border-cyan-400/50 pl-4 group-hover:border-cyan-400 transition-colors">
                        {cert.description}
                      </p>

                      {/* Animated Progress Bar */}
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "100%" }}
                        viewport={{ once: true }}
                        transition={{
                          delay: index * 0.1 + 0.5,
                          duration: 0.8
                        }}
                        className="relative h-2 rounded-full overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500"
                          style={{ boxShadow: '0 0 15px rgba(6, 182, 212, 0.8)' }}
                        />
                        {/* Scanning Line Effect */}
                        <motion.div
                          animate={{ x: ["-100%", "200%"] }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "linear",
                            repeatDelay: 1
                          }}
                          className="absolute inset-0 w-1/3 bg-white/60 blur-sm"
                        />
                      </motion.div>
                    </div>

                    {/* Corner Glow Effects */}
                    <motion.div
                      animate={{
                        opacity: [0.2, 0.5, 0.2],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-400/20 to-transparent rounded-bl-[80px] blur-xl pointer-events-none"
                    />
                    <motion.div
                      animate={{
                        opacity: [0.2, 0.4, 0.2],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ duration: 4, repeat: Infinity }}
                      className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-500/20 to-transparent rounded-tr-[60px] blur-xl pointer-events-none"
                    />

                    {/* Scanning Line Effect */}
                    <motion.div
                      animate={{ y: ['-100%', '200%'] }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear",
                        repeatDelay: 2
                      }}
                      className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent opacity-50"
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* View All Button with Holographic Effect */}
            {userData.certifications.length > 6 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mt-16"
              >
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    boxShadow: '0 0 60px rgba(6, 182, 212, 0.8)'
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowAllCertificates(true)}
                  className="group relative px-12 py-5 bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-900 font-black rounded-xl text-lg uppercase tracking-wider overflow-hidden"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6 }}
                    style={{ mixBlendMode: 'overlay' }}
                  />
                  <span className="relative z-10 flex items-center gap-3">
                    <Eye size={24} />
                    VIEW ALL {userData.certifications.length} CERTIFICATIONS
                  </span>
                </motion.button>
              </motion.div>
            )}

            {/* Total Count Display - Futuristic HUD Style */}
            {userData.certifications.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="mt-20 flex justify-center"
              >
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="relative inline-flex items-center gap-12 px-20 py-12 bg-gradient-to-br from-slate-800/70 to-slate-900/70 border-2 border-cyan-500/30 rounded-3xl backdrop-blur-xl overflow-hidden"
                >
                  {/* Animated Grid Background */}
                  <motion.div
                    animate={{
                      backgroundPosition: ['0% 0%', '100% 100%'],
                    }}
                    transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage: `
                  linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)
                `,
                      backgroundSize: '20px 20px',
                    }}
                  />

                  {/* Rotating Holographic Icon */}
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="relative z-10"
                  >
                    <div className="w-28 h-28 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-2xl flex items-center justify-center shadow-2xl"
                      style={{ boxShadow: '0 0 60px rgba(6, 182, 212, 0.6)' }}
                    >
                      <Award className="text-white" size={56} />
                    </div>
                    <motion.div
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.3, 0.6, 0.3]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 bg-cyan-400 rounded-2xl blur-2xl"
                    />
                  </motion.div>

                  <div className="relative z-10">
                    <motion.p
                      initial={{ scale: 0.5 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: "spring", stiffness: 200 }}
                      className="text-8xl font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent"
                    >
                      {userData.certifications.length}
                    </motion.p>
                    <p className="text-slate-400 text-sm font-bold mt-3 uppercase tracking-widest flex items-center gap-3">
                      <motion.div
                        animate={{
                          scale: [1, 1.5, 1],
                          boxShadow: [
                            '0 0 10px rgba(6, 182, 212, 0.5)',
                            '0 0 20px rgba(6, 182, 212, 1)',
                            '0 0 10px rgba(6, 182, 212, 0.5)',
                          ]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-3 h-3 bg-cyan-400 rounded-full"
                      />
                      CERTIFICATIONS ACHIEVED
                    </p>
                  </div>

                  {/* Floating Particles */}
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        y: [0, -30, 0],
                        opacity: [0, 1, 0],
                        scale: [0, 1.5, 0],
                      }}
                      transition={{
                        duration: 3 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                      }}
                      className="absolute w-1 h-1 bg-cyan-400 rounded-full"
                      style={{
                        left: `${15 + i * 10}%`,
                        bottom: '20%',
                      }}
                    />
                  ))}
                </motion.div>
              </motion.div>
            )}
          </div>

          {/* Modal for All Certifications - Cyberpunk Style */}
          <AnimatePresence
            onExitComplete={() => {
              // Re-enable body scroll when modal exits
              document.body.style.overflow = 'unset';
            }}
          >
            {showAllCertificates && (
              <>
                {/* Backdrop with Glow - FIXED VERSION */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => {
                    setShowAllCertificates(false);
                    // Re-enable body scroll
                    document.body.style.overflow = 'unset';
                  }}
                  className="fixed inset-0 bg-slate-950/95 backdrop-blur-2xl z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
                  style={{
                    backgroundImage: `
                radial-gradient(circle at 20% 50%, rgba(6, 182, 212, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 80% 80%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)
              `
                  }}
                >
                  {/* Modal Content - FIXED VERSION */}
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 50 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 50 }}
                    transition={{ type: "spring", damping: 25, stiffness: 250 }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-gradient-to-br from-slate-900/95 to-slate-950/95 border-2 border-cyan-500/30 rounded-2xl sm:rounded-3xl max-w-7xl w-full my-auto shadow-2xl backdrop-blur-2xl relative"
                    style={{ maxHeight: 'calc(100vh - 2rem)' }}
                  >
                    {/* Animated Background Grid */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none">
                      <motion.div
                        animate={{
                          backgroundPosition: ['0% 0%', '100% 100%'],
                        }}
                        transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
                        style={{
                          backgroundImage: `
                      linear-gradient(rgba(6, 182, 212, 0.2) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(6, 182, 212, 0.2) 1px, transparent 1px)
                    `,
                          backgroundSize: '20px 20px',
                        }}
                        className="absolute inset-0"
                      />
                    </div>

                    {/* Modal Header */}
                    <div className="sticky top-0 z-10 bg-slate-900/98 backdrop-blur-2xl border-b-2 border-cyan-500/30 p-4 sm:p-6 md:p-10 flex justify-between items-center relative">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-2 sm:mb-3 flex items-center gap-2 sm:gap-4 uppercase tracking-tight">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                            className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0"
                            style={{ boxShadow: '0 0 30px rgba(6, 182, 212, 0.6)' }}
                          >
                            <Award size={20} className="sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
                          </motion.div>
                          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 min-w-0">
                            <span className="text-slate-100">ALL</span>
                            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent truncate">
                              CERTIFICATIONS
                            </span>
                          </div>
                        </h3>
                        <p className="text-slate-400 flex items-center gap-2 sm:gap-3 text-xs sm:text-sm md:text-base lg:text-lg font-bold uppercase tracking-wide">
                          <motion.div
                            animate={{
                              scale: [1, 1.3, 1],
                              boxShadow: [
                                '0 0 10px rgba(6, 182, 212, 0.6)',
                                '0 0 20px rgba(6, 182, 212, 1)',
                                '0 0 10px rgba(6, 182, 212, 0.6)',
                              ]
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="w-2 h-2 sm:w-3 sm:h-3 bg-cyan-400 rounded-full flex-shrink-0"
                          />
                          <span className="truncate">{userData.certifications.length} VERIFIED</span>
                        </p>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1, rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => {
                          setShowAllCertificates(false);
                          // Re-enable body scroll
                          document.body.style.overflow = 'unset';
                        }}
                        className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-slate-800/50 backdrop-blur-md border-2 border-cyan-500/30 rounded-xl sm:rounded-2xl flex items-center justify-center hover:border-cyan-400 hover:bg-slate-800 transition-all flex-shrink-0 ml-2 sm:ml-4"
                      >
                        <X size={24} className="sm:w-7 sm:h-7 md:w-8 md:h-8 text-cyan-400" />
                      </motion.button>
                    </div>

                    {/* Modal Body - Scrollable - OPTIMIZED */}
                    <div className="p-4 sm:p-6 md:p-10 overflow-y-auto relative" style={{ maxHeight: 'calc(100vh - 12rem)' }}>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        {userData.certifications.map((cert, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{ y: -8, scale: 1.02 }}
                            className="group"
                          >
                            <div className="relative h-full bg-gradient-to-br from-slate-800/60 to-slate-900/60 border-2 border-cyan-500/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:border-cyan-400/50 transition-all backdrop-blur-sm overflow-hidden">

                              {/* Hover glow */}
                              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />

                              {/* Badge */}
                              <div className="absolute top-3 right-3 sm:top-4 sm:right-4 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg"
                                style={{ boxShadow: '0 0 20px rgba(6, 182, 212, 0.6)' }}
                              >
                                <span className="text-base sm:text-xl">🏆</span>
                              </div>

                              <div className="relative z-10">
                                {/* Icon */}
                                <div className="mb-3 sm:mb-4">
                                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-slate-800/70 border-2 border-cyan-500/30 rounded-lg sm:rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:border-cyan-400 transition-all backdrop-blur-sm">
                                    <Star size={20} className="sm:w-7 sm:h-7 text-cyan-400" />
                                  </div>
                                </div>

                                {/* Title */}
                                <h4 className="text-base sm:text-lg md:text-xl font-black text-slate-100 mb-2 sm:mb-3 leading-tight group-hover:text-cyan-400 transition-colors line-clamp-2">
                                  {cert.title}
                                </h4>

                                {/* Date */}
                                <div className="mb-2 sm:mb-3">
                                  <span className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/40 rounded-full text-cyan-400 text-xs font-bold backdrop-blur-sm">
                                    <motion.div
                                      animate={{ scale: [1, 1.3, 1] }}
                                      transition={{ duration: 2, repeat: Infinity }}
                                      className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-cyan-400 rounded-full"
                                    />
                                    {cert.issueDate}
                                  </span>
                                </div>

                                {/* Description */}
                                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 border-l-2 border-cyan-500/30 pl-2 sm:pl-3 group-hover:border-cyan-400 transition-colors line-clamp-3">
                                  {cert.description}
                                </p>

                                {/* Bottom bar */}
                                <div className="h-1 sm:h-1.5 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 shadow-sm"
                                  style={{ boxShadow: '0 0 10px rgba(6, 182, 212, 0.6)' }}
                                />
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </section>
      )}


      {/* REDESIGNED PROJECTS SECTION - Masonry Grid with 3D Effects */}
      <section id="projects" className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-7xl font-black mb-6 text-slate-100">
              FEATURED <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">WORK</span>
            </h2>
            <p className="text-slate-400 text-xl max-w-2xl mx-auto">
              A selection of projects I'm proud to have worked on
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {userData.projects.length > 0 ? (
              userData.projects.map((project, index) => (
                <motion.div
                  key={index}
                  variants={scaleIn}
                  whileHover={{ y: -15 }}
                  className="group relative"
                  style={{
                    gridRow: index % 3 === 0 ? 'span 2' : 'span 1' // Masonry effect
                  }}
                >
                  <div className="relative h-full overflow-hidden rounded-3xl bg-gradient-to-br from-slate-800/60 to-slate-900/60 border-2 border-cyan-500/20 hover:border-cyan-400/50 backdrop-blur-sm transition-all">
                    {/* Project Image with Parallax */}
                    <div className="relative h-80 overflow-hidden">
                      {project.image ? (
                        <motion.img
                          whileHover={{ scale: 1.15 }}
                          transition={{ duration: 0.6 }}
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-cyan-500/30 via-blue-500/30 to-purple-500/30 flex items-center justify-center">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                          >
                            <Rocket size={100} className="text-cyan-400/50" />
                          </motion.div>
                        </div>
                      )}

                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent" />

                      {/* Hover Action Buttons */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileHover={{ opacity: 1, y: 0 }}
                        className="absolute inset-0 bg-gradient-to-br from-cyan-500/30 to-blue-500/30 backdrop-blur-sm flex items-center justify-center gap-4"
                      >
                        {project.links.live && (
                          <motion.a
                            href={project.links.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-4 bg-slate-900 border-2 border-cyan-400 rounded-2xl text-cyan-400 hover:bg-cyan-400 hover:text-slate-900 transition-all"
                          >
                            <ExternalLink size={24} />
                          </motion.a>
                        )}
                        {project.links.github && (
                          <motion.a
                            href={project.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1, rotate: -5 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-4 bg-slate-900 border-2 border-cyan-400 rounded-2xl text-cyan-400 hover:bg-cyan-400 hover:text-slate-900 transition-all"
                          >
                            <Github size={24} />
                          </motion.a>
                        )}
                      </motion.div>

                      {/* Featured Badge */}
                      {index < 3 && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          whileHover={{ scale: 1.1 }}
                          className="absolute top-4 right-4 px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center gap-2 text-white font-bold text-xs"
                        >
                          <Star size={14} fill="currentColor" />
                          FEATURED
                        </motion.div>
                      )}
                    </div>

                    {/* Project Info */}
                    <div className="p-8">
                      <motion.h3
                        className="text-2xl font-black text-slate-100 mb-3 group-hover:text-cyan-400 transition-colors"
                        whileHover={{ x: 5 }}
                      >
                        {project.title}
                      </motion.h3>

                      <p className="text-slate-400 text-sm mb-6 line-clamp-3 leading-relaxed">
                        {project.description}
                      </p>

                      {/* Tags with Animated Underline */}
                      <div className="flex flex-wrap gap-2">
                        {project.tags.slice(0, 4).map((tag, idx) => (
                          <motion.span
                            key={idx}
                            whileHover={{ y: -2, scale: 1.05 }}
                            className="px-3 py-1.5 bg-slate-700/50 text-cyan-400 rounded-lg text-xs font-bold border border-cyan-500/20 hover:border-cyan-400/50 transition-all"
                          >
                            {tag}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    {/* Animated Corner Glow */}
                    <motion.div
                      animate={{
                        opacity: [0.3, 0.6, 0.3],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-400/20 to-transparent rounded-bl-[100px] blur-xl"
                    />
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center text-slate-500 text-xl py-20">
                No projects added yet
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* REDESIGNED CONTACT SECTION - Split Layout with Animation */}
      <section id="contact" className="relative py-32 px-6 bg-slate-900/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Side - Animated Info */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeInLeft}>
                <h2 className="text-5xl md:text-7xl font-black mb-6 text-slate-100 leading-tight">
                  LET'S BUILD<br />
                  <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                    TOGETHER
                  </span>
                </h2>
                <p className="text-slate-400 text-xl mb-12 leading-relaxed">
                  Have a project in mind? Let's discuss how we can make it happen.
                </p>
              </motion.div>

              {/* Contact Info Cards */}
              <motion.div variants={fadeInLeft} className="space-y-4">
                <motion.div
                  whileHover={{ x: 10, scale: 1.02 }}
                  className="p-6 bg-gradient-to-r from-slate-800/50 to-slate-900/50 border border-cyan-500/20 rounded-2xl backdrop-blur-sm flex items-center gap-4 group"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Mail size={24} className="text-white" />
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Email me at</p>
                    <p className="text-cyan-400 font-bold text-lg">{userEmail}</p>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ x: 10, scale: 1.02 }}
                  className="p-6 bg-gradient-to-r from-slate-800/50 to-slate-900/50 border border-cyan-500/20 rounded-2xl backdrop-blur-sm flex items-center gap-4 group"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Sparkles size={24} className="text-white" />
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Response time</p>
                    <p className="text-cyan-400 font-bold text-lg">Within 24 hours</p>
                  </div>
                </motion.div>
              </motion.div>

              {/* Social Links */}
              <motion.div variants={fadeInLeft} className="mt-12">
                <p className="text-slate-400 mb-6 text-sm uppercase tracking-wider font-bold">Connect with me</p>
                <div className="flex gap-4">
                  {userData.socialLinks.map((social, index) => (
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }} >
                      <motion.a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ y: -5, scale: 1.15 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-14 h-14 rounded-2xl bg-slate-800/50 backdrop-blur-md border border-cyan-500/30 flex items-center justify-center text-2xl hover:border-cyan-400 hover:bg-cyan-500/10 transition-all group"
                        style={{ color: social.color }}
                      >
                        <motion.div
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        >
                          {social.icon}
                        </motion.div>


                      </motion.a>

                      <p>{social.label}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Right Side - Contact Form */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInRight}
            >
              <motion.form
                onSubmit={handleSubmit}
                className="p-10 bg-gradient-to-br from-slate-800/60 to-slate-900/60 border-2 border-cyan-500/20 rounded-3xl backdrop-blur-sm relative overflow-hidden"
              >
                {/* Animated Background */}
                <motion.div
                  animate={{
                    background: [
                      'radial-gradient(circle at 0% 0%, rgba(6, 182, 212, 0.1) 0%, transparent 50%)',
                      'radial-gradient(circle at 100% 100%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)',
                      'radial-gradient(circle at 0% 0%, rgba(6, 182, 212, 0.1) 0%, transparent 50%)',
                    ]
                  }}
                  transition={{ duration: 5, repeat: Infinity }}
                  className="absolute inset-0"
                />

                <div className="relative z-10 space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <motion.div whileFocus={{ scale: 1.02 }}>
                      <label className="block text-cyan-400 text-sm font-bold mb-2 uppercase tracking-wider">
                        Your Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-5 py-4 bg-slate-900/70 backdrop-blur-md border-2 border-cyan-500/30 rounded-xl focus:border-cyan-400 focus:outline-none transition-all placeholder-slate-500 text-slate-100 font-medium"
                        required
                      />
                    </motion.div>

                    <motion.div whileFocus={{ scale: 1.02 }}>
                      <label className="block text-cyan-400 text-sm font-bold mb-2 uppercase tracking-wider">
                        Your Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-5 py-4 bg-slate-900/70 backdrop-blur-md border-2 border-cyan-500/30 rounded-xl focus:border-cyan-400 focus:outline-none transition-all placeholder-slate-500 text-slate-100 font-medium"
                        required
                      />
                    </motion.div>
                  </div>

                  <motion.div whileFocus={{ scale: 1.02 }}>
                    <label className="block text-cyan-400 text-sm font-bold mb-2 uppercase tracking-wider">
                      Message
                    </label>
                    <textarea
                      name="message"
                      placeholder="Tell me about your project..."
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      className="w-full px-5 py-4 bg-slate-900/70 backdrop-blur-md border-2 border-cyan-500/30 rounded-xl focus:border-cyan-400 focus:outline-none transition-all placeholder-slate-500 text-slate-100 font-medium resize-none"
                      required
                    />
                  </motion.div>

                  <motion.button
                    whileHover={{ scale: 1.03, boxShadow: '0 0 40px rgba(6, 182, 212, 0.8)' }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={submitted}
                    className="w-full px-8 py-5 bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-900 font-black rounded-xl hover:from-cyan-400 hover:to-blue-400 transition-all disabled:opacity-50 flex items-center justify-center gap-3 text-lg uppercase tracking-wider relative overflow-hidden group"
                  >
                    {submitted ? (
                      <>
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center"
                        >
                          ✓
                        </motion.div>
                        MESSAGE SENT!
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        SEND MESSAGE
                        <motion.div
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <ArrowRight size={20} />
                        </motion.div>
                      </>
                    )}

                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.6 }}
                      style={{ mixBlendMode: 'overlay' }}
                    />
                  </motion.button>
                </div>
              </motion.form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* REDESIGNED FOOTER - Minimalist with Animations */}
      <footer className="relative py-12 px-6 bg-slate-900/80 backdrop-blur-md border-t border-cyan-500/20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8 items-center mb-8"
          >
            {/* Logo */}
            <motion.div variants={fadeInUp} className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-xl flex items-center justify-center"
              >
                <Terminal className="text-white" size={24} />
              </motion.div>
              <div>
                <p className="text-xl font-black bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  {userName.toUpperCase()}
                </p>
                <p className="text-slate-500 text-xs">Full Stack Developer</p>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div variants={fadeInUp} className="flex justify-center gap-6">
              {navLinks.slice(0, 4).map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  whileHover={{ y: -2, color: '#06b6d4' }}
                  className="text-slate-400 text-sm font-medium transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
            </motion.div>

            {/* Social Icons */}
            <motion.div variants={fadeInUp} className="flex justify-end gap-3">
              {userData.socialLinks.slice(0, 4).map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3, scale: 1.1 }}
                  className="w-10 h-10 bg-slate-800/50 border border-cyan-500/20 rounded-lg flex items-center justify-center hover:border-cyan-400/50 transition-all"
                  style={{ color: social.color }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            className="h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent mb-8"
          />

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500"
          >
            <p className="flex items-center gap-2">
              <Terminal size={14} className="text-cyan-400" />
              © {currentYear} {userName}. Crafted with passion.
            </p>
            <div className="flex gap-6">
              <Link href="#" className="hover:text-cyan-400 transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-cyan-400 transition-colors">
                Terms of Service
              </Link>
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  )
}
