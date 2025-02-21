import React from "react";
import Navbar from "@/components/ui/Navbar";
import Image from "next/image";
import Whatwedo from "@/pages/section/WhatWeDo";
import Features from "@/pages/section/Features";
import Footer from "@/components/ui/Fotter";

const LandingPage = () => {
  return (
    <div className="bg-secondary/10">
      <Navbar />
      {/* Hero Section */}
      <div className="relative">
        <Image
          src="/assets/images/Banner1.jpg"
          alt="hero image"
          width={1920} // High resolution
          height={1080}
          className="w-full h-[90vh] object-cover"
        />
        <h2 className="absolute left-[7vw] top-[20vh] text-7xl text-primary leading-normal font-bold w-5/12">
          Bridging the Gap Between Farmers and Businesses
        </h2>
      </div>

      {/* Section 2 - Ensuring Proper Stacking */}
      <div className="relative flex justify-between items-center h-screen">
        <div className="flex justify-center  text-primary w-1/2 ">
          <div className="w-8/12">
            <p className="text-6xl font-bold leading-snug">
              Rooted in Agriculture, Thriving with Lasting Business
              Relationships.
            </p>
            <p className="text-base mt-10">
              We believe in agriculture’s power to build strong, lasting
              connections. Through trust and collaboration, we help farmers and
              businesses grow together.
            </p>
            <div className="flex justify-end mt-5">
              <button className="bg-secondary text-primary font-semibold px-8 py-4 rounded-lg text-xl">
                Contact Us
              </button>
            </div>
          </div>
        </div>
        <div className="w-1/2 flex justify-center">
          <Image
            src="/assets/images/section2img.jpg"
            alt="Nurture The Future"
            width={1000} // High resolution
            height={600}
            className="w-[32vw] h-[60vh] rounded-3xl"
          />
        </div>
      </div>
      <div>
        <Whatwedo />
      </div>
      <div>
        <Features />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default LandingPage;
