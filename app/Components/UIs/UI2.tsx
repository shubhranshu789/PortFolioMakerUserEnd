"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, Github, Mail, Linkedin, Twitter, ExternalLink } from "lucide-react"
import type React from "react"

export default function Ui2() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [submitted, setSubmitted] = useState(false)

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
  ]

  const skillCategories = [
    {
      category: "Frontend",
      skills: ["React", "TypeScript", "Tailwind CSS", "Next.js", "Vue.js"],
    },
    {
      category: "Backend",
      skills: ["Node.js", "Python", "PostgreSQL", "MongoDB", "GraphQL"],
    },
    {
      category: "Tools & DevOps",
      skills: ["Git", "Docker", "AWS", "CI/CD", "Vercel"],
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
    { icon: Mail, label: "Email", href: "mailto:hello@example.com" },
    { icon: Linkedin, label: "LinkedIn", href: "#" },
    { icon: Github, label: "GitHub", href: "#" },
    { icon: Twitter, label: "Twitter", href: "#" },
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
    <div className="w-full bg-background text-foreground">
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 border-b border-border/20 ${
          scrolled ? "bg-background/95 backdrop-blur-sm" : "bg-background"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
          <Link href="#" className="text-xl font-bold text-primary">
            DESIGN
          </Link>

          <div className="hidden md:flex items-center gap-12">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden">
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden bg-background border-t border-border/20 p-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-sm font-medium hover:text-primary transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </nav>

      <main className="pt-20">
        <section className="w-full py-24 px-6 min-h-[70vh] flex items-center">
          <div className="max-w-3xl">
            <span className="text-sm font-mono text-muted-foreground">Good afternoon —</span>
            <h1 className="text-6xl md:text-7xl font-bold mt-8 leading-tight text-foreground">
              I design and build
              <span className="block text-primary mt-2">digital products</span>
            </h1>
            <p className="text-lg text-muted-foreground mt-8 leading-relaxed max-w-xl">
              With a focus on clean code and user-centric design, I create web experiences that are both beautiful and
              functional. Let me help bring your ideas to life.
            </p>
            <div className="flex gap-6 mt-12">
              <Link
                href="#projects"
                className="px-8 py-3 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 font-medium"
              >
                See My Work
              </Link>
              <Link
                href="#contact"
                className="px-8 py-3 text-foreground border-2 border-foreground hover:bg-foreground hover:text-background transition-all duration-300 font-medium"
              >
                Contact Me
              </Link>
            </div>
          </div>
        </section>

        <section id="about" className="w-full py-24 px-6 border-t border-border/20">
          <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-16">
            <div className="col-span-1">
              <h2 className="text-4xl font-bold">About</h2>
            </div>
            <div className="col-span-2 space-y-12">
              <div>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  I'm a full-stack developer with 5+ years of experience building web applications that users love.
                  Specializing in React, TypeScript, and modern cloud technologies.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-12">
                {[
                  { number: "50+", label: "Projects" },
                  { number: "5+", label: "Years" },
                  { number: "30+", label: "Clients" },
                  { number: "15+", label: "Skills" },
                ].map((stat, index) => (
                  <div key={index} className="space-y-2">
                    <p className="text-4xl font-bold text-primary">{stat.number}</p>
                    <p className="text-muted-foreground text-sm">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="w-full py-24 px-6 bg-muted/20 border-t border-b border-border/20">
          <div className="max-w-7xl mx-auto">
            <div className="space-y-8">
              {skillCategories.map((category, index) => (
                <div key={index} className="pb-8 border-b border-border/20 last:border-b-0">
                  <h3 className="text-2xl font-bold mb-6 text-foreground">{category.category}</h3>
                  <div className="flex flex-wrap gap-3">
                    {category.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-4 py-2 border border-primary/30 text-primary rounded-full text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="experience" className="w-full py-24 px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-16">Experience</h2>
            <div className="space-y-16">
              {experiences.map((exp, index) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row md:justify-between md:items-start gap-8 pb-16 border-b border-border/20 last:border-b-0"
                >
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-foreground">{exp.role}</h3>
                    <p className="text-primary font-medium mt-2">{exp.company}</p>
                    <p className="text-muted-foreground mt-4 leading-relaxed">{exp.description}</p>
                  </div>
                  <div className="md:text-right">
                    <p className="text-muted-foreground text-sm font-mono whitespace-nowrap">{exp.period}</p>
                    <div className="flex flex-wrap gap-2 mt-4 md:justify-end">
                      {exp.skills.map((skill, idx) => (
                        <span key={idx} className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="w-full py-24 px-6 bg-muted/20">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold mb-16">Selected Work</h2>

            <div className="grid md:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <div key={index} className="group cursor-pointer">
                  <div className="relative overflow-hidden bg-muted mb-6">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 line-clamp-2">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag, idx) => (
                      <span key={idx} className="text-xs font-medium text-muted-foreground">
                        {tag}
                        {idx < project.tags.length - 1 && <span className="ml-2">·</span>}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <Link
                      href={project.links.live}
                      className="text-primary font-medium hover:underline text-sm flex items-center gap-2"
                    >
                      Live <ExternalLink size={14} />
                    </Link>
                    <Link
                      href={project.links.github}
                      className="text-primary font-medium hover:underline text-sm flex items-center gap-2"
                    >
                      Code <ExternalLink size={14} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="w-full py-24 px-6 border-t border-border/20">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-8">Get In Touch</h2>
            <p className="text-lg text-muted-foreground mb-12">
              Have a project or idea? I'd love to hear from you. Send me an email or reach out on social media.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6 mb-16">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-0 py-3 bg-transparent border-b border-border/50 focus:border-primary focus:outline-none transition-colors placeholder-muted-foreground text-foreground"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-0 py-3 bg-transparent border-b border-border/50 focus:border-primary focus:outline-none transition-colors placeholder-muted-foreground text-foreground"
                required
              />
              <textarea
                name="message"
                placeholder="Your message..."
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-0 py-3 bg-transparent border-b border-border/50 focus:border-primary focus:outline-none transition-colors placeholder-muted-foreground text-foreground resize-none"
                required
              />
              <button
                type="submit"
                className="px-8 py-3 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 font-medium"
              >
                {submitted ? "Message Sent!" : "Send Message"}
              </button>
            </form>

            <div className="pt-12 border-t border-border/20">
              <p className="text-muted-foreground text-sm mb-6">Find me on social media</p>
              <div className="flex gap-8">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon
                  return (
                    <Link
                      key={index}
                      href={social.href}
                      className="text-foreground hover:text-primary transition-colors"
                    >
                      <Icon size={24} />
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        <footer className="w-full py-12 px-6 border-t border-border/20 bg-muted/20">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <p className="text-sm text-muted-foreground">© {currentYear} All rights reserved</p>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <Link href="#" className="hover:text-primary transition-colors">
                Privacy
              </Link>
              <Link href="#" className="hover:text-primary transition-colors">
                Terms
              </Link>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}
