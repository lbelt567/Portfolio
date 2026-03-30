export default function Footer() {
  return (
    <footer className="border-t border-border mt-32 py-12">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground font-mono">
          © 2026 Luis Beltran Jr.
        </p>
        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <a
            href="mailto:luisbelt@usc.edu"
            className="hover:text-amber transition-colors"
          >
            luisbelt@usc.edu
          </a>
          <a
            href="https://linkedin.com/in/luisbeltranj"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-amber transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/lbelt567"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-amber transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  )
}
