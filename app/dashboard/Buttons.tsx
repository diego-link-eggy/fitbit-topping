"use client";

import { useRouter } from "next/navigation";

export default function DashboardButtons() {
  const router = useRouter();

  const handleLogout = async () => {
    const res = await fetch("/api/auth/logout", { method: "POST" });
    const data = await res.json();
    if (data.success) router.push("/");
  };

  const handleDownloadCSV = async () => {
    const res = await fetch("/api/fitbit/weight");
    if (!res.ok) return alert("Failed to fetch weight data");

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "weight_2024.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="flex gap-4">
      <button
        onClick={handleDownloadCSV}
        className="rounded-xl bg-green-600 text-white px-6 py-2 text-lg hover:bg-green-700 transition"
      >
        Download 2024 Weight CSV
      </button>

      <button
        onClick={handleLogout}
        className="rounded-xl bg-red-600 text-white px-6 py-2 text-lg hover:bg-red-700 transition"
      >
        Logout
      </button>
    </div>
  );
}
