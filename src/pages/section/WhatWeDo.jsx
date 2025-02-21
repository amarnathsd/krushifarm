"use client"
import React from "react";

const FarmToMarketSection = () => {
  return (
    <section className="text-primary py-12 px-6 space-y-[8vh]">
      <div className="max-w-5xl mx-auto text-center w-5/12 space-y-[3vh]">
        <h2 className="text-3xl font-bold text-primary">What We Do</h2>
        <p className=" mt-2">
        A smarter, fairer way to connect farmers and businesses directly eliminating middlemen to ensure fresh, high-quality produce at fair prices for all
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 w-11/12 mx-auto">
        <FeatureCard
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-12 h-12 text-secondary"
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
          }
          title="Direct Sales"
          description="Connecting farmers with businesses, ensuring fair trade and transparency."
        />
        <FeatureCard
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-12 h-12 text-secondary"
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
          }
          title="Fair Pricing"
          description="Farmers receive competitive prices without middlemen interference."
        />
        <FeatureCard
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-12 h-12 text-secondary"
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
          }
          title="Fresh Produce"
          description="Businesses get direct access to quality and traceable agricultural products."
        />
        <FeatureCard
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-12 h-12 text-secondary"
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
          }
          title="Smart Logistics"
          description="Optimized supply chain with real-time tracking and timely deliveries."
        />
      </div>
    </section>
  );
};

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="bg-primary/10 p-6 rounded-xl space-y-6 shadow-md text-center">
      <div className="flex justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className=" mt-2">{description}</p>
    </div>
  );
};

export default FarmToMarketSection;
