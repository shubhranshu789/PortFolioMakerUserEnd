"use client"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full bg-primary text-primary-foreground py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Dev</h3>
            <p className="text-primary-foreground/70">Building beautiful, functional digital experiences.</p>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Navigation</h4>
            <ul className="space-y-2 text-primary-foreground/70 text-sm">
              <li>
                <a href="#about" className="hover:text-primary-foreground transition">
                  About
                </a>
              </li>
              <li>
                <a href="#skills" className="hover:text-primary-foreground transition">
                  Skills
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-primary-foreground transition">
                  Projects
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-primary-foreground transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Services</h4>
            <ul className="space-y-2 text-primary-foreground/70 text-sm">
              <li>
                <a href="#" className="hover:text-primary-foreground transition">
                  Web Development
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-foreground transition">
                  UI/UX Design
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-foreground transition">
                  Consulting
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-foreground transition">
                  Full Stack
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Connect</h4>
            <ul className="space-y-2 text-primary-foreground/70 text-sm">
              <li>
                <a href="#" className="hover:text-primary-foreground transition">
                  GitHub
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-foreground transition">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-foreground transition">
                  Twitter
                </a>
              </li>
              <li>
                <a href="mailto:hello@example.com" className="hover:text-primary-foreground transition">
                  Email
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-primary-foreground/70 text-sm">© {currentYear} Tech Portfolio. All rights reserved.</p>
            <div className="flex gap-6 text-primary-foreground/70 text-sm">
              <a href="#" className="hover:text-primary-foreground transition">
                Privacy
              </a>
              <a href="#" className="hover:text-primary-foreground transition">
                Terms
              </a>
              <a href="#" className="hover:text-primary-foreground transition">
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
