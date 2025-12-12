"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import {
  Menu,
  X,
  Github,
  Mail,
  Linkedin,
  Twitter,
  ExternalLink,
  ArrowRight,
  Send,
  Code,
  Target,
  Award,
  Users,
  Briefcase,
  Sparkles,
  Zap,
  Layers,
  Box,
  Cpu,
  Database,
  Globe,
  Palette,
} from "lucide-react"
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useSpring,
  useMotionValue,
} from "framer-motion"
import type React from "react"
import { useRouter } from "next/navigation"
import emailjs from "@emailjs/browser"
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
  const [cursorVariant, setCursorVariant] = useState("default")

  const router = useRouter()
  const params = useParams()
  const { scrollYProgress } = useScroll()
  const scaleProgress = useTransform(scrollYProgress, [0, 1], [0, 1])

  // Magnetic cursor effect
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const springConfig = { damping: 25, stiffness: 700 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  const [userName, setUserName] = useState("Portfolio")
  const [userEmail, setuserEmail] = useState("")
  const API_BASE = `${process.env.NEXT_PUBLIC_API_URL}`

  const [submitted, setSubmitted] = useState(false);
  const [showAllCertificates, setShowAllCertificates] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  // Custom cursor tracking
  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16)
      cursorY.set(e.clientY - 16)
    }
    window.addEventListener("mousemove", moveCursor)
    return () => window.removeEventListener("mousemove", moveCursor)
  }, [cursorX, cursorY])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const storedUser = localStorage.getItem("user")
      if (!storedUser) {
        alert("Portfolio owner information not found")
        return
      }

      const userData = JSON.parse(storedUser)
      const portfolioOwnerEmail = userData.email

      const templateParams = {
        to_email: portfolioOwnerEmail,
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
      }

      await emailjs.send(
        "service_girqhvt",
        "template_u847pee",
        templateParams,
        "O8RoSh1QrCmKJeJn7",
      )

      setSubmitted(true)
      setTimeout(() => {
        setSubmitted(false)
        setFormData({ name: "", email: "", message: "" })
      }, 3000)
    } catch (error) {
      console.error("Error sending email:", error)
      alert("Failed to send message. Please try again.")
    }
  }

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
        setUserName(data.userName || data.username || '')
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
    { label: "HOME", href: "#home" },
    { label: "ABOUT", href: "#about" },
    { label: "WORK", href: "#projects" },
    { label: "Certifications", href: "#certifications" },
    { label: "SERVICES", href: "#skills" },
    { label: "CONTACT", href: "#contact" },
    // { label: "DASHBOARD", href: "/Components/DashBoard" },
  ]

  const currentYear = new Date().getFullYear()

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
        {/* Animated grid background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
          <motion.div
            animate={{
              background: [
                "radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3), transparent 50%)",
                "radial-gradient(circle at 80% 50%, rgba(236, 72, 153, 0.3), transparent 50%)",
                "radial-gradient(circle at 50% 80%, rgba(59, 130, 246, 0.3), transparent 50%)",
                "radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3), transparent 50%)",
              ],
            }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute inset-0"
          />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center relative z-10"
        >
          <motion.div className="relative w-32 h-32 mx-auto mb-8">
            {/* Rotating rings */}
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ rotate: 360 }}
                transition={{
                  duration: 3 - i * 0.5,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute inset-0 border-2 rounded-full"
                style={{
                  borderColor: i === 0 ? "#3b82f6" : i === 1 ? "#8b5cf6" : "#ec4899",
                  borderTopColor: "transparent",
                  scale: 1 - i * 0.2,
                }}
              />
            ))}
            <div className="absolute inset-0 flex items-center justify-center">
              <Code className="w-12 h-12 text-blue-500" />
            </div>
          </motion.div>
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-2">
              Loading Experience
            </h2>
            <div className="flex items-center justify-center space-x-2">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                  className="w-2 h-2 bg-blue-500 rounded-full"
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    )
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <X className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <p className="text-red-500 text-xl md:text-2xl font-bold">
            Failed to load portfolio
          </p>
        </motion.div>
      </div>
    )
  }

  const cursorVariants = {
    default: {
      width: 32,
      height: 32,
      backgroundColor: "rgba(59, 130, 246, 0.5)",
      border: "2px solid rgba(59, 130, 246, 1)",
    },
    hover: {
      width: 64,
      height: 64,
      backgroundColor: "rgba(139, 92, 246, 0.3)",
      border: "2px solid rgba(139, 92, 246, 1)",
    },
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Custom cursor */}
      <motion.div
        className="fixed top-0 left-0 z-50 pointer-events-none rounded-full mix-blend-difference hidden lg:block"
        variants={cursorVariants}
        animate={cursorVariant}
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />

      {/* Animated background grid */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      {/* Progress bar with gradient */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transform origin-left z-50"
        style={{ scaleX: scaleProgress }}
      />

      {/* Futuristic Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed w-full z-40 transition-all duration-500 ${scrolled
            ? "bg-black/60 backdrop-blur-2xl border-b border-white/5"
            : "bg-transparent"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            {/* Logo with 3D effect */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onHoverStart={() => setCursorVariant("hover")}
              onHoverEnd={() => setCursorVariant("default")}
              className="relative"
            >
              <Link href="#home" className="flex items-center space-x-3">
                <motion.div
                  animate={{
                    rotateY: [0, 360],
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="relative"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur-xl opacity-60" />
                  <div className="relative bg-gradient-to-br from-blue-500 to-purple-500 p-2 rounded-xl">
                    <Code className="w-6 h-6 text-white" />
                  </div>
                </motion.div>
                <span className="text-xl font-black tracking-tight">
                  <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    {userName}
                  </span>
                </span>
              </Link>
            </motion.div>

            {/* Desktop Nav - Futuristic style */}
            <div className="hidden md:flex items-center space-x-2">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onHoverStart={() => setCursorVariant("hover")}
                  onHoverEnd={() => setCursorVariant("default")}
                >
                  <Link
                    href={link.href}
                    className="relative px-4 py-2 text-sm font-semibold text-gray-400 hover:text-white transition-colors group"
                  >
                    <span className="relative z-10">{link.label}</span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg opacity-0 group-hover:opacity-100"
                      layoutId="navHover"
                    />
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 to-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"
                    />
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Mobile menu button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 backdrop-blur-sm transition-all"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
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
              className="md:hidden bg-black/95 backdrop-blur-2xl border-t border-white/5"
            >
              <div className="px-4 py-6 space-y-2">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-all border border-transparent hover:border-white/10"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section - 3D & Holographic */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
      >
        {/* Animated gradient orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
            }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute top-1/4 -left-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, -90, 0],
            }}
            transition={{ duration: 25, repeat: Infinity }}
            className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              x: [0, 100, 0],
            }}
            transition={{ duration: 15, repeat: Infinity }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center space-y-8"
          >
            {/* Floating badge */}
            <motion.div
              variants={fadeInUp}
              onHoverStart={() => setCursorVariant("hover")}
              onHoverEnd={() => setCursorVariant("default")}
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-4 h-4 text-blue-400" />
                </motion.div>
                <span className="text-sm font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  AVAILABLE FOR NEW PROJECTS
                </span>
              </motion.div>
            </motion.div>

            {/* Main heading with 3D effect */}
            <motion.div variants={fadeInUp}>
              <motion.h1
                className="text-6xl md:text-8xl lg:text-9xl font-black leading-none mb-6"
                style={{ textShadow: "0 0 80px rgba(59, 130, 246, 0.5)" }}
              >
                <motion.span
                  className="block text-white"
                  animate={{
                    textShadow: [
                      "0 0 20px rgba(59, 130, 246, 0.5)",
                      "0 0 60px rgba(139, 92, 246, 0.5)",
                      "0 0 20px rgba(59, 130, 246, 0.5)",
                    ],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  {userData.hero.title}
                </motion.span>
                <motion.span
                  className="block mt-4"
                  style={{
                    background: "linear-gradient(to right, #3b82f6, #8b5cf6, #ec4899, #3b82f6)",
                    backgroundSize: "200% auto",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                >
                  {userData.hero.highlightText}
                </motion.span>
              </motion.h1>
            </motion.div>

            {/* Subtitle with glitch effect */}
            <motion.p
              variants={fadeInUp}
              className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto font-light tracking-wide"
            >
              {userData.hero.subtitle}
            </motion.p>

            {/* Futuristic CTA buttons */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8"
            >
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onHoverStart={() => setCursorVariant("hover")}
                onHoverEnd={() => setCursorVariant("default")}
                className="group relative px-8 py-4 overflow-hidden rounded-full"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500"
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <div className="absolute inset-[2px] bg-black rounded-full" />
                <span className="relative z-10 flex items-center space-x-2 font-bold text-white">
                  <span>{userData.hero.primaryButtonText}</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </span>
              </motion.a>

              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onHoverStart={() => setCursorVariant("hover")}
                onHoverEnd={() => setCursorVariant("default")}
                className="group relative px-8 py-4 overflow-hidden rounded-full border border-white/20 bg-white/5 backdrop-blur-xl font-bold hover:border-white/40 transition-all"
              >
                {userData.hero.secondaryButtonText}
              </motion.a>
            </motion.div>

            {/* Floating social proof */}
            <motion.div
              variants={fadeInUp}
              className="pt-16 flex items-center justify-center space-x-12"
            >
              {[
                { value: userData.aboutMe.stats.projectsCompleted, label: "Projects" },
                { value: userData.aboutMe.stats.yearsExperience, label: "Years" },
                { value: userData.aboutMe.stats.happyClients, label: "Clients" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + i * 0.2 }}
                  className="text-center"
                >
                  <motion.div
                    className="text-4xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                  >
                    {stat.value}+
                  </motion.div>
                  <div className="text-sm text-gray-500 uppercase tracking-widest mt-1">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-2 bg-white rounded-full"
            />
          </div>
        </motion.div>
      </section>

      {/* Bento Grid About Section */}
      <section id="about" className="relative py-32 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {/* Section header */}
            <motion.div variants={fadeInUp} className="text-center mb-20">
              <motion.div
                className="inline-block px-4 py-2 rounded-full border border-blue-500/20 bg-blue-500/10 mb-6"
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-sm font-bold text-blue-400 uppercase tracking-wider">
                  {userData.aboutMe.sectionTitle}
                </span>
              </motion.div>
              <h2 className="text-5xl md:text-7xl font-black mb-6">
                <span className="bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">
                  {userData.aboutMe.headline}
                </span>
              </h2>
            </motion.div>

            {/* Bento Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Large bio card */}
              <motion.div
                variants={scaleIn}
                whileHover={{ scale: 1.02, y: -5 }}
                onHoverStart={() => setCursorVariant("hover")}
                onHoverEnd={() => setCursorVariant("default")}
                className="lg:col-span-2 lg:row-span-2 relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative h-full p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl hover:border-white/20 transition-all">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold">About Me</h3>
                  </div>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    {userData.aboutMe.introduction}
                  </p>
                  <p className="text-gray-400 leading-relaxed">
                    {userData.aboutMe.description}
                  </p>

                  {/* Core values tags */}
                  <div className="mt-6 flex flex-wrap gap-2">
                    {userData.aboutMe.coreValues.map((value, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ scale: 1.1 }}
                        className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-gray-300 hover:border-blue-500/50 hover:text-blue-400 transition-all cursor-default"
                      >
                        {value}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Stats cards */}
              {[
                {
                  icon: Briefcase,
                  label: "Projects",
                  value: userData.aboutMe.stats.projectsCompleted,
                  gradient: "from-blue-500 to-cyan-500",
                },
                {
                  icon: Award,
                  label: "Experience",
                  value: userData.aboutMe.stats.yearsExperience,
                  gradient: "from-purple-500 to-pink-500",
                },
                {
                  icon: Users,
                  label: "Clients",
                  value: userData.aboutMe.stats.happyClients,
                  gradient: "from-pink-500 to-rose-500",
                },
                {
                  icon: Code,
                  label: "Skills",
                  value: userData.aboutMe.stats.techSkills,
                  gradient: "from-green-500 to-emerald-500",
                },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  variants={scaleIn}
                  whileHover={{ scale: 1.05, y: -10 }}
                  onHoverStart={() => setCursorVariant("hover")}
                  onHoverEnd={() => setCursorVariant("default")}
                  className="relative group"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-20 rounded-3xl blur-xl transition-opacity`} />
                  <div className="relative h-full p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl hover:border-white/20 transition-all">
                    <motion.div
                      className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${stat.gradient} mb-4`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <stat.icon className="w-6 h-6 text-white" />
                    </motion.div>
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: "spring", stiffness: 200, delay: i * 0.1 }}
                      className="text-5xl font-black bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-2"
                    >
                      {stat.value}+
                    </motion.div>
                    <div className="text-sm text-gray-400 uppercase tracking-wider font-semibold">
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services/Skills - Card Carousel Style */}
      <section id="skills" className="relative py-32 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-20">
              <motion.div
                className="inline-block px-4 py-2 rounded-full border border-purple-500/20 bg-purple-500/10 mb-6"
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-sm font-bold text-purple-400 uppercase tracking-wider">
                  EXPERTISE
                </span>
              </motion.div>
              <h2 className="text-5xl md:text-7xl font-black">
                <span className="bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">
                  What I Do Best
                </span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userData.skillCategories.map((category, index) => {
                const iconMap: Record<string, React.ElementType> = {
                  frontend: Palette,
                  backend: Database,
                  cloud: Globe,
                  tools: Cpu,
                  default: Layers,
                }
                const IconComponent = iconMap[category.icon.toLowerCase()] || iconMap.default

                return (
                  <motion.div
                    key={index}
                    variants={scaleIn}
                    whileHover={{ y: -10, scale: 1.02 }}
                    onHoverStart={() => setCursorVariant("hover")}
                    onHoverEnd={() => setCursorVariant("default")}
                    className="group relative"
                  >
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${category.color} blur-2xl opacity-0 group-hover:opacity-30 transition-opacity rounded-3xl`}
                    />
                    <div className="relative h-full p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl hover:border-white/20 transition-all">
                      <motion.div
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                        className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${category.color} mb-6 shadow-2xl`}
                      >
                        <IconComponent className="w-8 h-8 text-white" />
                      </motion.div>

                      <h3 className="text-2xl font-bold mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all">
                        {category.category}
                      </h3>

                      <div className="flex flex-wrap gap-2">
                        {category.skills.map((skill, skillIndex) => (
                          <motion.span
                            key={skillIndex}
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: skillIndex * 0.05 }}
                            whileHover={{ scale: 1.15, y: -2 }}
                            className="px-3 py-1.5 text-sm rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:border-blue-500/50 hover:text-blue-400 hover:bg-white/10 transition-all cursor-default font-medium"
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Experience Timeline - Futuristic */}
      {userData.experiences && userData.experiences.length > 0 && (
        <section className="relative py-32 overflow-hidden">
          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp} className="text-center mb-20">
                <motion.div
                  className="inline-block px-4 py-2 rounded-full border border-green-500/20 bg-green-500/10 mb-6"
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="text-sm font-bold text-green-400 uppercase tracking-wider">
                    JOURNEY
                  </span>
                </motion.div>
                <h2 className="text-5xl md:text-7xl font-black">
                  <span className="bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">
                    Professional Path
                  </span>
                </h2>
              </motion.div>

              <div className="relative">
                {/* Timeline line with gradient */}
                <div className="absolute left-8 top-0 bottom-0 w-[2px] bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500" />

                <div className="space-y-16">
                  {userData.experiences.map((exp, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.2 }}
                      className="relative pl-24"
                    >
                      {/* Timeline dot with pulse */}
                      <motion.div
                        whileHover={{ scale: 1.5 }}
                        onHoverStart={() => setCursorVariant("hover")}
                        onHoverEnd={() => setCursorVariant("default")}
                        className="absolute left-[26px] top-8 w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 border-4 border-black"
                      >
                        <motion.div
                          animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="absolute inset-0 rounded-full bg-blue-500"
                        />
                      </motion.div>

                      <motion.div
                        whileHover={{ x: 10, scale: 1.02 }}
                        onHoverStart={() => setCursorVariant("hover")}
                        onHoverEnd={() => setCursorVariant("default")}
                        className="group relative"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="relative p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl hover:border-white/20 transition-all">
                          <div className="flex flex-wrap items-start justify-between mb-6 gap-4">
                            <div className="space-y-2">
                              <h3 className="text-3xl font-bold group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all">
                                {exp.role}
                              </h3>
                              <p className="text-xl text-purple-400 font-semibold">
                                {exp.company}
                              </p>
                            </div>
                            <motion.span
                              whileHover={{ scale: 1.1 }}
                              className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 text-blue-400 text-sm font-bold"
                            >
                              {exp.period}
                            </motion.span>
                          </div>

                          <p className="text-gray-300 mb-6 leading-relaxed text-lg">
                            {exp.description}
                          </p>

                          <div className="flex flex-wrap gap-2">
                            {exp.skills.map((skill, skillIndex) => (
                              <motion.span
                                key={skillIndex}
                                initial={{ opacity: 0, scale: 0 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: skillIndex * 0.05 }}
                                whileHover={{ scale: 1.1, y: -2 }}
                                className="px-3 py-1.5 text-sm rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-300 font-medium"
                              >
                                {skill}
                              </motion.span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}


      {/* Certifications Section - Futuristic */}
      {userData.certifications && userData.certifications.length > 0 && (
        <section id="certifications" className="relative py-32 overflow-hidden">
          {/* Animated background orbs */}
          <div className="absolute inset-0">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 0],
              }}
              transition={{ duration: 20, repeat: Infinity }}
              className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl"
            />
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                rotate: [0, -180, 0],
              }}
              transition={{ duration: 25, repeat: Infinity }}
              className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl"
            />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {/* Section Header */}
              <motion.div variants={fadeInUp} className="text-center mb-20">
                <motion.div
                  className="inline-block px-4 py-2 rounded-full border border-yellow-500/20 bg-yellow-500/10 mb-6"
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="text-sm font-bold text-yellow-400 uppercase tracking-wider">
                    CERTIFICATIONS & ACHIEVEMENTS
                  </span>
                </motion.div>
                <h2 className="text-5xl md:text-7xl font-black">
                  <span className="bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">
                    Credentials & Awards
                  </span>
                </h2>
              </motion.div>

              {/* Certificates Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userData.certifications.slice(0, 6).map((cert, index) => (
                  <motion.div
                    key={index}
                    variants={scaleIn}
                    whileHover={{ y: -10, scale: 1.02 }}
                    onHoverStart={() => setCursorVariant("hover")}
                    onHoverEnd={() => setCursorVariant("default")}
                    onClick={() => setShowAllCertificates(true)}
                    className="group relative cursor-pointer"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="relative h-full p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl hover:border-white/20 transition-all">
                      {/* Animated icon */}
                      <motion.div
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-500 mb-6 shadow-2xl"
                      >
                        <Award className="w-8 h-8 text-white" />
                      </motion.div>

                      <h3 className="text-2xl font-bold mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-yellow-400 group-hover:to-orange-400 group-hover:bg-clip-text transition-all">
                        {cert.title}
                      </h3>

                      <p className="text-gray-400 mb-6 leading-relaxed line-clamp-3">
                        {cert.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="w-2 h-2 rounded-full bg-yellow-500"
                          />
                          <span className="text-sm text-gray-500 font-medium">
                            {cert.issueDate}
                          </span>
                        </div>
                        <motion.div
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                          whileHover={{ scale: 1.2 }}
                        >
                          <ExternalLink className="w-5 h-5 text-yellow-500" />
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* View All Button */}
              {userData.certifications.length > 6 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-center mt-12"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onHoverStart={() => setCursorVariant("hover")}
                    onHoverEnd={() => setCursorVariant("default")}
                    onClick={() => setShowAllCertificates(true)}
                    className="group relative px-8 py-4 overflow-hidden rounded-full"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-orange-500"
                      animate={{
                        scale: [1, 1.2, 1],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <div className="absolute inset-[2px] bg-black rounded-full" />
                    <span className="relative z-10 flex items-center space-x-2 font-bold text-white">
                      <span>View All {userData.certifications.length} Certifications</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                    </span>
                  </motion.button>
                </motion.div>
              )}

              {/* Modal for All Certifications */}
              <AnimatePresence>
                {showAllCertificates && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setShowAllCertificates(false)}
                    className="fixed inset-0 bg-black/95 backdrop-blur-2xl z-50 flex items-center justify-center p-4 overflow-y-auto"
                  >
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0, y: 50 }}
                      animate={{ scale: 1, opacity: 1, y: 0 }}
                      exit={{ scale: 0.9, opacity: 0, y: 50 }}
                      transition={{ type: "spring", damping: 25, stiffness: 300 }}
                      onClick={(e) => e.stopPropagation()}
                      className="relative w-full max-w-7xl my-8"
                    >
                      {/* Animated background gradients */}
                      <motion.div
                        animate={{
                          scale: [1, 1.2, 1],
                          rotate: [0, 180, 360],
                        }}
                        transition={{ duration: 30, repeat: Infinity }}
                        className="absolute -top-20 -right-20 w-64 h-64 bg-yellow-500/30 rounded-full blur-3xl"
                      />
                      <motion.div
                        animate={{
                          scale: [1, 1.3, 1],
                          rotate: [0, -180, -360],
                        }}
                        transition={{ duration: 35, repeat: Infinity }}
                        className="absolute -bottom-20 -left-20 w-64 h-64 bg-orange-500/30 rounded-full blur-3xl"
                      />

                      {/* Modal Content */}
                      <div className="relative bg-black border border-white/10 rounded-[2rem] p-8 md:p-12 backdrop-blur-2xl">
                        {/* Modal Header */}
                        <div className="flex justify-between items-center mb-12 pb-6 border-b border-white/10">
                          <div>
                            <motion.div
                              className="inline-block px-4 py-2 rounded-full border border-yellow-500/20 bg-yellow-500/10 mb-4"
                              whileHover={{ scale: 1.05 }}
                            >
                              <span className="text-sm font-bold text-yellow-400 uppercase tracking-wider">
                                ALL CERTIFICATIONS
                              </span>
                            </motion.div>
                            <h3 className="text-4xl md:text-5xl font-black">
                              <span className="bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">
                                Complete Credentials
                              </span>
                            </h3>
                          </div>

                          <motion.button
                            whileHover={{ scale: 1.1, rotate: 90 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setShowAllCertificates(false)}
                            className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-red-500/20 hover:border-red-500/50 transition-all"
                          >
                            <X className="w-6 h-6 text-white" />
                          </motion.button>
                        </div>

                        {/* Scrollable Grid */}
                        <div className="max-h-[60vh] md:max-h-[65vh] overflow-y-auto pr-4 custom-scrollbar">
                          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {userData.certifications.map((cert, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                whileHover={{ y: -5, scale: 1.02 }}
                                onHoverStart={() => setCursorVariant("hover")}
                                onHoverEnd={() => setCursorVariant("default")}
                                className="group relative"
                              >
                                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />

                                <div className="relative p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-yellow-500/50 backdrop-blur-xl transition-all">
                                  <motion.div
                                    whileHover={{ rotate: 360 }}
                                    transition={{ duration: 0.6 }}
                                    className="inline-flex p-3 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 mb-4"
                                  >
                                    <Award className="w-6 h-6 text-white" />
                                  </motion.div>

                                  <h4 className="text-xl font-bold mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-yellow-400 group-hover:to-orange-400 group-hover:bg-clip-text transition-all">
                                    {cert.title}
                                  </h4>

                                  <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                                    {cert.description}
                                  </p>

                                  <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 rounded-full bg-yellow-500" />
                                    <span className="text-xs text-gray-500 font-medium">
                                      {cert.issueDate}
                                    </span>
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>
      )}


      {/* Projects - Modern Card Grid */}
      <section id="projects" className="relative py-32 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-20">
              <motion.div
                className="inline-block px-4 py-2 rounded-full border border-pink-500/20 bg-pink-500/10 mb-6"
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-sm font-bold text-pink-400 uppercase tracking-wider">
                  SHOWCASE
                </span>
              </motion.div>
              <h2 className="text-5xl md:text-7xl font-black">
                <span className="bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">
                  Featured Projects
                </span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {userData.projects.map((project, index) => (
                <motion.div
                  key={index}
                  variants={scaleIn}
                  whileHover={{ y: -15, scale: 1.02 }}
                  onHoverStart={() => setCursorVariant("hover")}
                  onHoverEnd={() => setCursorVariant("default")}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="relative rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl overflow-hidden hover:border-white/20 transition-all">
                    {/* Project image */}
                    <div className="relative h-64 overflow-hidden bg-gradient-to-br from-gray-900 to-black">
                      <motion.div
                        whileHover={{ scale: 1.15 }}
                        transition={{ duration: 0.6 }}
                        className="w-full h-full flex items-center justify-center"
                      >
                        {project.image ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Box className="w-20 h-20 text-gray-700" />
                        )}
                      </motion.div>

                      {/* Overlay on hover */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent flex items-center justify-center space-x-4"
                      >
                        {project.links.live && (
                          <motion.a
                            href={project.links.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.2, rotate: 5 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-4 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-all shadow-2xl"
                          >
                            <ExternalLink className="w-6 h-6 text-white" />
                          </motion.a>
                        )}
                        {project.links.github && (
                          <motion.a
                            href={project.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.2, rotate: -5 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-4 rounded-2xl bg-white/10 backdrop-blur-xl hover:bg-white/20 border border-white/20 transition-all shadow-2xl"
                          >
                            <Github className="w-6 h-6 text-white" />
                          </motion.a>
                        )}
                      </motion.div>
                    </div>

                    {/* Project info */}
                    <div className="p-6 space-y-4">
                      <h3 className="text-2xl font-bold group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all">
                        {project.title}
                      </h3>
                      <p className="text-gray-400 leading-relaxed line-clamp-2">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2 pt-2">
                        {project.tags.slice(0, 3).map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-3 py-1 text-xs rounded-lg bg-white/5 border border-white/10 text-gray-400 font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                        {project.tags.length > 3 && (
                          <span className="px-3 py-1 text-xs rounded-lg bg-white/5 border border-white/10 text-gray-400 font-medium">
                            +{project.tags.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section - Futuristic Form */}
      <section id="contact" className="relative py-32 overflow-hidden">
        {/* Animated background */}
        <motion.div
          animate={{
            background: [
              "radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.15), transparent 50%)",
              "radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.15), transparent 50%)",
              "radial-gradient(circle at 50% 50%, rgba(236, 72, 153, 0.15), transparent 50%)",
              "radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.15), transparent 50%)",
            ],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute inset-0"
        />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <motion.div
                className="inline-block px-4 py-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 mb-6"
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-sm font-bold text-cyan-400 uppercase tracking-wider">
                  GET IN TOUCH
                </span>
              </motion.div>
              <h2 className="text-5xl md:text-7xl font-black mb-6">
                <span className="bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">
                  Let&apos;s Create Together
                </span>
              </h2>
              <p className="text-xl text-gray-400">
                Have an exciting project? I&apos;d love to hear about it!
              </p>
            </motion.div>

            <motion.div variants={scaleIn} className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-[2rem] blur-2xl" />

              <div className="relative p-8 md:p-12 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-2xl">
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="text-center py-16"
                    >
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 200,
                          damping: 15,
                        }}
                        className="inline-flex p-8 rounded-3xl bg-gradient-to-r from-green-500 to-emerald-500 mb-6 shadow-2xl"
                      >
                        <Send className="w-16 h-16 text-white" />
                      </motion.div>
                      <h3 className="text-4xl font-black mb-4 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                        Message Sent Successfully!
                      </h3>
                      <p className="text-gray-400 text-lg">
                        I&apos;ll get back to you as soon as possible.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      className="space-y-6"
                    >
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label
                            htmlFor="name"
                            className="block text-sm font-bold text-gray-300 uppercase tracking-wider"
                          >
                            Your Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-white placeholder-gray-500 transition-all backdrop-blur-xl font-medium"
                            placeholder="John Doe"
                          />
                        </div>

                        <div className="space-y-2">
                          <label
                            htmlFor="email"
                            className="block text-sm font-bold text-gray-300 uppercase tracking-wider"
                          >
                            Your Email
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-white placeholder-gray-500 transition-all backdrop-blur-xl font-medium"
                            placeholder="john@example.com"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor="message"
                          className="block text-sm font-bold text-gray-300 uppercase tracking-wider"
                        >
                          Your Message
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows={6}
                          className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-white placeholder-gray-500 transition-all resize-none backdrop-blur-xl font-medium"
                          placeholder="Tell me about your project..."
                        />
                      </div>

                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onHoverStart={() => setCursorVariant("hover")}
                        onHoverEnd={() => setCursorVariant("default")}
                        className="group relative w-full py-5 rounded-2xl overflow-hidden font-bold text-lg"
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                          animate={{
                            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                          }}
                          transition={{ duration: 3, repeat: Infinity }}
                          style={{ backgroundSize: "200% 200%" }}
                        />
                        <span className="relative z-10 flex items-center justify-center space-x-2 text-white">
                          <span>Send Message</span>
                          <Send className="w-5 h-5 group-hover:translate-x-2 group-hover:-translate-y-1 transition-transform" />
                        </span>
                      </motion.button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={fadeInUp} className="mt-16">
              <div className="flex justify-center items-center space-x-6">
                {userData.socialLinks.map((social, index) => {
                  const iconMap: Record<string, React.ElementType> = {
                    github: Github,
                    linkedin: Linkedin,
                    twitter: Twitter,
                    mail: Mail,
                  }
                  const Icon = iconMap[social.icon.toLowerCase()] || ExternalLink

                  return (
                   <div style={{display : "flex" , justifyContent : "center" , alignItems : "center" , flexDirection : "column"}} >
                     <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      whileTap={{ scale: 0.9 }}
                      onHoverStart={() => setCursorVariant("hover")}
                      onHoverEnd={() => setCursorVariant("default")}
                      className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all backdrop-blur-xl group"
                    >
                      <Icon className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" />
                    </motion.a>

                    <p>{social.label}</p>
                   </div>
                  )
                })}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="flex items-center space-x-3"
            >
              <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500">
                <Code className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {userName}
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-gray-500 text-sm"
            >
              © {currentYear} All rights reserved. Crafted with{" "}
              <span className="text-pink-500">❤</span> using Next.js
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="flex items-center space-x-6"
            >
              <a
                href="#home"
                className="text-gray-500 hover:text-white transition-colors text-sm"
              >
                Privacy
              </a>
              <span className="text-gray-700">•</span>
              <a
                href="#home"
                className="text-gray-500 hover:text-white transition-colors text-sm"
              >
                Terms
              </a>
            </motion.div>
          </div>
        </div>
      </footer>

      {/* Scroll to top */}
      <AnimatePresence>
        {scrolled && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            onHoverStart={() => setCursorVariant("hover")}
            onHoverEnd={() => setCursorVariant("default")}
            className="fixed bottom-8 right-8 z-40 p-4 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 shadow-2xl"
          >
            <motion.div
              animate={{ y: [-2, 2, -2] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Zap className="w-6 h-6 text-white" />
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
