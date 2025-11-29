"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, ArrowRight, ExternalLink, Github, Mail, Linkedin, Twitter, Sparkles } from "lucide-react"
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion"
import { useInView } from "react-intersection-observer"
import type React from "react"
import { useRouter } from 'next/navigation';
// import N from "../app/Components/Auth/SignUp"



export default function OneUi() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [submitted, setSubmitted] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [cursorVariant, setCursorVariant] = useState("default")
  
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
  
  const { ref: skillsRef, inView: skillsInView } = useInView({ triggerOnce: true, threshold: 0.1 })
  const { ref: projectsRef, inView: projectsInView } = useInView({ triggerOnce: true, threshold: 0.1 })
  const { ref: aboutRef, inView: aboutInView } = useInView({ triggerOnce: true, threshold: 0.1 })



  const router = useRouter()

  const gotoAuth = () => {
    router.push(`/Components/Auth/SignUp`)
  }

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
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

  // Animation variants [web:9]
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 12 },
    },
  }

  const floatingVariants = {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  }

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
    { label: "Login", href: "/Components/Auth/SignUp", onClick: gotoAuth },
  ]

  const skillCategories = [
    {
      category: "Frontend",
      skills: ["React", "TypeScript", "Tailwind CSS", "Next.js", "Vue.js"],
      color: "from-primary to-secondary",
      icon: "💻",
    },
    {
      category: "Backend",
      skills: ["Node.js", "Python", "PostgreSQL", "MongoDB", "GraphQL"],
      color: "from-secondary to-accent",
      icon: "⚡",
    },
    {
      category: "Tools & DevOps",
      skills: ["Git", "Docker", "AWS", "CI/CD", "Vercel"],
      color: "from-accent to-accent-light",
      icon: "🛠️",
    },
  ]

  const experiences = [
    {
      role: "Senior Frontend Developer",
      company: "Tech Company Inc.",
      period: "2022 - Present",
      description:
        "Leading frontend architecture and mentoring junior developers. Implemented performance optimizations improving load times by 40%.",
      skills: ["React", "TypeScript", "Leadership"],
    },
    {
      role: "Full Stack Developer",
      company: "Digital Solutions Ltd.",
      period: "2020 - 2022",
      description:
        "Developed and maintained full-stack web applications serving 100k+ users. Built microservices and implemented CI/CD pipelines.",
      skills: ["Node.js", "React", "AWS"],
    },
    {
      role: "Junior Developer",
      company: "StartUp Hub",
      period: "2019 - 2020",
      description:
        "Started my professional journey building responsive web interfaces and fixing bugs. Gained solid understanding of web development fundamentals.",
      skills: ["JavaScript", "React", "CSS"],
    },
  ]

  const projects = [
    {
      title: "E-Commerce Platform",
      description:
        "Full-stack e-commerce solution with real-time inventory, payment integration, and admin dashboard. Increased sales by 60% for the client.",
      image: "/ecommerce-dashboard.jpg",
      tags: ["React", "Node.js", "PostgreSQL", "Stripe"],
      links: { live: "#", github: "#" },
    },
    {
      title: "AI Task Manager",
      description:
        "Intelligent task management app with AI-powered suggestions and natural language processing. Helps teams save 10+ hours per week.",
      image: "/ai-task-management.jpg",
      tags: ["Next.js", "OpenAI", "Prisma", "Tailwind"],
      links: { live: "#", github: "#" },
    },
    {
      title: "Real-Time Analytics Dashboard",
      description:
        "Custom analytics dashboard with WebSocket integration for real-time data updates. Processes 1M+ data points daily.",
      image: "/analytics-dashboard.png",
      tags: ["React", "WebSocket", "D3.js", "AWS"],
      links: { live: "#", github: "#" },
    },
    {
      title: "SaaS Collaboration Tool",
      description:
        "Team collaboration platform with real-time editing, commenting, and version control. Used by 500+ teams globally.",
      image: "/collaboration-software.jpg",
      tags: ["Vue.js", "Firebase", "WebRTC"],
      links: { live: "#", github: "#" },
    },
    {
      title: "Mobile App (React Native)",
      description:
        "Cross-platform fitness tracking app with social features and AI coaching. Downloaded 50k+ times with 4.8 rating.",
      image: "/mobile-fitness-app.jpg",
      tags: ["React Native", "Firebase", "Redux"],
      links: { live: "#", github: "#" },
    },
    {
      title: "Design System",
      description:
        "Comprehensive design system and component library used across 10+ projects. Improved development speed by 35%.",
      image: "/design-system-components.jpg",
      tags: ["Storybook", "TypeScript", "CSS Modules"],
      links: { live: "#", github: "#" },
    },
  ]

  const socialLinks = [
    { icon: Mail, label: "Email", href: "mailto:hello@example.com", color: "hover:text-primary" },
    { icon: Linkedin, label: "LinkedIn", href: "#", color: "hover:text-secondary" },
    { icon: Github, label: "GitHub", href: "#", color: "hover:text-accent" },
    { icon: Twitter, label: "Twitter", href: "#", color: "hover:text-primary" },
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
    setFormData({ name: "", email: "", message: "" })
  }

  const currentYear = new Date().getFullYear()

  return (
    <div className="w-full bg-background text-foreground overflow-hidden">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent z-50 origin-left"
        style={{ scaleX }}
      />

      {/* Custom Cursor Effect */}
      {/* <motion.div
        className="hidden lg:block fixed top-0 left-0 w-8 h-8 bg-primary/20 rounded-full pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: cursorVariant === "hover" ? 1.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      /> */}

      {/* Animated Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className={`fixed top-0 w-full z-40 transition-all duration-300 ${
          scrolled ? "bg-white/80 dark:bg-black/80 backdrop-blur-md shadow-md" : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="#" className="text-2xl font-bold gradient-text flex items-center gap-2">
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles size={24} />
              </motion.span>
              Dev
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                onMouseEnter={() => setCursorVariant("hover")}
                onMouseLeave={() => setCursorVariant("default")}
              >
                <Link href={link.href} className="nav-link relative group">
                  {link.label}
                  <motion.span
                    className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300"
                  />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 hover:bg-muted rounded-lg"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={mobileOpen ? "close" : "menu"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.div>
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white dark:bg-black border-t border-border overflow-hidden"
            >
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="p-4 space-y-2"
              >
                {navLinks.map((link) => (
                  <motion.div key={link.href} variants={itemVariants}>
                    <Link
                      href={link.href}
                      className="block px-4 py-3 text-foreground hover:bg-muted rounded-lg transition-colors"
                      onClick={() => setMobileOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <main>
        {/* Hero Section with Particle Effect */}
        <section className="w-full min-h-screen flex items-center justify-center pt-20 px-6 relative overflow-hidden">
          {/* Animated Gradient Background */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-accent-light via-background to-background opacity-60"
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%"],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />

          {/* Floating Shapes */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-20 h-20 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 blur-xl"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + i * 10}%`,
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, 15, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 5 + i,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}

          <motion.div
            className="relative z-10 max-w-4xl text-center space-y-6 md:space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div className="space-y-4 md:space-y-6" variants={itemVariants}>
              <motion.h1
                className="text-5xl md:text-7xl font-bold"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
              >
                Hi, I'm a <span className="gradient-text">Tech Engineer</span>
              </motion.h1>
              <motion.p
                className="text-lg md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
                variants={itemVariants}
              >
                I build beautiful, functional web experiences and scalable software solutions. Passionate about clean
                code and innovative design.
              </motion.p>
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
              variants={itemVariants}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="#projects"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  View My Work
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight size={20} />
                  </motion.span>
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-primary text-primary rounded-full font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                >
                  Get In Touch
                </Link>
              </motion.div>
            </motion.div>

            {/* Animated Scroll Indicator */}
            <motion.div
              className="pt-12"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <div className="w-6 h-10 border-2 border-primary rounded-full flex items-center justify-center mx-auto">
                <motion.div
                  className="w-1 h-2 bg-primary rounded-full"
                  animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* About Section with Parallax */}
        <section id="about" ref={aboutRef} className="w-full py-20 px-6 bg-white dark:bg-black/50">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="grid md:grid-cols-2 gap-12 items-center"
              initial={{ opacity: 0 }}
              animate={aboutInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8 }}
            >
              {/* Left Content */}
              <motion.div
                className="space-y-6"
                initial={{ x: -100, opacity: 0 }}
                animate={aboutInView ? { x: 0, opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div>
                  <motion.span
                    className="text-primary font-semibold text-sm tracking-wide uppercase"
                    initial={{ opacity: 0, y: -20 }}
                    animate={aboutInView ? { opacity: 1, y: 0 } : {}}
                  >
                    About Me
                  </motion.span>
                  <motion.h2
                    className="mt-3"
                    initial={{ opacity: 0, y: -20 }}
                    animate={aboutInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.1 }}
                  >
                    Crafting Digital Excellence
                  </motion.h2>
                </div>
                <motion.p
                  className="text-muted-foreground text-lg leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={aboutInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.3 }}
                >
                  I'm a fullstack developer with 5+ years of experience building web applications that users love. I
                  specialize in React, TypeScript, and modern cloud technologies.
                </motion.p>
                <motion.p
                  className="text-muted-foreground text-lg leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={aboutInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.4 }}
                >
                  My journey in tech started with a passion for solving problems through code. I believe in writing
                  clean, maintainable code and creating intuitive user experiences that make a real difference.
                </motion.p>
                <motion.div
                  className="pt-4 space-y-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={aboutInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 }}
                >
                  <p className="text-foreground font-semibold">Core Values:</p>
                  <ul className="space-y-2 text-muted-foreground">
                    {["Clean, maintainable code", "User-centric design", "Continuous learning"].map((value, i) => (
                      <motion.li
                        key={i}
                        className="flex items-center gap-2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={aboutInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.6 + i * 0.1 }}
                      >
                        <motion.span
                          className="w-2 h-2 bg-accent rounded-full"
                          animate={{ scale: [1, 1.3, 1] }}
                          transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                        />
                        {value}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>

              {/* Right Stats */}
              <motion.div
                className="grid grid-cols-2 gap-6"
                initial={{ x: 100, opacity: 0 }}
                animate={aboutInView ? { x: 0, opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {[
                  { number: "50+", label: "Projects Completed" },
                  { number: "5+", label: "Years Experience" },
                  { number: "30+", label: "Happy Clients" },
                  { number: "15+", label: "Tech Skills" },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className="card-glass p-6 text-center hover-lift relative overflow-hidden group"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={aboutInView ? { scale: 1, opacity: 1 } : {}}
                    transition={{ delay: 0.6 + index * 0.1, type: "spring" }}
                    whileHover={{ scale: 1.05, rotate: 2 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity"
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1 }}
                    />
                    <motion.p
                      className="text-3xl md:text-4xl font-bold gradient-text relative z-10"
                      initial={{ scale: 0 }}
                      animate={aboutInView ? { scale: 1 } : {}}
                      transition={{ delay: 0.8 + index * 0.1, type: "spring", stiffness: 200 }}
                    >
                      {stat.number}
                    </motion.p>
                    <p className="text-muted-foreground text-sm mt-2 relative z-10">{stat.label}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Skills Section with Stagger Animation */}
        <section id="skills" ref={skillsRef} className="w-full py-20 px-6 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="text-center space-y-4 mb-16"
              initial={{ opacity: 0, y: -50 }}
              animate={skillsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <span className="text-primary font-semibold text-sm tracking-wide uppercase">Skills</span>
              <h2>Technologies I Work With</h2>
            </motion.div>

            <motion.div
              className="grid md:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate={skillsInView ? "visible" : "hidden"}
            >
              {skillCategories.map((category, index) => (
                <motion.div
                  key={index}
                  className="card-glass p-8 space-y-6 hover-lift relative overflow-hidden group"
                  variants={itemVariants}
                  whileHover={{ y: -10, scale: 1.02 }}
                  onMouseEnter={() => setCursorVariant("hover")}
                  onMouseLeave={() => setCursorVariant("default")}
                >
                  <motion.div
                    className="absolute top-0 right-0 text-6xl opacity-5 group-hover:opacity-10 transition-opacity"
                    animate={{ rotate: [0, 10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    {category.icon}
                  </motion.div>
                  
                  <motion.h3
                    className="text-2xl font-bold flex items-center gap-2"
                    initial={{ x: -20, opacity: 0 }}
                    animate={skillsInView ? { x: 0, opacity: 1 } : {}}
                    transition={{ delay: index * 0.1 }}
                  >
                    <span className="text-2xl">{category.icon}</span>
                    {category.category}
                  </motion.h3>
                  
                  <div className="space-y-3">
                    {category.skills.map((skill, idx) => (
                      <motion.div
                        key={idx}
                        className="space-y-2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={skillsInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: index * 0.1 + idx * 0.05 }}
                      >
                        <p className="text-sm font-medium text-foreground">{skill}</p>
                        <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                          <motion.div
                            className={`h-full bg-gradient-to-r ${category.color}`}
                            initial={{ width: 0 }}
                            animate={skillsInView ? { width: `${75 + idx * 4}%` } : {}}
                            transition={{
                              delay: index * 0.2 + idx * 0.1,
                              duration: 1,
                              ease: "easeOut",
                            }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Experience Section with Timeline Animation */}
        <section id="experience" className="w-full py-20 px-6 bg-white dark:bg-black/50">
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="text-center space-y-4 mb-16"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <span className="text-primary font-semibold text-sm tracking-wide uppercase">Experience</span>
              <h2>My Professional Journey</h2>
            </motion.div>

            <div className="space-y-8 relative">
              {/* Timeline Line */}
              <motion.div
                className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5 }}
              />

              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  className="card-glass p-8 border-l-4 border-primary hover-lift relative ml-16"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ x: 10, borderLeftWidth: "8px" }}
                >
                  {/* Timeline Dot */}
                  <motion.div
                    className="absolute -left-20 top-8 w-4 h-4 rounded-full bg-primary border-4 border-background"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 + 0.3, type: "spring" }}
                    whileHover={{ scale: 1.5 }}
                  />

                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
                    <div>
                      <motion.h3
                        className="text-2xl font-bold text-foreground"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                      >
                        {exp.role}
                      </motion.h3>
                      <motion.p
                        className="text-primary font-semibold mt-1"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                      >
                        {exp.company}
                      </motion.p>
                    </div>
                    <motion.span
                      className="text-muted-foreground font-semibold whitespace-nowrap"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                    >
                      {exp.period}
                    </motion.span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-4">{exp.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {exp.skills.map((skill, idx) => (
                      <motion.span
                        key={idx}
                        className="px-3 py-1 bg-gradient-to-r from-accent to-accent-light text-accent-light-foreground text-sm rounded-full font-medium"
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + idx * 0.1 }}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section with Grid Animation */}
        <section id="projects" ref={projectsRef} className="w-full py-20 px-6 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="text-center space-y-4 mb-16"
              initial={{ opacity: 0, y: 50 }}
              animate={projectsInView ? { opacity: 1, y: 0 } : {}}
            >
              <span className="text-primary font-semibold text-sm tracking-wide uppercase">Projects</span>
              <h2>Featured Work</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                A selection of projects I've worked on. Each one was a learning opportunity and a chance to create
                something meaningful.
              </p>
            </motion.div>

            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate={projectsInView ? "visible" : "hidden"}
            >
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  className="card-glass overflow-hidden group hover-lift"
                  variants={itemVariants}
                  whileHover={{ y: -15, scale: 1.02 }}
                  onMouseEnter={() => setCursorVariant("hover")}
                  onMouseLeave={() => setCursorVariant("default")}
                >
                  {/* Image with Overlay */}
                  <div className="relative h-48 overflow-hidden bg-muted">
                    <motion.img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.15 }}
                      transition={{ duration: 0.6 }}
                    />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-4">
                    <motion.h3
                      className="text-xl font-bold text-foreground"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                    >
                      {project.title}
                    </motion.h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{project.description}</p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.tags.map((tag, idx) => (
                        <motion.span
                          key={idx}
                          className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-md"
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: idx * 0.05 }}
                          whileHover={{ scale: 1.1 }}
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex gap-3 pt-4">
                      <motion.div className="flex-1" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Link
                          href={project.links.live}
                          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:shadow-lg transition-all duration-300 text-sm"
                        >
                          <ExternalLink size={16} />
                          Live
                        </Link>
                      </motion.div>
                      <motion.div className="flex-1" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Link
                          href={project.links.github}
                          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 border border-primary text-primary rounded-lg font-medium hover:bg-primary hover:text-primary-foreground transition-all duration-300 text-sm"
                        >
                          <Github size={16} />
                          Code
                        </Link>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Contact Section with Form Animation */}
        <section id="contact" className="w-full py-20 px-6 bg-white dark:bg-black/50">
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="text-center space-y-4 mb-16"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <span className="text-primary font-semibold text-sm tracking-wide uppercase">Get In Touch</span>
              <h2>Let's Work Together</h2>
              <p className="text-muted-foreground text-lg">
                Have a project in mind? I'd love to hear about it. Reach out and let's create something amazing
                together.
              </p>
            </motion.div>

            <motion.div
              className="grid md:grid-cols-2 gap-12"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {/* Contact Form */}
              <motion.div
                className="space-y-6"
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <form onSubmit={handleSubmit} className="space-y-4">
                  <motion.input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-muted border border-border rounded-lg focus:outline-none focus:border-primary transition-colors"
                    required
                    whileFocus={{ scale: 1.02, borderColor: "#primary" }}
                  />
                  <motion.input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-muted border border-border rounded-lg focus:outline-none focus:border-primary transition-colors"
                    required
                    whileFocus={{ scale: 1.02 }}
                  />
                  <motion.textarea
                    name="message"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-3 bg-muted border border-border rounded-lg focus:outline-none focus:border-primary transition-colors resize-none"
                    required
                    whileFocus={{ scale: 1.02 }}
                  />
                  <motion.button
                    type="submit"
                    className="w-full px-6 py-3 bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-lg font-semibold hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Send Message
                  </motion.button>
                </form>

                <AnimatePresence>
                  {submitted && (
                    <motion.div
                      className="p-4 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg text-center"
                      initial={{ opacity: 0, y: -20, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 20, scale: 0.8 }}
                      transition={{ type: "spring", stiffness: 200 }}
                    >
                      Message sent successfully! I'll get back to you soon.
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Contact Info */}
              <motion.div
                className="space-y-8"
                initial={{ x: 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <motion.div
                  className="card-glass p-6 space-y-4"
                  whileHover={{ scale: 1.03, rotate: 1 }}
                >
                  <h3 className="text-2xl font-bold">Contact Information</h3>
                  <div className="space-y-3 text-muted-foreground">
                    <motion.p whileHover={{ x: 5, color: "#primary" }}>📧 hello@example.com</motion.p>
                    <motion.p whileHover={{ x: 5, color: "#primary" }}>📍 San Francisco, CA</motion.p>
                    <motion.p whileHover={{ x: 5, color: "#primary" }}>
                      ⏰ Available for freelance & full-time roles
                    </motion.p>
                  </div>
                </motion.div>

                <motion.div
                  className="card-glass p-6 space-y-4"
                  whileHover={{ scale: 1.03, rotate: -1 }}
                >
                  <h3 className="text-2xl font-bold">Follow Me</h3>
                  <div className="flex gap-4">
                    {socialLinks.map((link, index) => {
                      const Icon = link.icon
                      return (
                        <motion.a
                          key={link.label}
                          href={link.href}
                          className={`p-3 bg-muted rounded-lg text-foreground ${link.color} transition-colors`}
                          aria-label={link.label}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.2, rotate: 360 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Icon size={24} />
                        </motion.a>
                      )
                    })}
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Animated Footer */}
      <motion.footer
        className="w-full bg-primary text-primary-foreground py-12 px-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <motion.div
              className="space-y-4"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold">Dev</h3>
              <p className="text-primary-foreground/70">Building beautiful, functional digital experiences.</p>
            </motion.div>

            {[
              {
                title: "Navigation",
                links: ["About", "Skills", "Projects", "Contact"],
              },
              {
                title: "Services",
                links: ["Web Development", "UI/UX Design", "Consulting", "Full Stack"],
              },
              {
                title: "Connect",
                links: ["GitHub", "LinkedIn", "Twitter", "Email"],
              },
            ].map((section, index) => (
              <motion.div
                key={section.title}
                className="space-y-4"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: (index + 1) * 0.1 }}
              >
                <h4 className="font-semibold">{section.title}</h4>
                <ul className="space-y-2 text-primary-foreground/70 text-sm">
                  {section.links.map((link) => (
                    <motion.li key={link} whileHover={{ x: 5 }}>
                      <a href="#" className="hover:text-primary-foreground transition">
                        {link}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="border-t border-primary-foreground/20 pt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-primary-foreground/70 text-sm">© {currentYear} Tech Portfolio. All rights reserved.</p>
              <div className="flex gap-6 text-primary-foreground/70 text-sm">
                {["Privacy", "Terms", "Sitemap"].map((item) => (
                  <motion.a
                    key={item}
                    href="#"
                    className="hover:text-primary-foreground transition"
                    whileHover={{ scale: 1.1 }}
                  >
                    {item}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.footer>
    </div>
  )
}
