"use client"

import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default function Hero() {
  return (
    <section className="w-full min-h-screen flex items-center justify-center pt-20 px-6 relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-light via-background to-background opacity-60" />

      <div className="relative z-10 max-w-4xl text-center space-y-6 md:space-y-8">
        <div className="space-y-4 md:space-y-6">
          <h1 className="text-5xl md:text-7xl font-bold">
            Hi, I'm a <span className="gradient-text">Tech Engineer</span>
          </h1>
          <p className="text-lg md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            I build beautiful, functional web experiences and scalable software solutions. Passionate about clean code
            and innovative design.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link
            href="#projects"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            View My Work
            <ArrowRight size={20} />
          </Link>
          <Link
            href="#contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-primary text-primary rounded-full font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-300"
          >
            Get In Touch
          </Link>
        </div>

        {/* Scroll Indicator */}
        <div className="pt-12 animate-bounce">
          <div className="w-6 h-10 border-2 border-primary rounded-full flex items-center justify-center mx-auto">
            <div className="w-1 h-2 bg-primary rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  )
}
