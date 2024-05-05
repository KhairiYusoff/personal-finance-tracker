// app/lib/utils.ts
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
