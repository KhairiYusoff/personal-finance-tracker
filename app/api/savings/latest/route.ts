import { NextRequest, NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const savingsGoal = await prisma.savingsGoal.findFirst({
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(savingsGoal);
  } catch (error) {
    console.error("Error retrieving savings goal:", error);
    return NextResponse.json(
      { error: "Failed to retrieve savings goal" },
      { status: 500 }
    );
  }
}
