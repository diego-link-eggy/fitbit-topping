import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";

import DashboardButtons from "./Buttons";



export default async function Dashboard() {
  const router = useRouter();
  const cookieStore = cookies();
  const token = cookieStore.get("fitbit_session")?.value;

  const handleLogout = async () => {
    const res = await fetch("/api/auth/logout", { method: "POST" });
    const data = await res.json();
    if (data.success) {
      router.push("/"); // redirect to landing page after logout
    }
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

  if (!token) {
    redirect("/"); // Not logged in → go back to landing page
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-4xl font-bold text-indigo-600 mb-4">Dashboard</h1>
      <p className="text-gray-700 text-center max-w-lg">
        Your Fitbit data is connected! View your activity, heart rate, and sleep metrics.
      </p>

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
    </main>
  );
}