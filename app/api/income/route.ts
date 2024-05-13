import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@clerk/nextjs/server";

const prisma = new PrismaClient();

// GET /api/income
export async function GET(request: NextRequest) {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json(
        { error: "You must be signed in to access incomes" },
        { status: 401 }
      );
    }

    const incomes = await prisma.income.findMany({
      where: {
        user: {
          clerkUserId: userId,
        },
      },
    });

    return NextResponse.json(incomes);
  } catch (error) {
    console.error("Error retrieving incomes:", error);
    return NextResponse.json(
      { error: "Failed to retrieve incomes" },
      { status: 500 }
    );
  }
}

// POST /api/income
export async function POST(request: NextRequest) {
  const { date, amount, source, description } = await request.json();
  const { userId } = auth();

  if (!userId) {
    return NextResponse.json(
      { error: "You must be signed in to create an income" },
      { status: 401 }
    );
  }

  try {
    const income = await prisma.income.create({
      data: {
        date: new Date(date),
        amount: parseFloat(amount),
        source,
        description,
        user: {
          connectOrCreate: {
            where: {
              clerkUserId: userId || undefined, // Use the clerkUserId field to uniquely identify the user
            },
            create: {
              clerkUserId: userId || "", // Create a new user if it doesn't exist
            },
          },
        },
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

// PUT /api/income/:id
export async function PUT(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const incomeId = searchParams.get("id");

  if (!incomeId) {
    return NextResponse.json({ error: "Missing income ID" }, { status: 400 });
  }

  try {
    const { date, amount, source, description } = await request.json();
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json(
        { error: "You must be signed in to update an income." },
        { status: 401 }
      );
    }

    const updatedIncome = await prisma.income.update({
      where: {
        id: incomeId,
      },
      data: {
        date: new Date(date),
        source,
        amount: parseFloat(amount),
        description,
        user: {
          connectOrCreate: {
            where: {
              clerkUserId: userId || undefined,
            },
            create: {
              clerkUserId: userId || "",
            },
          },
        },
      },
    });

    return NextResponse.json(updatedIncome);
  } catch (error) {
    console.error("Error updating income:", error);
    return NextResponse.json(
      { error: "Error updating income" },
      { status: 500 }
    );
  }
}

// DELETE /api/income/:id
export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const incomeId = searchParams.get("id");

  if (!incomeId) {
    return NextResponse.json({ error: "Missing income ID" }, { status: 400 });
  }

  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json(
        { error: "You must be signed in to delete an income." },
        { status: 401 }
      );
    }

    const deletedIncome = await prisma.income.delete({
      where: {
        id: incomeId,
        user: {
          clerkUserId: userId,
        },
      },
    });

    return NextResponse.json(deletedIncome);
  } catch (error) {
    console.error("Error deleting income:", error);
    return NextResponse.json(
      { error: "Error deleting income" },
      { status: 500 }
    );
  }
}
