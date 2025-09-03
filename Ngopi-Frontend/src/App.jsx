import './App.css'
import React, {useEffect, useState} from 'react';
import Navbar from './components/Navbar.jsx';
import { Outlet } from 'react-router-dom';
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
      <main>
        <Outlet />
      </main>
      <Footer />

    </>
  )
}

export default App
