import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export interface PdfExportOptions {
  fileName?: string;
  elementId?: string;
}

/**
 * Exports a DOM element containing Bangla text to a clean multi-page A4 PDF.
 * Uses html2canvas for native browser complex text shaping (conjuncts/diacritics),
 * then builds an A4 PDF document via jsPDF.
 */
export async function exportElementToA4Pdf(
  element: HTMLElement,
  fileName = 'MyLaws_Bangla_Draft.pdf'
): Promise<void> {
  // Wait for all fonts to finish loading so Bengali glyphs render with full ligature shaping
  if (typeof document !== 'undefined' && document.fonts) {
    await document.fonts.ready;
  }

  // A4 dimensions in pt: 595.28 x 841.89
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'pt',
    format: 'a4',
  });

  const pageWidth = 595.28;
  const pageHeight = 841.89;
  const margin = 40;
  const contentWidth = pageWidth - margin * 2;

  // Render canvas with scale 2 for crisp vector-like text rendering
  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    logging: false,
    backgroundColor: '#ffffff',
  });

  const imgData = canvas.toDataURL('image/jpeg', 0.95);
  const imgWidth = contentWidth;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  let heightLeft = imgHeight;
  let position = margin;
  let page = 1;

  // First page
  pdf.addImage(imgData, 'JPEG', margin, position, imgWidth, imgHeight);
  pdf.setFontSize(9);
  pdf.setTextColor(120, 120, 120);
  pdf.text(`পৃষ্ঠা ${page}`, pageWidth / 2, pageHeight - 20, { align: 'center' });
  heightLeft -= (pageHeight - margin * 2);

  // Subsequent pages if text exceeds one page
  while (heightLeft > 0) {
    position = heightLeft - imgHeight + margin;
    pdf.addPage('a4', 'portrait');
    page++;
    pdf.addImage(imgData, 'JPEG', margin, position, imgWidth, imgHeight);
    pdf.setFontSize(9);
    pdf.setTextColor(120, 120, 120);
    pdf.text(`পৃষ্ঠা ${page}`, pageWidth / 2, pageHeight - 20, { align: 'center' });
    heightLeft -= (pageHeight - margin * 2);
  }

  pdf.save(fileName);
}
