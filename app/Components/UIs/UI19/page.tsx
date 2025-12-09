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
  Heart,
  Coffee,
  Laptop,
  Server,
  Cloud,
  Palette,
  CheckCircle,
} from "lucide-react"
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useInView,
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

export default function VibrantPortfolio() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState(0)

  const router = useRouter()
  const params = useParams()
  const { scrollYProgress } = useScroll()
  const scaleProgress = useTransform(scrollYProgress, [0, 1], [0, 1])

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
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "WORK", href: "#projects" },
    { label: "Certifications", href: "#certifications" },
    { label: "Contact", href: "#contact" },
    { label: "Dashboard", href: "/Components/DashBoard" },
  ]

  const currentYear = new Date().getFullYear()

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  }

  const fadeInLeft = {
    hidden: { opacity: 0, x: -60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  }

  const fadeInRight = {
    hidden: { opacity: 0, x: 60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  }

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.85 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-coral-50 flex items-center justify-center relative overflow-hidden">
        {/* Animated shapes */}
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            rotate: { duration: 8, repeat: Infinity, ease: "linear" },
            scale: { duration: 2, repeat: Infinity },
          }}
          className="absolute top-1/4 left-1/4 w-32 h-32 bg-teal-400/20 rounded-full blur-2xl"
        />
        <motion.div
          animate={{
            rotate: -360,
            scale: [1, 1.3, 1],
          }}
          transition={{
            rotate: { duration: 10, repeat: Infinity, ease: "linear" },
            scale: { duration: 2.5, repeat: Infinity },
          }}
          className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-coral-400/20 rounded-full blur-2xl"
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center relative z-10"
        >
          <motion.div className="relative w-24 h-24 mx-auto mb-8">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 border-4 border-teal-500 rounded-2xl"
            />
            <motion.div
              animate={{
                scale: [1.2, 1, 1.2],
                rotate: [360, 180, 0],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-2 border-4 border-coral-500 rounded-2xl"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Code className="w-10 h-10 text-teal-600" />
            </div>
          </motion.div>
          <motion.h2
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-2xl font-black text-gray-800"
          >
            Loading Portfolio
          </motion.h2>
        </motion.div>
      </div>
    )
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-coral-50 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <X className="w-16 h-16 text-coral-500 mx-auto mb-4" />
          <p className="text-coral-600 text-xl md:text-2xl font-bold">
            Failed to load portfolio
          </p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-hidden">
      {/* Colorful progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 via-cyan-500 to-coral-500 transform origin-left z-50"
        style={{ scaleX: scaleProgress }}
      />

      {/* Modern Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed w-full z-40 transition-all duration-300 ${scrolled
          ? "bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-100"
          : "bg-transparent"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="#home" className="flex items-center space-x-3">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="w-10 h-10 bg-gradient-to-br from-teal-500 to-coral-500 rounded-xl flex items-center justify-center shadow-lg"
                >
                  <Code className="w-6 h-6 text-black" />
                </motion.div>
                <span className="text-xl text-black font-black bg-gradient-to-r from-teal-600 to-coral-600 bg-clip-text ">
                  {userName}
                </span>
              </Link>
            </motion.div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className="relative px-4 py-2 text-sm font-bold text-gray-600 hover:text-teal-600 transition-colors group"
                  >
                    {link.label}
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-teal-500 to-coral-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full"
                    />
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Mobile menu button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-xl bg-gradient-to-r from-teal-500 to-coral-500 text-white"
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
              className="md:hidden bg-white border-t border-gray-100"
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
                      className="block px-4 py-3 text-gray-700 hover:text-teal-600 hover:bg-teal-50 rounded-xl transition-all font-semibold"
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

      {/* Hero Section - Split Screen Design */}
      <section
        id="home"
        className="relative min-h-screen flex items-center overflow-hidden pt-20 bg-gradient-to-br from-purple-50 via-white to-orange-50"
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
            }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute -top-20 -left-20 w-96 h-96 bg-purple-200/40 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [90, 0, 90],
            }}
            transition={{ duration: 25, repeat: Infinity }}
            className="absolute -bottom-20 -right-20 w-96 h-96 bg-orange-200/40 rounded-full blur-3xl"
          />
          {/* Dot pattern overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(139,92,246,0.08)_1px,transparent_0)] bg-[size:40px_40px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Content */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="space-y-8 order-2 lg:order-1"
            >
              {/* Badge */}
              <motion.div variants={fadeInLeft}>
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="inline-flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-purple-100 to-orange-100 border-2 border-purple-200 rounded-full mb-6 shadow-lg shadow-purple-200/50"
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-2 h-2 bg-green-500 rounded-full shadow-lg shadow-green-500/50"
                  />
                  <span className="text-sm font-bold bg-gradient-to-r from-purple-700 to-orange-700 bg-clip-text ">
                    Available for freelance
                  </span>
                  <Heart className="w-4 h-4 text-orange-500" />
                </motion.div>
              </motion.div>

              {/* Heading */}
              <motion.div variants={fadeInLeft}>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight">
                  <span className="text-gray-900">{userData.hero.title}</span>
                  <br />
                  <motion.span
                    className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent"
                    animate={{
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }}
                    transition={{ duration: 5, repeat: Infinity }}
                    style={{ backgroundSize: "200% auto" }}
                  >
                    {userData.hero.highlightText}
                  </motion.span>
                </h1>
              </motion.div>

              {/* Subtitle */}
              <motion.p
                variants={fadeInLeft}
                className="text-xl text-gray-700 leading-relaxed max-w-xl font-medium"
              >
                {userData.hero.subtitle}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                variants={fadeInLeft}
                className="flex flex-wrap items-center gap-4 pt-4"
              >
                <motion.a
                  href="#projects"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-orange-600 text-white rounded-2xl font-bold shadow-xl shadow-purple-500/30 hover:shadow-2xl hover:shadow-orange-500/40 transition-all flex items-center space-x-2 overflow-hidden"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-orange-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                  <span className="relative z-10">{userData.hero.primaryButtonText}</span>
                  <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-2 transition-transform" />
                </motion.a>

                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 border-2 border-gray-900 text-gray-900 rounded-2xl font-bold hover:bg-gray-900 hover:text-white transition-all"
                >
                  {userData.hero.secondaryButtonText}
                </motion.a>
              </motion.div>

              {/* Quick Stats */}
              <motion.div
                variants={fadeInLeft}
                className="grid grid-cols-3 gap-6 pt-8"
              >
                {[
                  { value: userData.aboutMe.stats.projectsCompleted, label: "Projects", icon: Briefcase, color: "from-purple-500 to-purple-600" },
                  { value: userData.aboutMe.stats.yearsExperience, label: "Years Exp", icon: Award, color: "from-pink-500 to-pink-600" },
                  { value: userData.aboutMe.stats.happyClients, label: "Clients", icon: Users, color: "from-orange-500 to-orange-600" },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 1 + i * 0.2, type: "spring" }}
                    whileHover={{ y: -5, scale: 1.05 }}
                    className="relative group"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-20 rounded-2xl blur-xl transition-opacity`} />
                    <div className="relative bg-white border-2 border-gray-100 rounded-2xl p-4 text-center shadow-lg group-hover:shadow-xl group-hover:border-purple-200 transition-all">
                      <div className={`inline-flex p-2 rounded-xl bg-gradient-to-br ${stat.color} mb-2`}>
                        <stat.icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-3xl font-black text-gray-900 mb-1">
                        {stat.value}+
                      </div>
                      <div className="text-xs text-gray-600 font-semibold uppercase tracking-wider">
                        {stat.label}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Side - 3D Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 0.8 }}
              className="relative order-1 lg:order-2"
              style={{ perspective: "1000px" }}
            >
              <motion.div
                animate={{
                  y: [0, -20, 0],
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative"
              >
                {/* Glowing orbs */}
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -top-10 -right-10 w-40 h-40 bg-purple-300 rounded-full blur-3xl"
                />
                <motion.div
                  animate={{
                    scale: [1.2, 1, 1.2],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{ duration: 4, repeat: Infinity, delay: 2 }}
                  className="absolute -bottom-10 -left-10 w-40 h-40 bg-orange-300 rounded-full blur-3xl"
                />

                {/* Main 3D Card */}
                <motion.div
                  whileHover={{ rotateY: 5, rotateX: 5 }}
                  transition={{ duration: 0.3 }}
                  className="relative bg-gradient-to-br from-purple-200 via-pink-100 to-orange-200 p-[3px] rounded-3xl shadow-2xl"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div className="bg-white rounded-3xl p-8 border border-purple-100 shadow-xl">
                    {/* Card Header */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-3">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                          className="w-12 h-12 bg-gradient-to-br from-purple-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg"
                        >
                          <Code className="w-6 h-6 text-white" />
                        </motion.div>
                        <div>
                          <div className="font-bold text-gray-900 text-sm">Tech Stack</div>
                          <div className="text-xs text-gray-500 font-medium">
                            {userData.skillCategories.length} Categories
                          </div>
                        </div>
                      </div>
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-2 h-2 bg-green-500 rounded-full shadow-lg shadow-green-500/50"
                      />
                    </div>

                    {/* Skills Display - Shows top 3 categories with skill count */}
                    <div className="space-y-5">
                      {userData.skillCategories.slice(0, 3).map((category, i) => {
                        // Calculate a "level" based on number of skills (for visual representation)
                        const skillCount = category.skills.length;
                        const level = Math.min(95, 60 + skillCount * 5); // Dynamic level based on skills

                        return (
                          <motion.div
                            key={category.category}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1.5 + i * 0.2 }}
                            className="space-y-2"
                          >
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-bold text-gray-800">
                                {category.category}
                              </span>
                              <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 2 + i * 0.2 }}
                                className={`text-xs font-bold bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}
                              >
                                {category.skills.length} skills
                              </motion.span>
                            </div>
                            {/* <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden border border-gray-200 shadow-inner">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${level}%` }}
                                transition={{ delay: 1.5 + i * 0.2, duration: 1, ease: "easeOut" }}
                                className={`h-full bg-gradient-to-r ${category.color} rounded-full relative shadow-lg`}
                              >
                                <motion.div
                                  animate={{ x: ["-100%", "100%"] }}
                                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                                />
                              </motion.div>
                            </div> */}
                            {/* Show first 3 skills as tags */}
                            <div className="flex flex-wrap gap-1.5 pt-1">
                              {category.skills.slice(0, 3).map((skill, idx) => (
                                <span
                                  key={idx}
                                  className="px-2 py-0.5 bg-gradient-to-r from-purple-50 to-orange-50 border border-purple-100 text-gray-700 rounded-md text-xs font-medium"
                                >
                                  {skill}
                                </span>
                              ))}
                              {category.skills.length > 3 && (
                                <span className="px-2 py-0.5 bg-gray-100 text-gray-500 rounded-md text-xs font-medium">
                                  +{category.skills.length - 3}
                                </span>
                              )}
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>

                    {/* Bottom Badge */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 2.5 }}
                      className="mt-6 pt-6 border-t border-gray-200 flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-2">
                        <Coffee className="w-5 h-5 text-orange-500" />
                        <span className="text-sm text-gray-600 font-semibold">
                          {userData.skillCategories.reduce((acc, cat) => acc + cat.skills.length, 0)}+ Total Skills
                        </span>
                      </div>
                      <div className="flex space-x-1">
                        {userData.skillCategories.slice(0, 5).map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 3 + i * 0.1 }}
                            className="w-2 h-2 bg-gradient-to-r from-purple-500 to-orange-500 rounded-full shadow-sm"
                          />
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </motion.div>







              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer"
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <div className="w-6 h-10 border-2 border-purple-300 rounded-full flex items-start justify-center p-2 bg-white shadow-lg">
            <motion.div
              animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-2 bg-gradient-to-b from-purple-500 to-orange-500 rounded-full"
            />
          </div>
        </motion.div>
      </section>




      {/* About Section - Card Layout */}
      <section id="about" className="relative py-24 bg-gradient-to-br from-teal-50 to-coral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {/* Section Header */}
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <motion.span
                className="inline-block px-4 py-2 bg-white rounded-full text-sm font-bold text-teal-600 mb-4 shadow-md"
              >
                {userData.aboutMe.sectionTitle}
              </motion.span>
              <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6">
                {userData.aboutMe.headline}
              </h2>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main About Card */}
              <motion.div
                variants={scaleIn}
                whileHover={{ y: -10 }}
                className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-xl border-2 border-gray-100"
              >
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-coral-500 rounded-xl flex items-center justify-center">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">About Me</h3>
                </div>

                <p className="text-gray-700 text-lg leading-relaxed mb-4">
                  {userData.aboutMe.introduction}
                </p>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {userData.aboutMe.description}
                </p>

                {/* Core Values */}
                <div className="space-y-3">
                  <h4 className="font-bold text-gray-900">Core Values</h4>
                  <div className="flex flex-wrap gap-2">
                    {userData.aboutMe.coreValues.map((value, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ scale: 1.1, y: -2 }}
                        className="px-4 py-2 bg-gradient-to-r from-teal-100 to-coral-100 text-gray-800 rounded-full text-sm font-semibold cursor-default"
                      >
                        {value}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Stats Cards */}
              <div className="space-y-6">
                {[
                  {
                    icon: Briefcase,
                    label: "Projects",
                    value: userData.aboutMe.stats.projectsCompleted,
                    color: "from-teal-500 to-cyan-500",
                  },
                  {
                    icon: Award,
                    label: "Experience",
                    value: userData.aboutMe.stats.yearsExperience,
                    color: "from-coral-500 to-pink-500",
                  },
                  {
                    icon: Users,
                    label: "Clients",
                    value: userData.aboutMe.stats.happyClients,
                    color: "from-purple-500 to-indigo-500",
                  },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    variants={scaleIn}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="bg-white rounded-2xl p-6 shadow-xl border-2 border-gray-100"
                  >
                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${stat.color} mb-4`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      className="text-4xl font-black text-gray-900 mb-1"
                    >
                      {stat.value}+
                    </motion.div>
                    <div className="text-sm text-gray-500 font-semibold uppercase">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section - Tab Layout */}
      <section id="skills" className="relative py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <motion.span
                className="inline-block px-4 py-2 bg-gradient-to-r from-teal-100 to-coral-100 rounded-full text-sm font-bold text-gray-700 mb-4"
              >
                EXPERTISE
              </motion.span>
              <h2 className="text-4xl md:text-6xl font-black text-gray-900">
                Skills & Services
              </h2>
            </motion.div>

            {/* Tab Navigation */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap justify-center gap-3 mb-12"
            >
              {userData.skillCategories.map((category, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab(index)}
                  className={`px-6 py-3 rounded-full font-bold transition-all ${activeTab === index
                    ? "bg-gradient-to-r from-teal-500 to-coral-500 text-white shadow-lg"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                >
                  {category.category}
                </motion.button>
              ))}
            </motion.div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 shadow-xl border-2 border-gray-100"
              >
                <div className="flex items-center space-x-4 mb-8">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${userData.skillCategories[activeTab].color} flex items-center justify-center`}
                  >
                    <Laptop className="w-8 h-8 text-white" />
                  </motion.div>
                  <div>
                    <h3 className="text-3xl font-black text-gray-900">
                      {userData.skillCategories[activeTab].category}
                    </h3>
                    <p className="text-gray-500">
                      {userData.skillCategories[activeTab].skills.length} Skills
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {userData.skillCategories[activeTab].skills.map((skill, i) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="p-4 bg-white rounded-xl shadow-md border border-gray-100 text-center font-semibold text-gray-700 hover:shadow-lg hover:border-teal-200 transition-all"
                    >
                      {skill}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Experience Section - Horizontal Timeline */}
      {userData.experiences && userData.experiences.length > 0 && (
      <section className="relative py-24 bg-gradient-to-br from-coral-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <motion.span
                className="inline-block px-4 py-2 bg-white rounded-full text-sm font-bold text-gray-700 mb-4 shadow-md"
              >
                JOURNEY
              </motion.span>
              <h2 className="text-4xl md:text-6xl font-black text-gray-900">
                Work Experience
              </h2>
            </motion.div>

            <div className="space-y-8">
              {userData.experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="relative"
                >
                  <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-gray-100 hover:shadow-2xl transition-all">
                    <div className="flex flex-wrap items-start justify-between mb-6 gap-4">
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                          {exp.role}
                        </h3>
                        <p className="text-lg font-semibold bg-gradient-to-r from-teal-600 to-coral-600 bg-clip-text text-transparent">
                          {exp.company}
                        </p>
                      </div>
                      <motion.span
                        whileHover={{ scale: 1.05 }}
                        className="px-4 py-2 bg-gradient-to-r from-teal-500 to-coral-500 text-white rounded-full text-sm font-bold shadow-md"
                      >
                        {exp.period}
                      </motion.span>
                    </div>

                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {exp.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((skill, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-gradient-to-r from-teal-100 to-coral-100 text-gray-700 rounded-lg text-sm font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
      )}

      {/* Certifications Section - Vibrant Design */}
      {userData.certifications && userData.certifications.length > 0 && (
        <section id="certifications" className="relative py-24 bg-gradient-to-br from-purple-50 via-white to-orange-50">
          {/* Animated background shapes */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 90, 0],
              }}
              transition={{ duration: 20, repeat: Infinity }}
              className="absolute -top-20 -left-20 w-96 h-96 bg-yellow-200/30 rounded-full blur-3xl"
            />
            <motion.div
              animate={{
                scale: [1.2, 1, 1.2],
                rotate: [90, 0, 90],
              }}
              transition={{ duration: 25, repeat: Infinity }}
              className="absolute -bottom-20 -right-20 w-96 h-96 bg-orange-200/30 rounded-full blur-3xl"
            />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {/* Section Header */}
              <motion.div variants={fadeInUp} className="text-center mb-16">
                <motion.span
                  className="inline-block px-4 py-2 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-full text-sm font-bold text-gray-700 mb-4 shadow-md"
                >
                  CREDENTIALS & ACHIEVEMENTS
                </motion.span>
                <h2 className="text-4xl md:text-6xl font-black text-gray-900">
                  Certifications
                </h2>
              </motion.div>

              {/* Certificates Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {userData.certifications.slice(0, 6).map((cert, index) => (
                  <motion.div
                    key={index}
                    variants={scaleIn}
                    whileHover={{ y: -10, scale: 1.02 }}
                    onClick={() => setShowAllCertificates(true)}
                    className="group cursor-pointer"
                  >
                    <div className="bg-white rounded-3xl overflow-hidden shadow-xl border-2 border-gray-100 hover:border-orange-200 hover:shadow-2xl transition-all h-full">
                      {/* Certificate Header with Icon */}
                      <div className="relative p-6 bg-gradient-to-br from-yellow-50 to-orange-50">
                        <div className="flex items-center justify-between mb-4">
                          <motion.div
                            whileHover={{ rotate: 360, scale: 1.1 }}
                            transition={{ duration: 0.6 }}
                            className="w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center shadow-lg"
                          >
                            <Award className="w-7 h-7 text-white" />
                          </motion.div>

                          <motion.div
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <ExternalLink className="w-5 h-5 text-orange-500" />
                          </motion.div>
                        </div>

                        {/* Date Badge */}
                        <div className="flex items-center space-x-2">
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="w-2 h-2 rounded-full bg-green-500 shadow-lg shadow-green-500/50"
                          />
                          <span className="text-sm font-bold text-gray-600">
                            {cert.issueDate}
                          </span>
                        </div>
                      </div>

                      {/* Certificate Content */}
                      <div className="p-6 space-y-4">
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-yellow-600 group-hover:to-orange-600 group-hover:bg-clip-text transition-all leading-tight">
                          {cert.title}
                        </h3>

                        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                          {cert.description}
                        </p>

                        {/* View More Indicator */}
                        <div className="flex items-center space-x-2 text-orange-500 font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                          <span>View More</span>
                          <motion.div
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            <ArrowRight className="w-4 h-4" />
                          </motion.div>
                        </div>
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
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowAllCertificates(true)}
                    className="group relative px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-2xl font-bold shadow-xl shadow-yellow-500/30 hover:shadow-2xl hover:shadow-orange-500/40 transition-all flex items-center space-x-2 mx-auto overflow-hidden"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-orange-500 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                    <span className="relative z-10">View All {userData.certifications.length} Certifications</span>
                    <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-2 transition-transform" />
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
                    className="fixed inset-0 bg-black/80 backdrop-blur-xl z-50 flex items-center justify-center p-4 overflow-y-auto"
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
                        className="absolute -top-20 -right-20 w-64 h-64 bg-yellow-300/30 rounded-full blur-3xl pointer-events-none"
                      />
                      <motion.div
                        animate={{
                          scale: [1, 1.3, 1],
                          rotate: [0, -180, -360],
                        }}
                        transition={{ duration: 35, repeat: Infinity }}
                        className="absolute -bottom-20 -left-20 w-64 h-64 bg-orange-300/30 rounded-full blur-3xl pointer-events-none"
                      />

                      {/* Modal Content */}
                      <div className="relative bg-white rounded-[2rem] p-8 md:p-12 shadow-2xl border-2 border-gray-100">
                        {/* Modal Header */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 pb-6 border-b-2 border-gray-100 gap-4">
                          <div className="flex-1">
                            <motion.span
                              className="inline-block px-4 py-2 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-full text-sm font-bold text-gray-700 mb-4"
                            >
                              ALL CERTIFICATIONS
                            </motion.span>
                            <h3 className="text-3xl md:text-5xl font-black text-gray-900">
                              Complete Credentials
                            </h3>
                            <p className="text-gray-600 mt-2 font-medium">
                              {userData.certifications.length} Professional Certifications
                            </p>
                          </div>

                          <motion.button
                            whileHover={{ scale: 1.1, rotate: 90 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setShowAllCertificates(false)}
                            className="p-3 rounded-2xl bg-gray-100 hover:bg-red-100 border-2 border-gray-200 hover:border-red-300 transition-all group shrink-0"
                          >
                            <X className="w-6 h-6 text-gray-600 group-hover:text-red-500" />
                          </motion.button>
                        </div>

                        {/* Scrollable Grid */}
                        <div className="max-h-[60vh] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-orange-300 scrollbar-track-gray-100 scrollbar-thumb-rounded-full">
                          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {userData.certifications.map((cert, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                whileHover={{ y: -5, scale: 1.02 }}
                                className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg border-2 border-gray-100 hover:border-orange-200 hover:shadow-xl transition-all"
                              >
                                <motion.div
                                  whileHover={{ rotate: 360 }}
                                  transition={{ duration: 0.6 }}
                                  className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center shadow-lg mb-4"
                                >
                                  <Award className="w-6 h-6 text-white" />
                                </motion.div>

                                <h4 className="text-lg font-bold text-gray-900 mb-3 leading-tight hover:text-orange-600 transition-colors">
                                  {cert.title}
                                </h4>

                                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                                  {cert.description}
                                </p>

                                <div className="flex items-center space-x-2">
                                  <div className="w-2 h-2 rounded-full bg-green-500 shadow-lg shadow-green-500/50" />
                                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                                    {cert.issueDate}
                                  </span>
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




      {/* Projects Section - Masonry Grid */}
      <section id="projects" className="relative py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <motion.span
                className="inline-block px-4 py-2 bg-gradient-to-r from-teal-100 to-coral-100 rounded-full text-sm font-bold text-gray-700 mb-4"
              >
                PORTFOLIO
              </motion.span>
              <h2 className="text-4xl md:text-6xl font-black text-gray-900">
                Featured Work
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {userData.projects.map((project, index) => (
                <motion.div
                  key={index}
                  variants={scaleIn}
                  whileHover={{ y: -15 }}
                  className="group"
                >
                  <div className="bg-white rounded-3xl overflow-hidden shadow-xl border-2 border-gray-100 hover:shadow-2xl transition-all">
                    {/* Project Image */}
                    <div className="relative h-64 bg-gradient-to-br from-teal-100 to-coral-100 overflow-hidden">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
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
                          <Code className="w-20 h-20 text-teal-400" />
                        )}
                      </motion.div>

                      {/* Overlay */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent flex items-center justify-center space-x-4"
                      >
                        {project.links.live && (
                          <motion.a
                            href={project.links.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-3 bg-white rounded-full shadow-xl hover:bg-teal-500 hover:text-white transition-all"
                          >
                            <ExternalLink className="w-5 h-5" />
                          </motion.a>
                        )}
                        {project.links.github && (
                          <motion.a
                            href={project.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-3 bg-white rounded-full shadow-xl hover:bg-coral-500 hover:text-white transition-all"
                          >
                            <Github className="w-5 h-5" />
                          </motion.a>
                        )}
                      </motion.div>
                    </div>

                    {/* Project Info */}
                    <div className="p-6 space-y-4">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-teal-600 group-hover:to-coral-600 group-hover:bg-clip-text transition-all">
                        {project.title}
                      </h3>
                      <p className="text-gray-600 line-clamp-2">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.slice(0, 3).map((tag, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                        {project.tags.length > 3 && (
                          <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-medium">
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

      {/* Contact Section - Modern Form */}
      <section id="contact" className="relative py-24 bg-gradient-to-br from-teal-50 via-white to-coral-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <motion.span
                className="inline-block px-4 py-2 bg-white rounded-full text-sm font-bold text-gray-700 mb-4 shadow-md"
              >
                GET IN TOUCH
              </motion.span>
              <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-4">
                Let&apos;s Work Together
              </h2>
              <p className="text-xl text-gray-600">
                Have a project in mind? Let&apos;s create something amazing!
              </p>
            </motion.div>

            <motion.div variants={scaleIn}>
              <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border-2 border-gray-100">
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="text-center py-12"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200 }}
                        className="inline-flex p-6 rounded-full bg-gradient-to-r from-teal-500 to-coral-500 mb-6"
                      >
                        <CheckCircle className="w-12 h-12 text-white" />
                      </motion.div>
                      <h3 className="text-3xl font-black text-gray-900 mb-4">
                        Message Sent! 🎉
                      </h3>
                      <p className="text-gray-600">
                        Thanks for reaching out. I&apos;ll get back to you soon!
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
                            className="block text-sm font-bold text-gray-700 uppercase tracking-wide"
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
                            className="w-full px-4 py-3 rounded-xl bg-gray-50 border-2 border-gray-200 focus:border-teal-500 focus:outline-none text-gray-900 font-medium transition-all"
                            placeholder="John Doe"
                          />
                        </div>

                        <div className="space-y-2">
                          <label
                            htmlFor="email"
                            className="block text-sm font-bold text-gray-700 uppercase tracking-wide"
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
                            className="w-full px-4 py-3 rounded-xl bg-gray-50 border-2 border-gray-200 focus:border-teal-500 focus:outline-none text-gray-900 font-medium transition-all"
                            placeholder="john@example.com"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor="message"
                          className="block text-sm font-bold text-gray-700 uppercase tracking-wide"
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
                          className="w-full px-4 py-3 rounded-xl bg-gray-50 border-2 border-gray-200 focus:border-teal-500 focus:outline-none text-gray-900 font-medium resize-none transition-all"
                          placeholder="Tell me about your project..."
                        />
                      </div>

                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-4 bg-gradient-to-r from-teal-500 to-coral-500 text-white rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all flex items-center justify-center space-x-2 group"
                      >
                        <span>Send Message</span>
                        <Send className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                      </motion.button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={fadeInUp} className="mt-12">
              <div className="flex justify-center items-center space-x-4">
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
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-4 bg-white rounded-xl shadow-lg hover:shadow-xl border-2 border-gray-100 hover:border-teal-200 transition-all group"
                    >
                      <Icon className="w-6 h-6 text-gray-600 group-hover:text-teal-600 transition-colors" />
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
      <footer className="relative py-8 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-coral-500 rounded-lg flex items-center justify-center">
                <Code className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg">{userName}</span>
            </div>

            <p className="text-gray-400 text-sm">
              © {currentYear} All rights reserved. Made with{" "}
              <Heart className="w-4 h-4 inline text-coral-500" /> using Next.js
            </p>

            <div className="flex items-center space-x-6">
              <a
                href="#home"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                Privacy
              </a>
              <span className="text-gray-600">•</span>
              <a
                href="#home"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                Terms
              </a>
            </div>
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
            className="fixed bottom-8 right-8 z-40 p-4 bg-gradient-to-r from-teal-500 to-coral-500 rounded-full shadow-2xl text-white"
          >
            <ArrowRight className="w-6 h-6 -rotate-90" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
