import pdfmake from "pdfmake/build/pdfmake";
import { Expense, DocumentDefinition } from "@/types/types";
import { format } from "date-fns";

const generatePdfReport = async (
  expenses: Expense[],
  dateRange: { start: Date; end: Date }
) => {
  const documentDefinition: DocumentDefinition = {
    content: [
      { text: "Expense Report", style: "header" },
      {
        text: `Date Range: ${format(dateRange.start, "MM/dd/yyyy")} - ${format(
          dateRange.end,
          "MM/dd/yyyy"
        )}`,
        style: "subheader",
      },
      {
        table: {
          headerRows: 1,
          widths: ["*", "*", "*", "*", "*"],
          body: [
            [
              { text: "Date", style: "tableHeader" },
              { text: "Category", style: "tableHeader" },
              { text: "Description", style: "tableHeader" },
              { text: "Amount", style: "tableHeader" },
              { text: "Actions", style: "tableHeader" },
            ],
            ...expenses.map((expense) => [
              {
                text: format(new Date(expense.date), "MM/dd/yyyy"),
                style: "tableRow",
              },
              { text: expense.category, style: "tableRow" },
              { text: expense.description || "-", style: "tableRow" },
              { text: expense.amount.toFixed(2), style: "tableRow" },
              { text: "-", style: "tableRow" },
            ]),
            [
              { text: "Total", colSpan: 3, style: "tableFooter" },
              {},
              {},
              {
                text: expenses
                  .reduce((total, expense) => total + expense.amount, 0)
                  .toFixed(2),
                style: "tableFooter",
              },
              {},
            ],
          ],
        },
      },
    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 0, 10],
      },
      subheader: {
        fontSize: 14,
        margin: [0, 10, 0, 5],
      },
      tableHeader: {
        bold: true,
        fontSize: 12,
        color: "black",
        fillColor: "#d0d0d0",
      },
      tableRow: {
        fontSize: 10,
      },
      tableFooter: {
        bold: true,
        fontSize: 12,
        color: "black",
        fillColor: "#d0d0d0",
      },
    },
  };

  const pdfDocGenerator = pdfmake.createPdf(documentDefinition);
  const pdfBlob = await new Promise<Blob>((resolve) => {
    pdfDocGenerator.getBlob((blob) => {
      resolve(blob);
    });
  });

  return pdfBlob;
};

export default generatePdfReport;
