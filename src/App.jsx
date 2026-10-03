import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import './App.css';
import Courses from './pages/Courses/Courses';
import Spotlight from './components/Spotlight/Spotligth';
import Footer from './components/Footer/Footer';
import About from './pages/About/About';
import Blog from './pages/Blog/Blog';
import WhatsAppWidget from './components/Whatsapp/WhatsAppWidget';
import Enrollment from './components/Enrollment/Enrollment';
import Features from './components/Features/Features';
import FAQ from './components/FAQ/FAQ';
import CourseDetail from './pages/CoursesDetails/CourseDetail';
import LeadPopup from './components/LeadPopup/LeadPopup';
import { coursesData } from './data';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <Navbar />
        <LeadPopup />
        <main className="content">
          <Routes>
            <Route path="/" element={
              <>
                <Spotlight coursesData={coursesData} />
                <Features />
                <FAQ />
                <Enrollment />
              </>
            } />
            <Route path="/courses" element={<Courses />} />
            <Route path="/Courses" element={<Courses />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/enroll" element={<Enrollment />} />
            <Route path="/course/:id" element={<CourseDetail />} />
          </Routes>
        </main>
        <Footer />
        <WhatsAppWidget />
      </div>
    </Router>
  );
}

export default App;