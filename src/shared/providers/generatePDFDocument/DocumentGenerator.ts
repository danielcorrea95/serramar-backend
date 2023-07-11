export interface DocumentGenerator {
  generate(data: object, outputFilePath: string): void
}
