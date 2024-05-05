import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import requireAuth from "@/lib/auth";

const prisma = new PrismaClient();

export const GET = requireAuth(async (request: NextRequest, userId: string) => {
  const { searchParams } = new URL(request.url);
  const year = searchParams.get("year");
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");

  try {
    const expenses = await prisma.transaction.findMany({
      where: {
        userId,
        date: {
          ...(year
            ? {
                gte: new Date(`${year}-01-01`),
                lt: new Date(`${Number(year) + 1}-01-01`),
              }
            : startDate && endDate
            ? {
                gte: new Date(startDate),
                lte: new Date(endDate),
              }
            : {}),
        },
      },
    });
    return NextResponse.json(expenses, { status: 200 });
  } catch (error) {
    console.error("Error retrieving expenses:", error);
    return NextResponse.json(
      { error: "An error occurred while retrieving expenses." },
      { status: 500 }
    );
  }
});
