import { useEffect, useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './sections/Hero';
import Projects from './sections/Projects';
import Skills from './sections/Skills';
import Learning from './sections/Learning';
import About from './sections/About';
import Contact from './sections/Contact';
import Experience from './sections/Experience';
import GTABackground from './components/GTABackground';
import GTALoadingScreen from './components/GTALoadingScreen';
import ProfileModal from './components/ProfileModal';
import { ThemeProvider, useTheme } from './context/ThemeContext';

function PortfolioApp() {
  const [isLoading, setIsLoading] = useState(true);
  const { theme, setTheme } = useTheme();

  // Loading screen timer (2.4s)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2400);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <GTALoadingScreen onComplete={() => setIsLoading(false)} />;
  }

  return (
    <div className="relative min-h-screen bg-background text-white transition-colors duration-300">
      {/* GTA VI Real Image Background */}
      <GTABackground theme={theme} />

      {/* Main Content Area */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header theme={theme} setTheme={setTheme} />
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6">
          <Hero />
          <Experience />
          <Skills />
          <Projects />
          <Learning />
          <About />
          <Contact />
        </main>
        <Footer />
      </div>

      {/* Interactive Agent Profile & Theme Customizer Modal */}
      <ProfileModal />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <PortfolioApp />
    </ThemeProvider>
  );
}
