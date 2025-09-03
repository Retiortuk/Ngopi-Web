import './App.css'
import React, {useEffect, useState} from 'react';
import Navbar from './components/Navbar.jsx';
import { Outlet } from 'react-router-dom';
import Footer from './components/Footer.jsx';
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

          style: {
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            fontSize: '16px',
            borderRadius: '5px',
            background: '#212529',
            color: '#fff'
          },
          success: {
            duration: 4000,
            iconTheme: {
              primary: '#fff',
              secondary: '#212529'
            }
          }
        }}
      />

      <Navbar activeSection={activeSection} />
      <main>
        <Outlet />
      </main>
      <Footer />

    </>
  )
}

export default App
