import { NextRequest, NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { date, category, amount, description } = await request.json();

    const expense = await prisma.transaction.create({
      data: {
        date: new Date(date),
        category,
        amount: parseFloat(amount),
        description,
      },
    });

    console.log(expense);

    return NextResponse.json(expense, { status: 201 });
  } catch (error) {
    console.error("Error creating expense:", error);
    return NextResponse.json(
      { error: "An error occurred while creating the expense." },
      { status: 500 }
    );
  }
}
