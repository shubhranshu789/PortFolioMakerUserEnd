"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, Github, Mail, Linkedin, Twitter, ExternalLink, ChevronDown, ArrowRight, Send, Sparkles, Heart, Star, Flower2 } from "lucide-react"
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

export default function FemininePortfolio() {
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
      transition: { duration: 0.6, ease: "easeOut" }
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
      transition: { duration: 0.5, ease: "easeOut" }
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-20 h-20 border-4 border-pink-200 border-t-rose-400 rounded-full mx-auto mb-6"
          />
          <p className="text-rose-600 text-lg font-medium">Loading your beautiful portfolio...</p>
        </motion.div>
      </div>
    )
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50 flex items-center justify-center">
        <p className="text-rose-600 text-xl">Failed to load portfolio</p>
      </div>
    )
  }

  return (
    <div className="w-full bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50 text-slate-700 overflow-x-hidden">
      {/* Gradient Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-pink-400 via-rose-400 to-purple-400 origin-left z-50 shadow-lg shadow-pink-200/50"
        style={{ scaleX: scaleProgress }}
      />

      {/* Floating Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {/* <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, 0],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 right-10 text-pink-200 opacity-40"
        >
          <Butterfly size={60} />
        </motion.div> */}
        <motion.div
          animate={{
            y: [0, 20, 0],
            rotate: [0, -10, 0],
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-40 left-10 text-purple-200 opacity-40"
        >
          <Flower2 size={70} />
        </motion.div>
        <motion.div
          animate={{
            y: [0, -15, 0],
            x: [0, 10, 0],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 left-1/4 text-rose-200 opacity-30"
        >
          <Heart size={50} />
        </motion.div>
      </div>

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 w-full z-40 transition-all duration-300 ${scrolled ? "bg-white/90 backdrop-blur-xl shadow-xl shadow-pink-100/30" : "bg-transparent"
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold flex items-center gap-2"
          >
            <Heart className="text-rose-400" fill="currentColor" size={24} />
            <span className="bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 bg-clip-text text-transparent">
              {userName}
            </span>
          </motion.div>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-slate-600 hover:text-rose-500 transition-colors font-medium relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-400 to-rose-400 group-hover:w-full transition-all duration-300 rounded-full" />
              </motion.a>
            ))}
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-rose-500"
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
              className="md:hidden bg-white/95 backdrop-blur-xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 space-y-4">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={index}
                    href={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setMobileOpen(false)}
                    className="block text-slate-700 hover:text-rose-500 transition-colors py-2 text-lg font-medium"
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
        {/* Soft Gradient Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-20 right-20 w-[500px] h-[500px] bg-gradient-to-br from-pink-200 via-rose-200 to-purple-200 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute bottom-20 left-20 w-[600px] h-[600px] bg-gradient-to-br from-purple-200 via-pink-200 to-rose-200 rounded-full blur-3xl"
        />

        <div className="max-w-6xl w-full relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center"
          >
            <motion.div variants={fadeInUp} className="mb-8">
              <span className="inline-flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-md border-2 border-pink-200 rounded-full text-rose-600 text-sm font-semibold shadow-xl shadow-pink-100/50">
                <Sparkles size={18} className="text-pink-400" />
                Open for Opportunities
                <Sparkles size={18} className="text-pink-400" />
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-6xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight"
            >
              <span className="text-slate-700">Hi, I'm a</span>
              <br />
              <span className="bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 bg-clip-text text-transparent">
                {userData.hero.highlightText}
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto mb-12 leading-relaxed"
            >
              {userData.hero.subtitle}
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.08, boxShadow: "0 15px 50px rgba(244, 114, 182, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                className="group px-10 py-5 bg-gradient-to-r from-pink-400 via-rose-400 to-purple-400 text-white font-semibold rounded-full flex items-center gap-3 text-lg shadow-2xl shadow-pink-200"
              >
                {userData.hero.primaryButtonText}
                <ArrowRight className="group-hover:translate-x-2 transition-transform" size={22} />
              </motion.a>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 bg-white/80 backdrop-blur-md border-2 border-pink-300 text-rose-600 font-semibold rounded-full hover:bg-white transition-all text-lg shadow-xl shadow-pink-100/50"
              >
                {userData.hero.secondaryButtonText}
              </motion.a>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <ChevronDown className="text-rose-400" size={44} />
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-28 px-6 bg-white/60 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid lg:grid-cols-2 gap-20 items-center"
          >
            {/* Left Column */}
            <div>
              <motion.div variants={fadeInUp}>
                <span className="text-rose-500 font-semibold text-sm mb-4 block uppercase tracking-widest flex items-center gap-2">
                  <Star size={16} className="text-pink-400" fill="currentColor" />
                  {userData.aboutMe.sectionTitle}
                </span>
                <h2 className="text-5xl md:text-6xl font-bold mb-10 leading-tight text-slate-800">
                  {userData.aboutMe.headline}
                </h2>
              </motion.div>

              <motion.div variants={fadeInUp} className="space-y-6 text-slate-600 text-lg leading-relaxed">
                <p className="border-l-4 border-pink-300 pl-6">{userData.aboutMe.introduction}</p>
                <p>{userData.aboutMe.description}</p>
              </motion.div>

              {userData.aboutMe.coreValues.length > 0 && (
                <motion.div variants={fadeInUp} className="mt-12 space-y-4">
                  {userData.aboutMe.coreValues.map((value, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.15 }}
                      className="flex items-center gap-4 group"
                    >
                      <Heart size={16} className="text-pink-400 group-hover:scale-125 transition-transform" fill="currentColor" />
                      <span className="text-slate-700 text-lg font-medium">{value}</span>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>

            {/* Right Column - Stats with Circular Cards */}
            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-2 gap-8"
            >
              {(() => {
                const validStats = [
                  { number: userData.aboutMe.stats.projectsCompleted, label: "Projects", icon: "✨", gradient: "from-pink-300 to-rose-400", borderColor: "border-pink-200" },
                  { number: userData.aboutMe.stats.yearsExperience, label: "Years Exp", icon: "💖", gradient: "from-purple-300 to-pink-400", borderColor: "border-purple-200" },
                  { number: userData.aboutMe.stats.happyClients, label: "Clients", icon: "🌸", gradient: "from-rose-300 to-pink-400", borderColor: "border-rose-200" },
                  { number: userData.aboutMe.stats.techSkills, label: "Skills", icon: "🦋", gradient: "from-pink-300 to-purple-400", borderColor: "border-pink-200" },
                ].filter(stat => stat.number > 0);

                return validStats.map((stat, index) => (
                  <motion.div
                    key={index}
                    variants={scaleIn}
                    whileHover={{ y: -8, scale: 1.05, rotate: 2 }}
                    className={`relative p-10 bg-white/90 backdrop-blur-md border-2 ${stat.borderColor} rounded-[2rem] shadow-2xl shadow-pink-100/50 overflow-hidden group`}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
                    <div className="relative z-10 text-center">
                      <div className="text-5xl mb-5">{stat.icon}</div>
                      <div className={`text-5xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-3`}>
                        {stat.number}+
                      </div>
                      <div className="text-slate-600 text-sm uppercase tracking-wider font-semibold">
                        {stat.label}
                      </div>
                    </div>
                  </motion.div>
                ));
              })()}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="relative py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-slate-800">
              My <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">Superpowers</span>
            </h2>
            <p className="text-slate-600 text-xl max-w-2xl mx-auto">
              Tools and technologies I love working with
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="space-y-10"
          >
            {userData.skillCategories.length > 0 ? (
              userData.skillCategories.map((category, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="relative p-10 bg-white/80 backdrop-blur-md border-2 border-pink-200 rounded-[2rem] shadow-xl shadow-pink-100/50"
                >
                  <div className="flex items-center gap-5 mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-rose-400 rounded-2xl flex items-center justify-center text-3xl shadow-lg shadow-pink-200">
                      {category.icon}
                    </div>
                    <h3 className="text-3xl font-bold text-slate-800">
                      {category.category}
                    </h3>
                    <div className="flex-1 h-1 bg-gradient-to-r from-pink-200 via-rose-200 to-transparent rounded-full" />
                  </div>

                  <div className="flex flex-wrap gap-4">
                    {category.skills.map((skill, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: 1 }}
                        transition={{ delay: idx * 0.05 }}
                        whileHover={{ y: -4, scale: 1.08 }}
                        className="px-6 py-3 bg-gradient-to-r from-pink-50 to-rose-50 border-2 border-pink-200 rounded-full hover:shadow-lg hover:shadow-pink-200/50 hover:border-rose-300 transition-all cursor-pointer"
                      >
                        <span className="font-semibold text-rose-600">{skill}</span>
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

      {/* Experience Section with Wavy Timeline */}
      {userData.experiences && userData.experiences.length > 0 && (
        <section id="experience" className="relative py-28 px-6 bg-white/60 backdrop-blur-sm">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-20"
            >
              <h2 className="text-5xl md:text-6xl font-bold mb-6 text-slate-800">
                My <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">Journey</span>
              </h2>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="relative"
            >
              {/* Wavy Timeline */}
              <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-pink-300 via-rose-300 to-purple-300 rounded-full" />

              {userData.experiences.length > 0 ? (
                userData.experiences.map((exp, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    className={`relative mb-20 ${index % 2 === 0 ? "md:pr-1/2 md:text-right" : "md:pl-1/2 md:ml-auto"
                      }`}
                  >
                    {/* Decorative Dot */}
                    <div className="absolute left-0 md:left-1/2 top-0 w-6 h-6 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full border-4 border-white transform -translate-x-1/2 md:translate-x-0 shadow-xl shadow-pink-200">
                      <motion.div
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 bg-pink-300 rounded-full opacity-50"
                      />
                    </div>

                    <motion.div
                      whileHover={{ y: -8, scale: 1.03 }}
                      className="ml-10 md:ml-0 p-10 bg-white/90 backdrop-blur-md border-2 border-pink-200 rounded-[2rem] shadow-xl shadow-pink-100/50"
                    >
                      <div className="mb-5">
                        <span className="px-5 py-2 bg-gradient-to-r from-pink-100 to-rose-100 border-2 border-pink-200 rounded-full text-rose-600 text-sm font-bold">
                          {exp.period}
                        </span>
                      </div>
                      <h3 className="text-3xl font-bold text-slate-800 mb-3">
                        {exp.role}
                      </h3>
                      <p className="text-rose-500 font-bold mb-5 text-lg">{exp.company}</p>
                      <p className="text-slate-600 leading-relaxed mb-6">{exp.description}</p>
                      <div className="flex flex-wrap gap-3">
                        {exp.skills.map((skill, idx) => (
                          <span
                            key={idx}
                            className="px-4 py-2 bg-pink-50 text-rose-600 rounded-full text-sm font-semibold border-2 border-pink-100"
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

      {/* Projects Section - Masonry Style */}
      <section id="projects" className="relative py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-slate-800">
              Featured <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">Work</span>
            </h2>
            <p className="text-slate-600 text-xl max-w-2xl mx-auto">
              Projects I've poured my heart into
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            {userData.projects.length > 0 ? (
              userData.projects.map((project, index) => (
                <motion.div
                  key={index}
                  variants={scaleIn}
                  whileHover={{ y: -12, rotate: index % 2 === 0 ? 1 : -1 }}
                  className="group relative"
                >
                  <div className="relative overflow-hidden rounded-[2rem] bg-white/90 backdrop-blur-md border-2 border-pink-200 hover:border-rose-300 hover:shadow-2xl hover:shadow-pink-200/50 transition-all">
                    {/* Project Image */}
                    <div className="relative h-72 overflow-hidden">
                      {project.image ? (
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-pink-200 via-rose-200 to-purple-200 flex items-center justify-center">
                          <span className="text-7xl">✨</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-rose-900 via-pink-900/20 to-transparent opacity-50" />
                    </div>

                    {/* Project Info */}
                    <div className="p-8">
                      <h3 className="text-2xl font-bold text-slate-800 mb-4 group-hover:text-rose-500 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-slate-600 text-sm mb-5 line-clamp-2">
                        {project.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tags.slice(0, 3).map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1.5 bg-pink-50 text-rose-600 rounded-full text-xs font-semibold border border-pink-200"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Links */}
                      <div className="flex gap-5">
                        {project.links.live && (
                          <a
                            href={project.links.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-rose-500 hover:text-rose-600 text-sm font-bold"
                          >
                            <ExternalLink size={18} />
                            Live
                          </a>
                        )}
                        {project.links.github && (
                          <a
                            href={project.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-rose-500 hover:text-rose-600 text-sm font-bold"
                          >
                            <Github size={18} />
                            Code
                          </a>
                        )}
                      </div>
                    </div>
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
      <section id="contact" className="relative py-28 px-6 bg-white/60 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-bold mb-6 text-slate-800">
                Let's Create <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">Together</span>
              </h2>
              <p className="text-slate-600 text-xl">
                I'd love to hear about your project
              </p>
            </motion.div>

            <motion.form
              variants={fadeInUp}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="px-7 py-5 bg-white/90 backdrop-blur-md border-2 border-pink-200 rounded-3xl focus:border-rose-400 focus:outline-none focus:ring-4 focus:ring-pink-100 transition-all placeholder-slate-400 text-slate-800 font-medium"
                  required
                />
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="px-7 py-5 bg-white/90 backdrop-blur-md border-2 border-pink-200 rounded-3xl focus:border-rose-400 focus:outline-none focus:ring-4 focus:ring-pink-100 transition-all placeholder-slate-400 text-slate-800 font-medium"
                  required
                />
              </div>

              <motion.textarea
                whileFocus={{ scale: 1.02 }}
                name="message"
                placeholder="Tell me about your project..."
                value={formData.message}
                onChange={handleChange}
                rows={6}
                className="w-full px-7 py-5 bg-white/90 backdrop-blur-md border-2 border-pink-200 rounded-3xl focus:border-rose-400 focus:outline-none focus:ring-4 focus:ring-pink-100 transition-all placeholder-slate-400 text-slate-800 font-medium resize-none"
                required
              />

              <motion.button
                whileHover={{ scale: 1.03, boxShadow: "0 15px 50px rgba(244, 114, 182, 0.4)" }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                disabled={submitted}
                className="w-full px-10 py-5 bg-gradient-to-r from-pink-400 via-rose-400 to-purple-400 text-white font-bold rounded-full hover:from-pink-500 hover:to-purple-500 transition-all disabled:opacity-50 flex items-center justify-center gap-3 text-lg shadow-2xl shadow-pink-200"
              >
                {submitted ? (
                  <>
                    <Heart size={22} fill="currentColor" />
                    Message Sent!
                  </>
                ) : (
                  <>
                    <Send size={22} />
                    Send Message
                  </>
                )}
              </motion.button>
            </motion.form>

            <motion.div
              variants={fadeInUp}
              className="mt-20 pt-16 border-t-2 border-pink-200"
            >
              <h3 className="text-3xl font-bold text-center mb-10 text-slate-800">Let's Connect</h3>
              <div className="flex justify-center gap-8 flex-wrap">
                {userData.socialLinks.map((social, index) => (
                  <div key={index} className="flex flex-col items-center gap-3">
                    <motion.a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -8, scale: 1.15, rotate: 5 }}
                      className="w-16 h-16 rounded-full bg-white/90 backdrop-blur-md border-2 border-pink-200 flex items-center justify-center text-3xl hover:border-rose-300 hover:shadow-xl hover:shadow-pink-200 transition-all"
                      style={{ color: social.color }}
                    >
                      {social.icon}
                    </motion.a>
                    <p className="text-sm text-slate-600 font-semibold">{social.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 px-6 bg-white/60 backdrop-blur-md border-t-2 border-pink-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left flex items-center gap-2">
              <Heart className="text-pink-400" fill="currentColor" size={18} />
              <p className="text-slate-600 text-sm font-medium">
                © {currentYear} {userName}. Made with love.
              </p>
            </div>
            <div className="flex gap-8 text-sm text-slate-600 font-medium">
              <Link href="#" className="hover:text-rose-500 transition-colors">
                Privacy
              </Link>
              <Link href="#" className="hover:text-rose-500 transition-colors">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
