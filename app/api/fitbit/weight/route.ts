import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const accessToken = req.cookies.get("fitbit_access")?.value;

  if (!accessToken) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    // Fitbit weight log API for 2024
    const res = await fetch(
      `https://api.fitbit.com/1/user/-/body/log/weight/date/2024-01-01/2024-12-31.json`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const data = await res.json();

    // Transform to CSV
    const weightLogs = data.weight || [];
    const csvHeader = "date,weight,unit\n";
    const csvBody = weightLogs
      .map((w: any) => `${w.date},${w.weight},${w.unit}`)
      .join("\n");

    const csv = csvHeader + csvBody;

    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="weight_2024.csv"`,
      },
    });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch weight data", details: err });
  }
}
