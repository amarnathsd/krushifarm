"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { app } from "@/firebase";
import Link from "next/link";

const auth = getAuth(app);
const db = getFirestore(app);

const SignUp = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("+91");
  const [preferredWhatsApp, setPreferredWhatsApp] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const [error, setError] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");

    if (!contactNumber.startsWith("+91") || contactNumber.length !== 13) {
      setError("Contact number must start with +91 and be 10 digits long.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "UserInfo", user.uid), {
        name,
        email,
        contactNumber,
        preferredWhatsApp,
      });

      router.push("/dashboard");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-4">
        <h2 className="text-3xl font-bold mb-6 text-center text-primary">Sign Up</h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSignUp} className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
            required
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
            required
          />
          <input
            type="tel"
            value={contactNumber}
            onChange={(e) => {
              const value = e.target.value;
              if (value.startsWith("+91") && value.length <= 13) {
                setContactNumber(value);
              }
            }}
            placeholder="Contact Number (+91XXXXXXXXXX)"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
            required
          />
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={preferredWhatsApp}
              onChange={(e) => setPreferredWhatsApp(e.target.checked)}
              className="mr-2"
              style={{ accentColor: "#B26E0B" }}
            />
            <span className="text-sm">Prefer WhatsApp for communication</span>
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"} // Toggle password visibility
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 px-3 flex items-center"
            >
              {showPassword ? "👁️" : "👁️‍🗨️"} {/* Eye icon */}
            </button>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 rounded-lg font-semibold text-white bg-secondary hover:bg-secondary/90 transition-all"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-secondary hover:underline">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;