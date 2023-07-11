import fs from 'fs'
import Docxtemplater from 'docxtemplater'
import PizZip from 'pizzip'
import { DocumentGenerator } from '../DocumentGenerator'

export class WordDocumentGenerator implements DocumentGenerator {
  generate(data: object, outputFilePath: string): void {
    const templatePath = './assets/sumula.docx'
    // Load the docx file as binary content
    const content = fs.readFileSync(templatePath, 'binary')

    const zip = new PizZip(content)

    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    })

    doc.render(data)

    const buf = doc.getZip().generate({
      type: 'nodebuffer',
      compression: 'DEFLATE',
    })

    fs.writeFileSync(outputFilePath, buf)
  }
}
