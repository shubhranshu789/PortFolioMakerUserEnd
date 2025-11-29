"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Menu, X, Github, Mail, Linkedin, Twitter, ExternalLink, Send, Sparkles, Zap, Code2, Palette, Rocket, Target } from "lucide-react"
import { motion, useScroll, useTransform, AnimatePresence, useSpring, useMotionValue } from "framer-motion"
import type React from "react"
import { useRouter } from 'next/navigation'
import emailjs from '@emailjs/browser'
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

export default function UI3() {
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

  const [USERNAME, setUsername] = useState('')
  const [userName, setUserName] = useState('Portfolio')
  const [userEmail, setuserEmail] = useState('')
  const API_BASE = `${process.env.NEXT_PUBLIC_API_URL}`;

  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Use the email from state (already fetched from API)
      if (!userEmail) {
        alert('Portfolio owner information not found');
        return;
      }

      const templateParams = {
        to_email: userEmail, // Email fetched from API
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

      // Active section detection
      const sections = ['home', 'about', 'skills', 'experience', 'projects', 'contact']
      const current = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      if (current) setActiveSection(current)
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

  // Advanced Animation Variants
  const floatingAnimation = {
    y: [0, -20, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }

  const glowPulse = {
    boxShadow: [
      "0 0 20px rgba(139, 92, 246, 0.3)",
      "0 0 60px rgba(139, 92, 246, 0.6)",
      "0 0 20px rgba(139, 92, 246, 0.3)"
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  }

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 flex items-center justify-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center relative"
        >
          {/* Animated gradient orbs */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360]
            }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute -top-20 -left-20 w-40 h-40 bg-purple-500/30 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [360, 180, 0]
            }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute -bottom-20 -right-20 w-40 h-40 bg-blue-500/30 rounded-full blur-3xl"
          />
          
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-20 h-20 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-6"
          />
          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-white text-xl font-light bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400"
          >
            Crafting Your Experience...
          </motion.p>
        </motion.div>
      </div>
    )
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 flex items-center justify-center">
        <div className="text-center p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
          <p className="text-white text-xl mb-4">Failed to load portfolio</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 text-white overflow-x-hidden relative">
      {/* Animated cursor follower */}
      <motion.div
        className="fixed w-6 h-6 border-2 border-purple-400 rounded-full pointer-events-none z-50 mix-blend-difference hidden lg:block"
        animate={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />

      {/* Gradient Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 origin-left z-50"
        style={{ scaleX: scaleProgress }}
      />

      {/* Glassmorphic Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 w-full z-40 transition-all duration-500 ${
          scrolled
            ? "bg-slate-900/80 backdrop-blur-2xl border-b border-white/10 shadow-lg shadow-purple-500/10"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-2xl font-bold relative"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
              {userName}
            </span>
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-1 -right-2 text-pink-500"
            >
              ✦
            </motion.span>
          </motion.div>

          <div className="hidden md:flex items-center gap-1 bg-white/5 backdrop-blur-xl rounded-full p-1.5 border border-white/10">
            {navLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`px-5 py-2 rounded-full transition-all font-medium relative ${
                  activeSection === link.href.slice(1)
                    ? "text-white bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg shadow-purple-500/50"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {link.label}
              </motion.a>
            ))}
          </div>

        

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-white p-2 rounded-lg bg-white/5 backdrop-blur-xl border border-white/10"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden bg-slate-900/95 backdrop-blur-2xl border-t border-white/10"
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
                    className="block px-4 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 transition-all"
                  >
                    {link.label}
                  </motion.a>
                ))}
                {/* <motion.a
                  href="/Components/DashBoard"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.1 }}
                  className="block px-4 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white text-center font-semibold"
                >
                  Dashboard
                </motion.a> */}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section - 3D Bento Grid Style */}
      <section id="home" className="relative min-h-screen flex items-center justify-center px-6 pt-20 overflow-hidden">
        {/* Animated mesh gradient background */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
          <div className="absolute top-0 -right-4 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
          <div className="absolute -bottom-8 left-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />
        </div>

        {/* Floating grid particles */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f1a_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f1a_1px,transparent_1px)] bg-[size:3rem_3rem]" />

        <div className="max-w-7xl w-full relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center"
          >
            {/* Status Badge */}
            <motion.div
              variants={fadeInUp}
              className="mb-8 inline-flex items-center gap-2 px-5 py-2.5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full"
            >
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2.5 h-2.5 bg-green-500 rounded-full"
              />
              <span className="text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-400">
                Available for Work
              </span>
              <Sparkles className="w-4 h-4 text-green-400" />
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              variants={fadeInUp}
              className="text-6xl md:text-8xl lg:text-9xl font-black mb-8 leading-none"
            >
              <motion.span
                animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                className="block bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-white bg-[length:200%_auto]"
              >
                {userData.hero.title}
              </motion.span>
              <motion.span
                animate={{
                  backgroundPosition: ["0%", "100%", "0%"],
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="block bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-[length:200%_auto] mt-2"
              >
                {userData.hero.highlightText}
              </motion.span>
            </motion.h1>

            {/* Subtitle with typing effect */}
            <motion.p
              variants={fadeInUp}
              className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed"
            >
              {userData.hero.subtitle}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-5 justify-center items-center"
            >
              <motion.a
                href="#projects"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 60px rgba(168, 85, 247, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-full overflow-hidden shadow-xl shadow-purple-500/30"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500"
                  initial={{ x: "100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative flex items-center gap-2">
                  {userData.hero.primaryButtonText}
                  <Rocket className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.a>

              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white/5 backdrop-blur-xl border-2 border-white/20 text-white font-bold rounded-full hover:bg-white/10 transition-all shadow-lg"
              >
                {userData.hero.secondaryButtonText}
              </motion.a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              variants={fadeInUp}
              className="mt-16 flex justify-center gap-4"
            >
              {/* {userData.socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center text-xl hover:bg-white/10 hover:border-purple-500/50 transition-all"
                  style={{ color: social.color }}
                >
                  {social.icon}
                </motion.a>
              ))} */}
            </motion.div>

           




          </motion.div>
        </div>
      </section>

      {/* About Section - Card Layout */}
      <section id="about" className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {/* Section Header */}
            <motion.div variants={fadeInUp} className="text-center mb-20">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="inline-block px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-400 text-sm font-mono mb-4"
              >
                {userData.aboutMe.sectionTitle}
              </motion.span>
              <h2 className="text-5xl md:text-7xl font-black mb-6">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                  {userData.aboutMe.headline}
                </span>
              </h2>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Left: Text Content */}
              <motion.div variants={fadeInUp} className="space-y-6">
                <div className="p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-purple-500/30 transition-all">
                  <p className="text-lg text-gray-300 leading-relaxed mb-4">
                    {userData.aboutMe.introduction}
                  </p>
                  <p className="text-lg text-gray-300 leading-relaxed">
                    {userData.aboutMe.description}
                  </p>
                </div>

                {/* Core Values */}
                {userData.aboutMe.coreValues.length > 0 && (
                  <motion.div
                    variants={staggerContainer}
                    className="p-8 rounded-3xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-xl border border-white/10"
                  >
                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                      <Target className="w-6 h-6 text-purple-400" />
                      Core Values
                    </h3>
                    <div className="space-y-4">
                      {userData.aboutMe.coreValues.map((value, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ x: 10 }}
                          className="flex items-center gap-4 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/5 hover:border-purple-500/30 transition-all cursor-pointer"
                        >
                          <motion.div
                            whileHover={{ rotate: 180 }}
                            className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
                          />
                          <span className="text-white font-medium">{value}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </motion.div>

              {/* Right: Stats Grid */}
              <motion.div
                variants={staggerContainer}
                className="grid grid-cols-2 gap-4 h-fit"
              >
                {(() => {
                  const validStats = [
                    { number: userData.aboutMe.stats.projectsCompleted, label: "Projects Completed", icon: Rocket, gradient: "from-purple-500 to-pink-500" },
                    { number: userData.aboutMe.stats.yearsExperience, label: "Years Experience", icon: Zap, gradient: "from-pink-500 to-red-500" },
                    { number: userData.aboutMe.stats.happyClients, label: "Happy Clients", icon: Target, gradient: "from-blue-500 to-cyan-500" },
                    { number: userData.aboutMe.stats.techSkills, label: "Tech Skills", icon: Code2, gradient: "from-green-500 to-emerald-500" },
                  ].filter(stat => stat.number > 0)

                  return validStats.map((stat, index) => {
                    const IconComponent = stat.icon
                    return (
                      <motion.div
                        key={index}
                        variants={scaleIn}
                        whileHover={{
                          scale: 1.05,
                          rotate: [0, -2, 2, -2, 0],
                          transition: { duration: 0.5 }
                        }}
                        className="group relative p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-purple-500/30 overflow-hidden transition-all"
                      >
                        {/* Gradient overlay on hover */}
                        <motion.div
                          className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity`}
                        />
                        
                        <div className="relative z-10">
                          <motion.div
                            animate={{ rotate: [0, 5, -5, 0] }}
                            transition={{ duration: 3, repeat: Infinity }}
                          >
                            <IconComponent className={`w-10 h-10 mb-4 bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`} />
                          </motion.div>
                          <motion.div
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ type: "spring", stiffness: 100, delay: index * 0.1 }}
                            className="text-5xl font-black mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400"
                          >
                            {stat.number}+
                          </motion.div>
                          <div className="text-sm text-gray-400 uppercase tracking-wider font-semibold">
                            {stat.label}
                          </div>
                        </div>

                        {/* Corner decoration */}
                        <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-purple-500/20 rounded-tr-xl" />
                        <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-purple-500/20 rounded-bl-xl" />
                      </motion.div>
                    )
                  })
                })()}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section - Bento Grid */}
      <section id="skills" className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-7xl font-black mb-6">
              Skills & <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">Expertise</span>
            </h2>
            <p className="text-gray-400 text-xl max-w-2xl mx-auto">
              Technologies and tools I work with to bring ideas to life
            </p>
          </motion.div>

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
                  whileHover={{ scale: 1.01 }}
                  className="p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-purple-500/30 transition-all"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <motion.span
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-5xl"
                    >
                      {category.icon}
                    </motion.span>
                    <h3 className="text-3xl font-bold text-white">
                      {category.category}
                    </h3>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.2 }}
                      className="flex-1 h-px bg-gradient-to-r from-purple-500 to-transparent"
                    />
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {category.skills.map((skill, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          delay: idx * 0.05,
                          type: "spring",
                          stiffness: 200
                        }}
                        whileHover={{
                          scale: 1.1,
                          rotate: [0, -5, 5, 0],
                          transition: { duration: 0.3 }
                        }}
                        className="px-5 py-3 bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-full hover:border-purple-500/50 transition-all cursor-pointer group"
                        style={{ color: category.color }}
                      >
                        <span className="font-semibold group-hover:text-white transition-colors">
                          {skill}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="text-center text-gray-400">No skills added yet</p>
            )}
          </motion.div>
        </div>
      </section>

      {/* Experience Section - Timeline */}
      <section id="experience" className="relative py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-7xl font-black mb-6">
              Work <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">Experience</span>
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="relative"
          >
            {/* Animated Timeline Line */}
            <motion.div
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.5 }}
              className="absolute left-0 md:left-1/2 top-0 w-1 bg-gradient-to-b from-purple-500 via-pink-500 to-transparent"
            />

            {userData.experiences.length > 0 ? (
              userData.experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className={`relative mb-16 ${
                    index % 2 === 0 ? "md:pr-1/2 md:text-right" : "md:pl-1/2 md:ml-auto"
                  }`}
                >
                  {/* Timeline Dot */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.5 }}
                    className="absolute left-0 md:left-1/2 top-6 w-5 h-5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full border-4 border-slate-950 transform -translate-x-1/2 md:translate-x-0 z-10 shadow-lg shadow-purple-500/50"
                  />

                  <motion.div
                    whileHover={{
                      scale: 1.02,
                      boxShadow: "0 20px 60px rgba(168, 85, 247, 0.3)"
                    }}
                    className="ml-8 md:ml-0 p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-purple-500/30 transition-all"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      className="mb-4"
                    >
                      <span className="inline-block px-4 py-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-full text-purple-400 text-sm font-mono">
                        {exp.period}
                      </span>
                    </motion.div>
                    
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {exp.role}
                    </h3>
                    <p className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-semibold mb-4">
                      {exp.company}
                    </p>
                    <p className="text-gray-400 leading-relaxed mb-6">
                      {exp.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((skill, idx) => (
                        <motion.span
                          key={idx}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: idx * 0.05 }}
                          whileHover={{ scale: 1.1 }}
                          className="px-3 py-1.5 bg-purple-500/10 text-purple-400 rounded-lg text-sm font-medium border border-purple-500/20"
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              ))
            ) : (
              <p className="text-center text-gray-400">No experience added yet</p>
            )}
          </motion.div>
        </div>
      </section>

      {/* Projects Section - Modern Grid */}
      <section id="projects" className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-7xl font-black mb-6">
              Featured <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">Projects</span>
            </h2>
            <p className="text-gray-400 text-xl max-w-2xl mx-auto">
              A showcase of my recent work and creative solutions
            </p>
          </motion.div>

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
                  whileHover={{
                    y: -10,
                    transition: { duration: 0.3 }
                  }}
                  className="group relative"
                >
                  <div className="relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-purple-500/30 transition-all">
                    {/* Project Image */}
                    <div className="relative h-64 overflow-hidden">
                      {project.image ? (
                        <>
                          <motion.img
                            src={project.image}
                            alt={project.title}
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.5 }}
                            className="w-full h-full object-cover"
                          />
                          <motion.div
                            initial={{ opacity: 0 }}
                            whileHover={{ opacity: 1 }}
                            className="absolute inset-0 bg-gradient-to-t from-purple-900/90 via-purple-900/50 to-transparent"
                          />
                        </>
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                          <motion.span
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="text-7xl"
                          >
                            🚀
                          </motion.span>
                        </div>
                      )}
                    </div>

                    {/* Project Info */}
                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all">
                        {project.title}
                      </h3>
                      <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                        {project.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.slice(0, 3).map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-white/5 text-gray-400 rounded-lg text-xs font-medium border border-white/5"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Links */}
                      <div className="flex gap-4">
                        {project.links.live && (
                          <motion.a
                            href={project.links.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold rounded-lg shadow-lg shadow-purple-500/30"
                          >
                            <ExternalLink size={16} />
                            Live
                          </motion.a>
                        )}
                        {project.links.github && (
                          <motion.a
                            href={project.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 text-white text-sm font-semibold rounded-lg hover:border-purple-500/50 transition-all"
                          >
                            <Github size={16} />
                            Code
                          </motion.a>
                        )}
                      </div>
                    </div>

                    {/* Hover glow effect */}
                    <motion.div
                      className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                      style={{
                        background: "radial-gradient(600px at var(--mouse-x) var(--mouse-y), rgba(168, 85, 247, 0.15), transparent 40%)"
                      }}
                    />
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-400 py-20">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-7xl mb-4"
                >
                  📦
                </motion.div>
                <p>No projects added yet</p>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Contact Section - Modern Form */}
      <section id="contact" className="relative py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <h2 className="text-5xl md:text-7xl font-black mb-6">
                Let's <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">Connect</span>
              </h2>
              <p className="text-gray-400 text-xl">
                Have a project in mind? Let's make it happen together
              </p>
            </motion.div>

            <motion.form
              variants={fadeInUp}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <motion.div
                  whileFocus={{ scale: 1.02 }}
                  className="relative"
                >
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-6 py-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl focus:border-purple-500 focus:outline-none transition-all placeholder-gray-500 text-white"
                    required
                  />
                </motion.div>
                <motion.div
                  whileFocus={{ scale: 1.02 }}
                  className="relative"
                >
                  <input
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-6 py-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl focus:border-purple-500 focus:outline-none transition-all placeholder-gray-500 text-white"
                    required
                  />
                </motion.div>
              </div>

              <motion.div
                whileFocus={{ scale: 1.02 }}
                className="relative"
              >
                <textarea
                  name="message"
                  placeholder="Tell me about your project..."
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full px-6 py-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl focus:border-purple-500 focus:outline-none transition-all placeholder-gray-500 text-white resize-none"
                  required
                />
              </motion.div>

              <motion.button
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 20px 60px rgba(168, 85, 247, 0.4)"
                }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={submitted}
                className="w-full px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-2xl hover:from-purple-600 hover:to-pink-600 transition-all disabled:opacity-50 flex items-center justify-center gap-3 text-lg shadow-xl shadow-purple-500/30"
              >
                {submitted ? (
                  <>
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                    >
                      ✓
                    </motion.span>
                    Message Sent Successfully!
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Send Message
                  </>
                )}
              </motion.button>
            </motion.form>

            <motion.div
              variants={fadeInUp}
              className="mt-16 pt-16 border-t border-white/10"
            >
              <h3 className="text-2xl font-bold text-center mb-8">Connect with me</h3>
              <div className="flex justify-center gap-4" style={{alignItems : "center", flexDirection : "column" , display : "flex" , justifyContent : "c"}}>
                {userData.socialLinks.map((social, index) => (
                 <div>
                   <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{
                      y: -5,
                      scale: 1.1,
                      boxShadow: `0 10px 30px ${social.color}40`
                    }}
                    whileTap={{ scale: 0.9 }}
                    className="w-14 h-14 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center text-2xl hover:border-purple-500/50 transition-all"
                    style={{ color: social.color }}
                  >
                    {social.icon}
                  </motion.a>

                  <p>{social.label}</p>
                 </div>

                  
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-center md:text-left"
            >
              <p className="text-gray-400 text-sm">
                © {currentYear}. All rights reserved.
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Crafted with ❤️ and lots of ☕
              </p>
            </motion.div>
            <div className="flex gap-8 text-sm text-gray-400">
              <Link href="#" className="hover:text-purple-400 transition-colors">
                Privacy
              </Link>
              <Link href="#" className="hover:text-purple-400 transition-colors">
                Terms
              </Link>
              <Link href="#" className="hover:text-purple-400 transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}
