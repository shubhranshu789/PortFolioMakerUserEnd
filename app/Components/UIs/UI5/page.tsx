"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, Zap, Code, Rocket, Terminal, Activity, Cpu, Globe } from "lucide-react"
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

  certifications: Array<{
    title: string
    description: string
    issueDate: string
  }>
}

export default function UI6() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  // const [submitted, setSubmitted] = useState(false)
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [cursorVariant, setCursorVariant] = useState("default")

  const router = useRouter()
  const params = useParams()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  const [USERNAME, setUsername] = useState('')
  const [userName, setUserName] = useState('Portfolio')
  const [userEmail, setuserEmail] = useState('')
  const API_BASE = `${process.env.NEXT_PUBLIC_API_URL}`;


  // --------------------------------------------------------------------------------------------------------------------------------
  const [submitted, setSubmitted] = useState(false);
  const [showAllCertificates, setShowAllCertificates] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Extract email from localStorage
      const storedUser = localStorage.getItem('user');

      if (!storedUser) {
        alert('Portfolio owner information not found');
        return;
      }

      const userData = JSON.parse(storedUser);
      const portfolioOwnerEmail = userData.email; // "Shubh5@gmail.com"

      // Send email using your preferred method
      // Option 1: EmailJS
      const templateParams = {
        to_email: portfolioOwnerEmail, // Shubh5@gmail.com
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

      // OR Option 2: API Route
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipientEmail: portfolioOwnerEmail, // Shubh5@gmail.com
          senderName: formData.name,
          senderEmail: formData.email,
          message: formData.message,
        }),
      });

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




  // --------------------------------------------------------------------------------------------------------------------------------




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
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("scroll", handleScroll)
    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  const navLinks = [
    { label: "Home", href: "#home", icon: Terminal },
    { label: "About", href: "#about", icon: Code },
    { label: "Skills", href: "#skills", icon: Cpu },
    { label: "Work", href: "#projects", icon: Rocket },
    { label: "Certifications", href: "#certifications", icon: Terminal },
    { label: "Contact", href: "#contact", icon: Zap },
    { label: "Dashboard", href: "/Components/DashBoard", icon: Code },
  ]




  // const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value })
  // }

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault()
  //   setSubmitted(true)
  //   setTimeout(() => setSubmitted(false), 3000)
  //   setFormData({ name: "", email: "", message: "" })
  // }

  const currentYear = new Date().getFullYear()

  const cursorVariants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      width: 32,
      height: 32,
    },
    text: {
      x: mousePosition.x - 40,
      y: mousePosition.y - 40,
      width: 80,
      height: 80,
      mixBlendMode: "difference" as const,
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
        {/* Animated grid background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#00ff0010_1px,transparent_1px),linear-gradient(to_bottom,#00ff0010_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center relative z-10"
        >
          <motion.div
            animate={{
              rotate: 360,
              boxShadow: [
                "0 0 20px #00ff00",
                "0 0 60px #00ff00",
                "0 0 20px #00ff00",
              ]
            }}
            transition={{
              rotate: { duration: 2, repeat: Infinity, ease: "linear" },
              boxShadow: { duration: 1.5, repeat: Infinity }
            }}
            className="w-24 h-24 border-4 border-cyan-400 rounded-lg mx-auto mb-8"
          />
          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-cyan-400 text-2xl font-mono uppercase tracking-[0.3em]"
          >
            Loading System...
          </motion.p>
        </motion.div>
      </div>
    )
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-red-500 text-2xl font-mono">ERROR: Failed to load</p>
      </div>
    )
  }

  return (
    <div className="w-full bg-black text-white overflow-x-hidden relative font-mono">
      {/* Custom Neon Cursor */}
      <motion.div
        className="fixed w-8 h-8 border-2 border-cyan-400 rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        variants={cursorVariants}
        animate={cursorVariant}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
        style={{ boxShadow: "0 0 20px #00ffff" }}
      />

      {/* Animated Grid Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00ff0008_1px,transparent_1px),linear-gradient(to_bottom,#00ff0008_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <motion.div
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#00ff0005,transparent_50%)]"
        />
      </div>

      {/* Progress Bar - Neon Style */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-green-400 to-cyan-400 origin-left z-50"
        style={{ scaleX }}
      >
        <motion.div
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="h-full w-1/3 bg-white/50"
          style={{ filter: "blur(10px)" }}
        />
      </motion.div>

      {/* Cyberpunk Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-40 transition-all duration-300 w-11/12 max-w-6xl`}
      >
        <div className="relative">
          {/* Neon glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-green-500/20 blur-xl" />

          <div className="relative bg-black/90 border-2 border-cyan-400 px-6 py-4 backdrop-blur-sm"
            style={{
              clipPath: "polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))",
              boxShadow: "0 0 30px rgba(0, 255, 255, 0.3), inset 0 0 20px rgba(0, 255, 255, 0.1)"
            }}>
            <div className="flex justify-between items-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                onMouseEnter={() => setCursorVariant("text")}
                onMouseLeave={() => setCursorVariant("default")}
                className="text-xl font-bold"
              >
                <span className="text-cyan-400">{'<'}</span>
                <span className="text-green-400">{userName}</span>
                <span className="text-cyan-400">{' />'}</span>
              </motion.div>

              <div className="hidden md:flex items-center gap-1">
                {navLinks.map((link, index) => {
                  const Icon = link.icon
                  return (
                    <motion.a
                      key={index}
                      href={link.href}
                      whileHover={{ scale: 1.05, backgroundColor: "rgba(0, 255, 255, 0.1)" }}
                      onMouseEnter={() => setCursorVariant("text")}
                      onMouseLeave={() => setCursorVariant("default")}
                      className="px-4 py-2 text-cyan-400 hover:text-green-400 transition-all flex items-center gap-2 border border-transparent hover:border-cyan-400/50"
                      style={{ clipPath: "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)" }}
                    >
                      <Icon size={16} />
                      <span className="text-sm uppercase tracking-wider">{link.label}</span>
                    </motion.a>
                  )
                })}
                {/* <motion.a
                  href="/Components/DashBoard"
                  whileHover={{ scale: 1.05, boxShadow: "0 0 20px #00ff00" }}
                  className="ml-2 px-6 py-2 bg-gradient-to-r from-cyan-500 to-green-500 text-black font-bold uppercase tracking-wider"
                  style={{ clipPath: "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)" }}
                >
                  Dashboard
                </motion.a> */}
              </div>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden text-cyan-400"
              >
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mt-2 bg-black/95 border-2 border-cyan-400 overflow-hidden"
              style={{ boxShadow: "0 0 30px rgba(0, 255, 255, 0.3)" }}
            >
              <div className="p-4 space-y-2">
                {navLinks.map((link, index) => {
                  const Icon = link.icon
                  return (
                    <a
                      key={index}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="block px-4 py-3 text-cyan-400 hover:bg-cyan-400/10 transition-all flex items-center gap-3 border border-cyan-400/30"
                    >
                      <Icon size={18} />
                      {link.label}
                    </a>
                  )
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section - Cyberpunk Style */}
      <section id="home" className="min-h-screen flex items-center justify-center px-6 pt-32 pb-20 relative">
        {/* Animated scanlines */}
        <motion.div
          animate={{ y: [0, 1000] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(0,255,255,0.03)_50%,transparent_100%)] bg-[length:100%_20px] pointer-events-none"
        />

        <div className="max-w-7xl w-full relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side */}
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="mb-6"
              >
                <span className="px-4 py-2 border-2 border-cyan-400 text-cyan-400 text-xs uppercase tracking-[0.2em] inline-block"
                  style={{
                    boxShadow: "0 0 20px rgba(0, 255, 255, 0.5), inset 0 0 20px rgba(0, 255, 255, 0.1)",
                    clipPath: "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)"
                  }}>
                  // System Active
                </span>
              </motion.div>

              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-none">
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="block text-white mb-4"
                >
                  {userData.hero.title.split(userData.hero.highlightText)[0]}
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 }}
                  className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-green-400 to-cyan-400"
                  style={{
                    textShadow: "0 0 30px rgba(0, 255, 255, 0.5)",
                    WebkitTextStroke: "1px rgba(0, 255, 255, 0.3)"
                  }}
                >
                  {userData.hero.highlightText}
                </motion.span>
              </h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="text-xl text-gray-400 mb-10 leading-relaxed border-l-4 border-cyan-400 pl-6"
                style={{ textShadow: "0 0 10px rgba(0, 255, 255, 0.2)" }}
              >
                {userData.hero.subtitle}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
                className="flex flex-wrap gap-4"
              >
                <motion.a
                  href="#projects"
                  whileHover={{ scale: 1.05, boxShadow: "0 0 30px #00ff00" }}
                  whileTap={{ scale: 0.95 }}
                  className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-green-500 text-black font-bold uppercase tracking-wider flex items-center gap-3"
                  style={{ clipPath: "polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)" }}
                >
                  <Rocket className="group-hover:rotate-45 transition-transform" size={20} />
                  {userData.hero.primaryButtonText}
                </motion.a>
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(0, 255, 255, 0.1)" }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 border-2 border-cyan-400 text-cyan-400 font-bold uppercase tracking-wider hover:text-green-400 transition-all"
                  style={{
                    clipPath: "polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)",
                    boxShadow: "0 0 20px rgba(0, 255, 255, 0.3)"
                  }}
                >
                  {userData.hero.secondaryButtonText}
                </motion.a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3 }}
                className="mt-12 flex gap-4"
              >
                {userData.socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    whileHover={{
                      y: -5,
                      boxShadow: `0 0 20px ${social.color}`,
                      borderColor: social.color,
                      color: social.color
                    }}
                    className="w-12 h-12 border-2 border-cyan-400 flex items-center justify-center text-cyan-400 text-xl transition-all"
                    style={{ clipPath: "polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)" }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Side - Animated Hologram */}
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative w-full aspect-square">
                {/* Rotating rings */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border-2 border-cyan-400/30 rounded-full"
                  style={{ boxShadow: "0 0 30px rgba(0, 255, 255, 0.3)" }}
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-10 border-2 border-green-400/30 rounded-full"
                  style={{ boxShadow: "0 0 20px rgba(0, 255, 0, 0.3)" }}
                />
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-20 border-2 border-cyan-400/30 rounded-full"
                  style={{ boxShadow: "0 0 10px rgba(0, 255, 255, 0.3)" }}
                />

                {/* Center content */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={{
                      boxShadow: [
                        "0 0 20px #00ff00",
                        "0 0 60px #00ff00, 0 0 100px #00ffff",
                        "0 0 20px #00ff00",
                      ]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="w-48 h-48 border-4 border-cyan-400 flex items-center justify-center"
                    style={{ clipPath: "polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)" }}
                  >
                    <div className="text-center">
                      <Activity className="mx-auto mb-4 text-green-400" size={60} />
                      <motion.p
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-cyan-400 font-mono text-sm"
                      >
                        SYSTEM ONLINE
                      </motion.p>
                    </div>
                  </motion.div>
                </div>

                {/* Corner decorations */}
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                    className={`absolute w-8 h-8 border-cyan-400 ${i === 0 ? 'top-0 left-0 border-t-2 border-l-2' :
                      i === 1 ? 'top-0 right-0 border-t-2 border-r-2' :
                        i === 2 ? 'bottom-0 left-0 border-b-2 border-l-2' :
                          'bottom-0 right-0 border-b-2 border-r-2'
                      }`}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-cyan-400 rounded-full flex justify-center pt-2"
            style={{ boxShadow: "0 0 10px rgba(0, 255, 255, 0.5)" }}>
            <motion.div
              animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-cyan-400 rounded-full"
            />
          </div>
        </motion.div>
      </section>

      {/* About Section - Glitch Effect */}
      <section id="about" className="py-32 px-6 relative border-t-2 border-cyan-400/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <motion.h2
              whileHover={{
                textShadow: [
                  "2px 2px 0 #00ffff, -2px -2px 0 #ff00ff",
                  "-2px 2px 0 #00ffff, 2px -2px 0 #ff00ff",
                  "2px 2px 0 #00ffff, -2px -2px 0 #ff00ff",
                ]
              }}
              className="text-5xl md:text-7xl font-bold mb-6 uppercase tracking-wider"
            >
              <span className="text-cyan-400">//</span> {userData.aboutMe.sectionTitle}
            </motion.h2>
            <h3 className="text-3xl md:text-5xl font-bold text-green-400 uppercase tracking-wide">
              {userData.aboutMe.headline}
            </h3>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* About Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2 space-y-6"
            >
              <div className="border-2 border-cyan-400/50 p-8 relative"
                style={{
                  clipPath: "polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)",
                  boxShadow: "0 0 30px rgba(0, 255, 255, 0.2), inset 0 0 30px rgba(0, 255, 255, 0.05)"
                }}>
                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-green-400" />
                <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-green-400" />

                <p className="text-lg text-gray-300 leading-relaxed mb-6">
                  {userData.aboutMe.introduction}
                </p>
                <p className="text-lg text-gray-300 leading-relaxed">
                  {userData.aboutMe.description}
                </p>

                {userData.aboutMe.coreValues.length > 0 && (
                  <div className="mt-8 pt-8 border-t-2 border-cyan-400/30">
                    <h4 className="text-green-400 font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
                      <Zap size={20} />
                      Core Values
                    </h4>
                    <div className="space-y-3">
                      {userData.aboutMe.coreValues.map((value, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ x: 10, backgroundColor: "rgba(0, 255, 255, 0.05)" }}
                          className="flex items-center gap-3 p-3 border-l-4 border-cyan-400"
                        >
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            className="w-2 h-2 bg-green-400"
                            style={{ boxShadow: "0 0 10px #00ff00" }}
                          />
                          <span className="text-gray-300 font-mono">{value}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Stats Grid */}
            <div className="space-y-4">
              {(() => {
                const validStats = [
                  {
                    number: userData.aboutMe.stats.projectsCompleted,
                    label: "Projects",
                    icon: Rocket,
                    gradient: "from-cyan-400 to-blue-600"
                  },
                  {
                    number: userData.aboutMe.stats.yearsExperience,
                    label: "Years",
                    icon: Zap,
                    gradient: "from-green-400 to-emerald-600"
                  },
                  {
                    number: userData.aboutMe.stats.happyClients,
                    label: "Clients",
                    icon: Activity,
                    gradient: "from-purple-400 to-pink-600"
                  },
                  {
                    number: userData.aboutMe.stats.techSkills,
                    label: "Skills",
                    icon: Cpu,
                    gradient: "from-orange-400 to-red-600"
                  },
                ].filter(stat => stat.number > 0);

                return validStats.map((stat, index) => {
                  const Icon = stat.icon
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{
                        scale: 1.05,
                        boxShadow: "0 0 40px rgba(0, 255, 255, 0.5)"
                      }}
                      className="relative border-2 border-cyan-400 p-6 group"
                      style={{
                        clipPath: "polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)",
                        boxShadow: "0 0 20px rgba(0, 255, 255, 0.2)"
                      }}
                    >
                      <motion.div
                        animate={{
                          opacity: [0, 1, 0],
                          scale: [0.8, 1.2, 0.8]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute top-2 right-2"
                      >
                        <Icon className="text-green-400" size={24} />
                      </motion.div>

                      <motion.div
                        animate={{
                          textShadow: [
                            "0 0 10px #00ff00",
                            "0 0 20px #00ff00, 0 0 30px #00ffff",
                            "0 0 10px #00ff00",
                          ]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className={`text-5xl font-bold mb-2 bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}
                      >
                        {stat.number}+
                      </motion.div>
                      <div className="text-sm text-cyan-400 uppercase tracking-[0.2em] font-bold">
                        {stat.label}
                      </div>

                      {/* Animated corner */}
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute bottom-0 right-0 w-4 h-4 bg-green-400"
                        style={{ boxShadow: "0 0 10px #00ff00" }}
                      />
                    </motion.div>
                  )
                });
              })()}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section - Matrix Rain Effect */}
      <section id="skills" className="py-32 px-6 relative border-t-2 border-cyan-400/30 overflow-hidden">
        {/* Matrix rain background */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ y: ["-100%", "100%"] }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 2
              }}
              className="absolute w-px bg-gradient-to-b from-transparent via-green-400 to-transparent h-full"
              style={{ left: `${Math.random() * 100}%` }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-7xl font-bold mb-6 uppercase tracking-wider">
              <span className="text-cyan-400">//</span> Skills <span className="text-green-400">&</span> Tech Stack
            </h2>
          </motion.div>

          {userData.skillCategories.length > 0 ? (
            <div className="space-y-16">
              {userData.skillCategories.map((category, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                >
                  <div className="flex items-center gap-4 mb-8">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      className="text-5xl"
                      style={{ filter: "drop-shadow(0 0 10px currentColor)" }}
                    >
                      {category.icon}
                    </motion.div>
                    <h3 className="text-4xl font-bold text-green-400 uppercase tracking-wide">
                      {category.category}
                    </h3>
                    <div className="flex-1 h-px bg-gradient-to-r from-cyan-400 to-transparent" />
                  </div>

                  <div className="flex flex-wrap gap-4">
                    {category.skills.map((skill, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.05 }}
                        whileHover={{
                          scale: 1.1,
                          y: -5,
                          boxShadow: `0 0 30px ${category.color}, inset 0 0 20px ${category.color}`
                        }}
                        className="relative px-6 py-3 border-2 border-cyan-400 text-cyan-400 font-mono uppercase text-sm tracking-wider cursor-pointer group"
                        style={{
                          clipPath: "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)",
                          boxShadow: "0 0 15px rgba(0, 255, 255, 0.3)"
                        }}
                      >
                        <motion.span
                          className="relative z-10"
                          animate={{
                            color: ["#00ffff", "#00ff00", "#00ffff"]
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          {skill}
                        </motion.span>

                        {/* Scan line effect */}
                        <motion.div
                          animate={{ y: ["-100%", "100%"] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                          className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent opacity-0 group-hover:opacity-100"
                        />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No skills added yet</p>
          )}
        </div>
      </section>

      {/* Experience Section */}
      {userData.experiences && userData.experiences.length > 0 && (
        <section id="experience" className="py-32 px-6 relative border-t-2 border-cyan-400/30">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-wider">
                <span className="text-cyan-400">//</span> Experience <span className="text-green-400">Log</span>
              </h2>
            </motion.div>

            {userData.experiences.length > 0 ? (
              <div className="space-y-8">
                {userData.experiences.map((exp, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                    whileHover={{
                      scale: 1.02,
                      boxShadow: "0 0 40px rgba(0, 255, 255, 0.4)"
                    }}
                    className="relative border-2 border-cyan-400 p-8"
                    style={{
                      clipPath: "polygon(30px 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%, 0 30px)",
                      boxShadow: "0 0 20px rgba(0, 255, 255, 0.2)"
                    }}
                  >
                    {/* Corner decorations */}
                    <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-green-400" />
                    <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-green-400" />

                    <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                      <div>
                        <h3 className="text-3xl font-bold text-green-400 uppercase tracking-wide mb-2">
                          {exp.role}
                        </h3>
                        <p className="text-cyan-400 font-mono text-lg">{exp.company}</p>
                      </div>
                      <motion.div
                        animate={{
                          boxShadow: [
                            "0 0 10px #00ff00",
                            "0 0 20px #00ff00",
                            "0 0 10px #00ff00",
                          ]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="px-4 py-2 border-2 border-green-400 text-green-400 font-mono text-sm uppercase"
                      >
                        {exp.period}
                      </motion.div>
                    </div>

                    <p className="text-gray-300 mb-6 leading-relaxed font-mono text-sm">
                      {exp.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((skill, idx) => (
                        <motion.span
                          key={idx}
                          whileHover={{ scale: 1.1, y: -2 }}
                          className="px-3 py-1 bg-cyan-400/10 border border-cyan-400/50 text-cyan-400 text-xs font-mono uppercase"
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>

                    {/* Animated indicator */}
                    <motion.div
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute top-4 right-4 w-3 h-3 bg-green-400 rounded-full"
                      style={{ boxShadow: "0 0 10px #00ff00" }}
                    />
                  </motion.div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500">No experience added yet</p>
            )}
          </div>
        </section>
      )}


      {/* Certifications Section - Cyberpunk Style */}
      {userData.certifications && userData.certifications.length > 0 && (
        <section id="certifications" className="py-32 px-6 relative border-t-2 border-cyan-400/30 overflow-hidden">
          {/* Matrix rain effect */}
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ y: ["-100%", "100%"] }}
                transition={{
                  duration: Math.random() * 4 + 3,
                  repeat: Infinity,
                  ease: "linear",
                  delay: Math.random() * 3
                }}
                className="absolute w-px bg-gradient-to-b from-transparent via-green-400 to-transparent h-full"
                style={{ left: `${Math.random() * 100}%` }}
              />
            ))}
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-wider">
                <span className="text-cyan-400">//</span> Certifications <span className="text-green-400">Database</span>
              </h2>
              <motion.p
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-cyan-400 font-mono text-sm uppercase tracking-wider mt-4"
              >
          // Credentials Verified
              </motion.p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {userData.certifications.slice(0, 6).map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{
                    y: -10,
                    boxShadow: "0 0 50px rgba(0, 255, 255, 0.6)"
                  }}
                  className="group relative border-2 border-cyan-400 p-6 overflow-hidden"
                  style={{
                    clipPath: "polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)",
                    boxShadow: "0 0 20px rgba(0, 255, 255, 0.2)"
                  }}
                >
                  {/* Scan line effect on hover */}
                  <motion.div
                    animate={{ y: ["-100%", "200%"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent opacity-0 group-hover:opacity-100"
                  />

                  {/* Corner decorations */}
                  <div className="absolute top-0 left-0 w-10 h-10 border-t-4 border-l-4 border-green-400" />
                  <div className="absolute bottom-0 right-0 w-10 h-10 border-b-4 border-r-4 border-green-400" />

                  {/* Status indicator */}
                  <motion.div
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                    className="absolute top-4 right-4 w-3 h-3 bg-green-400 rounded-full"
                    style={{ boxShadow: "0 0 10px #00ff00" }}
                  />

                  <div className="relative z-10 flex flex-col h-full">
                    {/* Certificate Icon with rotation */}
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.2, type: "spring", stiffness: 200 }}
                      className="mb-6"
                    >
                      <div className="w-20 h-20 border-2 border-cyan-400 bg-black flex items-center justify-center relative"
                        style={{
                          clipPath: "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)",
                          boxShadow: "0 0 20px rgba(0, 255, 255, 0.3)"
                        }}
                      >
                        <motion.span
                          animate={{
                            rotate: [0, 360],
                            textShadow: [
                              "0 0 10px #00ff00",
                              "0 0 20px #00ff00, 0 0 30px #00ffff",
                              "0 0 10px #00ff00"
                            ]
                          }}
                          transition={{ rotate: { duration: 20, repeat: Infinity, ease: "linear" }, textShadow: { duration: 2, repeat: Infinity } }}
                          className="text-4xl"
                        >
                          🏆
                        </motion.span>
                      </div>
                    </motion.div>

                    {/* Title with glitch effect on hover */}
                    <motion.h3
                      whileHover={{
                        textShadow: [
                          "2px 2px 0 #00ffff, -2px -2px 0 #00ff00",
                          "-2px 2px 0 #00ffff, 2px -2px 0 #00ff00",
                          "2px 2px 0 #00ffff, -2px -2px 0 #00ff00"
                        ]
                      }}
                      transition={{ duration: 0.3 }}
                      className="text-xl font-bold text-cyan-400 mb-4 uppercase tracking-wide leading-tight"
                    >
                      {cert.title}
                    </motion.h3>

                    {/* Issue Date Badge */}
                    <div className="mb-4">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="inline-flex items-center gap-2 px-3 py-1.5 border-2 border-green-400/50 text-green-400 text-xs font-mono uppercase"
                        style={{
                          clipPath: "polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)"
                        }}
                      >
                        <Terminal size={12} />
                        {cert.issueDate}
                      </motion.div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-400 text-sm leading-relaxed flex-grow font-mono mb-4">
                      {cert.description}
                    </p>

                    {/* Bottom accent line with animation */}
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.5, duration: 0.8 }}
                      className="h-1 bg-gradient-to-r from-cyan-400 via-green-400 to-cyan-400 relative"
                    >
                      <motion.div
                        animate={{ x: ["-100%", "200%"] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 w-1/3 bg-white/50 blur-sm"
                      />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* View More Button */}
            {userData.certifications.length > 6 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mt-16"
              >
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 0 40px #00ff00" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowAllCertificates(true)}
                  className="px-10 py-5 bg-gradient-to-r from-cyan-500 to-green-500 text-black font-bold uppercase tracking-[0.2em] text-lg flex items-center gap-3 mx-auto"
                  style={{ clipPath: "polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)" }}
                >
                  <Activity size={24} />
                  Load All {userData.certifications.length} Certs
                </motion.button>
              </motion.div>
            )}

            {/* Total Count Display */}
            {userData.certifications.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="mt-16 flex justify-center"
              >
                <div className="relative border-2 border-cyan-400 px-12 py-6"
                  style={{
                    clipPath: "polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)",
                    boxShadow: "0 0 30px rgba(0, 255, 255, 0.3), inset 0 0 30px rgba(0, 255, 255, 0.05)"
                  }}
                >
                  {/* Corner accents */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-green-400" />
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-green-400" />

                  <div className="flex items-center gap-8">
                    <motion.div
                      animate={{
                        rotate: [0, 360],
                        scale: [1, 1.2, 1]
                      }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                      className="text-5xl"
                      style={{ filter: "drop-shadow(0 0 10px currentColor)" }}
                    >
                      ⚡
                    </motion.div>
                    <div>
                      <motion.p
                        animate={{
                          textShadow: [
                            "0 0 10px #00ffff",
                            "0 0 20px #00ffff, 0 0 30px #00ff00",
                            "0 0 10px #00ffff"
                          ]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-green-400 to-cyan-400"
                      >
                        {userData.certifications.length}
                      </motion.p>
                      <p className="text-cyan-400 text-sm font-mono uppercase tracking-wider mt-1">
                        Certifications Loaded
                      </p>
                    </div>
                  </div>

                  {/* Pulsing indicator */}
                  <motion.div
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute top-4 right-4 w-2 h-2 bg-green-400 rounded-full"
                    style={{ boxShadow: "0 0 10px #00ff00" }}
                  />
                </div>
              </motion.div>
            )}
          </div>

          {/* Modal for All Certifications */}
          <AnimatePresence>
            {showAllCertificates && (
              <>
                {/* Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setShowAllCertificates(false)}
                  className="fixed inset-0 bg-black/95 backdrop-blur-xl z-50 flex items-center justify-center p-4"
                >
                  {/* Modal Content */}
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0, rotateX: -90 }}
                    animate={{ scale: 1, opacity: 1, rotateX: 0 }}
                    exit={{ scale: 0.8, opacity: 0, rotateX: 90 }}
                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-black border-2 border-cyan-400 max-w-7xl w-full max-h-[90vh] overflow-hidden relative"
                    style={{
                      clipPath: "polygon(40px 0, 100% 0, 100% calc(100% - 40px), calc(100% - 40px) 100%, 0 100%, 0 40px)",
                      boxShadow: "0 0 60px rgba(0, 255, 255, 0.5), inset 0 0 60px rgba(0, 255, 255, 0.1)"
                    }}
                  >
                    {/* Corner decorations */}
                    <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-green-400 z-10" />
                    <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-green-400 z-10" />

                    {/* Modal Header */}
                    <div className="sticky top-0 z-20 bg-black border-b-2 border-cyan-400/30 p-8 flex justify-between items-center">
                      <div>
                        <h3 className="text-4xl font-bold uppercase tracking-wider">
                          <span className="text-cyan-400">//</span> All <span className="text-green-400">Certifications</span>
                        </h3>
                        <motion.p
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="text-cyan-400 font-mono text-sm uppercase tracking-wider mt-2"
                        >
                          {userData.certifications.length} Records Found
                        </motion.p>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1, rotate: 90, boxShadow: "0 0 20px #00ffff" }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setShowAllCertificates(false)}
                        className="w-14 h-14 border-2 border-cyan-400 flex items-center justify-center text-cyan-400 hover:text-green-400 transition-all"
                        style={{
                          clipPath: "polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)"
                        }}
                      >
                        <X size={28} />
                      </motion.button>
                    </div>

                    {/* Modal Body - Scrollable */}
                    <div className="p-8 overflow-y-auto max-h-[calc(90vh-140px)]">
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {userData.certifications.map((cert, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{
                              y: -5,
                              boxShadow: "0 0 30px rgba(0, 255, 255, 0.5)"
                            }}
                            className="group relative border-2 border-cyan-400/50 p-6"
                            style={{
                              clipPath: "polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)",
                              boxShadow: "0 0 15px rgba(0, 255, 255, 0.2)"
                            }}
                          >
                            {/* Scan line */}
                            <motion.div
                              animate={{ y: ["-100%", "200%"] }}
                              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                              className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent opacity-0 group-hover:opacity-100"
                            />

                            {/* Status */}
                            <motion.div
                              animate={{ opacity: [0.3, 1, 0.3] }}
                              transition={{ duration: 2, repeat: Infinity }}
                              className="absolute top-3 right-3 w-2 h-2 bg-green-400 rounded-full"
                              style={{ boxShadow: "0 0 10px #00ff00" }}
                            />

                            <div className="relative z-10">
                              {/* Icon */}
                              <div className="mb-4">
                                <div className="w-16 h-16 border-2 border-cyan-400/50 flex items-center justify-center text-3xl"
                                  style={{
                                    clipPath: "polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)"
                                  }}
                                >
                                  🎓
                                </div>
                              </div>

                              {/* Title */}
                              <h4 className="text-lg font-bold text-cyan-400 mb-3 uppercase tracking-wide leading-tight">
                                {cert.title}
                              </h4>

                              {/* Date */}
                              <div className="mb-3">
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 border border-green-400/50 text-green-400 text-xs font-mono">
                                  {cert.issueDate}
                                </span>
                              </div>

                              {/* Description */}
                              <p className="text-gray-400 text-xs leading-relaxed font-mono mb-3">
                                {cert.description}
                              </p>

                              {/* Bottom line */}
                              <div className="h-0.5 bg-gradient-to-r from-cyan-400 via-green-400 to-transparent" />
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



      {/* Projects Section */}
      <section id="projects" className="py-32 px-6 relative border-t-2 border-cyan-400/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-wider">
              <span className="text-cyan-400">//</span> Featured <span className="text-green-400">Projects</span>
            </h2>
          </motion.div>

          {userData.projects.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {userData.projects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{
                    y: -10,
                    boxShadow: "0 0 40px rgba(0, 255, 255, 0.5)"
                  }}
                  className="group relative border-2 border-cyan-400 overflow-hidden"
                  style={{
                    clipPath: "polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)",
                    boxShadow: "0 0 20px rgba(0, 255, 255, 0.2)"
                  }}
                >
                  {/* Project Image */}
                  <div className="relative h-64 overflow-hidden">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-cyan-900/30 to-green-900/30 flex items-center justify-center">
                        <Code size={80} className="text-cyan-400/50" />
                      </div>
                    )}

                    {/* Scan line effect */}
                    <motion.div
                      animate={{ y: ["-100%", "200%"] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/30 to-transparent"
                    />

                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                      {project.links.live && (
                        <motion.a
                          href={project.links.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1, boxShadow: "0 0 20px #00ff00" }}
                          className="px-4 py-2 bg-green-400 text-black font-bold uppercase text-sm"
                        >
                          Live
                        </motion.a>
                      )}
                      {project.links.github && (
                        <motion.a
                          href={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1, boxShadow: "0 0 20px #00ffff" }}
                          className="px-4 py-2 border-2 border-cyan-400 text-cyan-400 font-bold uppercase text-sm"
                        >
                          Code
                        </motion.a>
                      )}
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="p-6 bg-black relative">
                    <motion.div
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute top-4 right-4 w-2 h-2 bg-green-400 rounded-full"
                      style={{ boxShadow: "0 0 10px #00ff00" }}
                    />

                    <h3 className="text-2xl font-bold text-cyan-400 mb-3 uppercase tracking-wide">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2 font-mono">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags.slice(0, 3).map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-cyan-400/10 border border-cyan-400/50 text-cyan-400 text-xs font-mono uppercase"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No projects added yet</p>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 relative border-t-2 border-cyan-400/30">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-wider">
              <span className="text-cyan-400">//</span> Initialize <span className="text-green-400">Contact</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative border-2 border-cyan-400 p-8 md:p-12"
            style={{
              clipPath: "polygon(40px 0, 100% 0, 100% calc(100% - 40px), calc(100% - 40px) 100%, 0 100%, 0 40px)",
              boxShadow: "0 0 40px rgba(0, 255, 255, 0.3), inset 0 0 40px rgba(0, 255, 255, 0.05)"
            }}
          >
            {/* Corner decorations */}
            <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-green-400" />
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-green-400" />

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    placeholder="NAME"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-6 py-4 bg-black border-2 border-cyan-400/50 text-cyan-400 font-mono uppercase focus:border-green-400 focus:outline-none transition-all placeholder-cyan-400/30"
                    style={{
                      clipPath: "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)",
                      boxShadow: "inset 0 0 20px rgba(0, 255, 255, 0.1)"
                    }}
                    required
                  />
                </div>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    placeholder="EMAIL"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-6 py-4 bg-black border-2 border-cyan-400/50 text-cyan-400 font-mono uppercase focus:border-green-400 focus:outline-none transition-all placeholder-cyan-400/30"
                    style={{
                      clipPath: "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)",
                      boxShadow: "inset 0 0 20px rgba(0, 255, 255, 0.1)"
                    }}
                    required
                  />
                </div>
              </div>

              <div className="relative">
                <textarea
                  name="message"
                  placeholder="MESSAGE"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full px-6 py-4 bg-black border-2 border-cyan-400/50 text-cyan-400 font-mono uppercase focus:border-green-400 focus:outline-none transition-all placeholder-cyan-400/30 resize-none"
                  style={{
                    clipPath: "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)",
                    boxShadow: "inset 0 0 20px rgba(0, 255, 255, 0.1)"
                  }}
                  required
                />
              </div>

              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 40px rgba(0, 255, 0, 0.8)"
                }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={submitted}
                className="w-full px-8 py-5 bg-gradient-to-r from-cyan-500 to-green-500 text-black font-bold uppercase tracking-[0.2em] text-lg disabled:opacity-50 flex items-center justify-center gap-3"
                style={{ clipPath: "polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)" }}
              >
                {submitted ? (
                  <>
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      ⚡
                    </motion.span>
                    Message Sent
                  </>
                ) : (
                  <>
                    <Terminal size={24} />
                    Execute Send
                  </>
                )}
              </motion.button>
            </form>

            <div className="mt-12 pt-12 border-t-2 border-cyan-400/30">
              <h3 className="text-center text-2xl font-bold text-green-400 uppercase tracking-wider mb-8">
                Connect // Networks
              </h3>
              <div className="flex justify-center gap-4">
                {userData.socialLinks.map((social, index) => (
                  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{
                        y: -5,
                        scale: 1.1,
                        boxShadow: "0 0 30px currentColor",
                        borderColor: "currentColor"
                      }}
                      className="w-14 h-14 border-2 border-cyan-400 flex items-center justify-center text-2xl text-cyan-400 hover:text-green-400 transition-all"
                      style={{
                        clipPath: "polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)",
                        boxShadow: "0 0 15px rgba(0, 255, 255, 0.3)"
                      }}
                    >
                      {social.icon}
                    </motion.a>

                    <p>{social.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t-2 border-cyan-400/30 relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <motion.p
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-cyan-400 font-mono text-sm uppercase tracking-wider"
            >
              © {currentYear} {userName} // All Rights Reserved
            </motion.p>
            <div className="flex gap-8 text-sm text-cyan-400 font-mono uppercase">
              <Link href="#" className="hover:text-green-400 transition-colors">
                Privacy
              </Link>
              <Link href="#" className="hover:text-green-400 transition-colors">
                Terms
              </Link>
            </div>
          </div>

          {/* System status */}
          <motion.div
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mt-8 flex items-center justify-center gap-2 text-green-400 text-xs font-mono"
          >
            <div className="w-2 h-2 bg-green-400 rounded-full"
              style={{ boxShadow: "0 0 10px #00ff00" }} />
            SYSTEM ONLINE
          </motion.div>
        </div>
      </footer>
    </div>
  )
}
