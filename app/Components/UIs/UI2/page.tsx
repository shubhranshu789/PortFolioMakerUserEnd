"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, Github, Mail, Linkedin, Twitter, ExternalLink, ChevronDown } from "lucide-react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import type React from "react"
import { useRouter } from 'next/navigation';
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

export default function Portfolio() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)

  const router = useRouter()
  const params = useParams()

  const { scrollYProgress } = useScroll()
  const scaleProgress = useTransform(scrollYProgress, [0, 1], [0, 1])

  // const USERNAME = 'shubh5'
  const [USERNAME, setUsername] = useState('');
  const [isFetching, setIsFetching] = useState(true);
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
      // Use the email from state (already fetched from API)
      if (!userEmail) {
        alert('Portfolio owner information not found');
        return;
      }

      const templateParams = {
        to_email: userEmail, // Email fetched from API
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
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
    // { label: "DashBoard", href: "/Components/DashBoard" },
  ]


  const [userName, setUserName] = useState('Portfolio');
  const [userEmail, setuserEmail] = useState('')

  useEffect(() => {
    // Get username from localStorage
    try {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        const user = JSON.parse(userStr);
        setUserName(user.userName || user.name || 'Portfolio');
      }

      if (userStr) {
        const user = JSON.parse(userStr);
        setuserEmail(user.email || user.name || 'Exaple');
      }
    } catch (error) {
      console.error('Error parsing user from localStorage:', error);
    }
  }, []);


  const currentYear = new Date().getFullYear()

  const getIconComponent = (iconName: string) => {
    const iconMap: { [key: string]: any } = {
      Mail,
      Linkedin,
      Github,
      Twitter,
    }
    return iconMap[iconName] || Mail
  }

  // Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

  const fadeInLeft = {
    hidden: { opacity: 0, x: -60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

  const fadeInRight = {
    hidden: { opacity: 0, x: 60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  }

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"
          />
          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-gray-400"
          >
            Loading portfolio...
          </motion.p>
        </motion.div>
      </div>
    )
  }

  if (!userData) {
    return (
      <div className="w-full min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 flex items-center justify-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-gray-400"
        >
          Failed to load portfolio data
        </motion.p>
      </div>
    )
  }

  return (
    <div className="w-full bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white overflow-x-hidden">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 origin-left z-50"
        style={{ scaleX: scaleProgress }}
      />

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 w-full z-40 transition-all duration-300 ${scrolled
          ? "bg-slate-950/90 backdrop-blur-lg border-b border-purple-500/20 shadow-lg shadow-purple-500/10"
          : "bg-transparent"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6 flex justify-between items-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="#" className="flex items-center space-x-3 group">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg"
              >
                <span className="text-white font-bold text-xl">
                  {userName.charAt(0).toUpperCase()}
                </span>
              </motion.div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                {userName}
              </span>
            </Link>
          </motion.div>

          <div className="hidden md:flex items-center gap-8 lg:gap-12">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={link.href}
                  className="text-sm font-medium text-gray-300 hover:text-purple-400 transition-colors relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-300" />
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-gray-300 hover:text-purple-400 transition-colors"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-slate-900/95 backdrop-blur-lg border-t border-purple-500/20 overflow-hidden"
            >
              <div className="p-6 space-y-4">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      className="block text-sm font-medium text-gray-300 hover:text-purple-400 transition-colors py-2"
                      onClick={() => setMobileOpen(false)}
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

      <main className="pt-16 sm:pt-20">
        {/* HERO SECTION */}
        <section className="relative w-full py-16 sm:py-24 lg:py-32 px-4 sm:px-6 min-h-[90vh] flex items-center overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"
            />
            <motion.div
              animate={{
                scale: [1.2, 1, 1.2],
                rotate: [360, 180, 0],
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"
            />
          </div>

          <div className="max-w-7xl mx-auto relative z-10 w-full">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="max-w-4xl"
            >
              <motion.span
                variants={fadeInUp}
                className="text-xs sm:text-sm font-mono text-purple-400"
              >
                Welcome to my portfolio —
              </motion.span>

              <motion.h1
                variants={fadeInUp}
                className="text-4xl sm:text-6xl lg:text-8xl font-bold mt-6 sm:mt-8 leading-tight"
              >
                {userData.hero.title.split(userData.hero.highlightText)[0]}
                <motion.span
                  className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mt-2"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{ duration: 5, repeat: Infinity }}
                  style={{ backgroundSize: "200% auto" }}
                >
                  {userData.hero.highlightText}
                </motion.span>
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="text-base sm:text-lg lg:text-xl text-gray-400 mt-6 sm:mt-8 leading-relaxed max-w-2xl"
              >
                {userData.hero.subtitle}
              </motion.p>

              <motion.div
                variants={fadeInUp}
                className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-8 sm:mt-12"
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="#projects"
                    className="block px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 font-medium rounded-lg text-center"
                  >
                    {userData.hero.primaryButtonText}
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="#contact"
                    className="block px-6 sm:px-8 py-3 sm:py-4 border-2 border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white transition-all duration-300 font-medium rounded-lg text-center"
                  >
                    {userData.hero.secondaryButtonText}
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden sm:block"
          >
            <ChevronDown className="text-purple-400" size={32} />
          </motion.div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="relative w-full py-16 sm:py-24 px-4 sm:px-6 border-t border-purple-500/20">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeInLeft}
                className="col-span-1"
              >
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {userData.aboutMe.sectionTitle}
                </h2>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerContainer}
                className="col-span-1 lg:col-span-2 space-y-8 sm:space-y-12"
              >
                {/* Headline and Description */}
                <motion.div variants={fadeInUp} className="space-y-4">
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                    {userData.aboutMe.headline}
                  </h3>
                  {userData.aboutMe.introduction && (
                    <p className="text-base sm:text-lg text-gray-400 leading-relaxed">
                      {userData.aboutMe.introduction}
                    </p>
                  )}
                  {userData.aboutMe.description && (
                    <p className="text-base sm:text-lg text-gray-400 leading-relaxed">
                      {userData.aboutMe.description}
                    </p>
                  )}
                </motion.div>

                {/* Core Values */}
                {userData.aboutMe.coreValues && userData.aboutMe.coreValues.length > 0 && (
                  <motion.div variants={fadeInUp} className="space-y-4">
                    <h4 className="text-sm font-bold text-purple-400 uppercase tracking-wider">
                      Core Values
                    </h4>
                    <div className="space-y-3">
                      {userData.aboutMe.coreValues.map((value, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center gap-3 group"
                        >
                          <motion.span
                            whileHover={{ scale: 1.5, rotate: 180 }}
                            className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex-shrink-0"
                          />
                          <p className="text-base text-gray-400 group-hover:text-gray-300 transition-colors">
                            {value}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Stats Section */}
                {(() => {
                  const validStats = [
                    { number: userData.aboutMe.stats.projectsCompleted, label: "Projects Completed" },
                    { number: userData.aboutMe.stats.yearsExperience, label: "Years Experience" },
                    { number: userData.aboutMe.stats.happyClients, label: "Happy Clients" },
                    { number: userData.aboutMe.stats.techSkills, label: "Tech Skills" },
                  ].filter(stat => stat.number > 0);

                  if (validStats.length === 0) return null;

                  return (
                    <motion.div
                      variants={staggerContainer}
                      className={`grid gap-4 sm:gap-6 lg:gap-8 ${validStats.length === 1 ? 'grid-cols-1 max-w-xs' :
                          validStats.length === 2 ? 'grid-cols-2 max-w-2xl' :
                            validStats.length === 3 ? 'grid-cols-2 sm:grid-cols-3' :
                              'grid-cols-2 sm:grid-cols-2 lg:grid-cols-4'
                        }`}
                    >
                      {validStats.map((stat, index) => (
                        <motion.div
                          key={index}
                          variants={scaleIn}
                          whileHover={{ scale: 1.05, y: -5 }}
                          className="relative group"
                        >
                          <div className="space-y-2 p-4 sm:p-6 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 h-full">
                            {/* Glow effect on hover */}
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/10 group-hover:to-pink-500/10 rounded-xl transition-all duration-300" />

                            <div className="relative z-10">
                              <motion.p
                                initial={{ opacity: 0, scale: 0 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
                                className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
                              >
                                {stat.number}+
                              </motion.p>
                              <p className="text-gray-400 text-xs sm:text-sm mt-2 leading-tight">
                                {stat.label}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  );
                })()}
              </motion.div>




            </div>
          </div>
        </section>

        {/* SKILLS SECTION */}
        <section id="skills" className="relative w-full py-16 sm:py-24 px-4 sm:px-6 bg-slate-900/50 border-y border-purple-500/20">
          <div className="max-w-7xl mx-auto">
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-12 sm:mb-16 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
            >
              Skills & Technologies
            </motion.h2>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="space-y-8 sm:space-y-12"
            >
              {userData.skillCategories.length > 0 ? (
                userData.skillCategories.map((category, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    className="pb-8 border-b border-purple-500/20 last:border-b-0"
                  >
                    <motion.div
                      className="flex items-center gap-3 mb-6"
                      whileHover={{ x: 10 }}
                    >
                      <motion.span
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                        className="text-2xl sm:text-3xl"
                      >
                        {category.icon}
                      </motion.span>
                      <h3 className="text-xl sm:text-2xl font-bold text-white">
                        {category.category}
                      </h3>
                    </motion.div>
                    <div className="flex flex-wrap gap-3">
                      {category.skills.map((skill, idx) => (
                        <motion.span
                          key={idx}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: idx * 0.05 }}
                          whileHover={{ scale: 1.1, y: -5 }}
                          className="px-4 py-2 border rounded-full text-sm font-medium transition-all duration-300 cursor-pointer"
                          style={{
                            borderColor: category.color,
                            color: category.color,
                            boxShadow: `0 0 20px ${category.color}20`
                          }}
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                ))
              ) : (
                <p className="text-center text-gray-400">No skills added yet</p>
              )}
            </motion.div>
          </div>
        </section>

        {/* EXPERIENCE SECTION */}
        <section id="experience" className="relative w-full py-16 sm:py-24 px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-12 sm:mb-16 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
            >
              Experience
            </motion.h2>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="space-y-12 sm:space-y-16"
            >
              {userData.experiences.length > 0 ? (
                userData.experiences.map((exp, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    whileHover={{ scale: 1.02 }}
                    className="group relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="relative flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6 sm:gap-8 p-6 sm:p-8 border-b border-purple-500/20 last:border-b-0">
                      <div className="flex-1 space-y-4">
                        <div>
                          <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-purple-400 transition-colors">
                            {exp.role}
                          </h3>
                          <p className="text-purple-400 font-medium mt-2">{exp.company}</p>
                        </div>
                        <p className="text-gray-400 leading-relaxed">{exp.description}</p>
                      </div>

                      <div className="lg:text-right space-y-4">
                        <p className="text-gray-400 text-sm font-mono whitespace-nowrap bg-purple-500/10 px-4 py-2 rounded-lg inline-block">
                          {exp.period}
                        </p>
                        <div className="flex flex-wrap gap-2 lg:justify-end">
                          {exp.skills.map((skill, idx) => (
                            <motion.span
                              key={idx}
                              initial={{ opacity: 0, scale: 0 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ delay: idx * 0.05 }}
                              whileHover={{ scale: 1.1 }}
                              className="text-xs font-medium text-purple-400 bg-purple-500/20 px-3 py-1 rounded-full cursor-pointer"
                            >
                              {skill}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <p className="text-center text-gray-400">No experience added yet</p>
              )}
            </motion.div>
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="relative w-full py-16 sm:py-24 px-4 sm:px-6 bg-slate-900/50">
          <div className="max-w-7xl mx-auto">
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-12 sm:mb-16 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
            >
              Selected Work
            </motion.h2>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            >
              {userData.projects.length > 0 ? (
                userData.projects.map((project, index) => (
                  <motion.div
                    key={index}
                    variants={scaleIn}
                    whileHover={{ y: -10 }}
                    className="group cursor-pointer"
                  >
                    <div className="relative overflow-hidden rounded-xl bg-slate-800 mb-6 aspect-video">
                      <motion.img
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.4 }}
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold mb-3 text-white group-hover:text-purple-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 mb-4 line-clamp-2 text-sm sm:text-base">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.slice(0, 3).map((tag, idx) => (
                        <span key={idx} className="text-xs font-medium text-gray-500">
                          {tag}
                          {idx < Math.min(project.tags.length, 3) - 1 && <span className="ml-2">·</span>}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-4">
                      {project.links.live && (
                        <motion.div whileHover={{ x: 5 }}>
                          <Link
                            href={project.links.live}
                            target="_blank"
                            className="text-purple-400 font-medium hover:text-purple-300 text-sm flex items-center gap-2"
                          >
                            Live <ExternalLink size={14} />
                          </Link>
                        </motion.div>
                      )}
                      {project.links.github && (
                        <motion.div whileHover={{ x: 5 }}>
                          <Link
                            href={project.links.github}
                            target="_blank"
                            className="text-purple-400 font-medium hover:text-purple-300 text-sm flex items-center gap-2"
                          >
                            Code <ExternalLink size={14} />
                          </Link>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full text-center">
                  <p className="text-gray-400">No projects added yet</p>
                </div>
              )}
            </motion.div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="relative w-full py-16 sm:py-24 px-4 sm:px-6 border-t border-purple-500/20 overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 90, 0],
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
            />
            <motion.div
              animate={{
                scale: [1.2, 1, 1.2],
                rotate: [0, -90, 0],
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
            />
          </div>

          <div className="max-w-5xl mx-auto relative z-10">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {/* Header */}
              <div className="text-center mb-12 sm:mb-16">
                <motion.div
                  variants={fadeInUp}
                  className="inline-block mb-4"
                >
                  <span className="px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-400 text-sm font-medium">
                    💬 Let's Connect
                  </span>
                </motion.div>

                <motion.h2
                  variants={fadeInUp}
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent"
                >
                  Get In Touch
                </motion.h2>

                <motion.p
                  variants={fadeInUp}
                  className="text-base sm:text-lg lg:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed"
                >
                  Have a project or idea? I'd love to hear from you. Send me a message or reach out on social media.
                </motion.p>
              </div>

              {/* Contact Form */}
              <motion.div
                variants={fadeInUp}
                className="mb-16 sm:mb-20"
              >
                <form
                  onSubmit={handleSubmit}
                  className="bg-slate-900/50 backdrop-blur-lg border border-purple-500/20 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-2xl"
                >
                  <div className="space-y-6">
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      className="relative"
                    >
                      <label className="block text-sm font-medium text-purple-400 mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-4 bg-slate-800/50 border border-purple-500/30 rounded-xl focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all placeholder-gray-500 text-white"
                        required
                      />
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      className="relative"
                    >
                      <label className="block text-sm font-medium text-purple-400 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-4 bg-slate-800/50 border border-purple-500/30 rounded-xl focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all placeholder-gray-500 text-white"
                        required
                      />
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      className="relative"
                    >
                      <label className="block text-sm font-medium text-purple-400 mb-2">
                        Your Message
                      </label>
                      <textarea
                        name="message"
                        placeholder="Tell me about your project..."
                        value={formData.message}
                        onChange={handleChange}
                        rows={6}
                        className="w-full px-4 py-4 bg-slate-800/50 border border-purple-500/30 rounded-xl focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all placeholder-gray-500 text-white resize-none"
                        required
                      />
                    </motion.div>

                    <motion.button
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={submitted}
                      className="w-full px-8 py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed relative overflow-hidden group"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {submitted ? (
                          <>
                            <span className="text-xl">✓</span>
                            Message Sent Successfully!
                          </>
                        ) : (
                          <>
                            <span className="text-xl">✉️</span>
                            Send Message
                          </>
                        )}
                      </span>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.5 }}
                      />
                    </motion.button>
                  </div>
                </form>
              </motion.div>

              {/* Social Links Section */}
              <motion.div
                variants={fadeInUp}
                className="relative"
              >
                <div className="text-center mb-8">
                  <h3 className="text-2xl sm:text-3xl font-bold mb-3 text-white">
                    Connect With Me
                  </h3>
                  <p className="text-gray-400 text-sm sm:text-base">
                    Let's stay connected on social media
                  </p>
                </div>

                {userData.socialLinks.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                    {userData.socialLinks.map((social, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.05, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Link
                          href={social.href}
                          target="_blank"
                          className="block group"
                          title={social.label}
                        >
                          <div
                            className="relative p-6 rounded-2xl border-2 transition-all duration-300 hover:shadow-xl backdrop-blur-sm"
                            style={{
                              borderColor: `${social.color}40`,
                              backgroundColor: `${social.color}10`
                            }}
                          >
                            {/* Glow effect on hover */}
                            <div
                              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"
                              style={{ backgroundColor: `${social.color}30` }}
                            />

                            <div className="relative z-10 flex flex-col items-center gap-3">
                              <motion.div
                                whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                                transition={{ duration: 0.5 }}
                                className="text-4xl sm:text-5xl p-3 rounded-xl"
                                style={{ backgroundColor: `${social.color}20` }}
                              >
                                {social.icon}
                              </motion.div>

                              <span
                                className="text-sm sm:text-base font-bold text-center transition-colors"
                                style={{ color: social.color }}
                              >
                                {social.label}
                              </span>

                              <motion.div
                                className="w-8 h-1 rounded-full"
                                style={{ backgroundColor: social.color }}
                                initial={{ width: 0 }}
                                whileHover={{ width: "100%" }}
                                transition={{ duration: 0.3 }}
                              />
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <motion.div
                    variants={fadeInUp}
                    className="text-center p-12 bg-slate-900/30 border border-purple-500/20 rounded-2xl"
                  >
                    <p className="text-gray-400 text-lg">
                      No social links added yet. Check back soon! 🔗
                    </p>
                  </motion.div>
                )}
              </motion.div>

              {/* Alternative: Quick Contact Info */}
              <motion.div
                variants={fadeInUp}
                className="mt-12 sm:mt-16 grid sm:grid-cols-2 gap-6"
              >
                <div className="p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl backdrop-blur-sm">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">📧</div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">Email Me</h4>
                      <p className="text-gray-400 text-sm">{userEmail}</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl backdrop-blur-sm">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">💼</div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">Available For</h4>
                      <p className="text-gray-400 text-sm">Freelance Projects</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>


        {/* FOOTER */}
        <footer className="w-full py-8 sm:py-12 px-4 sm:px-6 border-t border-purple-500/20 bg-slate-900/50">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4"
          >
            <p className="text-sm text-gray-400">© {currentYear} All rights reserved</p>
            <div className="flex gap-6 text-sm text-gray-400">
              <Link href="#" className="hover:text-purple-400 transition-colors">
                Privacy
              </Link>
              <Link href="#" className="hover:text-purple-400 transition-colors">
                Terms
              </Link>
            </div>
          </motion.div>
        </footer>
      </main>
    </div>
  )
}
