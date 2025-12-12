"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, Github, Mail, Linkedin, Twitter, ExternalLink, ChevronDown, ArrowRight, Send, Sparkles, Zap, Cpu, Terminal, Code2, Rocket } from "lucide-react"
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

export default function FuturisticPortfolio() {
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
    // { label: "Dashboard", href: "/Components/DashBoard" },
  ]

  const currentYear = new Date().getFullYear()

  // Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12
      }
    }
  }

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" }
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
            }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
            className="w-20 h-20 border-4 border-slate-700 border-t-cyan-400 rounded-lg mx-auto mb-6"
          />
          <p className="text-cyan-400 text-lg font-bold tracking-wider">INITIALIZING SYSTEM...</p>
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
      {/* Animated Grid Background */}
      <div className="fixed inset-0 z-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Neon Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 origin-left z-50 shadow-[0_0_20px_rgba(6,182,212,0.8)]"
        style={{ scaleX: scaleProgress }}
      />

      {/* Glowing Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-20 right-20 w-[600px] h-[600px] bg-cyan-500/20 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute bottom-20 left-20 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[120px]"
        />
      </div>

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 w-full z-40 transition-all duration-300 ${scrolled ? "bg-slate-900/80 backdrop-blur-xl border-b border-cyan-500/20 shadow-lg shadow-cyan-500/10" : "bg-transparent"
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold flex items-center gap-3"
          >
            <div className="relative">
              <Terminal className="text-cyan-400" size={28} />
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 bg-cyan-400 blur-xl opacity-50"
              />
            </div>
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent font-black tracking-wider">
              {userName.toUpperCase()}
            </span>
          </motion.div>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="px-4 py-2 text-slate-300 hover:text-cyan-400 transition-all font-semibold relative group"
              >
                <span className="relative z-10">{link.label}</span>
                <motion.div
                  className="absolute inset-0 bg-cyan-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                  whileHover={{ boxShadow: "0 0 20px rgba(6, 182, 212, 0.3)" }}
                />
              </motion.a>
            ))}
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-cyan-400"
          >
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden bg-slate-900/95 backdrop-blur-xl border-b border-cyan-500/20 overflow-hidden"
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
                    className="block text-slate-300 hover:text-cyan-400 transition-colors py-2 text-lg font-semibold"
                  >
                    {link.label}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <section style={{ marginTop: "80px" }} id="home" className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
        <div className="max-w-7xl w-full relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center"
          >
            <motion.div variants={fadeInUp} className="mb-8">
              <span className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-400/30 rounded-lg text-cyan-400 text-sm font-bold tracking-wider shadow-lg shadow-cyan-500/20">
                <Zap size={18} className="text-cyan-400" />
                AVAILABLE FOR WORK
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
              </span>
            </motion.div>

            <motion.div variants={fadeInUp} className="mb-6">
              <div className="text-cyan-400 text-lg font-mono mb-4">{"<developer>"}</div>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-6xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight"
            >
              <span className="text-slate-100">BUILDING THE</span>
              <br />
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {userData.hero.highlightText.toUpperCase()}
                </span>
                <motion.div
                  animate={{ scaleX: [0, 1, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-blue-500"
                />
              </span>
            </motion.h1>

            <motion.div variants={fadeInUp} className="mb-10">
              <div className="text-cyan-400 text-lg font-mono">{"</developer>"}</div>
            </motion.div>

            <motion.p
              variants={fadeInUp}
              className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed font-light"
            >
              {userData.hero.subtitle}
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <motion.a
                href="#projects"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 30px rgba(6, 182, 212, 0.6), 0 0 60px rgba(6, 182, 212, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-10 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-900 font-bold rounded-lg flex items-center gap-3 text-lg overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"
                />
                <span className="relative z-10">{userData.hero.primaryButtonText}</span>
                <ArrowRight className="relative z-10 group-hover:translate-x-2 transition-transform" size={22} />
              </motion.a>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 bg-slate-800/50 border-2 border-cyan-400/50 text-cyan-400 font-bold rounded-lg hover:bg-slate-800 hover:border-cyan-400 transition-all text-lg backdrop-blur-sm"
              >
                {userData.hero.secondaryButtonText}
              </motion.a>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <ChevronDown className="text-cyan-400" size={44} />
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-24 px-6 bg-slate-900/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid lg:grid-cols-2 gap-16 items-center"
          >
            {/* Left Column */}
            <div>
              <motion.div variants={fadeInUp}>
                <span className="text-cyan-400 font-bold text-sm mb-4 block uppercase tracking-widest flex items-center gap-2">
                  <div className="w-8 h-0.5 bg-cyan-400" />
                  {userData.aboutMe.sectionTitle}
                </span>
                <h2 className="text-5xl md:text-6xl font-black mb-8 leading-tight text-slate-100">
                  {userData.aboutMe.headline}
                </h2>
              </motion.div>

              <motion.div variants={fadeInUp} className="space-y-6 text-slate-400 text-lg leading-relaxed">
                <p className="border-l-4 border-cyan-400 pl-6">{userData.aboutMe.introduction}</p>
                <p>{userData.aboutMe.description}</p>
              </motion.div>

              {userData.aboutMe.coreValues.length > 0 && (
                <motion.div variants={fadeInUp} className="mt-10 space-y-4">
                  {userData.aboutMe.coreValues.map((value, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-4 group"
                    >
                      <Zap size={16} className="text-cyan-400 group-hover:text-blue-400 transition-colors" />
                      <span className="text-slate-300 text-lg font-medium">{value}</span>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>

            {/* Right Column - Hexagon Stats */}
            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-2 gap-6"
            >
              {(() => {
                const validStats = [
                  { number: userData.aboutMe.stats.projectsCompleted, label: "Projects", icon: <Rocket size={32} />, gradient: "from-cyan-400 to-blue-500" },
                  { number: userData.aboutMe.stats.yearsExperience, label: "Years", icon: <Zap size={32} />, gradient: "from-blue-500 to-purple-500" },
                  { number: userData.aboutMe.stats.happyClients, label: "Clients", icon: <Code2 size={32} />, gradient: "from-purple-500 to-pink-500" },
                  { number: userData.aboutMe.stats.techSkills, label: "Skills", icon: <Cpu size={32} />, gradient: "from-cyan-400 to-purple-500" },
                ].filter(stat => stat.number > 0);

                return validStats.map((stat, index) => (
                  <motion.div
                    key={index}
                    variants={scaleIn}
                    whileHover={{ y: -8, scale: 1.05 }}
                    className="relative p-8 bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-cyan-500/20 rounded-2xl backdrop-blur-sm overflow-hidden group"
                  >
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity`}
                      whileHover={{ opacity: 0.2 }}
                    />
                    <div className="relative z-10 text-center">
                      <div className="text-cyan-400 mb-4 flex justify-center">{stat.icon}</div>
                      <div className={`text-5xl font-black bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-2`}>
                        {stat.number}+
                      </div>
                      <div className="text-slate-400 text-sm uppercase tracking-wider font-bold">
                        {stat.label}
                      </div>
                    </div>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="absolute -top-10 -right-10 w-40 h-40 border border-cyan-500/10 rounded-full"
                    />
                  </motion.div>
                ));
              })()}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="relative py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-black mb-6 text-slate-100">
              TECH <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">ARSENAL</span>
            </h2>
            <p className="text-slate-400 text-xl max-w-2xl mx-auto">
              Weapons of choice for building cutting-edge solutions
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
                  className="relative p-8 bg-gradient-to-br from-slate-800/30 to-slate-900/30 border border-cyan-500/20 rounded-xl backdrop-blur-sm overflow-hidden group"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity"
                  />

                  <div className="flex items-center gap-4 mb-6 relative z-10">
                    <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center text-2xl shadow-lg shadow-cyan-500/30">
                      {category.icon}
                    </div>
                    <h3 className="text-3xl font-black text-slate-100 uppercase tracking-wide">
                      {category.category}
                    </h3>
                    <div className="flex-1 h-px bg-gradient-to-r from-cyan-500/50 to-transparent" />
                  </div>

                  <div className="flex flex-wrap gap-3 relative z-10">
                    {category.skills.map((skill, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.05 }}
                        whileHover={{ y: -3, scale: 1.05, boxShadow: "0 0 20px rgba(6, 182, 212, 0.3)" }}
                        className="px-5 py-2.5 bg-slate-800/50 border border-cyan-500/30 rounded-lg hover:border-cyan-400 hover:bg-slate-700/50 transition-all cursor-pointer backdrop-blur-sm"
                      >
                        <span className="font-bold text-cyan-400">{skill}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="text-center text-slate-500">No skills added yet</p>
            )}
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      {userData.experiences && userData.experiences.length > 0 && (
        <section id="experience" className="relative py-24 px-6 bg-slate-900/30 backdrop-blur-sm">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-20"
            >
              <h2 className="text-5xl md:text-6xl font-black mb-6 text-slate-100">
                CAREER <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">PATH</span>
              </h2>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="relative"
            >
              {/* Neon Timeline */}
              <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-400 via-blue-500 to-purple-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]" />

              {userData.experiences.length > 0 ? (
                userData.experiences.map((exp, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    className={`relative mb-16 ${index % 2 === 0 ? "md:pr-1/2 md:text-right" : "md:pl-1/2 md:ml-auto"
                      }`}
                  >
                    {/* Glowing Dot */}
                    <div className="absolute left-0 md:left-1/2 top-0 w-5 h-5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full border-4 border-slate-900 transform -translate-x-1/2 md:translate-x-0 shadow-[0_0_20px_rgba(6,182,212,0.8)]">
                      <motion.div
                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 bg-cyan-400 rounded-full"
                      />
                    </div>

                    <motion.div
                      whileHover={{ y: -5, scale: 1.02 }}
                      className="ml-8 md:ml-0 p-8 bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-cyan-500/20 rounded-xl backdrop-blur-sm hover:border-cyan-400/50 transition-all"
                    >
                      <div className="mb-4">
                        <span className="px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 rounded-lg text-cyan-400 text-sm font-bold">
                          {exp.period}
                        </span>
                      </div>
                      <h3 className="text-2xl font-black text-slate-100 mb-2">
                        {exp.role}
                      </h3>
                      <p className="text-cyan-400 font-bold mb-4">{exp.company}</p>
                      <p className="text-slate-400 leading-relaxed mb-4">{exp.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {exp.skills.map((skill, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-slate-700/50 text-cyan-400 rounded-md text-xs font-bold border border-cyan-500/20"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  </motion.div>
                ))
              ) : (
                <p className="text-center text-slate-500">No experience added yet</p>
              )}
            </motion.div>
          </div>
        </section>
      )}

      {/* Certifications Section - Futuristic Design */}
      {userData.certifications && userData.certifications.length > 0 && (
        <section id="certifications" className="relative py-24 px-6 bg-slate-900/30 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-20"
            >
              <h2 className="text-5xl md:text-6xl font-black mb-6 text-slate-100">
                CERTIFIED <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">ACHIEVEMENTS</span>
              </h2>
              <p className="text-slate-400 text-xl max-w-2xl mx-auto">
                Professional credentials and verified skills
              </p>
            </motion.div>

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
                  whileHover={{ y: -10, scale: 1.03 }}
                  className="group relative"
                >
                  <div className="relative h-full overflow-hidden rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-cyan-500/20 hover:border-cyan-400/50 backdrop-blur-sm transition-all p-8">

                    {/* Glowing Gradient Overlay */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10"
                    />

                    {/* Animated Trophy Badge */}
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: index * 0.1 + 0.2,
                        type: "spring",
                        stiffness: 200
                      }}
                      className="absolute top-6 right-6 w-16 h-16 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center shadow-lg shadow-cyan-500/30"
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 border border-cyan-400/30 rounded-lg"
                      />
                      <motion.span
                        animate={{
                          scale: [1, 1.2, 1],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-3xl relative z-10"
                      >
                        🏆
                      </motion.span>
                    </motion.div>

                    <div className="relative z-10 flex flex-col h-full">
                      {/* Certificate Icon with Tech Border */}
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          delay: index * 0.1 + 0.3,
                          type: "spring",
                          stiffness: 150
                        }}
                        className="mb-6"
                      >
                        <div className="w-24 h-24 rounded-lg bg-gradient-to-br from-slate-700/50 to-slate-800/50 border border-cyan-500/30 flex items-center justify-center relative overflow-hidden group-hover:border-cyan-400 transition-all">
                          {/* Animated Grid Background */}
                          <motion.div
                            animate={{
                              backgroundPosition: ["0px 0px", "50px 50px"],
                            }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0"
                            style={{
                              backgroundImage: `
                          linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)
                        `,
                              backgroundSize: '10px 10px'
                            }}
                          />
                          <span className="text-5xl relative z-10">🎓</span>

                          {/* Scanning Line Effect */}
                          <motion.div
                            animate={{ y: ["-100%", "200%"] }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              ease: "linear",
                              repeatDelay: 1
                            }}
                            className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
                          />
                        </div>
                      </motion.div>

                      {/* Title with Neon Underline */}
                      <motion.h3
                        whileHover={{ scale: 1.02 }}
                        className="text-2xl font-black text-slate-100 mb-4 leading-tight group-hover:text-cyan-400 transition-colors relative"
                      >
                        {cert.title}
                        <motion.div
                          initial={{ width: 0 }}
                          whileHover={{ width: "100%" }}
                          className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]"
                        />
                      </motion.h3>

                      {/* Issue Date Badge with Tech Style */}
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 + 0.4 }}
                        className="mb-5"
                      >
                        <motion.span
                          whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(6, 182, 212, 0.3)" }}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 rounded-lg text-cyan-400 text-sm font-bold uppercase tracking-wider"
                        >
                          <Zap size={14} />
                          {cert.issueDate}
                        </motion.span>
                      </motion.div>

                      {/* Description with Border Accent */}
                      <p className="text-slate-400 leading-relaxed flex-grow text-sm mb-6 border-l-2 border-cyan-500/30 pl-4">
                        {cert.description}
                      </p>

                      {/* Bottom Neon Bar */}
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "100%" }}
                        viewport={{ once: true }}
                        transition={{
                          delay: index * 0.1 + 0.5,
                          duration: 0.8
                        }}
                        className="relative h-1 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]"
                      >
                        {/* Glowing Particle Effect */}
                        <motion.div
                          animate={{ x: ["-10%", "110%"] }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "linear",
                            repeatDelay: 1
                          }}
                          className="absolute inset-y-0 w-4 bg-white/60 blur-sm rounded-full"
                        />
                      </motion.div>
                    </div>

                    {/* Tech Corner Accents */}
                    <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-cyan-500/30 rounded-tl-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-cyan-500/30 rounded-br-lg opacity-0 group-hover:opacity-100 transition-opacity" />

                    {/* Rotating Grid Background */}
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                      className="absolute -top-10 -right-10 w-40 h-40 border border-cyan-500/10 rounded-lg"
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* View More Button */}
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
                    boxShadow: "0 0 30px rgba(6, 182, 212, 0.6)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowAllCertificates(true)}
                  className="relative px-12 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-900 font-black rounded-lg text-lg uppercase tracking-wider overflow-hidden group"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                  <span className="relative z-10 flex items-center gap-3">
                    <Terminal size={24} />
                    VIEW ALL {userData.certifications.length} CERTIFICATIONS
                  </span>
                </motion.button>
              </motion.div>
            )}

            {/* Total Count Display with Tech Design */}
            {userData.certifications.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="mt-20 flex justify-center"
              >
                <motion.div
                  whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(6, 182, 212, 0.4)" }}
                  className="inline-flex items-center gap-8 px-14 py-8 bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-cyan-500/30 rounded-xl hover:border-cyan-400 backdrop-blur-sm transition-all relative overflow-hidden"
                >
                  {/* Animated Grid Background */}
                  <motion.div
                    animate={{
                      backgroundPosition: ["0px 0px", "50px 50px"],
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 opacity-30"
                    style={{
                      backgroundImage: `
                  linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)
                `,
                      backgroundSize: '20px 20px'
                    }}
                  />

                  <motion.div
                    animate={{
                      rotate: [0, 360],
                    }}
                    transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                    className="text-6xl relative z-10"
                  >
                    <Cpu className="text-cyan-400" size={64} />
                  </motion.div>

                  <div className="relative z-10">
                    <motion.p
                      className="text-6xl font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent"
                    >
                      {userData.certifications.length}
                    </motion.p>
                    <p className="text-slate-400 text-sm font-bold mt-2 uppercase tracking-widest flex items-center gap-2">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                      CERTIFICATIONS EARNED
                    </p>
                  </div>

                  {/* Scanning Line */}
                  <motion.div
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                      repeatDelay: 1
                    }}
                    className="absolute inset-y-0 w-1 bg-gradient-to-b from-transparent via-cyan-400 to-transparent opacity-50"
                  />
                </motion.div>
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
                  className="fixed inset-0 bg-slate-900/90 backdrop-blur-xl z-50 flex items-center justify-center p-4"
                >
                  {/* Modal Content */}
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 50 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 50 }}
                    transition={{ type: "spring", damping: 25, stiffness: 250 }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-cyan-500/30 rounded-xl max-w-7xl w-full max-h-[90vh] overflow-hidden shadow-2xl shadow-cyan-500/20 relative"
                  >
                    {/* Animated Grid Background */}
                    <div className="absolute inset-0 opacity-20 pointer-events-none">
                      <div className="absolute inset-0" style={{
                        backgroundImage: `
                    linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)
                  `,
                        backgroundSize: '30px 30px'
                      }} />
                    </div>

                    {/* Modal Header */}
                    <div className="sticky top-0 z-10 bg-slate-900/95 backdrop-blur-xl border-b-2 border-cyan-500/30 p-10 flex justify-between items-center relative">
                      <div>
                        <h3 className="text-4xl font-black text-slate-100 mb-3 flex items-center gap-3 uppercase tracking-wider">
                          <Terminal className="text-cyan-400" />
                          ALL <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">CERTIFICATIONS</span>
                        </h3>
                        <p className="text-slate-400 flex items-center gap-2 text-lg font-bold uppercase tracking-wide">
                          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                          {userData.certifications.length} VERIFIED CREDENTIALS
                        </p>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1, rotate: 90, boxShadow: "0 0 20px rgba(6, 182, 212, 0.4)" }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setShowAllCertificates(false)}
                        className="w-16 h-16 rounded-lg bg-slate-800/50 backdrop-blur-sm border-2 border-cyan-500/30 hover:bg-slate-700/50 hover:border-cyan-400 flex items-center justify-center text-cyan-400 transition-all"
                      >
                        <X size={32} />
                      </motion.button>
                    </div>

                    {/* Modal Body - Scrollable */}
                    <div className="p-10 overflow-y-auto max-h-[calc(90vh-180px)] relative">
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {userData.certifications.map((cert, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{
                              y: -8,
                              scale: 1.02
                            }}
                            className="group relative"
                          >
                            <div className="relative h-full bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-cyan-500/20 rounded-lg p-6 hover:border-cyan-400/50 backdrop-blur-sm transition-all overflow-hidden">

                              {/* Hover gradient */}
                              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />

                              {/* Badge */}
                              <div className="absolute top-4 right-4 w-14 h-14 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                                <span className="text-2xl">🏆</span>
                              </div>

                              <div className="relative z-10">
                                {/* Icon */}
                                <div className="mb-4">
                                  <div className="w-18 h-18 rounded-lg bg-slate-700/50 border border-cyan-500/30 flex items-center justify-center group-hover:border-cyan-400 transition-all">
                                    <span className="text-4xl">🎓</span>
                                  </div>
                                </div>

                                {/* Title */}
                                <h4 className="text-xl font-black text-slate-100 mb-3 leading-tight group-hover:text-cyan-400 transition-colors">
                                  {cert.title}
                                </h4>

                                {/* Date */}
                                <div className="mb-3">
                                  <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-cyan-500/20 border border-cyan-400/30 rounded-lg text-cyan-400 text-xs font-bold uppercase tracking-wider">
                                    <Zap size={12} />
                                    {cert.issueDate}
                                  </span>
                                </div>

                                {/* Description */}
                                <p className="text-slate-400 text-sm leading-relaxed mb-4 border-l-2 border-cyan-500/30 pl-3">
                                  {cert.description}
                                </p>

                                {/* Bottom bar */}
                                <div className="h-1 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
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


      {/* Projects Section */}
      <section id="projects" className="relative py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-black mb-6 text-slate-100">
              FEATURED <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">PROJECTS</span>
            </h2>
            <p className="text-slate-400 text-xl max-w-2xl mx-auto">
              Cutting-edge solutions built with modern tech
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
                  whileHover={{ y: -10 }}
                  className="group relative"
                >
                  <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-cyan-500/20 hover:border-cyan-400/50 backdrop-blur-sm transition-all">
                    {/* Project Image */}
                    <div className="relative h-64 overflow-hidden">
                      {project.image ? (
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-cyan-500/20 via-blue-500/20 to-purple-500/20 flex items-center justify-center">
                          <Rocket size={80} className="text-cyan-400" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />

                      {/* Hover Overlay */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center gap-4"
                      >
                        {project.links.live && (
                          <a
                            href={project.links.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 bg-slate-900 border border-cyan-400 rounded-lg text-cyan-400 hover:bg-cyan-400 hover:text-slate-900 transition-all"
                          >
                            <ExternalLink size={20} />
                          </a>
                        )}
                        {project.links.github && (
                          <a
                            href={project.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 bg-slate-900 border border-cyan-400 rounded-lg text-cyan-400 hover:bg-cyan-400 hover:text-slate-900 transition-all"
                          >
                            <Github size={20} />
                          </a>
                        )}
                      </motion.div>
                    </div>

                    {/* Project Info */}
                    <div className="p-6">
                      <h3 className="text-2xl font-black text-slate-100 mb-3 group-hover:text-cyan-400 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                        {project.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {project.tags.slice(0, 3).map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-slate-700/50 text-cyan-400 rounded-md text-xs font-bold border border-cyan-500/20"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Corner Accent */}
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-cyan-400/20 to-transparent rounded-bl-[100px]" />
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center text-slate-500">
                No projects added yet
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-24 px-6 bg-slate-900/30 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-black mb-6 text-slate-100">
                LET'S <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">CONNECT</span>
              </h2>
              <p className="text-slate-400 text-xl">
                Ready to build something amazing together?
              </p>
            </motion.div>

            <motion.form
              variants={fadeInUp}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <motion.input
                  whileFocus={{ scale: 1.02, boxShadow: "0 0 20px rgba(6, 182, 212, 0.3)" }}
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="px-6 py-4 bg-slate-800/50 backdrop-blur-md border border-cyan-500/30 rounded-lg focus:border-cyan-400 focus:outline-none transition-all placeholder-slate-500 text-slate-100 font-medium"
                  required
                />
                <motion.input
                  whileFocus={{ scale: 1.02, boxShadow: "0 0 20px rgba(6, 182, 212, 0.3)" }}
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="px-6 py-4 bg-slate-800/50 backdrop-blur-md border border-cyan-500/30 rounded-lg focus:border-cyan-400 focus:outline-none transition-all placeholder-slate-500 text-slate-100 font-medium"
                  required
                />
              </div>

              <motion.textarea
                whileFocus={{ scale: 1.02, boxShadow: "0 0 20px rgba(6, 182, 212, 0.3)" }}
                name="message"
                placeholder="Tell me about your project..."
                value={formData.message}
                onChange={handleChange}
                rows={6}
                className="w-full px-6 py-4 bg-slate-800/50 backdrop-blur-md border border-cyan-500/30 rounded-lg focus:border-cyan-400 focus:outline-none transition-all placeholder-slate-500 text-slate-100 font-medium resize-none"
                required
              />

              <motion.button
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 0 30px rgba(6, 182, 212, 0.6)"
                }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={submitted}
                className="w-full px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-900 font-black rounded-lg hover:from-cyan-400 hover:to-blue-400 transition-all disabled:opacity-50 flex items-center justify-center gap-3 text-lg uppercase tracking-wider"
              >
                {submitted ? (
                  <>
                    <span>✓</span>
                    MESSAGE SENT
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    SEND MESSAGE
                  </>
                )}
              </motion.button>
            </motion.form>

            <motion.div
              variants={fadeInUp}
              className="mt-16 pt-16 border-t border-cyan-500/20"
            >
              <h3 className="text-2xl font-black text-center mb-8 text-slate-100 uppercase">Connect</h3>
              <div className="flex justify-center gap-6 flex-wrap">
                {userData.socialLinks.map((social, index) => (
                  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -5, scale: 1.1, boxShadow: "0 0 30px rgba(6, 182, 212, 0.5)" }}
                      className="w-14 h-14 rounded-lg bg-slate-800/50 backdrop-blur-md border border-cyan-500/30 flex items-center justify-center text-2xl hover:border-cyan-400 hover:bg-slate-700/50 transition-all"
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
      <footer className="relative py-8 px-6 bg-slate-900/50 backdrop-blur-md border-t border-cyan-500/20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left flex items-center gap-2">
              <Terminal className="text-cyan-400" size={16} />
              <p className="text-slate-400 text-sm font-mono">
                © {currentYear} {userName}. All rights reserved.
              </p>
            </div>
            <div className="flex gap-6 text-sm text-slate-400 font-mono">
              <Link href="#" className="hover:text-cyan-400 transition-colors">
                Privacy
              </Link>
              <Link href="#" className="hover:text-cyan-400 transition-colors">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
