

import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { KeyRound } from "lucide-react";

const Navbar = () => {
    const navLinkClass = ({ isActive }) =>
        isActive
            ? "text-lime-400 underline font-semibold"
            : "hover:text-lime-300 transition-colors duration-150 hover:scale-105 cursor-pointer";

    return (
        <nav className="navbar bg-gray-900/80 sticky top-0 z-50 px-6 lg:px-10 h-[8vh] shadow-lg flex justify-between items-center">
            {/* Logo */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="flex items-center justify-center gap-2 text-4xl sm:text-5xl lg:text-6xl font-extrabold"
            >
                <NavLink to="/" className="flex items-center justify-center gap-2 text-4xl sm:text-5xl font-extrabold">
                    <span className="italic -skew-x-6 text-white">MLA</span>
                    <span className="text-lime-400 skew-x-6">Pass</span>
                </NavLink>
            </motion.div>

            {/* Nav Links */}
            <div className="flex items-center gap-6 sm:gap-8">
                <NavLink to="/" className="btn btn-sm gap-2 bg-lime-600 shadow-lg text-black hover:shadow-lime-500 hover:scale-105">
                    <KeyRound className="w-4 h-4" />
                    Create
                </NavLink>

                <NavLink className={navLinkClass} to="/passwords">
                    Passwords
                </NavLink>

                <NavLink className={navLinkClass} to="/about">
                    About
                </NavLink>
            </div>
        </nav>
    );
};

export default Navbar;




































// // import React from 'react'
// // import { NavLink } from 'react-router-dom'


// // const Navbar = () => {
// //     return (
// //         <nav className='flex sticky top-0 left-0 z-50 mb-5 bg-gray-900/60 py-2 px-4 md:px-6 lg:px-10 h-[12vh] text-white items-center justify-between flex-wrap'>
// //             <div className="flex items-center justify-center text-4xl sm:text-5xl lg:text-6xl font-extrabold flex-shrink-0">
// //                 <span className="text-white italic -skew-x-6 transform">MLA</span>
// //                 <span className="text-lime-400 ml-2 sm:ml-4 skew-x-6 transform">Pass</span>
// //             </div>
// //             <div className='flex items-center justify-center gap-2 sm:gap-8 text-sm sm:text-base mt-0 sm:mt-0'>
// //                 <NavLink className={(e) => { return e.isActive ? "navbarElements w-13 text-lime-400 p-1.5 underline flex items-center justify-center" : "flex w-13 items-center justify-center hover:font-bold cursor-pointer transition-all duration-150" }} to="/">
// //                     Create
// //                 </NavLink>
// //                 <NavLink className={(e) => { return e.isActive ? "navbarElements w-13 text-lime-400 p-1.5 underline flex items-center justify-center" : "flex w-13 items-center justify-center hover:font-bold cursor-pointer transition-all duration-150" }} to="/passwords">
// //                     Passwords
// //                 </NavLink>
// //                 <NavLink className={(e) => { return e.isActive ? "navbarElements w-13 text-lime-400 p-1.5 underline flex items-center justify-center" : "flex w-13 items-center justify-center hover:font-bold cursor-pointer transition-all duration-150" }} to="/about">
// //                     About
// //                 </NavLink>
// //             </div>

// //         </nav>
// //     )
// // }

// // export default Navbar;


