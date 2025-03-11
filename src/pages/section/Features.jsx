"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useRouter } from "next/navigation"; 

const features = [
  {
    title: "Direct Farmer-to-Business Trade",
    description: "Eliminate middlemen and connect farmers directly with businesses for better pricing and transparency.",
    icon: (
      <svg className="w-12 h-12 text-green-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 12L12 2L22 12H18V20H6V12H2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    image: "/assets/images/farmer-business.jpg"
  },
  {
    title: "Fresh & Quality Assured",
    description: "Every product is sourced directly from farms, ensuring freshness, traceability, and high standards.",
    icon: (
      <svg className="w-12 h-12 text-green-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 12L12 3L21 12H16V21H8V12H3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    image: "/assets/images/fresh-produce.jpg"
  },
  {
    title: "Fair Pricing for All",
    description: "Farmers get competitive prices while businesses access affordable, top-quality produce.",
    icon: (
      <svg className="w-12 h-12 text-green-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 12H19M12 5V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    image: "/assets/images/fair-pricing.jpg"
  },
  {
    title: "Seamless Logistics & Payments",
    description: "Integrated delivery and secure payments streamline transactions for both farmers and businesses.",
    icon: (
      <svg className="w-12 h-12 text-green-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 6H21M3 12H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    image: "/assets/images/logistics.jpg"
  },
];

// Custom hook to check if element is in viewport
function useScrollInView() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  return { ref, isInView };
}

const FeatureCard = ({ feature, index }) => {
  
  const { ref, isInView } = useScrollInView();
 
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative overflow-hidden group"
    >
      <motion.div 
        className="p-8 bg-white rounded-2xl shadow-lg flex flex-col items-center text-center h-full z-10 relative transition-all duration-300 group-hover:shadow-xl"
        whileHover={{ y: -5 }}
      >
        <div className="relative mb-6">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
            className="bg-green-50 w-20 h-20 rounded-full flex items-center justify-center"
          >
            <motion.div
              whileHover={{ rotate: 15, scale: 1.1 }}
              className="text-green-600"
            >
              {feature.icon}
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
            className="absolute -top-1 -right-1 bg-green-600 w-6 h-6 rounded-full flex items-center justify-center text-white font-bold text-sm"
          >
            {index + 1}
          </motion.div>
        </div>
        
        <h3 className="text-xl font-bold text-green-900 mb-3">{feature.title}</h3>
        <p className="text-gray-600">{feature.description}</p>
        
        <motion.div
          className="mt-6 w-16 h-1 bg-green-500 rounded-full"
          initial={{ width: 0 }}
          animate={isInView ? { width: 64 } : { width: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 + 0.6 }}
        />
      </motion.div>
      
      {/* Background pattern */}
      <div className="absolute -bottom-16 -right-16 w-32 h-32 bg-green-100 rounded-full opacity-30 z-0" />
      <div className="absolute -top-12 -left-12 w-24 h-24 bg-green-50 rounded-full opacity-40 z-0" />
    </motion.div>
  );
};

const Features = () => {
  const router = useRouter();
  const { ref, isInView } = useScrollInView();
  const NavigateTo = (route) => {
    router.push("/" + route); // Navigate to the specified route
  };
  return (
    <section className="py-24 bg-gradient-to-b from-green-50 to-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          ref={ref}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="inline-block mb-3"
          >
            <span className="bg-green-100 text-green-800 text-sm font-medium px-4 py-1.5 rounded-full">Why KrushiFarm?</span>
          </motion.div>
          
          <h2 className="text-4xl font-bold text-green-900 mb-4">Revolutionizing Agricultural Commerce</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            A smarter, fairer way to connect farmers and businesses, ensuring fresh, high-quality produce at fair prices.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index} 
              feature={feature} 
              index={index} 
            />
          ))}
        </div>
        
        {/* Additional section for highlight */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-20 bg-green-900 rounded-2xl p-8 text-white text-center overflow-hidden relative"
        >
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/assets/images/pattern.png')] opacity-10" />
          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-4">Join the Agricultural Revolution</h3>
            <p className="max-w-2xl mx-auto mb-6">
              Whether you're a farmer looking to get better prices for your produce or a business seeking quality agricultural products, KrushiFarm connects you to the right partners.
            </p>
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "#2d6a4f" }}
              whileTap={{ scale: 0.98 }}
              className="bg-white text-green-900 font-semibold py-3 px-8 rounded-lg shadow-lg"
              onClick={() => NavigateTo("signup")}
            >
              Get Started Today
            </motion.button>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -bottom-16 -right-16 w-40 h-40 bg-green-800 rounded-full opacity-50" />
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-green-800 rounded-full opacity-50" />
        </motion.div>
      </div>
    </section>
  );
};

export default Features;