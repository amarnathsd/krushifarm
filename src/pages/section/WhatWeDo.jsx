"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

// Define colors from your theme
const colors = {
  primary: "#0A3A19",
  secondary: "#B26E0B",
};

const WhatWeDo = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const features = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-12 h-12"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 8c-1.657 0-3 1.343-3 3 0 .6.176 1.156.48 1.63L5 20h14l-4.48-7.37A2.99 2.99 0 0015 11c0-1.657-1.343-3-3-3z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 8V6a2 2 0 10-4 0v2M16 8V6a2 2 0 10-4 0v2"
          />
        </svg>
      ),
      title: "Direct Sales",
      description: "Connecting farmers with businesses, ensuring fair trade and transparency.",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-12 h-12"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 3h18M3 9h18M3 15h18M3 21h18"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 6h2v4H5zM17 6h2v4h-2z"
          />
        </svg>
      ),
      title: "Fair Pricing",
      description: "Farmers receive competitive prices without middlemen interference.",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-12 h-12"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16l-2 10H6L4 6z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6l2 12h12l2-12"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10 11V9m4 2V9"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 6V4a2 2 0 014 0v2m4 0V4a2 2 0 014 0v2"
          />
        </svg>
      ),
      title: "Fresh Produce",
      description: "Businesses get direct access to quality and traceable agricultural products.",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-12 h-12"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 12h2l1 9h12l1-9h2"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 12l1.5-9h11l1.5 9"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 12v5m8-5v5"
          />
        </svg>
      ),
      title: "Smart Logistics",
      description: "Optimized supply chain with real-time tracking and timely deliveries.",
    },
  ];

  return (
    <motion.section 
      ref={sectionRef}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className="py-20 px-4 md:px-8 relative overflow-hidden"
      style={{ 
        background: `linear-gradient(180deg, rgba(10,58,25,0.05) 0%, rgba(255,255,255,1) 100%)` 
      }}
    >
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-gradient-to-br from-secondary/5 to-secondary/10"></div>
        <div className="absolute -left-24 bottom-12 w-48 h-48 rounded-full bg-gradient-to-tr from-primary/5 to-primary/10"></div>
      </div>

      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-16"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { 
              opacity: 1, 
              y: 0,
              transition: { duration: 0.6 }
            }
          }}
        >
          <motion.div 
            className="inline-block mb-3"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <span 
              className="px-4 py-1.5 rounded-full text-sm font-medium" 
              style={{ 
                color: colors.primary,
                backgroundColor: `${colors.primary}15`
              }}
            >
              Our Services
            </span>
          </motion.div>
          
          <h2 
            className="text-4xl font-bold mb-6" 
            style={{ color: colors.primary }}
          >
            What We Do
          </h2>
          
          <p className="text-lg" style={{ color: `${colors.primary}CC` }}>
            A smarter, fairer way to connect farmers and businesses directly eliminating middlemen to ensure fresh, high-quality produce at fair prices for all
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={index}
              colors={colors}
              isInView={isInView}
            />
          ))}
        </div>
        
        {/* Call to action */}
        <motion.div 
          className="mt-20 text-center"
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { 
              opacity: 1, 
              y: 0,
              transition: { duration: 0.6, delay: 0.8 }
            }
          }}
        >
          <motion.button
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 10px 25px rgba(178, 110, 11, 0.2)"
            }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-3 rounded-lg font-medium shadow-lg text-white"
            style={{ backgroundColor: colors.secondary }}
          >
            Learn How It Works
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  );
};

const FeatureCard = ({ icon, title, description, index, colors, isInView }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        delay: 0.2 + (index * 0.1)
      } 
    }
  };

  const iconMotionVariants = {
    hidden: { scale: 0.5, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 150,
        delay: 0.3 + (index * 0.1),
        duration: 0.6
      } 
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ 
        y: -10,
        boxShadow: "0 15px 30px rgba(10, 58, 25, 0.1)"
      }}
      className="rounded-xl overflow-hidden h-full"
    >
      <div 
        className="p-8 h-full flex flex-col items-center text-center relative"
        style={{ 
          backgroundColor: `${colors.primary}10`,
          borderTop: `3px solid ${colors.secondary}`
        }}
      >
        {/* Number indicator */}
        <div 
          className="absolute top-3 right-3 w-6 h-6 rounded-full text-sm flex items-center justify-center font-semibold"
          style={{ 
            backgroundColor: colors.secondary,
            color: "white"
          }}
        >
          {index + 1}
        </div>
        
        <motion.div 
          className="mb-6 rounded-full p-4 flex items-center justify-center"
          variants={iconMotionVariants}
          style={{ 
            backgroundColor: `${colors.secondary}15`,
            color: colors.secondary
          }}
        >
          {icon}
        </motion.div>
        
        <h3 
          className="text-xl font-bold mb-4"
          style={{ color: colors.primary }}
        >
          {title}
        </h3>
        
        <p 
          className="mb-6 flex-grow"
          style={{ color: `${colors.primary}CC` }}
        >
          {description}
        </p>
        
        <motion.div 
          className="mt-auto"
          initial={{ width: 0 }}
          animate={isInView ? { width: "40%" } : { width: 0 }}
          transition={{ 
            duration: 0.5,
            delay: 0.5 + (index * 0.1)
          }}
        >
          <div className="h-1 rounded-full mx-auto" style={{ backgroundColor: colors.secondary }}></div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default WhatWeDo;