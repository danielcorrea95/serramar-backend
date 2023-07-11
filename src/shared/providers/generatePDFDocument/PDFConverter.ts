export interface PDFConverter {
  convert(wordOutputPath: string, pdfOutputPath: string): void
}
