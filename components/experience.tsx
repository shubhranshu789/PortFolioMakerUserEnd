"use client"

export default function Experience() {
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

  return (
    <section id="experience" className="w-full py-20 px-6 bg-white dark:bg-black/50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <span className="text-primary font-semibold text-sm tracking-wide uppercase">Experience</span>
          <h2>My Professional Journey</h2>
        </div>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div key={index} className="card-glass p-8 border-l-4 border-primary hover-lift">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-foreground">{exp.role}</h3>
                  <p className="text-primary font-semibold mt-1">{exp.company}</p>
                </div>
                <span className="text-muted-foreground font-semibold whitespace-nowrap">{exp.period}</span>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-4">{exp.description}</p>
              <div className="flex flex-wrap gap-2">
                {exp.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-gradient-to-r from-accent to-accent-light text-accent-light-foreground text-sm rounded-full font-medium"
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
  )
}
