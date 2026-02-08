import { Routes, Route } from 'react-router-dom';
import { Hero } from './components/Hero';
import { ProjectShowcase } from './components/ProjectShowcase';
import { CaseStudy } from './components/CaseStudy';
import ScrollToTop from './components/ScrollToTop';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';
import { About } from './components/About';

function App() {
  return (
    <div className="bg-neutral-50 bg-dot-pattern min-h-screen text-neutral-900 selection:bg-neutral-900 selection:text-white cursor-none md:cursor-auto">
      <CustomCursor />
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={
          <>
            <Hero />
            <About />
            <ProjectShowcase />
            <Footer />
          </>
        } />
        <Route path="/project/:id" element={
          <>
            <CaseStudy />
            <Footer />
          </>
        } />
      </Routes>
    </div>
  );
}

export default App;
