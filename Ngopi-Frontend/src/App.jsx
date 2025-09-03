import './App.css'
import React, {useEffect, useState} from 'react';
import Navbar from './components/Navbar.jsx';
import HomePage from './Pages/HomePage.jsx';
import Footer from './components/Footer.jsx';
import LoginPage from './Pages/LoginPage.jsx';

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
      <HomePage />
      <Footer />

      <LoginPage />
    </>
  )
}

export default App
