import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import DashboardButtons from "./Buttons";

export default function DashboardPage() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("fitbit_access")?.value;

  if (!accessToken) {
    redirect("/"); // not logged in → redirect
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 space-y-4 px-6">
      <h1 className="text-4xl font-bold text-indigo-600">Dashboard</h1>
      <p className="text-gray-700 text-center max-w-lg">
        Your Fitbit data is connected! View your activity, heart rate, sleep metrics, and download your weight data.
      </p>

      <DashboardButtons />
    </main>
  );
}
