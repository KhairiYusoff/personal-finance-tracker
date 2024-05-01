import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface ExpenseData {
  userId: string;
  accountId: string;
  date: string;
  category: string;
  amount: string;
  description?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { userId, accountId, date, category, amount, description } =
        req.body as ExpenseData;

      const expense = await prisma.transaction.create({
        data: {
          userId,
          accountId,
          date: new Date(date),
          category,
          amount: parseFloat(amount),
          description,
        },
      });

      res.status(201).json(expense);
    } catch (error) {
      console.error("Error creating expense:", error);
      res
        .status(500)
        .json({ error: "An error occurred while creating the expense." });
    }
  } else {
    res.status(405).json({ error: "Method not allowed." });
  }
}
