"use client"; // Required for client-side interactivity
import React from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/ui/Navbar";
import Image from "next/image";
import Whatwedo from "@/pages/section/WhatWeDo";
import Features from "@/pages/section/Features";
import Footer from "@/components/ui/Fotter";

const LandingPage = () => {
  const router = useRouter();

  const navigateTo = (route) => {
    router.push("/" + route);
  };

  return (
    <div className="bg-white text-primary overflow-x-hidden">
      <Navbar />

      {/* Hero Section - added gradient overlay */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent z-10" />
        <Image
          src="/assets/images/Banner1.jpg"
          alt="hero image"
          width={1920}
          height={1080}
          className="w-full h-[90vh] object-cover"
          priority
        />
        <div className="absolute left-[7vw] top-[20vh] z-20 w-10/12 md:w-6/12">
          <h2 className="text-4xl md:text-7xl text-white leading-normal font-bold drop-shadow-lg">
            Bridging the Gap Between Farmers and Businesses
          </h2>
          <div className="mt-8 hidden md:block">
            <button 
              onClick={() => navigateTo("contactus")} 
              className="bg-secondary text-white font-semibold px-6 py-3 rounded-lg mr-4 hover:bg-secondary/90 transition-all shadow-lg"
            >
              Contact Us
            </button>
            <button 
              onClick={() => navigateTo("signup")} 
              className="bg-white text-primary font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition-all shadow-lg border-2 border-secondary"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>

      {/* Section 2 - Rooted in Agriculture - improved layout and spacing */}
      <div className="relative flex flex-col md:flex-row justify-between items-center py-16 md:py-24 px-4">
        <div className="flex justify-center text-primary md:w-1/2">
          <div className="w-10/12 md:w-8/12">
            <div className="w-16 h-1 bg-secondary mb-6" aria-hidden="true"></div>
            <p className="text-4xl md:text-5xl font-bold leading-tight">
              Rooted in Agriculture, Thriving with Lasting Business Relationships
            </p>
            <p className="text-lg mt-8 text-gray-700 leading-relaxed">
              We believe in agriculture's power to build strong, lasting
              connections. Through trust and collaboration, we help farmers and
              businesses grow together.
            </p>
            <div className="flex flex-col sm:flex-row mt-10 gap-4">
              <button
                onClick={() => navigateTo("contactus")}
                className="bg-primary text-white font-semibold px-6 py-3 rounded-lg text-lg hover:bg-primary/90 transition-all shadow-md"
              >
                Contact Us
              </button>
              <button
                onClick={() => navigateTo("signup")}
                className="bg-secondary text-white font-semibold px-6 py-3 rounded-lg text-lg hover:bg-secondary/90 transition-all shadow-md"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center mt-16 md:mt-0">
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-secondary/20 rounded-lg -z-10"></div>
            <Image
              src="/assets/images/section2img.jpg"
              alt="Nurture The Future"
              width={1000}
              height={600}
              className="w-[90vw] md:w-[32vw] h-[50vh] md:h-[60vh] rounded-xl shadow-xl object-cover"
            />
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/20 rounded-lg -z-10"></div>
          </div>
        </div>
      </div>

      {/* What We Do Section - added container */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto">
          <Whatwedo />
        </div>
      </div>

      {/* Features Section - added container */}
      <div className="py-16">
        <div className="container mx-auto">
          <Features />
        </div>
      </div>

      {/* Call to Action Section - new section */}
      <div className="bg-primary py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Agricultural Business?</h2>
            <p className="text-lg mb-8 text-white/80">
              Join our platform today and connect with farmers and businesses across the agricultural ecosystem.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => navigateTo("signup")}
                className="bg-secondary text-white font-semibold px-8 py-4 rounded-lg text-xl hover:bg-secondary/90 transition-all shadow-lg"
              >
                Get Started
              </button>
              <button
                onClick={() => navigateTo("about")}
                className="bg-transparent text-white font-semibold px-8 py-4 rounded-lg text-xl hover:bg-white/10 transition-all border-2 border-white"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;