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
  ChevronDown,
  ArrowRight,
  Send,
  Code,
  Target,
  Award,
  Users,
  Briefcase,
  Sparkles,
  Rocket,
  Terminal,
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

export default function InnovatePortfolio() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeService, setActiveService] = useState<number | null>(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const router = useRouter()
  const params = useParams()
  const { scrollYProgress } = useScroll()
  const scaleProgress = useTransform(scrollYProgress, [0, 1], [0, 1])

  const [userName, setUserName] = useState("Portfolio")
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [userEmail, setuserEmail] = useState("")
  const API_BASE = `${process.env.NEXT_PUBLIC_API_URL}`

  const [submitted, setSubmitted] = useState(false);
  const [showAllCertificates, setShowAllCertificates] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  // mouse move for parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

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

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  }

  const fadeInLeft = {
    hidden: { opacity: 0, x: -60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#0a0a0a] flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center relative z-10"
        >
          <motion.div
            animate={{
              rotate: 360,
              scale: [1, 1.1, 1],
            }}
            transition={{
              rotate: { duration: 2, repeat: Infinity, ease: "linear" },
              scale: { duration: 1, repeat: Infinity, ease: "easeInOut" },
            }}
            className="w-20 h-20 md:w-24 md:h-24 border-4 border-gray-800 border-t-orange-500 rounded-full mx-auto mb-6 md:mb-8 relative"
          >
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute inset-2 border-2 border-gray-700 border-r-purple-500 rounded-full"
            />
          </motion.div>
          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-orange-500 text-lg md:text-2xl font-bold tracking-widest uppercase px-4"
          >
            Loading Portfolio...
          </motion.p>
        </motion.div>
      </div>
    )
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <X className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <p className="text-orange-500 text-xl md:text-2xl font-bold">
            Failed to load portfolio
          </p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden">
      {/* progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-purple-500 to-pink-500 transform origin-left z-50"
        style={{ scaleX: scaleProgress }}
      />

      {/* nav */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed w-full z-40 transition-all duration-500 ${scrolled
            ? "bg-black/80 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-orange-500/10"
            : "bg-transparent"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative group"
            >
              <Link href="#home" className="flex items-center space-x-2">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-purple-500 rounded-lg blur-lg opacity-50 group-hover:opacity-100 transition-opacity" />
                  <Code className="w-8 h-8 text-orange-500 relative z-10" />
                </motion.div>
                <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  {userName}
                </span>
              </Link>
            </motion.div>

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
                    className="relative px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors group"
                  >
                    <span className="relative z-10">{link.label}</span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-purple-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                      whileHover={{ scale: 1.05 }}
                    />
                    <motion.div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-500 to-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
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
              className="md:hidden bg-black/95 backdrop-blur-xl border-t border-white/10"
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
                      className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all"
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

      {/* hero */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

        <motion.div
          animate={{
            x: mousePosition.x,
            y: mousePosition.y,
          }}
          transition={{ type: "spring", stiffness: 50, damping: 20 }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-orange-500/30 to-transparent rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: -mousePosition.x,
            y: -mousePosition.y,
          }}
          transition={{ type: "spring", stiffness: 50, damping: 20 }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-l from-purple-500/30 to-transparent rounded-full blur-3xl"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="space-y-8"
          >
            <motion.div variants={fadeInUp}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500/10 to-purple-500/10 border border-orange-500/20 backdrop-blur-sm"
              >
                <Sparkles className="w-4 h-4 text-orange-500" />
                <span className="text-sm font-medium text-orange-500">
                  Welcome to my portfolio
                </span>
                <Rocket className="w-4 h-4 text-purple-500" />
              </motion.div>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight"
            >
              <span className="block text-white">
                {userData.hero.title}
              </span>
              <motion.span
                className="block bg-gradient-to-r from-orange-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 5, repeat: Infinity }}
                style={{ backgroundSize: "200% 200%" }}
              >
                {userData.hero.highlightText}
              </motion.span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
            >
              {userData.hero.subtitle}
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <motion.a
                href="#projects"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 60px rgba(249, 115, 22, 0.4)",
                }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-8 py-4 bg-gradient-to-r from-orange-500 to-purple-500 rounded-full font-semibold text-white shadow-2xl shadow-orange-500/50 overflow-hidden"
              >
                <motion.div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative z-10 flex items-center space-x-2">
                  <span>{userData.hero.primaryButtonText}</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.a>

              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-2 border-white/20 hover:border-orange-500/50 rounded-full font-semibold hover:bg-white/5 transition-all backdrop-blur-sm"
              >
                {userData.hero.secondaryButtonText}
              </motion.a>
            </motion.div>

            <motion.div variants={fadeInUp} className="pt-12">
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-flex flex-col items-center space-y-2 cursor-pointer"
                onClick={() =>
                  document
                    .getElementById("about")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                <span className="text-sm text-gray-500 uppercase tracking-wider">
                  Scroll Down
                </span>
                <ChevronDown className="w-6 h-6 text-orange-500" />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* about */}
      <section id="about" className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-500/5 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-20">
              <motion.span className="inline-block px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-sm font-semibold mb-6">
                {userData.aboutMe.sectionTitle}
              </motion.span>
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                  {userData.aboutMe.headline}
                </span>
              </h2>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div variants={fadeInLeft} className="space-y-6">
                <p className="text-xl text-gray-300 leading-relaxed">
                  {userData.aboutMe.introduction}
                </p>
                <p className="text-lg text-gray-400 leading-relaxed">
                  {userData.aboutMe.description}
                </p>

                <div className="space-y-4 pt-6">
                  <h3 className="text-2xl font-bold text-white">
                    Core Values
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {userData.aboutMe.coreValues.map((value, index) => (
                      <motion.div
                        key={index}
                        variants={scaleIn}
                        whileHover={{ scale: 1.05, x: 10 }}
                        className="flex items-center space-x-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-orange-500/50 transition-all group"
                      >
                        <motion.div
                          animate={{ rotate: [0, 360] }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="p-2 rounded-lg bg-gradient-to-br from-orange-500/20 to-purple-500/20 group-hover:from-orange-500/40 group-hover:to-purple-500/40 transition-all"
                        >
                          <Target className="w-5 h-5 text-orange-500" />
                        </motion.div>
                        <span className="text-gray-300 font-medium">
                          {value}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              <motion.div variants={fadeInUp} className="grid grid-cols-2 gap-6">
                {[
                  {
                    icon: Briefcase,
                    label: "Projects Completed",
                    value: userData.aboutMe.stats.projectsCompleted,
                    color: "from-orange-500 to-red-500",
                  },
                  {
                    icon: Award,
                    label: "Years Experience",
                    value: userData.aboutMe.stats.yearsExperience,
                    color: "from-purple-500 to-pink-500",
                  },
                  {
                    icon: Users,
                    label: "Happy Clients",
                    value: userData.aboutMe.stats.happyClients,
                    color: "from-blue-500 to-cyan-500",
                  },
                  {
                    icon: Code,
                    label: "Tech Skills",
                    value: userData.aboutMe.stats.techSkills,
                    color: "from-green-500 to-emerald-500",
                  },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    variants={scaleIn}
                    whileHover={{ y: -10, scale: 1.05 }}
                    className="relative group"
                  >
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity blur-xl"
                      style={{
                        backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-from), var(--tw-gradient-to))`,
                      }}
                    />
                    <div className="relative p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 backdrop-blur-sm transition-all">
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{
                          duration: 20,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${stat.color} mb-4`}
                      >
                        <stat.icon className="w-6 h-6 text-white" />
                      </motion.div>
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "backOut" }}
                        className="text-4xl font-bold text-white mb-2"
                      >
                        {stat.value}+
                      </motion.div>
                      <div className="text-sm text-gray-400 uppercase tracking-wide">
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

      {/* skills */}
      <section id="skills" className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-20">
              <motion.span className="inline-block px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-500 text-sm font-semibold mb-6">
                SERVICES &amp; EXPERTISE
              </motion.span>
              <h2 className="text-4xl md:text-6xl font-bold">
                <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                  What I Can Do
                </span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {userData.skillCategories.map((category, index) => (
                <motion.div
                  key={index}
                  variants={scaleIn}
                  whileHover={{ y: -10 }}
                  onMouseEnter={() => setActiveService(index)}
                  onMouseLeave={() => setActiveService(null)}
                  className="relative group"
                >
                  <motion.div
                    animate={{
                      opacity: activeService === index ? 1 : 0,
                      scale: activeService === index ? 1 : 0.8,
                    }}
                    className={`absolute inset-0 bg-gradient-to-br ${category.color} blur-xl opacity-0 group-hover:opacity-100 transition-all`}
                  />
                  <div className="relative p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 backdrop-blur-sm h-full transition-all">
                    <motion.div
                      animate={
                        activeService === index ? { rotate: 360 } : undefined
                      }
                      transition={{ duration: 0.6 }}
                      className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${category.color} mb-6`}
                    >
                      <Terminal className="w-8 h-8 text-white" />
                    </motion.div>

                    <h3 className="text-2xl font-bold text-white mb-4">
                      {category.category}
                    </h3>

                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill, skillIndex) => (
                        <motion.span
                          key={skillIndex}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: skillIndex * 0.1 }}
                          whileHover={{ scale: 1.1 }}
                          className="px-3 py-1 text-sm rounded-full bg-white/5 border border-white/10 text-gray-300 hover:border-orange-500/50 hover:text-orange-500 transition-all cursor-default"
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* experience */}
      {userData.experiences && userData.experiences.length > 0 && (
        <section className="relative py-32 overflow-hidden">
          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp} className="text-center mb-20">
                <motion.span className="inline-block px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-500 text-sm font-semibold mb-6">
                  EXPERIENCE
                </motion.span>
                <h2 className="text-4xl md:text-6xl font-bold">
                  <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                    My Journey
                  </span>
                </h2>
              </motion.div>

              <div className="relative">
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-orange-500 via-purple-500 to-transparent" />

                <div className="space-y-12">
                  {userData.experiences.map((exp, index) => (
                    <motion.div
                      key={index}
                      variants={fadeInLeft}
                      className="relative pl-20"
                    >
                      <motion.div
                        whileHover={{ scale: 1.5 }}
                        className="absolute left-6 top-6 w-5 h-5 rounded-full bg-gradient-to-r from-orange-500 to-purple-500 border-4 border-[#0a0a0a]"
                      />

                      <motion.div
                        whileHover={{ x: 10, scale: 1.02 }}
                        className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-orange-500/50 backdrop-blur-sm transition-all group"
                      >
                        <div className="flex flex-wrap items-center justify-between mb-4 gap-4">
                          <div>
                            <h3 className="text-2xl font-bold text-white group-hover:text-orange-500 transition-colors">
                              {exp.role}
                            </h3>
                            <p className="text-lg text-purple-400">
                              {exp.company}
                            </p>
                          </div>
                          <span className="px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-sm font-semibold">
                            {exp.period}
                          </span>
                        </div>

                        <p className="text-gray-400 mb-6 leading-relaxed">
                          {exp.description}
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {exp.skills.map((skill, skillIndex) => (
                            <span
                              key={skillIndex}
                              className="px-3 py-1 text-sm rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400"
                            >
                              {skill}
                            </span>
                          ))}
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

      {/* Certifications Section */}
      {userData.certifications && userData.certifications.length > 0 && (
        <section id="certifications" className="relative py-32 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp} className="text-center mb-20">
                <motion.span className="inline-block px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-sm font-semibold mb-6">
                  CERTIFICATIONS & AWARDS
                </motion.span>
                <h2 className="text-4xl md:text-6xl font-bold">
                  <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                    My Credentials
                  </span>
                </h2>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {userData.certifications.slice(0, 6).map((cert, index) => (
                  <motion.div
                    key={index}
                    variants={scaleIn}
                    whileHover={{ y: -10 }}
                    onClick={() => setShowAllCertificates(true)}
                    className="relative group cursor-pointer"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="relative p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 backdrop-blur-sm h-full transition-all">
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{
                          duration: 20,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="inline-flex p-4 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 mb-6 group-hover:scale-110 transition-transform"
                      >
                        <Award className="w-8 h-8 text-white" />
                      </motion.div>

                      <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-yellow-500 transition-colors">
                        {cert.title}
                      </h3>

                      <p className="text-gray-400 mb-6 leading-relaxed line-clamp-3">
                        {cert.description}
                      </p>

                      <div className="flex items-center space-x-2 text-sm">
                        <div className="w-2 h-2 rounded-full bg-yellow-500" />
                        <span className="text-gray-500">{cert.issueDate}</span>
                      </div>

                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <ExternalLink className="w-5 h-5 text-yellow-500" />
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
                    onClick={() => setShowAllCertificates(true)}
                    className="px-8 py-4 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 font-semibold text-white shadow-2xl shadow-yellow-500/50 transition-all flex items-center space-x-2 mx-auto group"
                  >
                    <span>View All {userData.certifications.length} Certifications</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
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
                    className="fixed inset-0 bg-black/95 backdrop-blur-xl z-50 flex items-center justify-center p-4 overflow-y-auto"
                  >
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0, y: 50 }}
                      animate={{ scale: 1, opacity: 1, y: 0 }}
                      exit={{ scale: 0.9, opacity: 0, y: 50 }}
                      transition={{ type: "spring", damping: 25, stiffness: 300 }}
                      onClick={(e) => e.stopPropagation()}
                      className="relative w-full max-w-7xl bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 md:p-12 my-8"
                    >
                      {/* Decorative gradients */}
                      <motion.div
                        animate={{
                          scale: [1, 1.2, 1],
                          rotate: [0, 180, 360],
                        }}
                        transition={{ duration: 30, repeat: Infinity }}
                        className="absolute -top-20 -right-20 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl"
                      />
                      <motion.div
                        animate={{
                          scale: [1, 1.3, 1],
                          rotate: [0, -180, -360],
                        }}
                        transition={{ duration: 35, repeat: Infinity }}
                        className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"
                      />

                      {/* Modal Header */}
                      <div className="relative z-10 flex justify-between items-center mb-12 pb-6 border-b border-white/10">
                        <div>
                          <motion.span className="inline-block px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-sm font-semibold mb-4">
                            ALL CERTIFICATIONS
                          </motion.span>
                          <h3 className="text-4xl md:text-5xl font-bold">
                            <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                              My Complete Credentials
                            </span>
                          </h3>
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.1, rotate: 90 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setShowAllCertificates(false)}
                          className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-red-500/20 hover:border-red-500/50 transition-all"
                        >
                          <X className="w-6 h-6 text-white" />
                        </motion.button>
                      </div>

                      {/* Modal Content - Scrollable Grid */}
                      <div className="relative z-10 max-h-[60vh] md:max-h-[65vh] overflow-y-auto pr-4 custom-scrollbar">
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                          {userData.certifications.map((cert, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.05 }}
                              whileHover={{ y: -5 }}
                              className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-yellow-500/50 backdrop-blur-sm transition-all group"
                            >
                              <div className="inline-flex p-3 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 mb-4 group-hover:scale-110 transition-transform">
                                <Award className="w-6 h-6 text-white" />
                              </div>

                              <h4 className="text-xl font-bold text-white mb-3 group-hover:text-yellow-500 transition-colors">
                                {cert.title}
                              </h4>

                              <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                                {cert.description}
                              </p>

                              <div className="flex items-center space-x-2 text-sm">
                                <div className="w-2 h-2 rounded-full bg-yellow-500" />
                                <span className="text-gray-500">{cert.issueDate}</span>
                              </div>
                            </motion.div>
                          ))}
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


      {/* projects */}
      <section id="projects" className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-20">
              <motion.span className="inline-block px-4 py-2 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-500 text-sm font-semibold mb-6">
                PORTFOLIO
              </motion.span>
              <h2 className="text-4xl md:text-6xl font-bold">
                <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                  Featured Work
                </span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {userData.projects.map((project, index) => (
                <motion.div
                  key={index}
                  variants={scaleIn}
                  whileHover={{ y: -10 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="relative rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 backdrop-blur-sm overflow-hidden transition-all">
                    <div className="relative h-64 overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
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
                          <Code className="w-20 h-20 text-gray-600" />
                        )}
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center space-x-4"
                      >
                        {project.links.live && (
                          <motion.a
                            href={project.links.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-3 rounded-full bg-orange-500 hover:bg-orange-600 transition-colors"
                          >
                            <ExternalLink className="w-5 h-5 text-white" />
                          </motion.a>
                        )}
                        {project.links.github && (
                          <motion.a
                            href={project.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-3 rounded-full bg-purple-500 hover:bg-purple-600 transition-colors"
                          >
                            <Github className="w-5 h-5 text-white" />
                          </motion.a>
                        )}
                      </motion.div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-orange-500 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-gray-400 mb-4 leading-relaxed">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-3 py-1 text-xs rounded-full bg-white/5 border border-white/10 text-gray-400"
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

      {/* contact */}
      <section id="contact" className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-orange-500/10 via-purple-500/10 to-pink-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <motion.span className="inline-block px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-500 text-sm font-semibold mb-6">
                GET IN TOUCH
              </motion.span>
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                  Let&apos;s Work Together
                </span>
              </h2>
              <p className="text-xl text-gray-400">
                Have a project in mind? Let&apos;s create something amazing!
              </p>
            </motion.div>

            <motion.div variants={scaleIn} className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-purple-500/10 rounded-3xl blur-xl" />

              <div className="relative p-8 md:p-12 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm">
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
                        transition={{
                          type: "spring",
                          stiffness: 200,
                          damping: 10,
                        }}
                        className="inline-flex p-6 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 mb-6"
                      >
                        <Send className="w-12 h-12 text-white" />
                      </motion.div>
                      <h3 className="text-3xl font-bold text-white mb-4">
                        Message Sent!
                      </h3>
                      <p className="text-gray-400">
                        Thank you for reaching out. I&apos;ll get back to you
                        soon.
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
                            className="block text-sm font-medium text-gray-300"
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
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-orange-500/50 focus:outline-none focus:ring-2 focus:ring-orange-500/20 text-white placeholder-gray-500 transition-all"
                            placeholder="John Doe"
                          />
                        </div>

                        <div className="space-y-2">
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-300"
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
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-orange-500/50 focus:outline-none focus:ring-2 focus:ring-orange-500/20 text-white placeholder-gray-500 transition-all"
                            placeholder="john@example.com"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor="message"
                          className="block text-sm font-medium text-gray-300"
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
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-orange-500/50 focus:outline-none focus:ring-2 focus:ring-orange-500/20 text-white placeholder-gray-500 transition-all resize-none"
                          placeholder="Tell me about your project..."
                        />
                      </div>

                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full py-4 rounded-xl bg-gradient-to-r from-orange-500 to-purple-500 hover:from-orange-600 hover:to-purple-600 font-semibold text-white shadow-2xl shadow-orange-500/50 transition-all flex items-center justify-center space-x-2 group"
                      >
                        <span>Send Message</span>
                        <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </motion.button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="mt-16">
              <div className="flex justify-center items-center space-x-6">
                {userData.socialLinks.map((social, index) => {
                  const iconMap: { [key: string]: React.ElementType } = {
                    github: Github,
                    linkedin: Linkedin,
                    twitter: Twitter,
                    mail: Mail,
                  }
                  const Icon =
                    iconMap[social.icon.toLowerCase()] || ExternalLink

                  // Tailwind does not support fully dynamic colors, so use a small map
                  const colorClasses: Record<
                    string,
                    { bg: string; text: string; border: string }
                  > = {
                    orange: {
                      bg: "hover:bg-orange-500/10",
                      text: "group-hover:text-orange-500",
                      border: "hover:border-orange-500/50",
                    },
                    purple: {
                      bg: "hover:bg-purple-500/10",
                      text: "group-hover:text-purple-500",
                      border: "hover:border-purple-500/50",
                    },
                    blue: {
                      bg: "hover:bg-blue-500/10",
                      text: "group-hover:text-blue-500",
                      border: "hover:border-blue-500/50",
                    },
                    pink: {
                      bg: "hover:bg-pink-500/10",
                      text: "group-hover:text-pink-500",
                      border: "hover:border-pink-500/50",
                    },
                  }
                  const color =
                    colorClasses[social.color] || colorClasses.orange

                  return (
                    <div style={{display : "flex" , justifyContent : "center" , alignItems : "center" , flexDirection : "column"}} >
                      <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                      className={`p-4 rounded-xl bg-white/5 border border-white/10 ${color.border} ${color.bg} transition-all group`}
                    >
                      <Icon
                        className={`w-6 h-6 text-gray-400 ${color.text} transition-colors`}
                      />
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

      {/* footer */}
      <footer className="relative py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="flex items-center space-x-2"
            >
              <Code className="w-6 h-6 text-orange-500" />
              <span className="text-lg font-bold bg-gradient-to-r from-orange-500 to-purple-500 bg-clip-text text-transparent">
                {userName}
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-gray-400 text-sm"
            >
              © {currentYear} All rights reserved. Built with ❤️ using Next.js
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="flex items-center space-x-4"
            >
              <a
                href="#home"
                className="text-gray-400 hover:text-orange-500 transition-colors"
              >
                Privacy
              </a>
              <span className="text-gray-600">•</span>
              <a
                href="#home"
                className="text-gray-400 hover:text-orange-500 transition-colors"
              >
                Terms
              </a>
            </motion.div>
          </div>
        </div>
      </footer>

      {/* scroll to top */}
      <AnimatePresence>
        {scrolled && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() =>
              window.scrollTo({ top: 0, behavior: "smooth" })
            }
            className="fixed bottom-8 right-8 z-50 p-4 rounded-full bg-gradient-to-r from-orange-500 to-purple-500 shadow-2xl shadow-orange-500/50"
          >
            <ChevronDown className="w-6 h-6 text-white rotate-180" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
