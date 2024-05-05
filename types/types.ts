import { TDocumentDefinitions } from "pdfmake/interfaces";

export interface Expense {
  id: string;
  date: string;
  category: string;
  amount: number;
  description?: string;
}

export interface Income {
  id: string;
  date: string;
  amount: number;
  source: string;
  description: string;
}

export interface SavingsGoal {
  id: string;
  targetAmount: number;
  currentAmount: number;
  description: string;
}

export type DocumentDefinition = TDocumentDefinitions;
