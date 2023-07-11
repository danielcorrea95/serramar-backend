import { AssembleScoreheetByGamesIdUseCase } from '@/UseCases/games/scoresheet/AssembleScoresheetByGameIdUseCase'
import { ConvertToPDFDocument } from '@/shared/providers/generatePDFDocument/implementations/ConvertToPDFDocument'
import { WordDocumentGenerator } from '@/shared/providers/generatePDFDocument/implementations/WordDocumentGenerator'

export function MakeAssembleScoresheetByGameIdUseCase() {
  const wordDocumentGenerator = new WordDocumentGenerator()
  const convertToPDFDocument = new ConvertToPDFDocument()
  const assembleScoreheetByGamesIdUseCase =
    new AssembleScoreheetByGamesIdUseCase(
      wordDocumentGenerator,
      convertToPDFDocument,
    )

  return assembleScoreheetByGamesIdUseCase
}
