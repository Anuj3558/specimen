import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import PorscheGallery from './pages/caroucel1';
import PerspectiveCarousel from './pages/caroucel2';
import AnimatedNumbers from "./pages/Features";
import Home from './pages/Home';
import Navbar from './pages/Navbar';
import PosterGrid from './pages/postergrid';
import PosterDetail from './pages/posterdetails';
import { LogIn } from 'lucide-react';
import LoginPage from './pages/Login';
import SpecimenLoading from './pages/Loading';
import TermsAndServicePage from './pages/tnc';
import ContactPage from './pages/contact';
import Footer from './pages/Footer';
import Project from './pages/projects';
import SignupPage from './pages/signup';
import BagPage from './pages/bag';


const SAMPLE_POSTERS = [
  {
    id: '1',
    title: '1978 PORSCHE 911 CARRERA',
    series: 'THE CAR SERIES',
    price: 48,
    image: '/placeholder.svg?height=600&width=450',
    dimensions: ['15×15"', '20×20"', '25×25"']
  },{
    id: '1',
    title: '1978 PORSCHE 911 CARRERA',
    series: 'THE CAR SERIES',
    price: 48,
    image: '/placeholder.svg?height=600&width=450',
    dimensions: ['15×15"', '20×20"', '25×25"']
  },{
    id: '1',
    title: '1978 PORSCHE 911 CARRERA',
    series: 'THE CAR SERIES',
    price: 48,
    image: '/placeholder.svg?height=600&width=450',
    dimensions: ['15×15"', '20×20"', '25×25"']
  },{
    id: '1',
    title: '1978 PORSCHE 911 CARRERA',
    series: 'THE CAR SERIES',
    price: 48,
    image: '/placeholder.svg?height=600&width=450',
    dimensions: ['15×15"', '20×20"', '25×25"']
  },{
    id: '1',
    title: '1978 PORSCHE 911 CARRERA',
    series: 'THE CAR SERIES',
    price: 48,
    image: '/placeholder.svg?height=600&width=450',
    dimensions: ['15×15"', '20×20"', '25×25"']
  },{
    id: '1',
    title: '1978 PORSCHE 911 CARRERA',
    series: 'THE CAR SERIES',
    price: 48,
    image: '/placeholder.svg?height=600&width=450',
    dimensions: ['15×15"', '20×20"', '25×25"']
  },{
    id: '1',
    title: '1978 PORSCHE 911 CARRERA',
    series: 'THE CAR SERIES',
    price: 48,
    image: '/placeholder.svg?height=600&width=450',
    dimensions: ['15×15"', '20×20"', '25×25"']
  },
  {
    id: '1',
    title: '1978 PORSCHE 911 CARRERA',
    series: 'THE CAR SERIES',
    price: 48,
    image: '/placeholder.svg?height=600&width=450',
    dimensions: ['15×15"', '20×20"', '25×25"']
  }
  // Add more sample posters here
]
const IntroAnimation = ({ onComplete }) => {
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsComplete(true);
      onComplete();
    }, 7000); // Adjust timing to match your animation duration

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isComplete ? 0 : 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 bg-black z-50"
    >
      <AnimatedNumbers />
    </motion.div>
  );
};

const AppContent = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [hasSeenIntro, setHasSeenIntro] = useState(false);
  const location = useLocation();

  // Handle intro completion
  const handleIntroComplete = () => {
    setShowIntro(false);
    setHasSeenIntro(true);
    // After intro fades out, navigate to gallery
    setTimeout(() => {
      window.history.pushState({}, '', '/home');
    }, 1000);
  };

  // Reset intro state when returning to root path
  useEffect(() => {
    if (location.pathname === '/' && !hasSeenIntro) {
      setShowIntro(true);
    }
  }, [location.pathname, hasSeenIntro]);

  return (
    <motion.div 
      className="min-h-screen relative"
      initial={{ backgroundColor: showIntro ? '#000' : '#fff' }}
      animate={{ backgroundColor: showIntro ? '#000' : '#fff' }}
      transition={{ duration: 1 }}
    >
      <AnimatePresence mode="wait">
        {showIntro && location.pathname === '/' && (
          <IntroAnimation onComplete={handleIntroComplete} />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route 
            path="/" 
            element={
              hasSeenIntro ? 
                <Navigate to="/home" replace /> : 
                <div className="h-screen" /> // Placeholder while intro plays
            } 
          />
          <Route 
            path="/home" 
            element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
              >
                <Home />
              </motion.div>
            } 
          />
          <Route path="/sample" element={<SpecimenLoading />} />
          <Route 
            path="/poster" 
            element={<PosterGrid posters={SAMPLE_POSTERS} />} 
          />
          <Route 
            path="/Login" 
            element={<LoginPage  />} 
          /> 
          <Route 
          path="/projects" 
          element={<Project  />} 
        />
          <Route 
            path="/tnc" 
            element={<TermsAndServicePage  />} 
          />
          <Route 
            path="/contact" 
            element={<ContactPage  />} 
          /> <Route 
          path="/signup" 
          element={<SignupPage  />} 
        /> <Route 
        path="/bag" 
        element={<BagPage  />} 
      />
          <Route 
            path="/poster/:id" 
            element={<PosterDetail poster={SAMPLE_POSTERS[0]} />} 
          />
        </Routes>
      </AnimatePresence>
    </motion.div>
  );
};

function App() {
  return (
    
    <Router>
      <Navbar />
      <AppContent />
      <Footer />
    </Router>
    
  );
}

export default App;