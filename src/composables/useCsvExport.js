import { getPropertyAssociate } from "@/utils/index.js";

export function useCsvExport() {
  const exportCSV = (columns, data, filename = "data.csv") => {
    const csvData = [];
    const headers = columns.map((col) => col.label).join(",");
    csvData.push(headers);

    data.forEach((item) => {
      const row = columns
        .map((col) => getPropertyAssociate(item, col.field) || "-")
        .join(",");
      csvData.push(row);
    });

    const csvString = csvData.join("\n");
    const blob = new Blob([csvString], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return { exportCSV };
}
