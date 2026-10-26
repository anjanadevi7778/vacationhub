import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const hasDbUrl = !!process.env.DATABASE_URL;
    const dbUrlPreview = process.env.DATABASE_URL
      ? `${process.env.DATABASE_URL.slice(0, 15)}...${process.env.DATABASE_URL.slice(-20)}`
      : "MISSING";
    const count = await db.listing.count();
    const sample = await db.listing.findFirst({ select: { id: true, title: true, category: true } });
    return NextResponse.json({
      status: "ok",
      hasDbUrl,
      dbUrlPreview,
      count,
      sample,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        status: "error",
        name: error?.name || "UnknownError",
        message: error?.message || "Unknown error",
        hasDbUrl: !!process.env.DATABASE_URL,
      },
      { status: 500 }
    );
  }
}
