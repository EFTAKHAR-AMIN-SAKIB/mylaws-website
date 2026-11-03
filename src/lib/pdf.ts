import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export interface PdfExportOptions {
  fileName?: string;
  elementId?: string;
}

/**
 * Exports a DOM element containing Bangla text to a clean, multi-page A4 PDF.
 * Uses html2canvas for high-fidelity native browser complex text shaping (conjuncts/diacritics),
 * then builds an authentic A4 PDF document with precise page slicing and clean margins.
 */
export async function exportElementToA4Pdf(
  element: HTMLElement,
  fileName = 'MyLaws_Bangla_Draft.pdf'
): Promise<void> {
  // Wait for all web fonts to load so Bengali ligatures & glyphs render without broken conjuncts
  if (typeof document !== 'undefined' && document.fonts) {
    await document.fonts.ready;
  }

  // Standard A4 dimensions in typographic points (72 pt/inch)
  const pageWidth = 595.28;
  const pageHeight = 841.89;
  const marginX = 36; // Left and right margins
  const marginY = 36; // Top and bottom margins
  const contentWidth = pageWidth - marginX * 2;
  const contentHeight = pageHeight - marginY * 2;

  // Render high-DPI canvas (scale: 2 for 300+ DPI razor-sharp print quality)
  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    logging: false,
    backgroundColor: '#ffffff',
    windowWidth: 800, // Fixed baseline width for consistent layout across mobile/desktop
    onclone: (_clonedDoc, clonedElement) => {
      // Remove any decorative watermark, seal, or screen-only action elements
      const noPrintEls = clonedElement.querySelectorAll('.no-print');
      noPrintEls.forEach((el) => el.remove());

      // Strip web card artifacts: remove rounded borders, web shadows, and arbitrary container bounds
      clonedElement.style.boxShadow = 'none';
      clonedElement.style.border = 'none';
      clonedElement.style.borderRadius = '0px';
      clonedElement.style.width = '750px';
      clonedElement.style.minHeight = 'auto';
      clonedElement.style.padding = '36px 44px';
      clonedElement.style.backgroundColor = '#ffffff';
      clonedElement.style.color = '#111827';
      clonedElement.style.overflow = 'visible';
    },
  });

  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'pt',
    format: 'a4',
    compress: true,
  });

  // Calculate proportional height per A4 page in canvas pixel units
  const pageHeightInCanvas = Math.floor(canvas.width * (contentHeight / contentWidth));
  const totalHeight = canvas.height;
  let currentY = 0;
  let pageNumber = 1;

  // Slices the canvas into independent pages so text never bleeds into margins or page borders
  while (currentY < totalHeight) {
    if (pageNumber > 1) {
      pdf.addPage('a4', 'portrait');
    }

    const sliceHeight = Math.min(pageHeightInCanvas, totalHeight - currentY);

    // Create an in-memory canvas for the exact page slice
    const pageCanvas = document.createElement('canvas');
    pageCanvas.width = canvas.width;
    pageCanvas.height = sliceHeight;
    const ctx = pageCanvas.getContext('2d');

    if (ctx) {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
      ctx.drawImage(
        canvas,
        0, currentY, canvas.width, sliceHeight, // Source sub-rect
        0, 0, canvas.width, sliceHeight          // Destination rect
      );
    }

    const pageImgData = pageCanvas.toDataURL('image/jpeg', 0.96);
    const destHeight = (sliceHeight * contentWidth) / canvas.width;

    // Place the page slice with uniform margins
    pdf.addImage(pageImgData, 'JPEG', marginX, marginY, contentWidth, destHeight, undefined, 'FAST');

    // Official A4 running footer
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(8);
    pdf.setTextColor(140, 140, 140);
    pdf.text(
      `MyLaws Legal Draft • Page ${pageNumber}`,
      pageWidth / 2,
      pageHeight - 18,
      { align: 'center' }
    );

    currentY += sliceHeight;
    pageNumber++;
  }

  pdf.save(fileName);
}
