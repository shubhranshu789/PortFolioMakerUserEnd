"use client"

import { useState, useEffect } from "react"
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
  Zap,
  Star,
  Award,
  Users,
  Briefcase,
  Sparkles,
  Layers,
  Terminal,
  Rocket,
  CheckCircle2,
} from "lucide-react"
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
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

export default function FreshPortfolio() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeProject, setActiveProject] = useState(0)

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
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-100 flex items-center justify-center relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center relative z-10"
        >
          <motion.div className="relative w-28 h-28 mx-auto mb-8">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border-4 border-cyan-200 border-t-cyan-500"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute inset-4 rounded-full border-4 border-blue-200 border-t-blue-500"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Rocket className="w-12 h-12 text-cyan-600" />
            </div>
          </motion.div>
          <motion.h2
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-2xl font-black text-gray-800"
          >
            Loading...
          </motion.h2>
        </motion.div>
      </div>
    )
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-50 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <X className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <p className="text-red-600 text-xl md:text-2xl font-bold">
            Failed to load portfolio
          </p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-hidden">
      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 transform origin-left z-50"
        style={{ scaleX: scaleProgress }}
      />

      {/* Minimal Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed w-full z-40 transition-all duration-300 ${scrolled
          ? "bg-white/80 backdrop-blur-xl shadow-sm"
          : "bg-transparent"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="#home" className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/30">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-black text-gray-900">{userName}</span>
              </Link>
            </motion.div>

            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className="text-sm font-semibold text-gray-600 hover:text-cyan-600 transition-colors relative group"
                  >
                    {link.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-500 group-hover:w-full transition-all duration-300" />
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-xl bg-cyan-50 text-cyan-600"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t"
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
                      className="block px-4 py-3 text-gray-700 hover:text-cyan-600 hover:bg-cyan-50 rounded-xl transition-all font-semibold"
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

      {/* Hero Section - Bold & Minimal */}
      <section
        id="home"
        className="relative min-h-screen flex items-center pt-20 overflow-hidden"
      >
        {/* Background pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(6,182,212,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(59,130,246,0.1),transparent_50%)]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Content */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="space-y-8"
            >
              <motion.div variants={fadeInUp}>
                <motion.span
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="inline-flex items-center space-x-2 px-4 py-2 bg-cyan-100 rounded-full text-sm font-bold text-cyan-700"
                >
                  <Star className="w-4 h-4" />
                  <span>Available for Projects</span>
                </motion.span>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <h1 className="text-6xl md:text-7xl lg:text-8xl font-black leading-none">
                  <span className="text-gray-900">{userData.hero.title}</span>
                  <br />
                  <span className="bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 bg-clip-text ">
                    {userData.hero.highlightText}
                  </span>
                </h1>
              </motion.div>

              <motion.p
                variants={fadeInUp}
                className="text-xl text-gray-600 max-w-xl leading-relaxed"
              >
                {userData.hero.subtitle}
              </motion.p>

              <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 pt-4">
                <motion.a
                  href="#projects"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-2xl font-bold shadow-xl shadow-cyan-500/30 hover:shadow-2xl hover:shadow-blue-500/40 transition-all flex items-center space-x-2"
                >
                  <span>{userData.hero.primaryButtonText}</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
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

              {/* Stats */}
              <motion.div variants={fadeInUp} className="flex gap-8 pt-8">
                {[
                  { value: userData.aboutMe.stats.projectsCompleted, label: "Projects" },
                  { value: userData.aboutMe.stats.yearsExperience, label: "Years" },
                  { value: userData.aboutMe.stats.happyClients, label: "Clients" },
                ].map((stat, i) => (
                  <div key={i}>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 1 + i * 0.2, type: "spring" }}
                      className="text-4xl font-black bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent"
                    >
                      {stat.value}+
                    </motion.div>
                    <div className="text-sm text-gray-600 font-semibold uppercase">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right: Floating Card */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="relative"
              >
                {/* Decorative elements */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-3xl opacity-20 blur-2xl"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  className="absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-3xl opacity-20 blur-2xl"
                />

                <div className="relative bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
                        <Terminal className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">Status</div>
                        <div className="text-sm text-gray-500">Real-time</div>
                      </div>
                    </div>
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-3 h-3 bg-green-500 rounded-full shadow-lg shadow-green-500/50"
                    />
                  </div>

                  <div className="space-y-4">
                    {[
                      { label: "Code Quality", value: 95, color: "from-cyan-500 to-blue-500" },
                      { label: "Performance", value: 92, color: "from-blue-500 to-indigo-500" },
                      { label: "User Experience", value: 98, color: "from-indigo-500 to-purple-500" },
                    ].map((item, i) => (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.2 + i * 0.2 }}
                        className="space-y-2"
                      >
                        <div className="flex justify-between text-sm font-semibold">
                          <span className="text-gray-700">{item.label}</span>
                          <span className="text-gray-500">{item.value}%</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${item.value}%` }}
                            transition={{ delay: 1.5 + i * 0.2, duration: 1 }}
                            className={`h-full bg-gradient-to-r ${item.color} rounded-full`}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.5 }}
                    className="mt-6 pt-6 border-t border-gray-100 flex items-center justify-between"
                  >
                    <span className="text-sm text-gray-600 font-semibold">
                      {userData.aboutMe.stats.techSkills}+ Technologies
                    </span>
                    <div className="flex -space-x-2">
                      {[...Array(4)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 3 + i * 0.1 }}
                          className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 border-2 border-white flex items-center justify-center text-white text-xs font-bold"
                        >
                          {i + 1}
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section - Split Design */}
      <section id="about" className="relative py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-20">
              <span className="inline-block px-4 py-2 bg-cyan-100 rounded-full text-sm font-bold text-cyan-700 mb-4">
                {userData.aboutMe.sectionTitle}
              </span>
              <h2 className="text-5xl md:text-6xl font-black text-gray-900">
                {userData.aboutMe.headline}
              </h2>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-16">
              <motion.div variants={fadeInLeft} className="space-y-6">
                <p className="text-xl text-gray-700 leading-relaxed">
                  {userData.aboutMe.introduction}
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {userData.aboutMe.description}
                </p>

                <div className="pt-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Core Values</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {userData.aboutMe.coreValues.map((value, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center space-x-2 p-3 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl border border-cyan-100"
                      >
                        <CheckCircle2 className="w-5 h-5 text-cyan-600" />
                        <span className="text-sm font-semibold text-gray-700">{value}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              <motion.div variants={scaleIn} className="grid grid-cols-2 gap-4">
                {[
                  { icon: Briefcase, label: "Projects", value: userData.aboutMe.stats.projectsCompleted, color: "from-cyan-500 to-blue-500" },
                  { icon: Award, label: "Experience", value: userData.aboutMe.stats.yearsExperience, color: "from-blue-500 to-indigo-500" },
                  { icon: Users, label: "Clients", value: userData.aboutMe.stats.happyClients, color: "from-indigo-500 to-purple-500" },
                  { icon: Code, label: "Skills", value: userData.aboutMe.stats.techSkills, color: "from-purple-500 to-pink-500" },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -10, scale: 1.05 }}
                    className="relative group"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 rounded-3xl blur-xl transition-opacity`} />
                    <div className="relative bg-white border-2 border-gray-100 rounded-3xl p-6 group-hover:border-cyan-200 transition-all">
                      <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${stat.color} mb-4`}>
                        <stat.icon className="w-6 h-6 text-white" />
                      </div>
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        className="text-4xl font-black text-gray-900 mb-2"
                      >
                        {stat.value}+
                      </motion.div>
                      <div className="text-sm text-gray-600 font-semibold uppercase">
                        {stat.label}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section - Modern Grid */}
      <section id="skills" className="relative py-32 bg-gradient-to-br from-cyan-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-20">
              <span className="inline-block px-4 py-2 bg-white rounded-full text-sm font-bold text-cyan-700 mb-4 shadow-sm">
                SKILLS
              </span>
              <h2 className="text-5xl md:text-6xl font-black text-gray-900">
                What I Bring to the Table
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {userData.skillCategories.map((category, index) => (
                <motion.div
                  key={index}
                  variants={scaleIn}
                  whileHover={{ y: -10 }}
                  className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl transition-all"
                >
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${category.color} mb-6`}>
                    <Layers className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {category.category}
                  </h3>

                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 }}
                        whileHover={{ scale: 1.1, y: -2 }}
                        className="px-3 py-1.5 bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-100 text-gray-700 rounded-lg text-sm font-medium hover:border-cyan-300 transition-all"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Experience Section - Timeline */}
      <section className="relative py-32 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-20">
              <span className="inline-block px-4 py-2 bg-cyan-100 rounded-full text-sm font-bold text-cyan-700 mb-4">
                JOURNEY
              </span>
              <h2 className="text-5xl md:text-6xl font-black text-gray-900">
                Experience
              </h2>
            </motion.div>

            <div className="space-y-12">
              {userData.experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="bg-gradient-to-br from-white to-cyan-50/30 rounded-3xl p-8 border-2 border-gray-100 hover:border-cyan-200 shadow-lg hover:shadow-xl transition-all"
                >
                  <div className="flex flex-wrap items-start justify-between mb-6 gap-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        {exp.role}
                      </h3>
                      <p className="text-lg font-semibold text-cyan-600">
                        {exp.company}
                      </p>
                    </div>
                    <span className="px-4 py-2 bg-cyan-100 text-cyan-700 rounded-xl text-sm font-bold">
                      {exp.period}
                    </span>
                  </div>

                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {exp.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {exp.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-white border border-cyan-100 text-gray-700 rounded-lg text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>


      {/* Certifications Section - Clean & Minimal */}
      {userData.certifications && userData.certifications.length > 0 && (
        <section id="certifications" className="relative py-32 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {/* Section Header */}
              <motion.div variants={fadeInUp} className="text-center mb-20">
                <span className="inline-block px-4 py-2 bg-cyan-100 rounded-full text-sm font-bold text-cyan-700 mb-4">
                  CREDENTIALS
                </span>
                <h2 className="text-5xl md:text-6xl font-black text-gray-900">
                  Certifications & Awards
                </h2>
              </motion.div>

              {/* Certificates Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {userData.certifications.slice(0, 6).map((cert, index) => (
                  <motion.div
                    key={index}
                    variants={scaleIn}
                    whileHover={{ y: -15 }}
                    onClick={() => setShowAllCertificates(true)}
                    className="group cursor-pointer"
                  >
                    <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border-2 border-gray-100 hover:border-cyan-200 h-full">
                      {/* Certificate Header */}
                      <div className="relative p-6 bg-gradient-to-br from-cyan-50 to-blue-50">
                        <div className="flex items-center justify-between mb-4">
                          <motion.div
                            whileHover={{ rotate: 360, scale: 1.1 }}
                            transition={{ duration: 0.6 }}
                            className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/30"
                          >
                            <Award className="w-7 h-7 text-white" />
                          </motion.div>

                          <motion.div
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <ExternalLink className="w-5 h-5 text-cyan-600" />
                          </motion.div>
                        </div>

                        {/* Date Badge */}
                        <div className="flex items-center space-x-2">
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="w-2 h-2 bg-green-500 rounded-full shadow-lg shadow-green-500/50"
                          />
                          <span className="text-sm font-bold text-gray-600">
                            {cert.issueDate}
                          </span>
                        </div>
                      </div>

                      {/* Certificate Content */}
                      <div className="p-6 space-y-4">
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-cyan-600 transition-colors leading-tight">
                          {cert.title}
                        </h3>

                        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                          {cert.description}
                        </p>

                        {/* View More Indicator */}
                        <div className="flex items-center space-x-2 text-cyan-600 font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
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
                    className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-2xl font-bold shadow-xl shadow-cyan-500/30 hover:shadow-2xl hover:shadow-blue-500/40 transition-all flex items-center space-x-2 mx-auto"
                  >
                    <span>View All {userData.certifications.length} Certifications</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
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
                    className="fixed inset-0 bg-gray-900/90 backdrop-blur-xl z-50 flex items-center justify-center p-4 overflow-y-auto"
                  >
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0, y: 50 }}
                      animate={{ scale: 1, opacity: 1, y: 0 }}
                      exit={{ scale: 0.9, opacity: 0, y: 50 }}
                      transition={{ type: "spring", damping: 25, stiffness: 300 }}
                      onClick={(e) => e.stopPropagation()}
                      className="relative w-full max-w-7xl my-8"
                    >
                      {/* Modal Content */}
                      <div className="relative bg-white rounded-[2rem] p-8 md:p-12 shadow-2xl border-2 border-gray-100">
                        {/* Modal Header */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 pb-6 border-b-2 border-gray-100 gap-4">
                          <div className="flex-1">
                            <span className="inline-block px-4 py-2 bg-cyan-100 rounded-full text-sm font-bold text-cyan-700 mb-4">
                              ALL CERTIFICATIONS
                            </span>
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
                        <div className="max-h-[60vh] overflow-y-auto pr-4 custom-scrollbar-cyan">
                          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {userData.certifications.map((cert, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                whileHover={{ y: -5, scale: 1.02 }}
                                className="bg-gradient-to-br from-cyan-50/50 to-blue-50/50 rounded-2xl p-6 shadow-lg border-2 border-cyan-100 hover:border-cyan-300 hover:shadow-xl transition-all"
                              >
                                <motion.div
                                  whileHover={{ rotate: 360 }}
                                  transition={{ duration: 0.6 }}
                                  className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg mb-4"
                                >
                                  <Award className="w-6 h-6 text-white" />
                                </motion.div>

                                <h4 className="text-lg font-bold text-gray-900 mb-3 leading-tight hover:text-cyan-600 transition-colors">
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





      {/* Projects Section - Grid */}
      {userData.certifications && userData.certifications.length > 0 && (
        <section id="projects" className="relative py-32 bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp} className="text-center mb-20">
                <span className="inline-block px-4 py-2 bg-white rounded-full text-sm font-bold text-cyan-700 mb-4 shadow-sm">
                  PORTFOLIO
                </span>
                <h2 className="text-5xl md:text-6xl font-black text-gray-900">
                  Featured Projects
                </h2>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {userData.projects.map((project, index) => (
                  <motion.div
                    key={index}
                    variants={scaleIn}
                    whileHover={{ y: -15 }}
                    onHoverStart={() => setActiveProject(index)}
                    className="group"
                  >
                    <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border border-gray-100">
                      <div className="relative h-64 bg-gradient-to-br from-cyan-100 to-blue-100 overflow-hidden">
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
                            <Rocket className="w-20 h-20 text-cyan-400" />
                          )}
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                          className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent flex items-center justify-center space-x-4"
                        >
                          {project.links.live && (
                            <motion.a
                              href={project.links.live}
                              target="_blank"
                              rel="noopener noreferrer"
                              whileHover={{ scale: 1.2 }}
                              whileTap={{ scale: 0.9 }}
                              className="p-3 bg-white rounded-xl shadow-xl hover:bg-cyan-500 hover:text-white transition-all"
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
                              className="p-3 bg-white rounded-xl shadow-xl hover:bg-blue-500 hover:text-white transition-all"
                            >
                              <Github className="w-5 h-5" />
                            </motion.a>
                          )}
                        </motion.div>
                      </div>

                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-cyan-600 transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-gray-600 mb-4 line-clamp-2">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {project.tags.slice(0, 3).map((tag, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 bg-cyan-50 text-cyan-700 rounded-lg text-xs font-medium"
                            >
                              {tag}
                            </span>
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

      {/* Contact Section */}
      <section id="contact" className="relative py-32 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <span className="inline-block px-4 py-2 bg-cyan-100 rounded-full text-sm font-bold text-cyan-700 mb-4">
                GET IN TOUCH
              </span>
              <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-4">
                Let's Work Together
              </h2>
              <p className="text-xl text-gray-600">
                Have a project in mind? Let's make it happen!
              </p>
            </motion.div>

            <motion.div variants={scaleIn}>
              <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-3xl p-8 md:p-12 border-2 border-cyan-100 shadow-xl">
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
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200 }}
                        className="inline-flex p-6 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 mb-6"
                      >
                        <CheckCircle2 className="w-12 h-12 text-white" />
                      </motion.div>
                      <h3 className="text-3xl font-black text-gray-900 mb-4">
                        Message Sent! 🎉
                      </h3>
                      <p className="text-gray-600">
                        Thanks! I'll get back to you soon.
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
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2">
                            Name
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 bg-white border-2 border-cyan-100 rounded-xl focus:border-cyan-500 focus:outline-none text-gray-900 font-medium transition-all"
                            placeholder="John Doe"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2">
                            Email
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 bg-white border-2 border-cyan-100 rounded-xl focus:border-cyan-500 focus:outline-none text-gray-900 font-medium transition-all"
                            placeholder="john@example.com"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                          Message
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows={6}
                          className="w-full px-4 py-3 bg-white border-2 border-cyan-100 rounded-xl focus:border-cyan-500 focus:outline-none text-gray-900 font-medium resize-none transition-all"
                          placeholder="Tell me about your project..."
                        />
                      </div>

                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-bold text-lg shadow-xl shadow-cyan-500/30 hover:shadow-2xl hover:shadow-blue-500/40 transition-all flex items-center justify-center space-x-2"
                      >
                        <span>Send Message</span>
                        <Send className="w-5 h-5" />
                      </motion.button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="mt-12">
              <div className="flex justify-center space-x-4">
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
                      className="p-4 bg-white rounded-xl shadow-lg hover:shadow-xl border border-gray-100 hover:border-cyan-200 transition-all"
                    >
                      <Icon className="w-6 h-6 text-gray-600 hover:text-cyan-600 transition-colors" />
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
      <footer className="py-8 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-gray-900">{userName}</span>
            </div>

            <p className="text-gray-600 text-sm">
              © {currentYear} All rights reserved. Made with ❤️
            </p>

            <div className="flex space-x-6">
              <a href="#home" className="text-gray-600 hover:text-cyan-600 transition-colors text-sm">
                Privacy
              </a>
              <a href="#home" className="text-gray-600 hover:text-cyan-600 transition-colors text-sm">
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
            className="fixed bottom-8 right-8 z-40 p-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full shadow-2xl shadow-cyan-500/30 text-white"
          >
            <ArrowRight className="w-6 h-6 -rotate-90" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
