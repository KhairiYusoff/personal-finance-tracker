"use client";

import React, { useState } from "react";
import DateRangePicker from "../components/DateRangePicker";
import generatePdfReport from "@/lib/generatePdfReport";
import { Expense } from "@/types/types";
import { downloadPdfFile } from "@/lib/utils";

const ReportsPage = async () => {
  const [dateRange, setDateRange] = useState<{ start: Date; end: Date } | null>(
    null
  );

  const handleDateRangeChange = (start: Date, end: Date) => {
    setDateRange({ start, end });
  };

  const handleGenerateReport = async () => {
    if (!dateRange) return;

    const fetchExpensesForDateRange = async (
      startDate: Date,
      endDate: Date
    ): Promise<Expense[]> => {
      try {
        const response = await fetch(
          `/api/expenses/dateRange?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch expenses");
        }

        const expenses: Expense[] = await response.json();
        return expenses;
      } catch (error) {
        console.error("Error fetching expenses:", error);
        return [];
      }
    };

    const expenses = await fetchExpensesForDateRange(
      dateRange.start,
      dateRange.end
    );
    const pdfBlob = await generatePdfReport(expenses, dateRange);
    downloadPdfFile(
      pdfBlob,
      `expenses-report-${dateRange.start.toISOString()}-${dateRange.end.toISOString()}.pdf`
    );
  };

  return (
    <div>
      <h1>Expense Reports</h1>
      <DateRangePicker onChange={handleDateRangeChange} />
      <button onClick={handleGenerateReport}>Generate Report</button>
    </div>
  );
};

export default ReportsPage;
