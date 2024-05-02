import { NextRequest, NextResponse } from "next/server";

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

// PUT /api/expenses/:id
export async function PUT(request: NextRequest) {
  try {
    const expenseId = new URL(request.url).pathname.split("/").pop();
    const { date, category, amount, description } = await request.json();

    const updatedExpense = await prisma.transaction.update({
      where: { id: expenseId },
      data: {
        date: new Date(date),
        category,
        amount: parseFloat(amount),
        description,
      },
    });

    return NextResponse.json(updatedExpense, { status: 200 });
  } catch (error) {
    console.error("Error updating expense:", error);
    return NextResponse.json(
      { error: "An error occurred while updating the expense." },
      { status: 500 }
    );
  }
}

// DELETE /api/expenses/:id
export async function DELETE(request: NextRequest) {
  try {
    const expenseId = new URL(request.url).pathname.split("/").pop();

    const deletedExpense = await prisma.transaction.delete({
      where: { id: expenseId },
    });

    return NextResponse.json(deletedExpense, { status: 200 });
  } catch (error) {
    console.error("Error deleting expense:", error);
    return NextResponse.json(
      { error: "An error occurred while deleting the expense." },
      { status: 500 }
    );
  }
}
