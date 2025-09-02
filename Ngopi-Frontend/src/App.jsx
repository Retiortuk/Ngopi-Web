import './App.css'
import React, {useEffect, useState} from 'react';
import Navbar from './components/Navbar.jsx';
import HomeSection from './components/HomeSection.jsx';
import FeaturedSection from './components/FeaturedSection.jsx';
import MenuSection from './components/MenuSection.jsx';
import AboutSection from './components/AboutSection.jsx';
import Footer from './components/Footer.jsx';

function App() {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const sections =  document.querySelectorAll('section[id]');

    const observer = new IntersectionObserver(
      (entries)=> {
        entries.forEach((entry)=> {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    sections.forEach((section)=> {
      observer.observe(section);
    });

    return() => {
      sections.forEach((section)=> {
        observer.unobserve(section);
      });
    };
  }, []);

  return (
    <>
      <Navbar activeSection={activeSection} />
      <div id="scroll-container" className="container-main" data-bs-spy="scroll" data-bs-target="#navbar-example" data-bs-offset="100" tabIndex="0">
        <HomeSection />
        <FeaturedSection />
        <MenuSection />
        <AboutSection />
      </div>
      <Footer />
    </>
  )
}

export default App
