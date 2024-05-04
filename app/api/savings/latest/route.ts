import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import requireAuth from "@/lib/auth";

const prisma = new PrismaClient();

export const GET = requireAuth(async (request: NextRequest, userId: string) => {
  try {
    const savingsGoal = await prisma.savingsGoal.findFirst({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(savingsGoal ? [savingsGoal] : [], { status: 200 });
  } catch (error) {
    console.error("Error retrieving savings goal:", error);
    return NextResponse.json(
      { error: "Failed to retrieve savings goal" },
      { status: 500 }
    );
  }
});
