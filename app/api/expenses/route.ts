import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET /api/expenses
export async function GET(request: NextRequest) {
  try {
    const expenses = await prisma.transaction.findMany();
    return NextResponse.json(expenses, { status: 200 });
  } catch (error) {
    console.error("Error retrieving expenses:", error);
    return NextResponse.json(
      { error: "An error occurred while retrieving expenses." },
      { status: 500 }
    );
  }
}

// POST /api/expenses

export async function POST(request: NextRequest) {
  try {
    const { date, category, amount, description } = await request.json();
    const { userId } = auth(); // Get the auth data

    const expense = await prisma.transaction.create({
      data: {
        date: new Date(date),
        category,
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

// PUT /api/expenses/:id
export async function PUT(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const expenseId = searchParams.get("id");

  if (!expenseId) {
    return NextResponse.json({ error: "Missing expense ID" }, { status: 400 });
  }

  try {
    const { date, category, amount, description } = await request.json();
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json(
        { error: "You must be signed in to update an expense." },
        { status: 401 }
      );
    }

    const updatedExpense = await prisma.transaction.update({
      where: {
        id: expenseId,
      },
      data: {
        date: new Date(date),
        category,
        amount: parseFloat(amount),
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

    return NextResponse.json(updatedExpense);
  } catch (error) {
    console.error("Error updating expense:", error);
    return NextResponse.json(
      { error: "Error updating expense" },
      { status: 500 }
    );
  }
}

// DELETE /api/expenses/:id
export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const expenseId = searchParams.get("id");

  if (!expenseId) {
    return NextResponse.json({ error: "Missing expense ID" }, { status: 400 });
  }

  try {
    const deletedExpense = await prisma.transaction.delete({
      where: { id: expenseId },
    });
    return NextResponse.json(deletedExpense);
  } catch (error) {
    console.error("Error deleting expense:", error);
    return NextResponse.json(
      { error: "Error deleting expense" },
      { status: 500 }
    );
  }
}
