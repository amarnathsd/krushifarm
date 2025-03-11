"use client"; // Required for client-side interactivity
import React from "react";
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import Navbar from "@/components/ui/Navbar";
import Image from "next/image";
import Whatwedo from "@/pages/section/WhatWeDo";
import Features from "@/pages/section/Features";
import Footer from "@/components/ui/Fotter";

const LandingPage = () => {
  const router = useRouter(); // Initialize useRouter

  // Function to navigate to a specific route
  const NavigateTo = (route) => {
    router.push("/" + route); // Navigate to the specified route
  };

  return (
    <div className="bg-secondary/10">
      <Navbar />

      {/* Hero Section */}
      <div className="relative">
        <Image
          src="/assets/images/Banner1.jpg"
          alt="hero image"
          width={1920}
          height={1080}
          className="w-full h-[90vh] object-cover"
          priority
        />
        <h2 className="absolute left-[7vw] top-[20vh] text-4xl md:text-7xl text-primary leading-normal font-bold w-10/12 md:w-5/12">
          Bridging the Gap Between Farmers and Businesses
        </h2>
      </div>

      {/* Section 2 - Rooted in Agriculture */}
      <div className="relative flex flex-col md:flex-row justify-between items-center md:h-screen">
        <div className="flex justify-center  text-primary md:w-1/2 ">
          <div className="w-10/12 md:w-8/12">
            <p className="text-4xl md:text-6xl font-bold leading-relaxed  md:leading-snug">
              Rooted in Agriculture, Thriving with Lasting Business
              Relationships.
            </p>
            <p className="text-base mt-10">
              We believe in agriculture’s power to build strong, lasting
              connections. Through trust and collaboration, we help farmers and
              businesses grow together.
            </p>
            <div className="flex justify-center md:justify-end mt-5 gap-4">
              <button
                onClick={() => NavigateTo("contactus")}
                className="bg-secondary text-primary font-semibold px-4 py-3 md:px-8 md:py-4 rounded-lg md:text-xl"
              >
                Contact Us
              </button>
              <button
                onClick={() => NavigateTo("signup")}
                className="bg-secondary text-primary font-semibold px-4 py-3 md:px-8 md:py-4 rounded-lg md:text-xl"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center mt-10">
          <Image
            src="/assets/images/section2img.jpg"
            alt="Nurture The Future"
            width={1000} // High resolution
            height={600}
            className="w-[90vw] md:w-[32vw] h-[50vh] md:h-[60vh] rounded-3xl"
          />
        </div>
      </div>

      {/* What We Do Section */}
      <div>
        <Whatwedo />
      </div>

      {/* Features Section */}
      <div>
        <Features />
      </div>

      {/* Footer */}
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default LandingPage;
