import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const savingsGoals = await prisma.savingsGoal.findMany();
    return NextResponse.json(savingsGoals);
  } catch (error) {
    console.error("Error retrieving savings goals:", error);
    return NextResponse.json(
      { error: "Failed to retrieve savings goals" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const { userId, targetAmount, description } = await request.json();

  try {
    const savingsGoal = await prisma.savingsGoal.create({
      data: {
        userId,
        targetAmount: parseFloat(targetAmount),
        currentAmount: 0,//default value
        description,
      },
    });
    return NextResponse.json(savingsGoal, { status: 201 });
  } catch (error) {
    console.error("Error creating savings goal:", error);
    return NextResponse.json(
      { error: "Failed to create savings goal" },
      { status: 500 }
    );
  }
}
