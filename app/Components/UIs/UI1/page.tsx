"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, ArrowUpRight, Sparkles, Zap, Code2, Rocket, Mail, Send } from "lucide-react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import type React from "react"
import { useRouter } from 'next/navigation'
import emailjs from '@emailjs/browser';

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

export default function UI4() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })

  const router = useRouter()
  const { scrollYProgress } = useScroll()

  const [USERNAME, setUsername] = useState('')
  const [userName, setUserName] = useState('Portfolio')
  const [userEmail, setuserEmail] = useState('')
  const API_BASE = 'http://localhost:5000'


  
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






  useEffect(() => {
    const getUserFromStorage = () => {
      try {
        const userStr = localStorage.getItem('user')
        if (userStr) {
          const user = JSON.parse(userStr)
          setUsername(user.userName || user.username || '')
          setUserName(user.userName || user.name || 'Portfolio')
          setuserEmail(user.email || '')
          return user.userName || user.username || ''
        }
      } catch (error) {
        console.error('Error parsing user from localStorage:', error)
      }
      return ''
    }

    const currentUsername = getUserFromStorage()

    if (currentUsername) {
      fetchUserData(currentUsername)
    } else {
      alert('❌ Please login first')
      router.push(`/Components/Auth/SignIn`)
    }
  }, [])

  const fetchUserData = async (username: string) => {
    try {
      setLoading(true)
      const response = await fetch(`${API_BASE}/profile/${username}`)
      if (response.ok) {
        const data = await response.json()
        setUserData(data)
      }
    } catch (error) {
      console.error('Error fetching user data:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("scroll", handleScroll)
    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Work", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ]



  const currentYear = new Date().getFullYear()

  if (loading) {
    return (
      <div className="min-h-screen bg-yellow-400 flex items-center justify-center">
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-center"
        >
          <div className="w-24 h-24 border-8 border-black relative">
            <div className="absolute inset-0 bg-black animate-pulse" />
          </div>
          <p className="text-black text-2xl font-black mt-6 uppercase tracking-wider">Loading...</p>
        </motion.div>
      </div>
    )
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-red-500 flex items-center justify-center">
        <p className="text-white text-3xl font-black uppercase">Error Loading Portfolio</p>
      </div>
    )
  }

  return (
    <div className="w-full bg-white text-black overflow-x-hidden font-mono">
      {/* Custom Cursor */}
      <motion.div
        className="fixed w-8 h-8 border-4 border-black rounded-full pointer-events-none z-50 mix-blend-difference hidden md:block"
        animate={{
          x: cursorPosition.x - 16,
          y: cursorPosition.y - 16,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 200 }}
      />

      {/* Progress Bar - Chunky Style */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-3 bg-black z-50"
        style={{ scaleX: scrollYProgress, transformOrigin: "0%" }}
      />

      {/* Navigation - Brutalist Style */}
      <nav className={`fixed top-3 left-0 right-0 z-40 transition-all duration-300`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className={`${scrolled ? 'bg-yellow-400 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]' : 'bg-white border-4 border-black'} transition-all duration-300`}>
            <div className="px-6 py-4 flex justify-between items-center">
              <motion.div
                whileHover={{ rotate: 5, scale: 1.05 }}
                className="text-2xl font-black uppercase"
              >
                <span className="bg-black text-white px-3 py-1">{userName}</span>
              </motion.div>

              <div className="hidden md:flex items-center gap-2">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={index}
                    href={link.href}
                    whileHover={{ y: -3 }}
                    className="px-4 py-2 bg-white border-2 border-black font-bold uppercase text-sm hover:bg-black hover:text-white transition-all"
                  >
                    {link.label}
                  </motion.a>
                ))}
                <motion.a
                  href="/Components/DashBoard"
                  whileHover={{ scale: 1.05 }}
                  className="ml-2 px-6 py-2 bg-black text-white border-2 border-black font-bold uppercase text-sm hover:bg-red-500 hover:border-red-500 transition-all"
                >
                  Dashboard
                </motion.a>
              </div>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 border-2 border-black"
              >
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="md:hidden mt-2 bg-white border-4 border-black overflow-hidden"
              >
                <div className="p-4 space-y-2">
                  {navLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="block px-4 py-3 bg-yellow-400 border-2 border-black font-bold uppercase text-sm hover:bg-black hover:text-white transition-all"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* Hero Section - Bold & Brutalist */}
      <section id="home" className="min-h-screen flex items-center justify-center px-6 pt-32 pb-20 bg-gradient-to-br from-yellow-400 via-pink-400 to-blue-400 relative overflow-hidden">
        {/* Animated Shapes */}
        <motion.div
          animate={{
            rotate: [0, 360],
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-20 right-20 w-64 h-64 border-8 border-black bg-red-500"
        />
        <motion.div
          animate={{
            rotate: [360, 0],
            scale: [1, 1.5, 1],
          }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute bottom-20 left-20 w-48 h-48 rounded-full border-8 border-black bg-green-500"
        />

        <div className="max-w-6xl w-full relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="inline-block mb-8"
            >
              <span className="px-6 py-3 bg-white border-4 border-black font-black uppercase text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                ⚡ Available for Hire
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-6xl md:text-8xl lg:text-9xl font-black mb-8 leading-none uppercase"
            >
              <span className="inline-block bg-white border-8 border-black px-6 py-4 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] rotate-2">
                {userData.hero.highlightText}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-xl md:text-2xl font-bold max-w-3xl mx-auto mb-12 bg-black text-white px-8 py-6 border-4 border-black"
            >
              {userData.hero.subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.05, rotate: -2 }}
                whileTap={{ scale: 0.95 }}
                className="group px-8 py-5 bg-black text-white font-black uppercase text-lg border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center gap-3"
              >
                {userData.hero.primaryButtonText}
                <ArrowUpRight className="group-hover:rotate-45 transition-transform" />
              </motion.a>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05, rotate: 2 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-5 bg-white text-black font-black uppercase text-lg border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all"
              >
                {userData.hero.secondaryButtonText}
              </motion.a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="mt-16 flex justify-center gap-4"
            >
              {userData.socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  whileHover={{ y: -5, rotate: 5 }}
                  className="w-14 h-14 bg-white border-4 border-black flex items-center justify-center text-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all"
                >
                  {social.icon}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section - Card Grid Style */}
      <section id="about" className="py-32 px-6 bg-white border-t-8 border-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <h2 className="text-6xl md:text-7xl font-black uppercase mb-6 inline-block bg-yellow-400 border-4 border-black px-8 py-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              {userData.aboutMe.sectionTitle}
            </h2>
            <h3 className="text-4xl md:text-5xl font-black uppercase mt-8">
              {userData.aboutMe.headline}
            </h3>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="p-8 bg-pink-400 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <p className="text-lg font-bold leading-relaxed">{userData.aboutMe.introduction}</p>
              </div>
              <div className="p-8 bg-blue-400 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <p className="text-lg font-bold leading-relaxed">{userData.aboutMe.description}</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              {userData.aboutMe.coreValues.length > 0 && (
                <div className="p-8 bg-green-400 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                  <h4 className="text-2xl font-black uppercase mb-6">Core Values</h4>
                  <div className="space-y-3">
                    {userData.aboutMe.coreValues.map((value, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <span className="w-3 h-3 bg-black mt-2 flex-shrink-0" />
                        <span className="font-bold text-lg">{value}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Stats - Brutalist Cards */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {(() => {
              const validStats = [
                { number: userData.aboutMe.stats.projectsCompleted, label: "Projects", color: "bg-red-500" },
                { number: userData.aboutMe.stats.yearsExperience, label: "Years", color: "bg-yellow-500" },
                { number: userData.aboutMe.stats.happyClients, label: "Clients", color: "bg-blue-500" },
                { number: userData.aboutMe.stats.techSkills, label: "Skills", color: "bg-green-500" },
              ].filter(stat => stat.number > 0);

              return validStats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ rotate: 5, scale: 1.05 }}
                  className={`p-8 ${stat.color} border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all`}
                >
                  <div className="text-5xl font-black mb-2">{stat.number}+</div>
                  <div className="text-sm font-black uppercase tracking-wider">{stat.label}</div>
                </motion.div>
              ));
            })()}
          </motion.div>
        </div>
      </section>

      {/* Skills Section - Tag Cloud Style */}
      <section id="skills" className="py-32 px-6 bg-gradient-to-br from-purple-400 via-pink-400 to-red-400 border-t-8 border-black">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-6xl md:text-7xl font-black uppercase mb-20 inline-block bg-white border-4 border-black px-8 py-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
          >
            Skills
          </motion.h2>

          {userData.skillCategories.length > 0 ? (
            <div className="space-y-12">
              {userData.skillCategories.map((category, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-5xl">{category.icon}</span>
                    <h3 className="text-3xl md:text-4xl font-black uppercase bg-black text-white px-6 py-2 border-4 border-black inline-block">
                      {category.category}
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-4">
                    {category.skills.map((skill, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.05 }}
                        whileHover={{ rotate: Math.random() * 10 - 5, scale: 1.1 }}
                        className="px-6 py-3 bg-white border-4 border-black font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer"
                      >
                        {skill}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-2xl font-bold text-center">No skills added yet</p>
          )}
        </div>
      </section>

      {/* Experience Section - Stacked Cards */}
      <section id="experience" className="py-32 px-6 bg-white border-t-8 border-black">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-6xl md:text-7xl font-black uppercase mb-20 inline-block bg-yellow-400 border-4 border-black px-8 py-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
          >
            Experience
          </motion.h2>

          {userData.experiences.length > 0 ? (
            <div className="space-y-8">
              {userData.experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ rotate: 1, scale: 1.02 }}
                  className={`p-8 ${
                    index % 3 === 0 ? 'bg-pink-400' :
                    index % 3 === 1 ? 'bg-blue-400' : 'bg-green-400'
                  } border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all`}
                >
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-2xl md:text-3xl font-black uppercase mb-2">
                        {exp.role}
                      </h3>
                      <p className="text-xl font-bold">{exp.company}</p>
                    </div>
                    <span className="px-4 py-2 bg-black text-white font-black text-sm uppercase">
                      {exp.period}
                    </span>
                  </div>
                  <p className="font-bold leading-relaxed mb-4">{exp.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {exp.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-white border-2 border-black font-black text-xs uppercase"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-2xl font-bold text-center">No experience added yet</p>
          )}
        </div>
      </section>

      {/* Projects Section - Grid Masonry */}
      <section id="projects" className="py-32 px-6 bg-gradient-to-br from-yellow-400 via-red-400 to-purple-400 border-t-8 border-black">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-6xl md:text-7xl font-black uppercase mb-20 inline-block bg-white border-4 border-black px-8 py-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
          >
            Projects
          </motion.h2>

          {userData.projects.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {userData.projects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ rotate: 2, scale: 1.05 }}
                  className="group"
                >
                  <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all overflow-hidden">
                    {/* Project Image */}
                    <div className="relative h-64 overflow-hidden border-b-4 border-black">
                      {project.image ? (
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-pink-400 to-purple-400 flex items-center justify-center">
                          <Rocket size={80} className="text-black" />
                        </div>
                      )}
                    </div>

                    {/* Project Info */}
                    <div className="p-6">
                      <h3 className="text-2xl font-black uppercase mb-3 leading-tight">
                        {project.title}
                      </h3>
                      <p className="font-bold text-sm mb-4 line-clamp-2">
                        {project.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.slice(0, 3).map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-black text-white text-xs font-black uppercase"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Links */}
                      <div className="flex gap-3">
                        {project.links.live && (
                          <a
                            href={project.links.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 px-4 py-2 bg-green-500 border-2 border-black font-black text-sm uppercase text-center hover:bg-green-600 transition-all"
                          >
                            Live
                          </a>
                        )}
                        {project.links.github && (
                          <a
                            href={project.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 px-4 py-2 bg-blue-500 border-2 border-black font-black text-sm uppercase text-center hover:bg-blue-600 transition-all"
                          >
                            Code
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-2xl font-bold text-center">No projects added yet</p>
          )}
        </div>
      </section>

      {/* Contact Section - Bold Form */}
      <section id="contact" className="py-32 px-6 bg-white border-t-8 border-black">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-6xl md:text-7xl font-black uppercase mb-20 inline-block bg-red-500 border-4 border-black px-8 py-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
          >
            Contact
          </motion.h2>

          <motion.form
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <input
                type="text"
                name="name"
                placeholder="YOUR NAME"
                value={formData.name}
                onChange={handleChange}
                className="px-6 py-5 bg-white border-4 border-black font-bold uppercase placeholder-gray-500 focus:outline-none focus:bg-yellow-400 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="YOUR@EMAIL.COM"
                value={formData.email}
                onChange={handleChange}
                className="px-6 py-5 bg-white border-4 border-black font-bold uppercase placeholder-gray-500 focus:outline-none focus:bg-yellow-400 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                required
              />
            </div>

            <textarea
              name="message"
              placeholder="YOUR MESSAGE..."
              value={formData.message}
              onChange={handleChange}
              rows={6}
              className="w-full px-6 py-5 bg-white border-4 border-black font-bold uppercase placeholder-gray-500 focus:outline-none focus:bg-yellow-400 transition-all resize-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              required
            />

            <motion.button
              whileHover={{ scale: 1.05, rotate: -2 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={submitted}
              className="w-full px-8 py-6 bg-black text-white font-black uppercase text-xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all disabled:opacity-50 flex items-center justify-center gap-3"
            >
              {submitted ? (
                <>
                  <Sparkles />
                  Message Sent!
                </>
              ) : (
                <>
                  <Send />
                  Send Message
                </>
              )}
            </motion.button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-20"
          >
            <h3 className="text-3xl font-black uppercase mb-8 text-center">Connect</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {userData.socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  className="w-16 h-16 bg-white border-4 border-black flex items-center justify-center text-3xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer - Bold */}
      <footer className="py-12 px-6 bg-black text-white border-t-8 border-black">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-lg font-black uppercase">
            © {currentYear} {userName}. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
