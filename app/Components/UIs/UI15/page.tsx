"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, Github, Mail, Linkedin, Twitter, ExternalLink, ChevronDown, ArrowRight, Send, Code, Zap, Target } from "lucide-react"
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
    // { label: "DASHBOARD", href: "/Components/DashBoard" },
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
    <div className="w-full bg-[#0a0a0a] text-white overflow-x-hidden relative">
      {/* Subtle Grid Background */}
      <div className="fixed inset-0 z-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      {/* Orange Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-600 origin-left z-50"
        style={{ scaleX: scaleProgress }}
      />

      {/* Responsive Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 w-full z-40 transition-all duration-500 ${scrolled
          ? "bg-black/90 backdrop-blur-2xl border-b border-white/5"
          : "bg-transparent"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6 flex justify-between items-center">
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.05 }} className="relative">
            <span className="text-xl md:text-2xl font-light tracking-[0.2em] md:tracking-[0.3em] text-white lowercase">
              {userName}
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8 xl:gap-12">
            {navLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative text-xs font-medium tracking-[0.2em] text-gray-400 hover:text-white transition-all uppercase"
              >
                {link.label}
              </motion.a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-white p-2"
            aria-label="Toggle menu"
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
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-black/95 backdrop-blur-2xl border-b border-white/5 overflow-hidden"
            >
              <div className="px-4 sm:px-6 py-6 space-y-4">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={index}
                    href={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setMobileOpen(false)}
                    className="block text-gray-400 hover:text-white transition-colors py-3 text-sm font-medium tracking-widest uppercase border-b border-white/5"
                  >
                    {link.label}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* HERO SECTION - Responsive with Animated Visualization */}
      <section
        style={{ marginTop: "80px" }}
        id="home"
        className="relative min-h-screen flex items-center px-4 sm:px-6 lg:px-8 overflow-hidden"
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-transparent z-0" />

        <div className="max-w-7xl mx-auto w-full relative z-10 grid lg:grid-cols-2 gap-8 lg:gap-16 items-center py-12 md:py-20">
          {/* Left: Typography */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="order-2 lg:order-1"
          >
            {/* Small Tag */}
            <motion.div variants={fadeInLeft} className="mb-6 md:mb-8">
              <span className="text-[10px] md:text-xs font-medium tracking-[0.2em] md:tracking-[0.3em] text-gray-500 uppercase border-l-2 border-orange-500 pl-3 md:pl-4">
                WHERE BEYOND
              </span>
            </motion.div>

            {/* Main Headline - Responsive Text Sizes */}
            <motion.div variants={fadeInLeft}>
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black leading-[0.9] mb-6 md:mb-10">
                <motion.span
                  className="block text-white mb-1 md:mb-2"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 1 }}
                >
                  INNOVATE
                </motion.span>
                <motion.span
                  className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-600"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 1 }}
                >
                  FOR DESIGN
                </motion.span>
                <motion.span
                  className="block text-white"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7, duration: 1 }}
                >
                  DELIVER
                </motion.span>
              </h1>
            </motion.div>

            {/* Tagline */}
            <motion.div
              variants={fadeInLeft}
              className="mb-8 md:mb-12 max-w-md"
            >
              <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                {userData.hero.subtitle}
              </p>
            </motion.div>

            {/* CTA Button - Responsive */}
            <motion.div variants={fadeInLeft}>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05, x: 10 }}
                whileTap={{ scale: 0.95 }}
                className="group inline-flex items-center gap-3 md:gap-4 px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-orange-500 to-yellow-600 text-black font-bold rounded-sm uppercase tracking-widest text-xs md:text-sm relative overflow-hidden"
              >
                <span className="relative z-10">LET'S CONTACT</span>
                <ArrowRight className="relative z-10 group-hover:translate-x-2 transition-transform" size={18} />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-yellow-600 to-orange-500"
                  initial={{ x: '100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            </motion.div>
          </motion.div>


        </div>

        {/* Bottom Right Info - Hidden on Mobile */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-12 md:bottom-20 right-6 md:right-20 hidden lg:block max-w-xs"
        >
          <p className="text-gray-500 text-xs md:text-sm leading-relaxed">
            Our mission is to elevate your vision through groundbreaking design concepts that are both strategically insightful to create memorable experiences that leave a lasting impression.
          </p>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-6 md:bottom-10 left-1/2 transform -translate-x-1/2 hidden sm:block"
        >
          <ChevronDown className="text-gray-600" size={32} />
        </motion.div>
      </section>

      {/* ABOUT SECTION - Responsive */}
      <section id="about" className="relative py-16 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 md:gap-16 lg:gap-20 items-start">
            {/* Left Column */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeInLeft} className="mb-6 md:mb-8">
                <span className="text-[10px] md:text-xs font-medium tracking-[0.2em] md:tracking-[0.3em] text-orange-500 uppercase border-l-2 border-orange-500 pl-3 md:pl-4">
                  {userData.aboutMe.sectionTitle}
                </span>
              </motion.div>

              <motion.h2
                variants={fadeInLeft}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-8 md:mb-12 leading-tight uppercase"
              >
                {userData.aboutMe.headline}
              </motion.h2>

              {/* Stats Grid - Responsive */}
              <motion.div
                variants={staggerContainer}
                className="grid grid-cols-2 gap-4 md:gap-6 lg:gap-8"
              >
                {(() => {
                  const statsConfig = [
                    { key: 'projectsCompleted', label: 'PROJECTS', gradient: 'from-orange-500 to-yellow-500' },
                    { key: 'yearsExperience', label: 'YEARS', gradient: 'from-yellow-500 to-orange-600' },
                    { key: 'happyClients', label: 'CLIENTS', gradient: 'from-orange-600 to-red-500' },
                    { key: 'techSkills', label: 'SKILLS', gradient: 'from-orange-500 to-yellow-600' },
                  ];

                  return statsConfig
                    .filter(stat => userData.aboutMe.stats[stat.key as keyof typeof userData.aboutMe.stats] > 0)
                    .map((stat, index) => (
                      <motion.div
                        key={index}
                        variants={scaleIn}
                        whileHover={{ y: -5 }}
                        className="p-4 md:p-6 lg:p-8 bg-white/5 border border-white/10 rounded-sm backdrop-blur-sm"
                      >
                        <motion.div
                          className={`text-4xl sm:text-5xl md:text-6xl font-black bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-2 md:mb-3`}
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ type: "spring", stiffness: 100 }}
                        >
                          {userData.aboutMe.stats[stat.key as keyof typeof userData.aboutMe.stats]}+
                        </motion.div>
                        <div className="text-gray-500 text-[10px] md:text-xs uppercase tracking-[0.15em] md:tracking-[0.2em] font-medium">
                          {stat.label}
                        </div>
                      </motion.div>
                    ));
                })()}
              </motion.div>
            </motion.div>

            {/* Right Column */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp} className="space-y-4 md:space-y-6 text-gray-400 text-sm md:text-base lg:text-lg leading-relaxed mb-8 md:mb-12">
                <p className="border-l-4 border-orange-500 pl-4 md:pl-6 lg:pl-8 text-white italic text-base md:text-lg lg:text-xl">
                  {userData.aboutMe.introduction}
                </p>
                <p>{userData.aboutMe.description}</p>
              </motion.div>

              {/* Core Values - Responsive */}
              {userData.aboutMe.coreValues.length > 0 && (
                <motion.div variants={fadeInUp} className="space-y-3 md:space-y-4">
                  <h3 className="text-xs md:text-sm font-medium tracking-[0.15em] md:tracking-[0.2em] text-gray-500 uppercase mb-4 md:mb-6">Core Values</h3>
                  {userData.aboutMe.coreValues.map((value, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ x: 10 }}
                      className="flex items-center gap-3 md:gap-4 group cursor-pointer"
                    >
                      <div className="w-8 md:w-12 h-[1px] bg-gradient-to-r from-orange-500 to-transparent group-hover:w-12 md:group-hover:w-16 transition-all" />
                      <span className="text-white font-medium uppercase tracking-wide text-xs md:text-sm">{value}</span>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* SKILLS SECTION - Responsive Grid */}
      <section id="skills" className="relative py-16 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mb-12 md:mb-16 lg:mb-20"
          >
            <span className="text-[10px] md:text-xs font-medium tracking-[0.2em] md:tracking-[0.3em] text-orange-500 uppercase border-l-2 border-orange-500 pl-3 md:pl-4 mb-6 md:mb-8 inline-block">
              SERVICES
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white uppercase">
              WHAT I <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500">OFFER</span>
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {userData.skillCategories.length > 0 ? (
              userData.skillCategories.map((category, index) => (
                <motion.div
                  key={index}
                  variants={scaleIn}
                  whileHover={{ y: -10 }}
                  className="group p-6 md:p-8 lg:p-10 bg-white/5 border border-white/10 rounded-sm hover:bg-white/10 hover:border-orange-500/50 transition-all duration-500"
                >
                  <div className="mb-6 md:mb-8">
                    <div className="text-4xl md:text-5xl mb-4 md:mb-6">{category.icon}</div>
                    <h3 className="text-xl md:text-2xl font-black text-white uppercase mb-2 group-hover:text-orange-500 transition-colors">
                      {category.category}
                    </h3>
                    <div className="w-10 md:w-12 h-[2px] bg-gradient-to-r from-orange-500 to-transparent group-hover:w-16 md:group-hover:w-24 transition-all" />
                  </div>

                  <div className="space-y-2 md:space-y-3">
                    {category.skills.map((skill, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.05 }}
                        className="flex items-center gap-2 md:gap-3 text-gray-400 text-xs md:text-sm"
                      >
                        <div className="w-1 h-1 bg-orange-500 rounded-full flex-shrink-0" />
                        <span className="uppercase tracking-wide">{skill}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500 text-lg md:text-xl py-12">No skills added yet</p>
            )}
          </motion.div>
        </div>
      </section>

      {/* EXPERIENCE SECTION - Responsive */}
      {userData.experiences && userData.experiences.length > 0 && (
        <section id="experience" className="relative py-16 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="mb-12 md:mb-16 lg:mb-20"
            >
              <span className="text-[10px] md:text-xs font-medium tracking-[0.2em] md:tracking-[0.3em] text-orange-500 uppercase border-l-2 border-orange-500 pl-3 md:pl-4 mb-6 md:mb-8 inline-block">
                EXPERIENCE
              </span>
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white uppercase">
                CAREER <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500">JOURNEY</span>
              </h2>
            </motion.div>

            <div className="space-y-6 md:space-y-8">
              {userData.experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  whileHover={{ x: 10 }}
                  className="group p-6 md:p-8 lg:p-10 bg-white/5 border-l-4 border-orange-500/50 hover:border-orange-500 hover:bg-white/10 transition-all duration-500"
                >
                  <div className="grid lg:grid-cols-4 gap-6 md:gap-8">
                    <div className="lg:col-span-1">
                      <span className="text-xs md:text-sm text-gray-500 uppercase tracking-widest">
                        {exp.period}
                      </span>
                    </div>

                    <div className="lg:col-span-2">
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white mb-2 uppercase group-hover:text-orange-500 transition-colors">
                        {exp.role}
                      </h3>
                      <p className="text-orange-500 font-bold text-base md:text-lg uppercase tracking-wide mb-4 md:mb-6">
                        {exp.company}
                      </p>
                      <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                        {exp.description}
                      </p>
                    </div>

                    <div className="lg:col-span-1">
                      <div className="flex flex-wrap gap-2">
                        {exp.skills.map((skill, idx) => (
                          <span
                            key={idx}
                            className="px-2 md:px-3 py-1 bg-black/50 text-orange-500 border border-orange-500/20 rounded-sm text-[10px] md:text-xs font-medium uppercase tracking-wide"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
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
                        <h3 className="text-lg md:text-xl font-black text-white uppercase mb-3 md:mb-4 group-hover:text-orange-500 transition-colors leading-tight">
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



      {/* PROJECTS SECTION - Responsive Grid */}
      <section id="projects" className="relative py-16 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mb-12 md:mb-16 lg:mb-20"
          >
            <span className="text-[10px] md:text-xs font-medium tracking-[0.2em] md:tracking-[0.3em] text-orange-500 uppercase border-l-2 border-orange-500 pl-3 md:pl-4 mb-6 md:mb-8 inline-block">
              PORTFOLIO
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white uppercase">
              SELECTED <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500">WORK</span>
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid sm:grid-cols-2 gap-8 md:gap-10 lg:gap-12"
          >
            {userData.projects.length > 0 ? (
              userData.projects.map((project, index) => (
                <motion.div
                  key={index}
                  variants={scaleIn}
                  whileHover={{ y: -10 }}
                  className="group cursor-pointer"
                >
                  <div className="relative aspect-[4/3] mb-6 md:mb-8 overflow-hidden rounded-sm">
                    {project.image ? (
                      <motion.img
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                        <Target size={60} className="text-gray-700 md:w-20 md:h-20" />
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileHover={{ opacity: 1, y: 0 }}
                      className="absolute bottom-4 md:bottom-8 left-4 md:left-8 right-4 md:right-8 flex gap-3 md:gap-4 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      {project.links.live && (
                        <a
                          href={project.links.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 md:px-6 py-2 md:py-3 bg-orange-500 text-black font-bold uppercase text-[10px] md:text-xs tracking-wider hover:bg-orange-600 transition-colors"
                        >
                          View Live
                        </a>
                      )}
                      {project.links.github && (
                        <a
                          href={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 md:px-6 py-2 md:py-3 bg-white/10 backdrop-blur-md text-white font-bold uppercase text-[10px] md:text-xs tracking-wider border border-white/20 hover:bg-white/20 transition-colors"
                        >
                          Code
                        </a>
                      )}
                    </motion.div>
                  </div>

                  <div>
                    <h3 className="text-2xl md:text-3xl font-black text-white mb-3 md:mb-4 uppercase group-hover:text-orange-500 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 text-sm md:text-base mb-4 md:mb-6 leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.slice(0, 4).map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2 md:px-3 py-1 bg-white/5 text-gray-400 border border-white/10 rounded-sm text-[10px] md:text-xs uppercase tracking-wide"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500 text-lg md:text-xl py-12 md:py-20">
                No projects added yet
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* CONTACT SECTION - Responsive */}
      <section id="contact" className="relative py-16 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-12 md:mb-16 lg:mb-20">
              <span className="text-[10px] md:text-xs font-medium tracking-[0.2em] md:tracking-[0.3em] text-orange-500 uppercase border-l-2 border-orange-500 pl-3 md:pl-4 mb-6 md:mb-8 inline-block">
                GET IN TOUCH
              </span>
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-4 md:mb-6 uppercase">
                LET'S <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500">TALK</span>
              </h2>
              <p className="text-gray-400 text-base md:text-lg">
                Ready to start your next project?
              </p>
            </motion.div>

            <motion.form
              variants={fadeInUp}
              onSubmit={handleSubmit}
              className="space-y-6 md:space-y-8"
            >
              <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                <div>
                  <label className="block text-gray-500 text-xs uppercase tracking-widest mb-3 md:mb-4">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-0 py-3 md:py-4 bg-transparent border-b-2 border-white/10 focus:border-orange-500 focus:outline-none transition-all text-white text-sm md:text-base"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-500 text-xs uppercase tracking-widest mb-3 md:mb-4">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-0 py-3 md:py-4 bg-transparent border-b-2 border-white/10 focus:border-orange-500 focus:outline-none transition-all text-white text-sm md:text-base"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-500 text-xs uppercase tracking-widest mb-3 md:mb-4">
                  Message
                </label>
                <textarea
                  name="message"
                  placeholder="Tell me about your project..."
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full px-0 py-3 md:py-4 bg-transparent border-b-2 border-white/10 focus:border-orange-500 focus:outline-none transition-all text-white resize-none text-sm md:text-base"
                  required
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02, x: 10 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={submitted}
                className="group px-8 md:px-10 py-4 md:py-5 bg-gradient-to-r from-orange-500 to-yellow-600 text-black font-bold rounded-sm uppercase tracking-widest text-xs md:text-sm disabled:opacity-50 flex items-center gap-3 md:gap-4 relative overflow-hidden"
              >
                {submitted ? (
                  <>
                    <span>✓</span>
                    MESSAGE SENT
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    SEND MESSAGE
                    <ArrowRight className="group-hover:translate-x-2 transition-transform" size={18} />
                  </>
                )}
              </motion.button>
            </motion.form>

            <motion.div
              variants={fadeInUp}
              className="mt-12 md:mt-16 lg:mt-20 pt-12 md:pt-16 lg:pt-20 border-t border-white/5"
            >
              <div className="flex justify-center gap-4 md:gap-6 lg:gap-8 flex-wrap">
                {userData.socialLinks.map((social, index) => (
                  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }} >
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -5, scale: 1.1 }}
                      className="w-10 h-10 md:w-12 md:h-12 bg-white/5 border border-white/10 rounded-sm flex items-center justify-center hover:bg-orange-500/10 hover:border-orange-500/50 transition-all text-xl md:text-2xl"
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

      {/* FOOTER - Responsive */}
      <footer className="relative py-8 md:py-12 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6">
            <p className="text-gray-600 text-xs uppercase tracking-widest text-center md:text-left">
              © {currentYear} {userName}. All Rights Reserved.
            </p>
            <div className="flex gap-8 md:gap-12 text-xs text-gray-600 uppercase tracking-widest">
              <Link href="#" className="hover:text-orange-500 transition-colors">
                Privacy
              </Link>
              <Link href="#" className="hover:text-orange-500 transition-colors">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
