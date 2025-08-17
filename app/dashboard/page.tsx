"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useFitbit } from "../../lib/useFitbit";

export default function Dashboard() {
  useFitbit();
  const [weights, setWeights] = useState<any[]>([]);

  // Fetch weight data for 2024
  const fetchWeights = async () => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("access_token="))
      ?.split("=")[1];

    if (!token) return;

    try {
      const res = await axios.get(
        "https://api.fitbit.com/1/user/-/body/log/weight/date/2024-02-17.json",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setWeights(res.data.weight);
    } catch (err) {
      console.error("Failed to fetch weights:", err);
    }
  };

  // Download weights as JSON
  const downloadWeights = () => {
    const blob = new Blob([JSON.stringify(weights, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "weights_2024.json";
    a.click();
  };

  // Logout function
  const logout = () => {
    // Clear cookies
    document.cookie = "access_token=; path=/; max-age=0";
    document.cookie = "refresh_token=; path=/; max-age=0";

    // Redirect to landing page
    window.location.href = "/";
  };

  useEffect(() => {
    fetchWeights();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="flex gap-4 mb-6">
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
        <button
          onClick={downloadWeights}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
        >
          Download 2024 Weights
        </button>
      </div>
      {weights.length > 0 ? (
        <div className="overflow-auto max-h-96 w-full p-4 bg-white rounded shadow">
          <pre>{JSON.stringify(weights, null, 2)}</pre>
        </div>
      ) : (
        <p>Loading weight data...</p>
      )}
    </div>
  );
}
