"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, ArrowRight, Mail, Phone, MapPin, Download, Play } from "lucide-react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import type React from "react"
import { useRouter } from 'next/navigation'
import emailjs from '@emailjs/browser';
import { useParams } from 'next/navigation'
// export const dynamic = "force-dynamic";

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

export default function UI5() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const router = useRouter()
  const params = useParams()
  const { scrollYProgress } = useScroll()
  const yPosAnim = useTransform(scrollYProgress, [0, 1], [0, -100])

  const [USERNAME, setUsername] = useState('')
  const [userName, setUserName] = useState('Portfolio')
  const [userEmail, setuserEmail] = useState('')
  const API_BASE = `${process.env.NEXT_PUBLIC_API_URL}`;
  const [windowDimensions, setWindowDimensions] = useState({ width: 0, height: 0 });




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

  // useEffect(() => {
  //   const handleScroll = () => {
  //     setScrolled(window.scrollY > 50)
  //   }
  //   const handleMouseMove = (e: MouseEvent) => {
  //     setMousePosition({ x: e.clientX, y: e.clientY })
  //   }
  //   window.addEventListener("scroll", handleScroll)
  //   window.addEventListener("mousemove", handleMouseMove)
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll)
  //     window.removeEventListener("mousemove", handleMouseMove)
  //   }
  // }, [])

  useEffect(() => {
    // Set initial dimensions
    setWindowDimensions({
      width: window.innerWidth,
      height: window.innerHeight
    });

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


  const [particles] = useState(() =>
    [...Array(20)].map(() => ({
      startX: Math.random() * 100,
      endX: Math.random() * 100,
      startY: Math.random() * 100,
      endY: Math.random() * 100,
      duration: Math.random() * 3 + 2
    }))
  );

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Portfolio", href: "#projects" },
    { label: "Certifications", href: "#certifications" },
    { label: "Contact", href: "#contact" },
    // { label: "Dashboard", href: "/Components/DashBoard" },
  ]

  const currentYear = new Date().getFullYear()

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-pink-950 flex items-center justify-center relative overflow-hidden">
        {/* Animated particles */}
        {particles.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full"
            animate={windowDimensions.width > 0 ? {
              x: [particle.startX * windowDimensions.width / 100, particle.endX * windowDimensions.width / 100],
              y: [particle.startY * windowDimensions.height / 100, particle.endY * windowDimensions.height / 100],
              opacity: [0, 1, 0],
            } : {}}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-24 h-24 border-4 border-white/20 border-t-white rounded-full"
        />
      </div>
    )
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-pink-950 flex items-center justify-center">
        <p className="text-white text-2xl">Failed to load portfolio</p>
      </div>
    )
  }

  return (
    <div className="w-full bg-gradient-to-br from-indigo-950 via-purple-950 to-pink-950 text-white overflow-x-hidden relative">
      {/* Animated Background Particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 1, 0.2],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Mouse Follower Glow */}
      <motion.div
        className="fixed w-96 h-96 rounded-full pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
        }}
      />

      {/* Glassmorphism Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-40 transition-all duration-300 ${scrolled ? 'w-11/12 max-w-6xl' : 'w-11/12 max-w-7xl'
          }`}
      >
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-6 py-4 shadow-2xl">
          <div className="flex justify-between items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-xl font-bold"
            >
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {userName}
              </span>
            </motion.div>

            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  whileHover={{ scale: 1.05 }}
                  className="px-4 py-2 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-all font-medium"
                >
                  {link.label}
                </motion.a>
              ))}
              {/* <motion.a
                href="/Components/DashBoard"
                whileHover={{ scale: 1.05 }}
                className="ml-2 px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all"
              >
                Dashboard
              </motion.a> */}
            </div>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden text-white"
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
              className="mt-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden"
            >
              <div className="p-4 space-y-2">
                {navLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block px-4 py-3 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-all"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section - Split Design */}
      <section id="home" className="min-h-screen flex items-center justify-center px-6 pt-32 pb-20 relative">
        <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-12 items-center relative z-10">
          {/* Left Side - Text */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 }}
              className="inline-block mb-6"
            >
              <span className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm font-medium">
                👋 Welcome to my portfolio
              </span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="text-white">I'm a</span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                {userData.hero.highlightText}
              </span>
            </h1>

            <p className="text-xl text-white/70 mb-8 leading-relaxed">
              {userData.hero.subtitle}
            </p>

            <div className="flex flex-wrap gap-4">
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(139, 92, 246, 0.6)" }}
                whileTap={{ scale: 0.95 }}
                className="group px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl font-semibold flex items-center gap-2"
              >
                {userData.hero.primaryButtonText}
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </motion.a>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl font-semibold hover:bg-white/20 transition-all"
              >
                {userData.hero.secondaryButtonText}
              </motion.a>
            </div>

            {/* <div className="mt-12 flex gap-4">
              {userData.socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  whileHover={{ y: -5, scale: 1.1 }}
                  className="w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl flex items-center justify-center text-xl hover:bg-white/20 transition-all"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div> */}
          </motion.div>

          {/* Right Side - 3D Card */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <motion.div
              animate={{
                rotateY: [0, 10, 0, -10, 0],
              }}
              transition={{ duration: 10, repeat: Infinity }}
              className="relative w-full aspect-square bg-gradient-to-br from-blue-500/20 to-purple-600/20 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl overflow-hidden"
            >
              {/* Animated gradient overlay */}
              <motion.div
                animate={{
                  background: [
                    'radial-gradient(circle at 0% 0%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)',
                    'radial-gradient(circle at 100% 100%, rgba(168, 85, 247, 0.3) 0%, transparent 50%)',
                    'radial-gradient(circle at 0% 100%, rgba(236, 72, 153, 0.3) 0%, transparent 50%)',
                    'radial-gradient(circle at 100% 0%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)',
                  ],
                }}
                transition={{ duration: 10, repeat: Infinity }}
                className="absolute inset-0"
              />

              <div className="relative z-10 h-full flex flex-col justify-center items-center text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full mb-6 flex items-center justify-center text-5xl">
                  💼
                </div>
                <h3 className="text-3xl font-bold mb-4">Ready to Create</h3>
                <p className="text-white/70">Let's build something amazing together</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section - Bento Grid */}
      <section id="about" className="py-32 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="text-blue-400 font-semibold text-sm uppercase tracking-wider">
              {userData.aboutMe.sectionTitle}
            </span>
            <h2 className="text-5xl md:text-6xl font-bold mt-4 mb-6">
              {userData.aboutMe.headline}
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Large card - About text */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8"
            >
              <div className="space-y-6">
                <p className="text-lg text-white/80 leading-relaxed">
                  {userData.aboutMe.introduction}
                </p>
                <p className="text-lg text-white/80 leading-relaxed">
                  {userData.aboutMe.description}
                </p>

                {userData.aboutMe.coreValues.length > 0 && (
                  <div className="pt-6 border-t border-white/10">
                    <h4 className="text-sm font-bold text-purple-400 uppercase tracking-wider mb-4">
                      Core Values
                    </h4>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {userData.aboutMe.coreValues.map((value, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center gap-3 p-3 bg-white/5 rounded-xl"
                        >
                          <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full" />
                          <span className="text-sm">{value}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Stats cards */}
            <div className="space-y-6">
              {(() => {
                const validStats = [
                  { number: userData.aboutMe.stats.projectsCompleted, label: "Projects", gradient: "from-blue-500 to-cyan-500" },
                  { number: userData.aboutMe.stats.yearsExperience, label: "Years", gradient: "from-purple-500 to-pink-500" },
                  { number: userData.aboutMe.stats.happyClients, label: "Clients", gradient: "from-orange-500 to-red-500" },
                  { number: userData.aboutMe.stats.techSkills, label: "Skills", gradient: "from-green-500 to-emerald-500" },
                ].filter(stat => stat.number > 0);

                return validStats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className={`bg-gradient-to-br ${stat.gradient} bg-opacity-20 backdrop-blur-xl border border-white/20 rounded-3xl p-6`}
                  >
                    <div className="text-5xl font-bold mb-2">{stat.number}+</div>
                    <div className="text-sm text-white/80 uppercase tracking-wider">{stat.label}</div>
                  </motion.div>
                ));
              })()}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section - Glassmorphism Pills */}
      <section id="skills" className="py-32 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Skills & <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Expertise</span>
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
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center gap-4 mb-8">
                    <span className="text-4xl">{category.icon}</span>
                    <h3 className="text-3xl font-bold">{category.category}</h3>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {category.skills.map((skill, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.05 }}
                        whileHover={{ scale: 1.1, y: -5 }}
                        className="px-6 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full hover:bg-white/20 transition-all cursor-pointer"
                        style={{
                          boxShadow: `0 0 20px ${category.color}30`
                        }}
                      >
                        <span className="font-medium">{skill}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-center text-white/60">No skills added yet</p>
          )}
        </div>
      </section>

      {/* Experience Section - Timeline with Glass Cards */}
      {userData.experiences && userData.experiences.length > 0 && (
        <section id="experience" className="py-32 px-6 relative">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-5xl md:text-6xl font-bold">Experience</h2>
            </motion.div>

            {userData.experiences.length > 0 ? (
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500" />

                <div className="space-y-12">
                  {userData.experiences.map((exp, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.2 }}
                      className="relative pl-24"
                    >
                      {/* Timeline dot */}
                      <div className="absolute left-6 top-6 w-5 h-5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full border-4 border-indigo-950" />

                      <motion.div
                        whileHover={{ scale: 1.02, x: 10 }}
                        className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8"
                      >
                        <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                          <div>
                            <h3 className="text-2xl font-bold mb-2">{exp.role}</h3>
                            <p className="text-purple-400 font-semibold">{exp.company}</p>
                          </div>
                          <span className="px-4 py-2 bg-white/10 rounded-full text-sm font-mono">
                            {exp.period}
                          </span>
                        </div>
                        <p className="text-white/70 mb-4 leading-relaxed">{exp.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {exp.skills.map((skill, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full text-xs font-medium"
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
            ) : (
              <p className="text-center text-white/60">No experience added yet</p>
            )}
          </div>
        </section>
      )}

      {/* Certifications Section - Glassmorphism */}
      {userData.certifications && userData.certifications.length > 0 && (
        <section id="certifications" className="py-32 px-6 relative">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-5xl md:text-6xl font-bold mb-6">
                Certifications & <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Achievements</span>
              </h2>
              <p className="text-white/70 text-xl">Professional credentials and accomplishments</p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {userData.certifications.slice(0, 6).map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="group relative"
                >
                  <div className="relative h-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 overflow-hidden hover:border-white/40 transition-all">

                    {/* Animated gradient background */}
                    <motion.div
                      animate={{
                        background: [
                          'radial-gradient(circle at 0% 0%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)',
                          'radial-gradient(circle at 100% 100%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)',
                          'radial-gradient(circle at 0% 100%, rgba(236, 72, 153, 0.1) 0%, transparent 50%)',
                          'radial-gradient(circle at 100% 0%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)',
                        ],
                      }}
                      transition={{ duration: 8, repeat: Infinity }}
                      className="absolute inset-0 group-hover:opacity-100 opacity-0 transition-opacity"
                    />

                    {/* Trophy Badge */}
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.2, type: "spring", stiffness: 200 }}
                      className="absolute top-6 right-6 w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/50"
                    >
                      <span className="text-2xl">🏆</span>
                    </motion.div>

                    <div className="relative z-10 flex flex-col h-full">
                      {/* Certificate Icon */}
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
                        className="mb-6"
                      >
                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-600/20 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                          <span className="text-4xl">🎓</span>
                        </div>
                      </motion.div>

                      {/* Title */}
                      <h3 className="text-2xl font-bold text-white mb-4 leading-tight group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text group-hover:text-transparent transition-all">
                        {cert.title}
                      </h3>

                      {/* Issue Date */}
                      <div className="mb-4">
                        <motion.span
                          whileHover={{ scale: 1.05 }}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm font-mono"
                        >
                          <span>📅</span>
                          {cert.issueDate}
                        </motion.span>
                      </div>

                      {/* Description */}
                      <p className="text-white/70 leading-relaxed flex-grow text-sm">
                        {cert.description}
                      </p>

                      {/* Gradient line at bottom */}
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "100%" }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 + 0.5, duration: 0.8 }}
                        className="h-1 mt-6 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                      />
                    </div>

                    {/* Corner decorations */}
                    <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-white/20 rounded-bl-xl" />
                    <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-white/20 rounded-tl-xl" />
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
                  whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(139, 92, 246, 0.6)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowAllCertificates(true)}
                  className="px-10 py-5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl font-bold text-lg hover:shadow-xl transition-all flex items-center gap-3 mx-auto"
                >
                  View All {userData.certifications.length} Certifications
                  <ArrowRight size={22} />
                </motion.button>
              </motion.div>
            )}

            {/* Total Count Badge */}
            {userData.certifications.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="mt-16 flex justify-center"
              >
                <div className="inline-flex items-center gap-6 px-12 py-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl">
                  <motion.div
                    animate={{
                      rotate: [0, 360],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="text-5xl"
                  >
                    ✨
                  </motion.div>
                  <div>
                    <p className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                      {userData.certifications.length}
                    </p>
                    <p className="text-white/70 text-sm font-medium mt-1">
                      Certifications Earned
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Modal for All Certifications */}
          <AnimatePresence>
            {showAllCertificates && (
              <>
                {/* Backdrop with blur */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setShowAllCertificates(false)}
                  className="fixed inset-0 bg-black/80 backdrop-blur-xl z-50 flex items-center justify-center p-4"
                >
                  {/* Modal Content */}
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0, y: 100 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.8, opacity: 0, y: 100 }}
                    transition={{ type: "spring", damping: 25, stiffness: 250 }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl max-w-7xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
                  >
                    {/* Modal Header */}
                    <div className="sticky top-0 z-10 bg-gradient-to-br from-indigo-950/95 via-purple-950/95 to-pink-950/95 backdrop-blur-xl border-b border-white/20 p-8 flex justify-between items-center">
                      <div>
                        <h3 className="text-4xl font-bold text-white mb-2">
                          All <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Certifications</span>
                        </h3>
                        <p className="text-white/70">
                          {userData.certifications.length} professional achievements
                        </p>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1, rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setShowAllCertificates(false)}
                        className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 flex items-center justify-center text-white transition-all"
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
                            whileHover={{ y: -5, scale: 1.02 }}
                            className="group relative"
                          >
                            <div className="relative h-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 hover:border-white/40 transition-all">

                              {/* Hover glow */}
                              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-all rounded-2xl" />

                              {/* Badge */}
                              <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                                <span className="text-xl">🏆</span>
                              </div>

                              <div className="relative z-10">
                                {/* Icon */}
                                <div className="mb-4">
                                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-600/20 border border-white/20 flex items-center justify-center">
                                    <span className="text-3xl">🎓</span>
                                  </div>
                                </div>

                                {/* Title */}
                                <h4 className="text-xl font-bold text-white mb-3 leading-tight group-hover:text-purple-400 transition-colors">
                                  {cert.title}
                                </h4>

                                {/* Date */}
                                <div className="mb-3">
                                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-xs font-mono">
                                    📅 {cert.issueDate}
                                  </span>
                                </div>

                                {/* Description */}
                                <p className="text-white/70 text-sm leading-relaxed mb-4">
                                  {cert.description}
                                </p>

                                {/* Bottom line */}
                                <div className="h-1 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
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


      {/* Projects Section - Card Grid with Glassmorphism */}
      <section id="projects" className="py-32 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6">Featured Projects</h2>
            <p className="text-white/70 text-xl">Check out my recent work</p>
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
                  whileHover={{ y: -10 }}
                  className="group"
                >
                  <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden hover:border-white/40 transition-all">
                    {/* Project Image */}
                    <div className="relative h-56 overflow-hidden">
                      {project.image ? (
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-blue-500/30 to-purple-500/30 flex items-center justify-center">
                          <Play size={60} />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    </div>

                    {/* Project Info */}
                    <div className="p-6">
                      <h3 className="text-2xl font-bold mb-3 group-hover:text-purple-400 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-white/70 text-sm mb-4 line-clamp-2">
                        {project.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.slice(0, 3).map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-white/10 rounded-lg text-xs"
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
                            className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-center text-sm font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all"
                          >
                            View Live
                          </a>
                        )}
                        {project.links.github && (
                          <a
                            href={project.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-center text-sm font-medium hover:bg-white/20 transition-all"
                          >
                            GitHub
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-center text-white/60">No projects added yet</p>
          )}
        </div>
      </section>

      {/* Contact Section - Glassmorphism Form */}
      <section id="contact" className="py-32 px-6 relative">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6">Let's Connect</h2>
            <p className="text-white/70 text-xl">Have a project in mind? Let's talk!</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 md:p-12"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl focus:border-purple-400 focus:outline-none transition-all placeholder-white/50 text-white"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl focus:border-purple-400 focus:outline-none transition-all placeholder-white/50 text-white"
                  required
                />
              </div>

              <textarea
                name="message"
                placeholder="Your message..."
                value={formData.message}
                onChange={handleChange}
                rows={6}
                className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl focus:border-purple-400 focus:outline-none transition-all placeholder-white/50 text-white resize-none"
                required
              />

              <motion.button
                whileHover={{ scale: 1.02, boxShadow: "0 0 40px rgba(139, 92, 246, 0.6)" }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={submitted}
                className="w-full px-8 py-5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl font-bold text-lg hover:shadow-xl transition-all disabled:opacity-50 flex items-center justify-center gap-3"
              >
                {submitted ? (
                  <>
                    <span>✓</span>
                    Message Sent!
                  </>
                ) : (
                  <>
                    <Mail size={20} />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>

            <div className="mt-12 pt-12 border-t border-white/10">
              <h3 className="text-center text-xl font-bold mb-8">Connect with me</h3>
              <div className="flex justify-center gap-10">
                {userData.socialLinks.map((social, index) => (
                  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -5, scale: 1.1 }}
                      className="w-14 h-14 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl flex items-center justify-center text-2xl hover:bg-white/20 transition-all"
                    >
                      {social.icon}
                    </motion.a>

                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -5, scale: 1.1 }}
                      className="w-14 h-14   flex items-center justify-center text-2xl"
                    >
                      {social.label}
                    </motion.a>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer - Glassmorphism */}
      <footer className="py-12 px-6 border-t border-white/10 relative">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/60 text-sm">
            © {currentYear} {userName}. All rights reserved.
          </p>
          <div className="flex gap-8 text-sm text-white/60">
            <Link href="#" className="hover:text-white transition-colors">
              Privacy
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
