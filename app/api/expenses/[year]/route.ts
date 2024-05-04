import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import requireAuth from "@/lib/auth";

const prisma = new PrismaClient();

export const GET = requireAuth(async (request: NextRequest, userId: string) => {
  const year = request.nextUrl.searchParams.get("year") as string;

  try {
    const expenses = await prisma.transaction.findMany({
      where: {
        date: {
          gte: new Date(`${year}-01-01`),
          lt: new Date(`${Number(year) + 1}-01-01`),
        },
        userId,
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
