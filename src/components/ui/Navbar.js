"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Updated import for Next.js 13+

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter(); // Initialize useRouter

  // Function to navigate to a specific route
  const NavigateTo = (route) => {
    router.push("/" + route); // Use the route passed as a parameter
  };

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-3 bg-black/10 shadow-md">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <Image
          src="/assets/images/image 1.png"
          alt="KrushiFarm Logo"
          width={50}
          height={50}
        />
      </div>

      {/* Desktop Nav Links */}
      <ul className="hidden md:flex space-x-6 text-green-900 font-semibold">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/">Vision</Link>
        </li>
        <li>
          <Link href="/">Farmer</Link>
        </li>
        <li>
          <Link href="/">Business</Link>
        </li>
      </ul>

      {/* Buttons (Desktop) */}
      <div className="hidden md:flex space-x-4">
        <button
          onClick={() => NavigateTo("contactus")}
          className="bg-green-900 text-white px-4 py-2 rounded-lg"
        >
          Contact Us
        </button>
        <button
          onClick={() => NavigateTo("signup")} // Pass the route as an argument
          className="bg-green-900 text-white px-4 py-2 rounded-lg"
        >
          Get Started
        </button>
      </div>

      {/* Hamburger Icon (Mobile) */}
      <button
        className="md:hidden text-green-900 text-2xl"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "✖" : "☰"}
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md md:hidden">
          <ul className="flex flex-col items-center space-y-4 py-6 text-green-900 font-semibold">
            <li>
              <Link href="#">Home</Link>
            </li>
            <li>
              <Link href="#">Vision</Link>
            </li>
            <li>
              <Link href="#">Farmer</Link>
            </li>
            <li>
              <Link href="#">Business</Link>
            </li>
            <li>
              <button
                onClick={() => NavigateTo("contactus")}
                className="bg-green-900 text-white px-4 py-2 rounded-lg"
              >
                Contact Us
              </button>
            </li>
            <li>
              <button
                onClick={() => NavigateTo("signup")} // Pass the route as an argument
                className="bg-green-900 text-white px-4 py-2 rounded-lg"
              >
                Get Started
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
