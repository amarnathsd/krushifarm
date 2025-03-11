"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const NavigateTo = (route) => {
    router.push("/" + route);
  };

  // Animation variants
  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: "easeOut" 
      }
    }
  };

  const linkVariants = {
    hidden: { opacity: 0, y: -5 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom * 0.1,
        duration: 0.3,
        ease: "easeOut"
      }
    }),
    hover: { 
      scale: 1.05, 
      color: "#1F8A70",
      transition: { duration: 0.2 }
    }
  };

  const buttonVariants = {
    initial: { 
      backgroundColor: "#1b4332", 
      scale: 1,
      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)"
    },
    hover: { 
      backgroundColor: "#2d6a4f", 
      scale: 1.05,
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
      transition: { duration: 0.2 }
    },
    tap: { 
      scale: 0.98,
      boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.1)" 
    }
  };

  // Mobile menu animation
  const mobileMenuVariants = {
    closed: { 
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
        when: "afterChildren"
      }
    },
    open: { 
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.4,
        ease: "easeInOut",
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const mobileItemVariants = {
    closed: { opacity: 0, x: -20 },
    open: { opacity: 1, x: 0 }
  };

  return (
    <motion.nav 
      initial="hidden"
      animate="visible"
      variants={navVariants}
      className="sticky top-0 z-50 flex items-center justify-between px-6 py-3 bg-gradient-to-r from-green-50 to-green-100 shadow-lg backdrop-blur-sm"
    >
      {/* Logo with animation */}
      <motion.div 
        className="flex items-center space-x-2"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.05 }}
      >
        <Link href="/">
          <Image
            src="/assets/images/image 1.png"
            alt="KrushiFarm Logo"
            width={50}
            height={50}
            className="rounded-lg"
          />
        </Link>
        <motion.span 
          className="font-bold text-lg text-green-900 hidden sm:block"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          KrushiFarm
        </motion.span>
      </motion.div>

      {/* Desktop Nav Links with animations */}
      <motion.ul className="hidden md:flex space-x-8 text-green-900 font-semibold">
        {["Home", "Vision", "Farmer", "Business"].map((item, index) => (
          <motion.li key={item} custom={index} variants={linkVariants} whileHover="hover">
            <Link 
              href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              className="relative px-2 py-1 transition-colors duration-300"
            >
              <span>{item}</span>
              <motion.span 
                className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600"
                initial={{ width: "0%" }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
            </Link>
          </motion.li>
        ))}
      </motion.ul>

      {/* Buttons (Desktop) with animations */}
      <div className="hidden md:flex space-x-4">
        <motion.button
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          onClick={() => NavigateTo("contactus")}
          className="text-white px-4 py-2 rounded-lg font-medium"
        >
          Contact Us
        </motion.button>
        <motion.button
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          onClick={() => NavigateTo("signup")}
          className="text-white px-4 py-2 rounded-lg font-medium"
        >
          Get Started
        </motion.button>
      </div>

      {/* Hamburger Icon with animation (Mobile) */}
      <motion.button
        className="md:hidden text-green-900 p-2 rounded-lg"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          animate={isOpen ? "open" : "closed"}
          initial="closed"
          variants={{
            open: { rotate: 180 },
            closed: { rotate: 0 }
          }}
          transition={{ duration: 0.3 }}
        >
          {isOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </motion.div>
      </motion.button>

      {/* Mobile Menu with animations */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="absolute top-16 left-0 w-full bg-white shadow-xl md:hidden overflow-hidden rounded-b-xl"
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <motion.ul className="flex flex-col items-center space-y-4 py-6 text-green-900 font-semibold">
              {["Home", "Vision", "Farmer", "Business"].map((item) => (
                <motion.li key={item} variants={mobileItemVariants}>
                  <Link 
                    href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                    className="block px-6 py-2 w-64 text-center hover:bg-green-50 rounded-lg transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {item}
                  </Link>
                </motion.li>
              ))}
              <motion.li variants={mobileItemVariants} className="pt-2">
                <motion.button
                  variants={buttonVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                  onClick={() => {
                    NavigateTo("contactus");
                    setIsOpen(false);
                  }}
                  className="w-64 bg-green-900 text-white px-4 py-2 rounded-lg"
                >
                  Contact Us
                </motion.button>
              </motion.li>
              <motion.li variants={mobileItemVariants}>
                <motion.button
                  variants={buttonVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                  onClick={() => {
                    NavigateTo("signup");
                    setIsOpen(false);
                  }}
                  className="w-64 bg-green-900 text-white px-4 py-2 rounded-lg"
                >
                  Get Started
                </motion.button>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;