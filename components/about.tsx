"use client"

export default function About() {
  return (
    <section id="about" className="w-full py-20 px-6 bg-white dark:bg-black/50">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div>
              <span className="text-primary font-semibold text-sm tracking-wide uppercase">About Me</span>
              <h2 className="mt-3">Crafting Digital Excellence</h2>
            </div>
            <p className="text-muted-foreground text-lg leading-relaxed">
              I'm a fullstack developer with 5+ years of experience building web applications that users love. I
              specialize in React, TypeScript, and modern cloud technologies.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              My journey in tech started with a passion for solving problems through code. I believe in writing clean,
              maintainable code and creating intuitive user experiences that make a real difference.
            </p>
            <div className="pt-4 space-y-2">
              <p className="text-foreground font-semibold">Core Values:</p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-accent rounded-full" />
                  Clean, maintainable code
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-accent rounded-full" />
                  User-centric design
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-accent rounded-full" />
                  Continuous learning
                </li>
              </ul>
            </div>
          </div>

          {/* Right Stats */}
          <div className="grid grid-cols-2 gap-6">
            {[
              { number: "50+", label: "Projects Completed" },
              { number: "5+", label: "Years Experience" },
              { number: "30+", label: "Happy Clients" },
              { number: "15+", label: "Tech Skills" },
            ].map((stat, index) => (
              <div key={index} className="card-glass p-6 text-center hover-lift">
                <p className="text-3xl md:text-4xl font-bold gradient-text">{stat.number}</p>
                <p className="text-muted-foreground text-sm mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
