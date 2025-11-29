"use client"

import { ExternalLink, Github } from "lucide-react"
import Link from "next/link"

export default function Projects() {
  const projects = [
    {
      title: "E-Commerce Platform",
      description:
        "Full-stack e-commerce solution with real-time inventory, payment integration, and admin dashboard. Increased sales by 60% for the client.",
      image: "/ecommerce-dashboard.png",
      tags: ["React", "Node.js", "PostgreSQL", "Stripe"],
      links: { live: "#", github: "#" },
    },
    {
      title: "AI Task Manager",
      description:
        "Intelligent task management app with AI-powered suggestions and natural language processing. Helps teams save 10+ hours per week.",
      image: "/ai-task-management-application.jpg",
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
      image: "/collaboration-software-interface.png",
      tags: ["Vue.js", "Firebase", "WebRTC"],
      links: { live: "#", github: "#" },
    },
    {
      title: "Mobile App (React Native)",
      description:
        "Cross-platform fitness tracking app with social features and AI coaching. Downloaded 50k+ times with 4.8 rating.",
      image: "/mobile-fitness-app-interface.png",
      tags: ["React Native", "Firebase", "Redux"],
      links: { live: "#", github: "#" },
    },
    {
      title: "Design System",
      description:
        "Comprehensive design system and component library used across 10+ projects. Improved development speed by 35%.",
      image: "/design-system-components.png",
      tags: ["Storybook", "TypeScript", "CSS Modules"],
      links: { live: "#", github: "#" },
    },
  ]

  return (
    <section id="projects" className="w-full py-20 px-6 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <span className="text-primary font-semibold text-sm tracking-wide uppercase">Projects</span>
          <h2>Featured Work</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A selection of projects I've worked on. Each one was a learning opportunity and a chance to create something
            meaningful.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="card-glass overflow-hidden group hover-lift">
              {/* Image */}
              <div className="relative h-48 overflow-hidden bg-muted">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-bold text-foreground">{project.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{project.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.tags.map((tag, idx) => (
                    <span key={idx} className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-md">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-3 pt-4">
                  <Link
                    href={project.links.live}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:shadow-lg transition-all duration-300 text-sm"
                  >
                    <ExternalLink size={16} />
                    Live
                  </Link>
                  <Link
                    href={project.links.github}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 border border-primary text-primary rounded-lg font-medium hover:bg-primary hover:text-primary-foreground transition-all duration-300 text-sm"
                  >
                    <Github size={16} />
                    Code
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
