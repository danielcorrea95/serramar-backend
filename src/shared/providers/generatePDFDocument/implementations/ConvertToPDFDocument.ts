import PDFDocument from 'pdfkit'
import fs from 'fs'
import { PDFConverter } from '../PDFConverter'

export class ConvertToPDFDocument implements PDFConverter {
  convert(inputDocxPath: string, outputPdfPath: string): void {
    const content = fs.readFileSync(inputDocxPath, 'utf-8')
    const pdfDoc = new PDFDocument()

    const writeStream = fs.createWriteStream(outputPdfPath)

    pdfDoc.on('end', () => {
      console.log('Documento PDF gerado com sucesso!')
    })

    pdfDoc.pipe(writeStream)
    pdfDoc.text(content)
    pdfDoc.end()
  }
}
