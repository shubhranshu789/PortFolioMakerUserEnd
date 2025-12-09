"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, Github, Mail, Linkedin, Twitter, ExternalLink, ChevronDown, ArrowRight, Send, Code, Zap, Target, Star, Award, Users, Briefcase } from "lucide-react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
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

export default function InnovatePortfolio() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeService, setActiveService] = useState<number | null>(0)

  const router = useRouter()
  const params = useParams()
  const { scrollYProgress } = useScroll()
  const scaleProgress = useTransform(scrollYProgress, [0, 1], [0, 1])

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
    { label: "DASHBOARD", href: "/Components/DashBoard" },
  ]

  const currentYear = new Date().getFullYear()

  // Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
  }

  const fadeInLeft = {
    hidden: { opacity: 0, x: -60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  }

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-20 h-20 md:w-24 md:h-24 border-4 border-gray-800 border-t-orange-500 rounded-full mx-auto mb-6 md:mb-8"
          />
          <p className="text-orange-500 text-lg md:text-2xl font-bold tracking-widest uppercase px-4">Loading...</p>
        </motion.div>
      </div>
    )
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
        <p className="text-orange-500 text-xl md:text-2xl font-bold text-center">Failed to load portfolio</p>
      </div>
    )
  }

  return (
    <div className="bg-white text-gray-900 font-sans overflow-x-hidden">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-red-500 to-purple-600 transform origin-left z-50"
        style={{ scaleX: scaleProgress }}
      />

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 w-full z-40 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-transparent"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-xl md:text-2xl font-black tracking-tighter"
            >
              <span className="text-gray-900">{userName}</span>
              <span className="text-orange-500">.</span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {link.href.startsWith('#') ? (
                    <a
                      href={link.href}
                      className="text-sm font-bold tracking-wider hover:text-orange-500 transition-colors"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-sm font-bold tracking-wider hover:text-orange-500 transition-colors"
                    >
                      {link.label}
                    </Link>
                  )}
                </motion.div>
              ))}
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-black text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-orange-500 transition-colors"
              >
                Hire Me!
              </motion.a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden text-gray-900 hover:text-orange-500 transition-colors"
            >
              {mobileOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-gray-200"
            >
              <div className="px-4 py-6 space-y-4">
                {navLinks.map((link) => (
                  <div key={link.label}>
                    {link.href.startsWith('#') ? (
                      <a
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className="block text-sm font-bold tracking-wider hover:text-orange-500 transition-colors py-2"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className="block text-sm font-bold tracking-wider hover:text-orange-500 transition-colors py-2"
                      >
                        {link.label}
                      </Link>
                    )}
                  </div>
                ))}
                <a
                  href="#contact"
                  onClick={() => setMobileOpen(false)}
                  className="block bg-black text-white px-6 py-2.5 rounded-full text-sm font-bold text-center hover:bg-orange-500 transition-colors"
                >
                  Hire Me!
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section - Inspired by Left Image */}
      <section id="home" className="min-h-screen pt-20 md:pt-24 relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="space-y-6 md:space-y-8"
            >
              <motion.div variants={fadeInUp} className="space-y-2">
                <p className="text-orange-500 text-sm md:text-base font-bold tracking-widest uppercase">
                  Hi 👋 I'm {userName}
                </p>
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-none"
              >
                <span className="block text-gray-900">DEVELOPER</span>
                <motion.span
                  className="block bg-gradient-to-r from-orange-500 via-red-500 to-purple-600 bg-clip-text text-transparent"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{ duration: 5, repeat: Infinity }}
                  style={{ backgroundSize: "200% 200%" }}
                >
                  {userData.hero.highlightText || "DESIGNER"}
                </motion.span>
              </motion.h1>

              <motion.h2
                variants={fadeInUp}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter"
              >
                {userData.hero.title}
              </motion.h2>

              <motion.p
                variants={fadeInUp}
                className="text-base md:text-lg text-gray-600 max-w-xl leading-relaxed"
              >
                {userData.hero.subtitle}
              </motion.p>

              <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 pt-4">
                <motion.a
                  href="#projects"
                  whileHover={{ scale: 1.05, backgroundColor: "#000" }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-orange-500 text-white px-8 py-4 rounded-full text-sm md:text-base font-bold hover:bg-black transition-colors inline-flex items-center gap-2"
                >
                  {userData.hero.primaryButtonText}
                  <ArrowRight size={20} />
                </motion.a>
                <motion.a
                  href={userData.socialLinks.find(link => link.label === 'Email')?.href || '#contact'}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-black text-black px-8 py-4 rounded-full text-sm md:text-base font-bold hover:bg-black hover:text-white transition-all inline-flex items-center gap-2"
                >
                  {userData.hero.secondaryButtonText}
                </motion.a>
              </motion.div>

              {/* <motion.div variants={fadeInUp} className="flex gap-4 pt-4">
                {userData.socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-900 hover:bg-orange-500 text-white flex items-center justify-center transition-colors"
                  >
                    {social.icon === 'github' && <Github size={20} />}
                    {social.icon === 'linkedin' && <Linkedin size={20} />}
                    {social.icon === 'twitter' && <Twitter size={20} />}
                    {social.icon === 'email' && <Mail size={20} />}
                  </motion.a>
                ))}
              </motion.div> */}
            </motion.div>

            {/* Right Content - Hero Card with Silhouette */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div className="bg-white rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
                {/* Decorative Elements */}
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 90, 0],
                  }}
                  transition={{ duration: 20, repeat: Infinity }}
                  className="absolute -top-20 -right-20 w-64 h-64 bg-orange-500 rounded-full opacity-20 blur-3xl"
                />
                <motion.div
                  animate={{
                    scale: [1, 1.3, 1],
                    rotate: [0, -90, 0],
                  }}
                  transition={{ duration: 25, repeat: Infinity }}
                  className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-500 rounded-full opacity-20 blur-3xl"
                />

                {/* Silhouette with Circular Background */}
                <div className="relative mb-6">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 bg-gradient-to-br from-orange-500 to-red-500 rounded-full blur-2xl opacity-50"
                  />
                  <div className="relative w-48 h-48 md:w-64 md:h-64 mx-auto bg-gradient-to-br from-orange-500 via-red-500 to-orange-600 rounded-full overflow-hidden">
                    {/* Placeholder Silhouette - Replace with actual image */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-full h-full bg-black opacity-80" style={{
                        clipPath: "polygon(50% 20%, 35% 40%, 30% 100%, 70% 100%, 65% 40%)"
                      }} />
                    </div>

                    {/* Floating Labels */}
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute top-8 left-4 md:top-12 md:left-8 bg-black text-white px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-bold"
                    >
                      Branding
                    </motion.div>
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                      className="absolute top-12 right-4 md:top-16 md:right-8 bg-black text-white px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-bold"
                    >
                      Designer
                    </motion.div>
                  </div>
                </div>

                {/* Info Card */}
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-gray-50 rounded-2xl p-4 md:p-6 border border-gray-200"
                >
                  <p className="text-xs md:text-sm text-gray-600 mb-2 font-semibold">
                    {userData.aboutMe.stats.yearsExperience}+ Years of Experience
                  </p>
                  <p className="text-sm md:text-base text-gray-900 font-bold mb-2">{userData.aboutMe.headline}</p>
                  <div className="flex items-center gap-2">
                    <Mail size={16} className="text-orange-500" />
                    <a href={`mailto:${userEmail}`} className="text-xs md:text-sm text-orange-500 hover:underline">
                      {userEmail}
                    </a>
                  </div>
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="absolute bottom-4 right-4 md:bottom-6 md:right-6 w-12 h-12 md:w-16 md:h-16 bg-black rounded-full flex items-center justify-center text-white text-xs md:text-sm font-bold"
                  >
                    <span className="transform -rotate-12">HIRE<br />ME!</span>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section with Stats - Right Side Design */}
      <section id="about" className="py-16 md:py-24 bg-gradient-to-br from-gray-200 to-gray-300 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start"
          >
            {/* Left: Stats and Info */}
            <div className="space-y-6">
              <motion.div variants={fadeInUp}>
                <h2 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter mb-4">
                  {userData.aboutMe.sectionTitle}
                </h2>
                <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                  {userData.aboutMe.description}
                </p>
              </motion.div>

              {/* Stats Grid */}
              <motion.div variants={fadeInUp} className="grid grid-cols-2 gap-4">
                <motion.div
                  whileHover={{ scale: 1.05, backgroundColor: "#FFF" }}
                  className="bg-white rounded-2xl p-6 shadow-lg"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-4xl md:text-5xl font-black text-gray-900">
                      {String(userData.aboutMe.stats.yearsExperience).padStart(2, '0')}
                    </h3>
                    <Star className="text-orange-500" size={24} />
                  </div>
                  <p className="text-xs md:text-sm text-gray-600 font-semibold">Years of Experience</p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05, backgroundColor: "#FFF" }}
                  className="bg-white rounded-2xl p-6 shadow-lg"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-4xl md:text-5xl font-black text-gray-900">
                      {String(userData.aboutMe.stats.techSkills).padStart(2, '0')}+
                    </h3>
                    <Award className="text-orange-500" size={24} />
                  </div>
                  <p className="text-xs md:text-sm text-gray-600 font-semibold">Tech Skills</p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05, backgroundColor: "#FFF" }}
                  className="bg-white rounded-2xl p-6 shadow-lg"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-4xl md:text-5xl font-black text-gray-900">
                      {userData.aboutMe.stats.projectsCompleted}+
                    </h3>
                    <Briefcase className="text-orange-500" size={24} />
                  </div>
                  <p className="text-xs md:text-sm text-gray-600 font-semibold">Total Projects</p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05, backgroundColor: "#FFF" }}
                  className="bg-white rounded-2xl p-6 shadow-lg"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-4xl md:text-5xl font-black text-gray-900">
                      {String(userData.aboutMe.stats.happyClients).padStart(2, '0')}+
                    </h3>
                    <Users className="text-orange-500" size={24} />
                  </div>
                  <p className="text-xs md:text-sm text-gray-600 font-semibold">Happy Clients</p>
                </motion.div>
              </motion.div>
            </div>

            {/* Right: Portfolio Grid */}
            <motion.div variants={fadeInUp} className="space-y-4">
              <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg mb-4">
                <h3 className="text-2xl md:text-3xl font-black mb-2">
                  {userData.aboutMe.headline}
                </h3>
                <p className="text-sm md:text-base text-gray-600 mb-4">
                  {userData.aboutMe.introduction}
                </p>
                <div className="flex flex-wrap gap-2">
                  {userData.aboutMe.coreValues.map((value, index) => (
                    <motion.span
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      className="bg-orange-100 text-orange-700 px-3 py-1.5 rounded-full text-xs md:text-sm font-bold"
                    >
                      {value}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Latest Projects Grid */}
              <div className="grid grid-cols-2 gap-4">
                {userData.projects.slice(0, 4).map((project, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="bg-white rounded-2xl overflow-hidden shadow-lg cursor-pointer group"
                  >
                    <div className="relative aspect-square bg-gradient-to-br from-orange-400 to-red-500 overflow-hidden">
                      {project.image ? (
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Code size={40} className="text-white opacity-50" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity" />
                    </div>
                    <div className="p-3 md:p-4">
                      <h4 className="text-xs md:text-sm font-bold text-gray-900 uppercase tracking-wider mb-1">
                        {project.title}
                      </h4>
                      <div className="flex items-center gap-2">
                        <ExternalLink size={14} className="text-orange-500" />
                        <span className="text-xs text-gray-500">View Project</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Section with Accordion */}
      <section id="skills" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="mb-12">
              <p className="text-orange-500 text-sm md:text-base font-bold tracking-widest uppercase mb-4">
                SERVICES |
              </p>
              <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter">
                SERVICE
              </h2>
            </motion.div>

            <div className="space-y-4">
              {userData.skillCategories.map((category, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="border-b-4 border-gray-200"
                >
                  <button
                    onClick={() => setActiveService(activeService === index ? null : index)}
                    className="w-full flex items-center justify-between py-6 md:py-8 group hover:bg-gray-50 transition-colors px-4 md:px-6 rounded-t-2xl"
                  >
                    <h3 className="text-2xl sm:text-3xl md:text-5xl font-black text-left tracking-tight group-hover:text-orange-500 transition-colors">
                      {category.category}
                    </h3>
                    <motion.div
                      animate={{ rotate: activeService === index ? 45 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-4xl md:text-6xl font-light"
                    >
                      {activeService === index ? '−' : '+'}
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {activeService === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 md:px-6 pb-6 md:pb-8">
                          <p className="text-sm md:text-base text-gray-600 mb-4 max-w-3xl">
                            Efficient, knowledgeable, & smooth experience. Highly recommended
                          </p>
                          <div className="flex flex-wrap gap-2 md:gap-3">
                            {category.skills.map((skill, skillIndex) => (
                              <motion.span
                                key={skillIndex}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: skillIndex * 0.05 }}
                                whileHover={{ scale: 1.1, backgroundColor: "#ff9900ff", color: "#fff" }}
                                className="bg-gray-900 text-white px-4 md:px-6 py-2 md:py-3 rounded-full text-xs md:text-sm font-bold cursor-pointer"
                              >
                                {skill}
                              </motion.span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 md:py-24 bg-gradient-to-br from-gray-100 to-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="mb-12">
              <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-4">
                LATEST WORK
              </h2>
              <p className="text-base md:text-lg text-gray-600">
                Check out my recent projects and creative solutions
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {userData.projects.map((project, index) => (
                <motion.div
                  key={index}
                  variants={scaleIn}
                  whileHover={{ y: -10 }}
                  className="bg-white rounded-3xl overflow-hidden shadow-xl group cursor-pointer"
                >
                  <div className="relative aspect-[4/3] bg-gradient-to-br from-orange-400 to-purple-500 overflow-hidden">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Code size={60} className="text-white opacity-50" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Project Links on Hover */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileHover={{ opacity: 1, y: 0 }}
                      className="absolute bottom-4 left-4 right-4 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      {project.links.live && (
                        <a
                          href={project.links.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 bg-white text-black px-4 py-2 rounded-full text-sm font-bold hover:bg-orange-500 hover:text-white transition-colors flex items-center justify-center gap-2"
                        >
                          <ExternalLink size={16} />
                          Live
                        </a>
                      )}
                      {project.links.github && (
                        <a
                          href={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 bg-white text-black px-4 py-2 rounded-full text-sm font-bold hover:bg-orange-500 hover:text-white transition-colors flex items-center justify-center gap-2"
                        >
                          <Github size={16} />
                          Code
                        </a>
                      )}
                    </motion.div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl md:text-2xl font-black mb-2 group-hover:text-orange-500 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm md:text-base text-gray-600 mb-4 line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.slice(0, 3).map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-bold"
                        >
                          {tag}
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

      {/* Experience Section */}
      {userData.experiences && userData.experiences.length > 0 && (
        <section id="experience" className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp} className="mb-12">
                <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-4">
                  EXPERIENCE
                </h2>
              </motion.div>

              <div className="space-y-6 md:space-y-8">
                {userData.experiences.map((exp, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInLeft}
                    whileHover={{ x: 10 }}
                    className="border-l-4 border-orange-500 pl-6 md:pl-8 py-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                      <h3 className="text-2xl md:text-3xl font-black mb-1 sm:mb-0">{exp.role}</h3>
                      <span className="text-sm md:text-base text-gray-500 font-bold">{exp.period}</span>
                    </div>
                    <p className="text-lg md:text-xl text-orange-500 font-bold mb-3">{exp.company}</p>
                    <p className="text-sm md:text-base text-gray-600 mb-4">{exp.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="bg-gray-900 text-white px-3 py-1.5 rounded-full text-xs md:text-sm font-bold"
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
      )}


      {/* CERTIFICATIONS SECTION - Responsive Modal Design */}
      {userData.certifications && userData.certifications.length > 0 && (
        <section id="certifications" className="relative py-16 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="mb-12 md:mb-16 lg:mb-20"
            >
              <span className="text-[10px] md:text-xs font-medium tracking-[0.2em] md:tracking-[0.3em] text-orange-500 uppercase border-l-2 border-orange-500 pl-3 md:pl-4 mb-6 md:mb-8 inline-block">
                CERTIFICATIONS
              </span>
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white uppercase">
                CREDENTIALS & <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500">AWARDS</span>
              </h2>
            </motion.div>

            {userData.certifications && userData.certifications.length > 0 ? (
              <>
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={staggerContainer}
                  className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                >
                  {userData.certifications.slice(0, 6).map((cert, index) => (
                    <motion.div
                      key={index}
                      variants={scaleIn}
                      whileHover={{ y: -10 }}
                      onClick={() => setShowAllCertificates(true)}
                      className="group p-6 md:p-8 bg-white/5 border border-white/10 rounded-sm hover:bg-white/10 hover:border-orange-500/50 transition-all duration-500 cursor-pointer"
                    >
                      <div className="mb-6 md:mb-8">
                        <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-orange-500 to-yellow-600 rounded-sm flex items-center justify-center text-2xl md:text-3xl mb-4 md:mb-6 group-hover:scale-110 transition-transform">
                          🏆
                        </div>
                        <h3 className="text-lg md:text-xl font-black text-black uppercase mb-3 md:mb-4 group-hover:text-orange-500 transition-colors leading-tight">
                          {cert.title}
                        </h3>
                        <div className="w-10 md:w-12 h-[2px] bg-gradient-to-r from-orange-500 to-transparent group-hover:w-16 md:group-hover:w-20 transition-all mb-4 md:mb-6" />
                      </div>

                      <p className="text-gray-400 text-xs md:text-sm mb-4 md:mb-6 leading-relaxed line-clamp-3">
                        {cert.description}
                      </p>

                      <div className="flex items-center gap-2 text-orange-500 text-[10px] md:text-xs uppercase tracking-widest">
                        <span>📅</span>
                        {cert.issueDate}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                {/* View All Button */}
                {userData.certifications.length > 6 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mt-12 md:mt-16"
                  >
                    <motion.button
                      whileHover={{ scale: 1.05, x: 10 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowAllCertificates(true)}
                      className="group inline-flex items-center gap-3 md:gap-4 px-8 md:px-10 py-4 md:py-5 bg-gradient-to-r from-orange-500 to-yellow-600 text-black font-bold rounded-sm uppercase tracking-widest text-xs md:text-sm"
                    >
                      VIEW ALL {userData.certifications.length} CERTIFICATIONS
                      <ExternalLink className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" size={18} />
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
                        className="relative w-full max-w-7xl bg-[#0a0a0a] border-2 border-orange-500/50 rounded-sm p-6 md:p-10 lg:p-12 my-8"
                      >
                        {/* Modal Header */}
                        <div className="flex justify-between items-center mb-8 md:mb-12 pb-6 md:pb-8 border-b border-white/10">
                          <div>
                            <span className="text-[10px] md:text-xs font-medium tracking-[0.2em] md:tracking-[0.3em] text-orange-500 uppercase border-l-2 border-orange-500 pl-3 md:pl-4 mb-3 md:mb-4 inline-block">
                              ALL CERTIFICATIONS
                            </span>
                            <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase">
                              MY <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500">CREDENTIALS</span>
                            </h3>
                          </div>

                          <motion.button
                            whileHover={{ scale: 1.1, rotate: 90 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setShowAllCertificates(false)}
                            className="w-10 h-10 md:w-12 md:h-12 bg-white/5 border border-white/10 rounded-sm flex items-center justify-center hover:bg-orange-500/10 hover:border-orange-500/50 transition-all flex-shrink-0"
                          >
                            <X size={24} className="text-white" />
                          </motion.button>
                        </div>

                        {/* Modal Content - Scrollable Grid */}
                        <div className="max-h-[60vh] md:max-h-[65vh] overflow-y-auto pr-2 md:pr-4 custom-scrollbar">
                          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                            {userData.certifications.map((cert, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                whileHover={{ y: -5 }}
                                className="group p-5 md:p-6 lg:p-8 bg-white/5 border border-white/10 rounded-sm hover:bg-white/10 hover:border-orange-500/50 transition-all duration-500"
                              >
                                <div className="mb-4 md:mb-6">
                                  <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-orange-500 to-yellow-600 rounded-sm flex items-center justify-center text-xl md:text-2xl mb-3 md:mb-4 group-hover:scale-110 transition-transform">
                                    🏆
                                  </div>
                                  <h4 className="text-base md:text-lg font-black text-white uppercase mb-2 md:mb-3 group-hover:text-orange-500 transition-colors leading-tight">
                                    {cert.title}
                                  </h4>
                                  <div className="w-8 md:w-10 h-[2px] bg-gradient-to-r from-orange-500 to-transparent group-hover:w-12 md:group-hover:w-16 transition-all mb-3 md:mb-4" />
                                </div>

                                <p className="text-gray-400 text-xs md:text-sm mb-3 md:mb-4 leading-relaxed">
                                  {cert.description}
                                </p>

                                <div className="flex items-center gap-2 text-orange-500 text-[10px] md:text-xs uppercase tracking-widest">
                                  <span>📅</span>
                                  {cert.issueDate}
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        {/* Bottom gradient overlay for scroll indication */}
                        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#0a0a0a] to-transparent pointer-events-none" />
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            ) : (
              <div className="text-center py-16 md:py-20">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="inline-block p-8 md:p-12 bg-white/5 border border-white/10 rounded-sm"
                >
                  <div className="text-4xl md:text-5xl mb-4 md:mb-6">📜</div>
                  <p className="text-gray-500 text-base md:text-lg font-bold uppercase tracking-wider">
                    No certifications added yet
                  </p>
                </motion.div>
              </div>
            )}
          </div>
        </section>
      )}





      {/* Contact Section */}
      <section id="contact" className="py-16 md:py-24 bg-gradient-to-br from-gray-900 to-black text-white relative overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 30, repeat: Infinity }}
          className="absolute top-0 right-0 w-96 h-96 bg-orange-500 rounded-full opacity-10 blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -180, -360],
          }}
          transition={{ duration: 35, repeat: Infinity }}
          className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500 rounded-full opacity-10 blur-3xl"
        />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-12"
          >
            <motion.h2 variants={fadeInUp} className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter mb-4">
              LET'S WORK
              <br />
              <span className="text-orange-500">TOGETHER</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-base md:text-lg text-gray-400">
              Have a project in mind? Let's create something amazing together!
            </motion.p>
          </motion.div>

          <motion.form
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div className="grid sm:grid-cols-2 gap-6">
              <motion.div variants={fadeInUp}>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                  className="w-full bg-white/10 backdrop-blur-sm border-2 border-gray-700 rounded-2xl px-6 py-4 text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none transition-colors"
                />
              </motion.div>
              <motion.div variants={fadeInUp}>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  required
                  className="w-full bg-white/10 backdrop-blur-sm border-2 border-gray-700 rounded-2xl px-6 py-4 text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none transition-colors"
                />
              </motion.div>
            </div>

            <motion.div variants={fadeInUp}>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                required
                rows={6}
                className="w-full bg-white/10 backdrop-blur-sm border-2 border-gray-700 rounded-2xl px-6 py-4 text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none transition-colors resize-none"
              />
            </motion.div>

            <motion.div variants={fadeInUp}>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={submitted}
                className={`w-full ${submitted ? 'bg-green-500' : 'bg-orange-500 hover:bg-orange-600'
                  } text-white px-8 py-4 rounded-2xl text-base md:text-lg font-bold transition-all flex items-center justify-center gap-3 disabled:opacity-70`}
              >
                {submitted ? (
                  <>
                    <span>✓ Message Sent!</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send size={20} />
                  </>
                )}
              </motion.button>
            </motion.div>
          </motion.form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="text-2xl md:text-3xl font-black mb-4">
                {userName}<span className="text-orange-500">.</span>
              </h3>
              <p className="text-sm md:text-base text-gray-400">
                Creating digital experiences that inspire and engage.
              </p>
            </div>

            <div>
              <h4 className="text-sm font-bold tracking-widest uppercase mb-4">Quick Links</h4>
              <div className="space-y-2">
                {navLinks.slice(0, 5).map((link) => (
                  <div key={link.label}>
                    {link.href.startsWith('#') ? (
                      <a href={link.href} className="text-sm text-gray-400 hover:text-orange-500 transition-colors block">
                        {link.label}
                      </a>
                    ) : (
                      <Link href={link.href} className="text-sm text-gray-400 hover:text-orange-500 transition-colors block">
                        {link.label}
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-bold tracking-widest uppercase mb-4">Services</h4>
              <div className="space-y-2">
                {userData.skillCategories.slice(0, 4).map((category, index) => (
                  <p key={index} className="text-sm text-gray-400">
                    {category.category}
                  </p>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-bold tracking-widest uppercase mb-4">Connect</h4>
              <div className="flex gap-3">
                {userData.socialLinks.map((social, index) => (
                  <div style={{display : "flex" , justifyContent : "center" , alignItems : "center" , flexDirection : "column"}} >
                    <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -3 }}
                    className="w-10 h-10 rounded-full bg-gray-800 hover:bg-orange-500 text-white flex items-center justify-center transition-colors"
                  >
                    {social.icon}
                    
                  </motion.a>

                  <p>{social.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-sm text-gray-400 text-center sm:text-left">
                © {currentYear} {userName}. All rights reserved.
              </p>
              <p className="text-sm text-gray-400">
                Designed & Developed with <span className="text-orange-500">❤</span>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
