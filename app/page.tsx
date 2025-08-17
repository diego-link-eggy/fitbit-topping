"use client";

import { motion } from "framer-motion";
// import { Button } from "@/components/ui/button"; // optional, can replace with <button>
import { HeartPulse, BarChart3, Cloud } from "lucide-react";

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white text-gray-900">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-20 px-6">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-bold mb-6"
        >
          Manage Your Fitbit Data Smarter
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-lg max-w-2xl mb-8"
        >
          Sync, visualize, and analyze your Fitbit health data. Gain insights, track progress, and stay motivated.
        </motion.p>
        <button className="rounded-2xl bg-indigo-600 text-white px-6 py-3 text-lg shadow-lg hover:bg-indigo-700 transition">
          Get Started
        </button>
      </section>

      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-8 px-6 md:px-20 py-16">
        <div className="rounded-2xl shadow-md p-8 text-center bg-white">
          <HeartPulse className="w-12 h-12 text-indigo-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Health Tracking</h3>
          <p>Track steps, heart rate, sleep, and more all in one place.</p>
        </div>

        <div className="rounded-2xl shadow-md p-8 text-center bg-white">
          <BarChart3 className="w-12 h-12 text-indigo-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Data Visualization</h3>
          <p>Beautiful charts and insights to help you measure progress.</p>
        </div>

        <div className="rounded-2xl shadow-md p-8 text-center bg-white">
          <Cloud className="w-12 h-12 text-indigo-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Cloud Sync</h3>
          <p>Securely sync and access Fitbit data anytime, anywhere.</p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center py-20 bg-indigo-600 text-white">
        <h2 className="text-3xl font-bold mb-4">Take Control of Your Health Today</h2>
        <p className="mb-6">Start tracking your Fitbit data smarter and unlock new insights.</p>
        <button className="bg-white text-indigo-600 hover:bg-indigo-100 rounded-2xl px-6 py-3 text-lg shadow-md transition">
          Sign Up Now
        </button>
      </section>
    </div>
  );
}
