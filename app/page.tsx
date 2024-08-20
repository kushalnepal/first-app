"use client";
import React from 'react';
import "@styles/globals.css";
import Feed from '@components/Feed'; // Importing Feed component from components/Feed.tsx
import { useRouter } from 'next/navigation'; // Importing useRouter for navigation

const Home = () => {
  const router = useRouter();

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-r from-teal-400 to-blue-500 text-white flex flex-col items-center justify-center px-4 py-6">
      {/* Login Button */}
      <button
        onClick={() => router.push('/login')}
        className="absolute top-4 right-4 bg-white text-blue-600 py-2 px-4 rounded-md hover:bg-gray-200 transition duration-200"
      >
        Login
      </button>

      <div className="text-center max-w-2xl">
        <h1 className="text-5xl font-extrabold mb-4">
          Expense Tracker
          <br />
          <span className="text-yellow-300">Take Control of Your Finances in Your Hand</span>
        </h1>
        <p className="text-lg mb-6">
          Track, manage, and save effortlessly with our intuitive expense tracker. Easily monitor your spending, categorize expenses, and set savings goals to enhance your financial health and decision-making.
        </p>
        <div className="flex flex-col items-center space-y-4">
        </div>
      </div>

      {/* Feed Component */}
      <Feed />
    </div>
  );
};

export default Home;
