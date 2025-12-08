"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { 
  Menu, X, Github, Mail, Linkedin, Twitter, ExternalLink, 
  ArrowRight, Send, Sparkles, Zap, Cpu, Terminal, Code2, Rocket, 
  Heart, Star, Award, TrendingUp, Coffee, Book, Briefcase, 
  MessageCircle, Play, Pause, Sun, Moon, Download, MapPin
} from "lucide-react"
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

export default function LightThemePortfolio() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeSection, setActiveSection] = useState('home')

  const router = useRouter()
  const params = useParams()
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

  // Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  }

  const fadeInLeft = {
    hidden: { opacity: 0, x: -40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  }

  const fadeInRight = {
    hidden: { opacity: 0, x: 40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.15
      }
    }
  }

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  }

  const bounceIn = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { 
        type: "spring", 
        stiffness: 200, 
        damping: 15 
      }
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-blue-50 to-purple-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          {/* Animated Loader */}
          <div className="relative w-24 h-24 mx-auto mb-8">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border-4 border-rose-200 border-t-rose-500 rounded-full"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute inset-2 border-4 border-blue-200 border-b-blue-500 rounded-full"
            />
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Sparkles className="text-purple-500 w-10 h-10" />
            </motion.div>
          </div>
          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-purple-600 text-lg font-semibold"
          >
            Loading your experience...
          </motion.p>
        </motion.div>
      </div>
    )
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 to-purple-50 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-3xl shadow-xl">
          <X className="text-red-500 w-16 h-16 mx-auto mb-4" />
          <p className="text-red-600 text-xl font-bold mb-2">Oops!</p>
          <p className="text-gray-600">Failed to load portfolio data</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full bg-gradient-to-br from-rose-50 via-blue-50 to-purple-50 text-gray-800 overflow-x-hidden relative">
      {/* Animated Background Shapes */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-40">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            x: [0, 50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-rose-300 to-pink-300 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
            x: [0, -50, 0],
          }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-blue-300 to-purple-300 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            y: [0, 100, 0],
          }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-br from-yellow-200 to-orange-200 rounded-full blur-3xl"
        />
      </div>

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-400 via-purple-400 to-blue-400 origin-left z-50"
        style={{ scaleX: scaleProgress }}
      />

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`fixed top-0 w-full z-40 transition-all duration-300 ${
          scrolled 
            ? "bg-white/80 backdrop-blur-xl shadow-lg shadow-purple-100/50" 
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3 cursor-pointer"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="w-12 h-12 bg-gradient-to-br from-rose-400 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-300/50"
              >
                <Sparkles className="text-white" size={24} />
              </motion.div>
              <div>
                <div className="text-xl font-black bg-gradient-to-r from-rose-500 to-purple-600 bg-clip-text text-transparent">
                  {userName}
                </div>
                <div className="text-xs text-gray-500 font-medium">Creative Developer</div>
              </div>
            </motion.div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-2">
              {navLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
                    activeSection === link.href.replace('#', '')
                      ? 'bg-gradient-to-r from-rose-400 to-purple-500 text-white shadow-lg shadow-purple-300/50'
                      : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
                  }`}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-11 h-11 bg-gradient-to-br from-rose-400 to-purple-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-purple-300/50"
            >
              <AnimatePresence mode="wait">
                {mobileOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90 }}
                    animate={{ rotate: 0 }}
                    exit={{ rotate: 90 }}
                  >
                    <X size={20} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90 }}
                    animate={{ rotate: 0 }}
                    exit={{ rotate: -90 }}
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
              className="md:hidden bg-white/95 backdrop-blur-xl shadow-xl"
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
                    className="block px-5 py-3 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl hover:from-purple-100 hover:to-blue-100 transition-all font-bold text-gray-700"
                  >
                    {link.label}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* HERO SECTION - Asymmetric Layout */}
      <section id="home" className="relative min-h-screen pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.div variants={bounceIn} className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-lg shadow-purple-200/50 mb-6">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"
                />
                <span className="text-sm font-bold text-gray-700">Available for work</span>
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="text-6xl lg:text-7xl font-black mb-6 leading-tight"
              >
                <span className="text-gray-800">{userData.hero.title}</span>
                <br />
                <motion.span
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{ duration: 5, repeat: Infinity }}
                  className="bg-gradient-to-r from-rose-500 via-purple-500 to-blue-500 bg-clip-text text-transparent"
                  style={{ backgroundSize: "200% auto" }}
                >
                  {userData.hero.highlightText}
                </motion.span>
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="text-xl text-gray-600 mb-10 leading-relaxed"
              >
                {userData.hero.subtitle}
              </motion.p>

              <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
                <motion.a
                  href="#projects"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="group px-8 py-4 bg-gradient-to-r from-rose-500 to-purple-600 text-white rounded-full font-bold flex items-center gap-2 shadow-xl shadow-purple-300/50"
                >
                  {userData.hero.primaryButtonText}
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight size={20} />
                  </motion.div>
                </motion.a>

                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white border-2 border-purple-200 text-purple-600 rounded-full font-bold hover:border-purple-400 transition-all shadow-lg"
                >
                  {userData.hero.secondaryButtonText}
                </motion.a>
              </motion.div>

              {/* Social Links */}
              <motion.div variants={fadeInUp} className="flex gap-3 mt-10">
                {userData.socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -5, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all"
                    style={{ color: social.color }}
                  >
                    <span className="text-xl">{social.icon}</span>
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>

            {/* Right - Floating Cards */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="relative"
            >
              {/* Main Card */}
              <motion.div
                variants={fadeInRight}
                whileHover={{ scale: 1.02, rotate: 1 }}
                className="relative p-8 bg-white rounded-3xl shadow-2xl shadow-purple-200/50"
              >
                <div className="aspect-square bg-gradient-to-br from-rose-100 via-purple-100 to-blue-100 rounded-2xl flex items-center justify-center overflow-hidden relative">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 bg-gradient-to-br from-rose-300/30 via-transparent to-blue-300/30"
                  />
                  <Code2 className="text-purple-400 w-32 h-32 relative z-10" />
                </div>

                {/* Floating Badge */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -top-4 -right-4 px-6 py-3 bg-gradient-to-r from-rose-500 to-purple-600 text-white rounded-full font-bold shadow-xl"
                >
                  ✨ Featured
                </motion.div>
              </motion.div>

              {/* Floating Mini Cards */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="absolute -bottom-6 -left-6 px-6 py-4 bg-white rounded-2xl shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center">
                    <Star className="text-white" size={20} />
                  </div>
                  <div>
                    <div className="text-2xl font-black text-gray-800">{userData.aboutMe.stats.projectsCompleted}+</div>
                    <div className="text-xs text-gray-500">Projects</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="absolute -top-6 -left-6 px-6 py-4 bg-white rounded-2xl shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-xl flex items-center justify-center">
                    <Zap className="text-white" size={20} />
                  </div>
                  <div>
                    <div className="text-2xl font-black text-gray-800">{userData.aboutMe.stats.yearsExperience}+</div>
                    <div className="text-xs text-gray-500">Years Exp</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION - Card Grid Layout */}
      <section id="about" className="relative py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.div variants={bounceIn} className="inline-flex items-center gap-2 px-5 py-2 bg-white rounded-full shadow-lg mb-6">
              <Book className="text-purple-500" size={18} />
              <span className="text-sm font-bold text-gray-700">{userData.aboutMe.sectionTitle}</span>
            </motion.div>

            <motion.h2 variants={fadeInUp} className="text-5xl lg:text-6xl font-black mb-6">
              {userData.aboutMe.headline.split(' ').map((word, i) => (
                <span
                  key={i}
                  className={i % 2 === 0 ? "text-gray-800" : "text-transparent bg-gradient-to-r from-rose-500 to-purple-600 bg-clip-text"}
                >
                  {word}{' '}
                </span>
              ))}
            </motion.h2>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Story Card */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInLeft}
              whileHover={{ y: -10 }}
              className="lg:col-span-2 p-10 bg-white rounded-3xl shadow-xl"
            >
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-600 leading-relaxed border-l-4 border-purple-400 pl-6 italic mb-6">
                  {userData.aboutMe.introduction}
                </p>
                <p className="text-gray-600 leading-relaxed">
                  {userData.aboutMe.description}
                </p>
              </div>

              {/* Core Values */}
              {userData.aboutMe.coreValues.length > 0 && (
                <div className="mt-8 grid md:grid-cols-2 gap-4">
                  {userData.aboutMe.coreValues.map((value, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl"
                    >
                      <div className="w-10 h-10 bg-gradient-to-br from-rose-400 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Sparkles className="text-white" size={16} />
                      </div>
                      <span className="font-semibold text-gray-700">{value}</span>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Stats Column */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInRight}
              className="space-y-4"
            >
              {[
                { icon: <Rocket size={32} />, number: userData.aboutMe.stats.projectsCompleted, label: "Projects", gradient: "from-rose-400 to-pink-500" },
                { icon: <Zap size={32} />, number: userData.aboutMe.stats.yearsExperience, label: "Years", gradient: "from-blue-400 to-cyan-500" },
                { icon: <Heart size={32} />, number: userData.aboutMe.stats.happyClients, label: "Clients", gradient: "from-purple-400 to-pink-500" },
                { icon: <Cpu size={32} />, number: userData.aboutMe.stats.techSkills, label: "Skills", gradient: "from-orange-400 to-red-500" },
              ].filter(stat => stat.number > 0).map((stat, index) => (
                <motion.div
                  key={index}
                  variants={scaleIn}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all"
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${stat.gradient} rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg`}>
                    {stat.icon}
                  </div>
                  <div className={`text-4xl font-black bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-1`}>
                    {stat.number}+
                  </div>
                  <div className="text-sm text-gray-600 font-bold uppercase tracking-wide">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* SKILLS SECTION - Bubble Layout */}
      <section id="skills" className="relative py-24 px-6 bg-gradient-to-b from-transparent via-purple-50/50 to-transparent">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <motion.div variants={bounceIn} className="inline-flex items-center gap-2 px-5 py-2 bg-white rounded-full shadow-lg mb-6">
              <Terminal className="text-blue-500" size={18} />
              <span className="text-sm font-bold text-gray-700">Tech Stack</span>
            </motion.div>

            <h2 className="text-5xl lg:text-6xl font-black mb-6">
              <span className="text-gray-800">Skills & </span>
              <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                Expertise
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="space-y-6"
          >
            {userData.skillCategories.length > 0 ? (
              userData.skillCategories.map((category, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.02 }}
                  className="p-8 bg-white rounded-3xl shadow-xl"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="w-16 h-16 bg-gradient-to-br from-rose-400 to-purple-500 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg"
                    >
                      {category.icon}
                    </motion.div>
                    <div>
                      <h3 className="text-2xl font-black text-gray-800">{category.category}</h3>
                      <div className="h-1 w-16 bg-gradient-to-r from-rose-400 to-purple-500 rounded-full mt-1" />
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {category.skills.map((skill, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.05, type: "spring" }}
                        whileHover={{ scale: 1.1, y: -3 }}
                        className="px-5 py-2.5 bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-100 rounded-full font-bold text-gray-700 hover:border-purple-300 transition-all cursor-pointer shadow-sm hover:shadow-lg"
                      >
                        {skill}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-20">
                <Terminal className="mx-auto mb-4 text-gray-300" size={64} />
                <p className="text-gray-400">No skills added yet</p>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* EXPERIENCE SECTION - Horizontal Cards */}
      {userData.experiences && userData.experiences.length > 0 && (
        <section id="experience" className="relative py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-16"
            >
              <motion.div variants={bounceIn} className="inline-flex items-center gap-2 px-5 py-2 bg-white rounded-full shadow-lg mb-6">
                <Briefcase className="text-purple-500" size={18} />
                <span className="text-sm font-bold text-gray-700">Experience</span>
              </motion.div>

              <h2 className="text-5xl lg:text-6xl font-black mb-6">
                <span className="text-gray-800">Work </span>
                <span className="bg-gradient-to-r from-purple-500 to-pink-600 bg-clip-text text-transparent">
                  Journey
                </span>
              </h2>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="space-y-6"
            >
              {userData.experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="p-8 bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all relative overflow-hidden group"
                >
                  {/* Gradient Accent */}
                  <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-rose-400 via-purple-500 to-blue-500" />

                  <div className="pl-6">
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                      <div>
                        <h3 className="text-2xl font-black text-gray-800 mb-2">{exp.role}</h3>
                        <p className="text-purple-600 font-bold flex items-center gap-2">
                          <TrendingUp size={16} />
                          {exp.company}
                        </p>
                      </div>
                      <div className="px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full">
                        <span className="text-sm font-bold text-purple-700">{exp.period}</span>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-6 leading-relaxed">{exp.description}</p>

                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-4 py-1.5 bg-gradient-to-r from-rose-50 to-purple-50 border border-purple-200 rounded-lg text-xs font-bold text-gray-700"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Number Badge */}
                  <motion.div
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute top-8 right-8 w-12 h-12 bg-gradient-to-br from-rose-400 to-purple-500 rounded-full flex items-center justify-center text-white font-black shadow-lg"
                  >
                    {String(index + 1).padStart(2, '0')}
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* PROJECTS SECTION - Pinterest Style */}
      <section id="projects" className="relative py-24 px-6 bg-gradient-to-b from-transparent via-blue-50/50 to-transparent">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <motion.div variants={bounceIn} className="inline-flex items-center gap-2 px-5 py-2 bg-white rounded-full shadow-lg mb-6">
              <Rocket className="text-rose-500" size={18} />
              <span className="text-sm font-bold text-gray-700">Portfolio</span>
            </motion.div>

            <h2 className="text-5xl lg:text-6xl font-black mb-6">
              <span className="text-gray-800">Featured </span>
              <span className="bg-gradient-to-r from-rose-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                Projects
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A collection of my best work and creative solutions
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
                  whileHover={{ y: -10 }}
                  className="group"
                >
                  <div className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all">
                    {/* Image */}
                    <div className="relative h-64 overflow-hidden bg-gradient-to-br from-rose-100 via-purple-100 to-blue-100">
                      {project.image ? (
                        <motion.img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.6 }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Rocket size={80} className="text-purple-300" />
                        </div>
                      )}

                      {/* Hover Overlay */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        className="absolute inset-0 bg-gradient-to-br from-rose-500/90 to-purple-600/90 flex items-center justify-center gap-4"
                      >
                        {project.links.live && (
                          <motion.a
                            href={project.links.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.2, rotate: 10 }}
                            whileTap={{ scale: 0.9 }}
                            className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-xl"
                          >
                            <ExternalLink className="text-purple-600" size={24} />
                          </motion.a>
                        )}
                        {project.links.github && (
                          <motion.a
                            href={project.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.2, rotate: -10 }}
                            whileTap={{ scale: 0.9 }}
                            className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-xl"
                          >
                            <Github className="text-gray-800" size={24} />
                          </motion.a>
                        )}
                      </motion.div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-black text-gray-800 mb-3 group-hover:text-purple-600 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {project.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {project.tags.slice(0, 3).map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-full text-xs font-bold text-gray-700"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-20">
                <Rocket className="mx-auto mb-4 text-gray-300" size={64} />
                <p className="text-gray-400">No projects yet</p>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* CONTACT SECTION - Centered Card */}
      <section id="contact" className="relative py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <motion.div variants={bounceIn} className="inline-flex items-center gap-2 px-5 py-2 bg-white rounded-full shadow-lg mb-6">
                <MessageCircle className="text-purple-500" size={18} />
                <span className="text-sm font-bold text-gray-700">Get In Touch</span>
              </motion.div>

              <h2 className="text-5xl lg:text-6xl font-black mb-6">
                <span className="text-gray-800">Let's Work </span>
                <span className="bg-gradient-to-r from-rose-500 to-purple-600 bg-clip-text text-transparent">
                  Together
                </span>
              </h2>
              <p className="text-xl text-gray-600">
                Have a project in mind? Drop me a message!
              </p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="p-10 bg-white rounded-3xl shadow-2xl"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Your Name
                    </label>
                    <motion.input
                      whileFocus={{ scale: 1.02 }}
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-4 bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-100 rounded-2xl focus:border-purple-400 focus:outline-none transition-all font-medium"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Email Address
                    </label>
                    <motion.input
                      whileFocus={{ scale: 1.02 }}
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-4 bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-100 rounded-2xl focus:border-purple-400 focus:outline-none transition-all font-medium"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Your Message
                  </label>
                  <motion.textarea
                    whileFocus={{ scale: 1.02 }}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-5 py-4 bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-100 rounded-2xl focus:border-purple-400 focus:outline-none transition-all font-medium resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={submitted}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full px-8 py-5 bg-gradient-to-r from-rose-500 to-purple-600 text-white rounded-2xl font-black text-lg flex items-center justify-center gap-3 disabled:opacity-50 shadow-xl shadow-purple-300/50"
                >
                  {submitted ? (
                    <>
                      <Award size={24} />
                      Message Sent Successfully!
                    </>
                  ) : (
                    <>
                      <Send size={24} />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>

              {/* Social Links */}
              <div className="mt-10 pt-10 border-t border-gray-200">
                <p className="text-center text-sm font-bold text-gray-500 mb-6 uppercase tracking-wider">
                  Or connect with me
                </p>
                <div className="flex justify-center gap-4">
                  {userData.socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -5, scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-14 h-14 bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-100 rounded-2xl flex items-center justify-center hover:border-purple-300 transition-all shadow-lg"
                      style={{ color: social.color }}
                    >
                      <span className="text-2xl">{social.icon}</span>
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative py-12 px-6 bg-white/50 backdrop-blur-xl border-t border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-rose-400 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Sparkles className="text-white" size={20} />
              </div>
              <div>
                <div className="font-black text-gray-800">{userName}</div>
                <div className="text-xs text-gray-500">© {currentYear} All rights reserved</div>
              </div>
            </div>

            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex items-center gap-2 text-sm text-gray-600"
            >
              <Heart className="text-rose-500" size={16} />
              <span>Made with passion</span>
            </motion.div>

            <div className="flex gap-6 text-sm text-gray-600">
              <Link href="#" className="hover:text-purple-600 transition-colors font-medium">Privacy</Link>
              <Link href="#" className="hover:text-purple-600 transition-colors font-medium">Terms</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
