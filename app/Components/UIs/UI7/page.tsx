"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, Github, Mail, Linkedin, Twitter, ExternalLink, ChevronDown, ArrowRight, Send, Sparkles, Code2, Palette } from "lucide-react"
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
}

export default function ModernLightPortfolio() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeSection, setActiveSection] = useState('home')
  const params = useParams()

  const router = useRouter()
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-indigo-300 border-t-indigo-600 rounded-full mx-auto mb-4"
          />
          <p className="text-slate-700 text-lg font-medium">Loading your portfolio...</p>
        </motion.div>
      </div>
    )
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <p className="text-slate-700 text-xl">Failed to load portfolio</p>
      </div>
    )
  }

  return (
    <div className="w-full bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 text-slate-800 overflow-x-hidden">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 origin-left z-50"
        style={{ scaleX: scaleProgress }}
      />

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 w-full z-40 transition-all duration-300 ${scrolled ? "bg-white/80 backdrop-blur-xl shadow-lg shadow-indigo-100/50" : "bg-transparent"
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold"
          >
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
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
                className="text-slate-600 hover:text-indigo-600 transition-colors font-medium relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 group-hover:w-full transition-all duration-300" />
              </motion.a>
            ))}
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-slate-800"
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
              className="md:hidden bg-white/95 backdrop-blur-xl shadow-xl overflow-hidden"
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
                    className="block text-slate-700 hover:text-indigo-600 transition-colors py-2 text-lg font-medium"
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
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-indigo-300 to-purple-300 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-br from-pink-300 to-blue-300 rounded-full blur-3xl"
        />

        <div className="max-w-6xl w-full relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center"
          >
            <motion.div variants={fadeInUp} className="mb-6">
              <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/60 backdrop-blur-sm border border-indigo-200 rounded-full text-indigo-700 text-sm font-semibold shadow-lg shadow-indigo-100/50">
                <Sparkles size={16} className="text-indigo-500" />
                Available for Work
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
            >
              <span className="text-slate-800">Creative</span>
              <br />
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                {userData.hero.highlightText}
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto mb-10 leading-relaxed font-light"
            >
              {userData.hero.subtitle}
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-5 justify-center items-center"
            >
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.05, boxShadow: "0 10px 40px rgba(99, 102, 241, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="group px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-full flex items-center gap-3 text-lg shadow-xl shadow-indigo-200"
              >
                {userData.hero.primaryButtonText}
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </motion.a>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white/60 backdrop-blur-sm border-2 border-indigo-300 text-indigo-700 font-semibold rounded-full hover:bg-white transition-all text-lg shadow-lg shadow-indigo-100/50"
              >
                {userData.hero.secondaryButtonText}
              </motion.a>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <ChevronDown className="text-indigo-500" size={40} />
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-24 px-6 bg-white/40 backdrop-blur-sm">
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
                <span className="text-indigo-600 font-semibold text-sm mb-4 block uppercase tracking-wide">
                  {userData.aboutMe.sectionTitle}
                </span>
                <h2 className="text-5xl md:text-6xl font-bold mb-8 leading-tight text-slate-800">
                  {userData.aboutMe.headline}
                </h2>
              </motion.div>

              <motion.div variants={fadeInUp} className="space-y-6 text-slate-600 text-lg leading-relaxed">
                <p>{userData.aboutMe.introduction}</p>
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
                      <div className="w-2 h-2 bg-indigo-500 rounded-full group-hover:scale-150 transition-transform" />
                      <span className="text-slate-700 text-lg font-medium">{value}</span>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>

            {/* Right Column - Stats */}
            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-2 gap-6"
            >
              {(() => {
                const validStats = [
                  { number: userData.aboutMe.stats.projectsCompleted, label: "Projects", icon: "🚀", gradient: "from-blue-400 to-indigo-500" },
                  { number: userData.aboutMe.stats.yearsExperience, label: "Years Exp", icon: "⚡", gradient: "from-purple-400 to-pink-500" },
                  { number: userData.aboutMe.stats.happyClients, label: "Clients", icon: "🎯", gradient: "from-pink-400 to-rose-500" },
                  { number: userData.aboutMe.stats.techSkills, label: "Skills", icon: "💡", gradient: "from-indigo-400 to-purple-500" },
                ].filter(stat => stat.number > 0);

                return validStats.map((stat, index) => (
                  <motion.div
                    key={index}
                    variants={scaleIn}
                    whileHover={{ y: -5, scale: 1.03 }}
                    className="relative p-8 bg-white/70 backdrop-blur-sm border border-indigo-100 rounded-3xl shadow-lg shadow-indigo-100/50 overflow-hidden group"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity`} />
                    <div className="relative z-10">
                      <div className="text-4xl mb-4">{stat.icon}</div>
                      <div className={`text-5xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-2`}>
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
      <section id="skills" className="relative py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-slate-800">
              Skills & <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Expertise</span>
            </h2>
            <p className="text-slate-600 text-xl max-w-2xl mx-auto">
              Technologies and tools I work with to bring ideas to life
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="space-y-12"
          >
            {userData.skillCategories.length > 0 ? (
              userData.skillCategories.map((category, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="relative p-8 bg-white/60 backdrop-blur-sm border border-indigo-100 rounded-3xl shadow-lg shadow-indigo-100/50"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-4xl">{category.icon}</span>
                    <h3 className="text-3xl font-bold text-slate-800">
                      {category.category}
                    </h3>
                    <div className="flex-1 h-px bg-gradient-to-r from-indigo-300 to-transparent" />
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {category.skills.map((skill, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.05 }}
                        whileHover={{ y: -3, scale: 1.05 }}
                        className="px-5 py-2.5 bg-white/80 backdrop-blur-sm border border-indigo-200 rounded-full hover:shadow-md hover:shadow-indigo-200 transition-all cursor-pointer"
                      >
                        <span className="font-medium text-slate-700">{skill}</span>
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
        <section id="experience" className="relative py-24 px-6 bg-white/40 backdrop-blur-sm">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-20"
            >
              <h2 className="text-5xl md:text-6xl font-bold mb-6 text-slate-800">
                Work <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Experience</span>
              </h2>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="relative"
            >
              {/* Timeline Line */}
              <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-400 via-purple-400 to-transparent" />

              {userData.experiences.length > 0 ? (
                userData.experiences.map((exp, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    className={`relative mb-16 ${index % 2 === 0 ? "md:pr-1/2 md:text-right" : "md:pl-1/2 md:ml-auto"
                      }`}
                  >
                    {/* Timeline Dot */}
                    <div className="absolute left-0 md:left-1/2 top-0 w-4 h-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full border-4 border-white transform -translate-x-1/2 md:translate-x-0 shadow-lg shadow-indigo-200" />

                    <motion.div
                      whileHover={{ y: -5, scale: 1.02 }}
                      className="ml-8 md:ml-0 p-8 bg-white/70 backdrop-blur-sm border border-indigo-100 rounded-3xl shadow-lg shadow-indigo-100/50"
                    >
                      <div className="mb-4">
                        <span className="px-4 py-1.5 bg-gradient-to-r from-indigo-100 to-purple-100 border border-indigo-200 rounded-full text-indigo-700 text-sm font-semibold">
                          {exp.period}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-slate-800 mb-2">
                        {exp.role}
                      </h3>
                      <p className="text-indigo-600 font-semibold mb-4">{exp.company}</p>
                      <p className="text-slate-600 leading-relaxed mb-4">{exp.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {exp.skills.map((skill, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-medium border border-indigo-100"
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
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-slate-800">
              Featured <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Projects</span>
            </h2>
            <p className="text-slate-600 text-xl max-w-2xl mx-auto">
              A showcase of my recent work and creative solutions
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
                  <div className="relative overflow-hidden rounded-3xl bg-white/70 backdrop-blur-sm border border-indigo-100 hover:border-indigo-300 hover:shadow-2xl hover:shadow-indigo-200/50 transition-all">
                    {/* Project Image */}
                    <div className="relative h-64 overflow-hidden">
                      {project.image ? (
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200 flex items-center justify-center">
                          <span className="text-6xl">🚀</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent opacity-40" />
                    </div>

                    {/* Project Info */}
                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-slate-800 mb-3 group-hover:text-indigo-600 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                        {project.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.slice(0, 3).map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-medium border border-indigo-100"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Links */}
                      <div className="flex gap-4">
                        {project.links.live && (
                          <a
                            href={project.links.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 text-sm font-semibold"
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
                            className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 text-sm font-semibold"
                          >
                            <Github size={16} />
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
      <section id="contact" className="relative py-24 px-6 bg-white/40 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-bold mb-6 text-slate-800">
                Let's <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Connect</span>
              </h2>
              <p className="text-slate-600 text-xl">
                Have a project in mind? Let's make it happen together
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
                  className="px-6 py-4 bg-white/70 backdrop-blur-sm border border-indigo-200 rounded-2xl focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-200 transition-all placeholder-slate-400 text-slate-800"
                  required
                />
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="px-6 py-4 bg-white/70 backdrop-blur-sm border border-indigo-200 rounded-2xl focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-200 transition-all placeholder-slate-400 text-slate-800"
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
                className="w-full px-6 py-4 bg-white/70 backdrop-blur-sm border border-indigo-200 rounded-2xl focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-200 transition-all placeholder-slate-400 text-slate-800 resize-none"
                required
              />

              <motion.button
                whileHover={{ scale: 1.02, boxShadow: "0 10px 40px rgba(99, 102, 241, 0.3)" }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={submitted}
                className="w-full px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-full hover:from-indigo-700 hover:to-purple-700 transition-all disabled:opacity-50 flex items-center justify-center gap-3 text-lg shadow-xl shadow-indigo-200"
              >
                {submitted ? (
                  <>
                    <span>✓</span>
                    Message Sent!
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Send Message
                  </>
                )}
              </motion.button>
            </motion.form>

            <motion.div
              variants={fadeInUp}
              className="mt-16 pt-16 border-t border-indigo-200"
            >
              <h3 className="text-2xl font-bold text-center mb-8 text-slate-800">Connect with me</h3>
              <div className="flex justify-center gap-6 flex-wrap">
                {userData.socialLinks.map((social, index) => (
                  <div key={index} className="flex flex-col items-center gap-2">
                    <motion.a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -5, scale: 1.1 }}
                      className="w-14 h-14 rounded-full bg-white/70 backdrop-blur-sm border border-indigo-200 flex items-center justify-center text-2xl hover:border-indigo-400 hover:shadow-lg hover:shadow-indigo-200 transition-all"
                      style={{ color: social.color }}
                    >
                      {social.icon}
                    </motion.a>
                    <p className="text-sm text-slate-600 font-medium">{social.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 px-6 bg-white/40 backdrop-blur-sm border-t border-indigo-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <p className="text-slate-600 text-sm">
                © {currentYear} {userName}. All rights reserved.
              </p>
            </div>
            <div className="flex gap-8 text-sm text-slate-600">
              <Link href="#" className="hover:text-indigo-600 transition-colors font-medium">
                Privacy
              </Link>
              <Link href="#" className="hover:text-indigo-600 transition-colors font-medium">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
