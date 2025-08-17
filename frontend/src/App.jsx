

import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar'
import CreatePage from './pages/CreatePage'
import PasswordsPage from './pages/PasswordsPage'
// import AboutPage from './pages/AboutPage'
import Footer from './components/Footer';


const App = () => {

  return (
    <div className="h-full w-full">
      <main>
        <Routes>
          <Route path="/" element={<CreatePage />} />
          <Route path="/:id" element={<CreatePage />} />
          <Route path="/passwords" element={<PasswordsPage />} />
          {/* <Route path="/about" element={<AboutPage />} /> */}
        </Routes>
      </main>
      <Toaster />

    </div>
  )
}

export default App







































// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// import React, { useState, useEffect } from 'react'
// import { Routes, Route, Navigate } from 'react-router-dom'
// import toast, { Toaster } from 'react-hot-toast';
// // import { useLocation } from 'react-router-dom';
// // import { AnimatePresence, motion } from 'framer-motion';
// import Navbar from './components/Navbar'
// import Home from './components/Home'
// import Passwords from './components/Passwords'
// import About from './components/About'
// import Footer from './components/Footer';

// function App() {


//   const location = useLocation();
//   const [prevPath, setPrevPath] = useState(location.pathname);
//   const [direction, setDirection] = useState(1); // 1: right, -1: left
//   const routeOrder = ['/', '/passwords', '/about'];

//   React.useEffect(() => {
//     const prevIdx = routeOrder.indexOf(prevPath);
//     const currIdx = routeOrder.indexOf(location.pathname);
//     if (prevIdx !== -1 && currIdx !== -1) {
//       setDirection(currIdx > prevIdx ? 1 : -1);
//     }
//     setPrevPath(location.pathname);
//   }, [location.pathname]);

//   const variants = {
//     initial: (dir) => ({
//       opacity: 0,
//       x: dir === 1 ? 120 : -120
//     }),
//     animate: {
//       opacity: 1,
//       x: 0,
//       transition: { duration: 0.3, ease: 'easeInOut' }
//     },
//     exit: (dir) => ({
//       opacity: 0,
//       x: dir === 1 ? -120 : 120,
//       transition: { duration: 0.3, ease: 'easeInOut' }
//     })
//   };

//   return (
//     <div className="relative flex flex-col min-h-screen">
//       <div className="absolute top-0 z-[-1] h-full w-full bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
//       <Navbar />
//       <main className='flex-grow'>
//         <AnimatePresence mode="wait">
//           <Routes location={location} key={location.pathname}>
//             <Route path="/" element={
//               <motion.div
//                 custom={direction}
//                 variants={variants}
//                 initial="initial"
//                 animate="animate"
//                 exit="exit"
//               >
//                 <Home />
//               </motion.div>
//             } />
//             <Route path="/passwords" element={
//               <motion.div
//                 custom={direction}
//                 variants={variants}
//                 initial="initial"
//                 animate="animate"
//                 exit="exit"
//               >
//                 <Passwords />
//               </motion.div>
//             } />
//             <Route path="/about" element={
//               <motion.div
//                 custom={direction}
//                 variants={variants}
//                 initial="initial"
//                 animate="animate"
//                 exit="exit"
//               >
//                 <About />
//               </motion.div>
//             } />
//           </Routes>
//         </AnimatePresence>
//       </main>
//       <Footer />
//       <Toaster />
//     </div>
//   )
// }

// export default App







