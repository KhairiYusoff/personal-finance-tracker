import { Income } from "@/types/types";

export const downloadPdfFile = async (pdfBlob: Blob, fileName: string) => {
  if (window.showSaveFilePicker) {
    try {
      const fileHandle = await window.showSaveFilePicker({
        types: [
          {
            description: "PDF Files",
            accept: {
              "application/pdf": [".pdf"],
            },
          },
        ],
      });

      const writableStream = await fileHandle.createWritable();
      await writableStream.write(pdfBlob);
      await writableStream.close();
    } catch (error) {
      console.error("Error downloading PDF file:", error);
      // Handle error, e.g., display an error message to the user
    }
  } else {
    // Fallback for browsers that don't support showSaveFilePicker
    const url = window.URL.createObjectURL(pdfBlob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

export const getMonthName = (month: number) => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return monthNames[month - 1];
};

export const calculatePreviousMonthIncome = (
  month: number,
  incomes: Income[]
) => {
  const previousMonth = month === 1 ? 12 : month - 1;
  const previousMonthIncomes = incomes.filter(
    (income) => new Date(income.date).getMonth() + 1 === previousMonth
  );
  return previousMonthIncomes.reduce(
    (total, income) => total + income.amount,
    0
  );
};
