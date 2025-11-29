"use client"

import { useInView } from "react-intersection-observer"

export default function Skills() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  const skillCategories = [
    {
      category: "Frontend",
      skills: ["React", "TypeScript", "Tailwind CSS", "Next.js", "Vue.js"],
      color: "from-primary to-secondary",
    },
    {
      category: "Backend",
      skills: ["Node.js", "Python", "PostgreSQL", "MongoDB", "GraphQL"],
      color: "from-secondary to-accent",
    },
    {
      category: "Tools & DevOps",
      skills: ["Git", "Docker", "AWS", "CI/CD", "Vercel"],
      color: "from-accent to-accent-light",
    },
  ]

  return (
    <section id="skills" ref={ref} className="w-full py-20 px-6 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <span className="text-primary font-semibold text-sm tracking-wide uppercase">Skills</span>
          <h2>Technologies I Work With</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className={`card-glass p-8 space-y-6 hover-lift ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              } transition-all duration-500`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <h3 className="text-2xl font-bold">{category.category}</h3>
              <div className="space-y-3">
                {category.skills.map((skill, idx) => (
                  <div key={idx} className="space-y-2">
                    <p className="text-sm font-medium text-foreground">{skill}</p>
                    <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${category.color}`}
                        style={{
                          width: `${75 + idx * 4}%`,
                          animation: inView ? `slideInRight 0.8s ease-out ${idx * 100}ms forwards` : "none",
                          opacity: inView ? 1 : 0,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes slideInRight {
          from {
            width: 0;
            opacity: 0;
          }
          to {
            width: 100%;
            opacity: 1;
          }
        }
      `}</style>
    </section>
  )
}
