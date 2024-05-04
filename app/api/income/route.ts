import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const incomes = await prisma.income.findMany();
    return NextResponse.json(incomes);
  } catch (error) {
    console.error("Error retrieving incomes:", error);
    return NextResponse.json(
      { error: "Failed to retrieve incomes" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const { date, amount, source, description } = await request.json();

  try {
    const income = await prisma.income.create({
      data: {
        date: new Date(date),
        amount: parseFloat(amount),
        source,
        description,
      },
    });
    return NextResponse.json(income, { status: 201 });
  } catch (error) {
    console.error("Error creating income:", error);
    return NextResponse.json(
      { error: "Failed to create income" },
      { status: 500 }
    );
  }
}
