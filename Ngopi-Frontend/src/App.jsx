import './App.css'
import React, {useEffect, useState} from 'react';
import Navbar from './components/Navbar.jsx';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

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
      <Toaster
        position='bottom-center'
        reverseOrder={false}
        containerStyle={{
          marginBottom: '5px'
        }}
        toastOptions={{
          duration: 4000,
        }}
      />

      <Navbar activeSection={activeSection} />
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default App
