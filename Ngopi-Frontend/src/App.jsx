import './App.css'
import React, {useEffect, useState} from 'react';
import Navbar from './components/Navbar.jsx';
import { Outlet, useLocation } from 'react-router-dom';
import ScrollHandler from './utils/ScrollHandler.jsx';


function App() {
  const [activeSection, setActiveSection] = useState('');
  const location = useLocation();
  useEffect(() => {
    const sections =  document.querySelectorAll('section[id]');
    const observerOptions = {
      root: null,
      rootMargin: '-170px 0px -50% 0px',
      treshold: 0,
    }

    const observer = new IntersectionObserver(
      (entries)=> {
        entries.forEach((entry)=> {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        });
      },
      observerOptions
    );

    sections.forEach((section) => observer.observe(section));
    return() => sections.forEach((section) => observer.unobserve(section))
  }, [location.pathname]);

  useEffect(()=> {
    if(location.pathname !== '/') {
      setActiveSection('')
    }
  },[location.pathname])

  return (
    <>
      <ScrollHandler setActiveSection={setActiveSection}/>
      <Navbar activeSection={activeSection} />
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default App
