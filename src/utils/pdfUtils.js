import { jsPDF } from "jspdf";

export const generateOrderPdf = async (order) => {
  const doc = new jsPDF({ unit: "mm", format: [57, 100] });
  const yGap = 5;

  // Load custom font (TTF format)
  try {
    const fontResponse = await fetch("/fonts/SplineSans.ttf");
    const fontArrayBuffer = await fontResponse.arrayBuffer();
    const fontBase64 = btoa(
      new Uint8Array(fontArrayBuffer).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        ""
      )
    );
    doc.addFileToVFS("SplineSans.ttf", fontBase64);
    doc.addFont("SplineSans.ttf", "SplineSans", "normal");
    doc.setFont("SplineSans");
  } catch (error) {
    console.error("Failed to load custom font, using default font:", error);
  }

  // Add title
  doc.setFontSize(10);
  doc.text("Order Receipt", 15, 20);

  // Add order details
  doc.setFontSize(6);
  let yPos = 30;

  doc.text(`Order Code: ${order.orderCode || "Unknown"}`, 5, yPos);
  yPos += yGap;

  doc.text(`Chef: ${order.order?.chefName || "Unknown Chef"}`, 5, yPos);
  yPos += yGap;

  doc.text(
    `Menu Item: ${order.order?.menuItemName || "Unknown Item"}`,
    5,
    yPos,
  );
  yPos += yGap;

  doc.text(`Drink: ${order.order?.drinkName || "None"}`, 5, yPos);
  yPos += yGap;

  doc.text(`Snack: ${order.order?.snackName || "None"}`, 5, yPos);
  yPos += yGap;

  // Add parameters if any
  if (order.order?.parameters && order.order.parameters.length > 0) {
    yPos += 5;
    doc.text("Parameters:", 5, yPos);
    yPos += yGap;

    order.order.parameters.forEach((param) => {
      doc.text(`${param.name}: ${param.value}`, 8, yPos);
      yPos += yGap;
    });
  }

  // Add date
  yPos += yGap;
  doc.text(
    `Created: ${order.createdAt ? new Date(order.createdAt).toLocaleString() : "Unknown"}`,
    5,
    yPos,
  );

  return doc;
};

export const openPdfInNewTab = (doc) => {
  const pdfBlob = doc.output("blob");
  const pdfUrl = URL.createObjectURL(pdfBlob);
  window.open(pdfUrl, "_blank");
};