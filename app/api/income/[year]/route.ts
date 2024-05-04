import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const year = searchParams.get("year");

  try {
    const incomes = await prisma.income.findMany({
      where: {
        date: {
          gte: new Date(`${year}-01-01`),
          lt: new Date(`${Number(year) + 1}-01-01`),
        },
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
}
