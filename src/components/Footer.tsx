export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-16 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between text-sm text-muted">
        <p>© {2025} Jaydeep Chaudhari. All rights reserved.</p>
        <nav aria-label="Footer" className="flex gap-4 mt-3 sm:mt-0">
          <a className="hover:text-white" href="#home">Home</a>
          <a className="hover:text-white" href="#projects">Projects</a>
          <a className="hover:text-white" href="#contact">Contact</a>
        </nav>
      </div>
    </footer>
  );
}


