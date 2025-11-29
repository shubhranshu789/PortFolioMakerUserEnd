"use client"

import type React from "react"

import { Mail, Linkedin, Github, Twitter } from "lucide-react"
import { useState } from "react"

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
    setFormData({ name: "", email: "", message: "" })
  }

  const socialLinks = [
    { icon: Mail, label: "Email", href: "mailto:hello@example.com", color: "hover:text-primary" },
    { icon: Linkedin, label: "LinkedIn", href: "#", color: "hover:text-secondary" },
    { icon: Github, label: "GitHub", href: "#", color: "hover:text-accent" },
    { icon: Twitter, label: "Twitter", href: "#", color: "hover:text-primary" },
  ]

  return (
    <section id="contact" className="w-full py-20 px-6 bg-white dark:bg-black/50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <span className="text-primary font-semibold text-sm tracking-wide uppercase">Get In Touch</span>
          <h2>Let's Work Together</h2>
          <p className="text-muted-foreground text-lg">
            Have a project in mind? I'd love to hear about it. Reach out and let's create something amazing together.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-muted border border-border rounded-lg focus:outline-none focus:border-primary transition-colors"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-muted border border-border rounded-lg focus:outline-none focus:border-primary transition-colors"
                required
              />
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className="w-full px-4 py-3 bg-muted border border-border rounded-lg focus:outline-none focus:border-primary transition-colors resize-none"
                required
              />
              <button
                type="submit"
                className="w-full px-6 py-3 bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-lg font-semibold hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                Send Message
              </button>
            </form>

            {submitted && (
              <div className="p-4 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg text-center animate-pulse">
                Message sent successfully! I'll get back to you soon.
              </div>
            )}
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div className="card-glass p-6 space-y-4">
              <h3 className="text-2xl font-bold">Contact Information</h3>
              <div className="space-y-3 text-muted-foreground">
                <p>📧 hello@example.com</p>
                <p>📍 San Francisco, CA</p>
                <p>⏰ Available for freelance & full-time roles</p>
              </div>
            </div>

            <div className="card-glass p-6 space-y-4">
              <h3 className="text-2xl font-bold">Follow Me</h3>
              <div className="flex gap-4">
                {socialLinks.map((link) => {
                  const Icon = link.icon
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      className={`p-3 bg-muted rounded-lg text-foreground ${link.color} transition-colors`}
                      aria-label={link.label}
                    >
                      <Icon size={24} />
                    </a>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
