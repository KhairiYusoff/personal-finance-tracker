import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import requireAuth from "@/lib/auth";

const prisma = new PrismaClient();

export const GET = requireAuth(async (request: NextRequest, userId: string) => {
  const year = request.nextUrl.searchParams.get("year") as string;

  try {
    const incomes = await prisma.income.findMany({
      where: {
        date: {
          gte: new Date(`${year}-01-01`),
          lt: new Date(`${Number(year) + 1}-01-01`),
        },
        userId,
      },
    });
    return NextResponse.json(incomes, { status: 200 });
  } catch (error) {
    console.error("Error retrieving incomes:", error);
    return NextResponse.json(
      { error: "Failed to retrieve incomes" },
      { status: 500 }
    );
  }
});
