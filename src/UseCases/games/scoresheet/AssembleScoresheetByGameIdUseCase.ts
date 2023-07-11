import { DocumentGenerator } from '@/shared/providers/generatePDFDocument/DocumentGenerator'
import { PDFConverter } from '@/shared/providers/generatePDFDocument/PDFConverter'

interface TechnicalCommitteeProps {
  id: string
  name: string
  document: string
  attachment: string
  technicalCommitteeType: string
}

interface PlayersProps {
  id: string
  name: string
  document: string
}

interface ResponseGameData {
  teamA: {
    id: string
    name: string
    technicalCommittee: TechnicalCommitteeProps[]
    players: PlayersProps[]
  }
  teamB: {
    id: string
    name: string
    technicalCommittee: TechnicalCommitteeProps[]
    players: PlayersProps[]
  }
}

export class AssembleScoreheetByGamesIdUseCase {
  constructor(
    private generateWordDocument: DocumentGenerator,
    private PDFConverter: PDFConverter,
  ) {}

  async execute(data: ResponseGameData) {
    const wordOutputPath = './assets/game/sumula.docx'
    const pdfOutputPath = './assets/game/sumula.pdf'
    let coachTeamA: Partial<TechnicalCommitteeProps> = {}
    let assistantCoachTeamA: Partial<TechnicalCommitteeProps> = {}
    let masseurTeamA: Partial<TechnicalCommitteeProps> = {}
    let personalTrainerTeamA: Partial<TechnicalCommitteeProps> = {}
    let doctorTeamA: Partial<TechnicalCommitteeProps> = {}
    let coachTeamB: Partial<TechnicalCommitteeProps> = {}
    let assistantCoachTeamB: Partial<TechnicalCommitteeProps> = {}
    let masseurTeamB: Partial<TechnicalCommitteeProps> = {}
    let personalTrainerTeamB: Partial<TechnicalCommitteeProps> = {}
    let doctorTeamB: Partial<TechnicalCommitteeProps> = {}

    data.teamA.technicalCommittee.forEach((item) => {
      if (item.technicalCommitteeType === 'Treinador') {
        coachTeamA = {
          id: item.id,
          name: item.name,
          document: item.document,
          attachment: item.attachment,
          technicalCommitteeType: item.technicalCommitteeType,
        }
      }
      if (item.technicalCommitteeType === 'Auxiliar Técnico') {
        assistantCoachTeamA = {
          id: item.id,
          name: item.name,
          document: item.document,
          attachment: item.attachment,
          technicalCommitteeType: item.technicalCommitteeType,
        }
      }

      if (item.technicalCommitteeType === 'Massagista') {
        masseurTeamA = {
          id: item.id,
          name: item.name,
          document: item.document,
          attachment: item.attachment,
          technicalCommitteeType: item.technicalCommitteeType,
        }
      }

      if (item.technicalCommitteeType === 'Preparador Físico') {
        personalTrainerTeamA = {
          id: item.id,
          name: item.name,
          document: item.document,
          attachment: item.attachment,
          technicalCommitteeType: item.technicalCommitteeType,
        }
      }

      if (item.technicalCommitteeType === 'Médico') {
        doctorTeamA = {
          id: item.id,
          name: item.name,
          document: item.document,
          attachment: item.attachment,
          technicalCommitteeType: item.technicalCommitteeType,
        }
      }
    })

    data.teamB.technicalCommittee.forEach((item) => {
      if (item.technicalCommitteeType === 'Treinador') {
        coachTeamB = {
          id: item.id,
          name: item.name,
          document: item.document,
          attachment: item.attachment,
          technicalCommitteeType: item.technicalCommitteeType,
        }
      }
      if (item.technicalCommitteeType === 'Auxiliar Técnico') {
        assistantCoachTeamB = {
          id: item.id,
          name: item.name,
          document: item.document,
          attachment: item.attachment,
          technicalCommitteeType: item.technicalCommitteeType,
        }
      }

      if (item.technicalCommitteeType === 'Massagista') {
        masseurTeamB = {
          id: item.id,
          name: item.name,
          document: item.document,
          attachment: item.attachment,
          technicalCommitteeType: item.technicalCommitteeType,
        }
      }

      if (item.technicalCommitteeType === 'Preparador Físico') {
        personalTrainerTeamB = {
          id: item.id,
          name: item.name,
          document: item.document,
          attachment: item.attachment,
          technicalCommitteeType: item.technicalCommitteeType,
        }
      }

      if (item.technicalCommitteeType === 'Médico') {
        doctorTeamB = {
          id: item.id,
          name: item.name,
          document: item.document,
          attachment: item.attachment,
          technicalCommitteeType: item.technicalCommitteeType,
        }
      }
    })

    const docData = {
      teamA: data.teamA.name || '',
      teamB: data.teamB.name || '',
      coachA: coachTeamA.name || '',
      coachDocA: coachTeamA.document || '',
      assistantCoachA: assistantCoachTeamA.name || '',
      assistantCoachDocA: assistantCoachTeamA.document || '',
      masseurA: masseurTeamA.name || '',
      masseurDocA: masseurTeamA.document || '',
      personalTrainerA: personalTrainerTeamA.name || '',
      personalTrainerDocA: personalTrainerTeamA.document || '',
      personalTrainerCREFA: personalTrainerTeamA.attachment || '',
      doctorA: doctorTeamA.name || '',
      doctorDocA: doctorTeamA.document || '',
      doctorCRMA: doctorTeamA.attachment || '',

      coachB: coachTeamB.name || '',
      coachDocB: coachTeamB.document || '',
      assistantCoachB: assistantCoachTeamB.name || '',
      assistantCoachDocB: assistantCoachTeamB.document || '',
      masseurB: masseurTeamB.name || '',
      masseurDocB: masseurTeamB.document || '',
      personalTrainerB: personalTrainerTeamB.name || '',
      personalTrainerDocB: personalTrainerTeamB.document || '',
      personalTrainerCREFB: personalTrainerTeamB.attachment || '',
      doctorB: doctorTeamB.name || '',
      doctorDocB: doctorTeamB.document || '',
      doctorCRMB: doctorTeamB.attachment || '',

      namePlayerA1: data.teamA.players[0] ? data.teamA.players[0].name : '',
      docTeamA1: data.teamA.players[0] ? data.teamA.players[0].document : '',
      namePlayerA2: data.teamA.players[1] ? data.teamA.players[1].name : '',
      docTeamA2: data.teamA.players[1] ? data.teamA.players[1].document : '',
      namePlayerA3: data.teamA.players[2] ? data.teamA.players[2].name : '',
      docTeamA3: data.teamA.players[2] ? data.teamA.players[2].document : '',
      namePlayerA4: data.teamA.players[3] ? data.teamA.players[3].name : '',
      docTeamA4: data.teamA.players[3] ? data.teamA.players[3].document : '',
      namePlayerA5: data.teamA.players[4] ? data.teamA.players[4].name : '',
      docTeamA5: data.teamA.players[4] ? data.teamA.players[4].document : '',
      namePlayerA6: data.teamA.players[5] ? data.teamA.players[5].name : '',
      docTeamA6: data.teamA.players[5] ? data.teamA.players[5].document : '',
      namePlayerA7: data.teamA.players[6] ? data.teamA.players[6].name : '',
      docTeamA7: data.teamA.players[6] ? data.teamA.players[6].document : '',
      namePlayerA8: data.teamA.players[7] ? data.teamA.players[7].name : '',
      docTeamA8: data.teamA.players[7] ? data.teamA.players[7].document : '',
      namePlayerA9: data.teamA.players[8] ? data.teamA.players[8].name : '',
      docTeamA9: data.teamA.players[8] ? data.teamA.players[8].document : '',
      namePlayerA10: data.teamA.players[9] ? data.teamA.players[9].name : '',
      docTeamA10: data.teamA.players[9] ? data.teamA.players[9].document : '',
      namePlayerA11: data.teamA.players[10] ? data.teamA.players[10].name : '',
      docTeamA11: data.teamA.players[10] ? data.teamA.players[10].document : '',
      namePlayerA12: data.teamA.players[11] ? data.teamA.players[11].name : '',
      docTeamA12: data.teamA.players[11] ? data.teamA.players[11].document : '',
      namePlayerA13: data.teamA.players[12] ? data.teamA.players[12].name : '',
      docTeamA13: data.teamA.players[12] ? data.teamA.players[12].document : '',
      namePlayerA14: data.teamA.players[13] ? data.teamA.players[13].name : '',
      docTeamA14: data.teamA.players[13] ? data.teamA.players[13].document : '',
      namePlayerA15: data.teamA.players[14] ? data.teamA.players[14].name : '',
      docTeamA15: data.teamA.players[14] ? data.teamA.players[14].document : '',
      namePlayerA16: data.teamA.players[15] ? data.teamA.players[15].name : '',
      docTeamA16: data.teamA.players[15] ? data.teamA.players[15].document : '',
      namePlayerA17: data.teamA.players[16] ? data.teamA.players[16].name : '',
      docTeamA17: data.teamA.players[16] ? data.teamA.players[16].document : '',
      namePlayerA18: data.teamA.players[17] ? data.teamA.players[17].name : '',
      docTeamA18: data.teamA.players[17] ? data.teamA.players[17].document : '',
      namePlayerA19: data.teamA.players[18] ? data.teamA.players[18].name : '',
      docTeamA19: data.teamA.players[18] ? data.teamA.players[18].document : '',
      namePlayerA20: data.teamA.players[19] ? data.teamA.players[19].name : '',
      docTeamA20: data.teamA.players[19] ? data.teamA.players[19].document : '',

      namePlayerB1: data.teamB.players[0] ? data.teamB.players[0].name : '',
      docTeamB1: data.teamB.players[0] ? data.teamB.players[0].document : '',
      namePlayerB2: data.teamB.players[1] ? data.teamB.players[1].name : '',
      docTeamB2: data.teamB.players[1] ? data.teamB.players[1].document : '',
      namePlayerB3: data.teamB.players[2] ? data.teamB.players[2].name : '',
      docTeamB3: data.teamB.players[2] ? data.teamB.players[2].document : '',
      namePlayerB4: data.teamB.players[3] ? data.teamB.players[3].name : '',
      docTeamB4: data.teamB.players[3] ? data.teamB.players[3].document : '',
      namePlayerB5: data.teamB.players[4] ? data.teamB.players[4].name : '',
      docTeamB5: data.teamB.players[4] ? data.teamB.players[4].document : '',
      namePlayerB6: data.teamB.players[5] ? data.teamB.players[5].name : '',
      docTeamB6: data.teamB.players[5] ? data.teamB.players[5].document : '',
      namePlayerB7: data.teamB.players[6] ? data.teamB.players[6].name : '',
      docTeamB7: data.teamB.players[6] ? data.teamB.players[6].document : '',
      namePlayerB8: data.teamB.players[7] ? data.teamB.players[7].name : '',
      docTeamB8: data.teamB.players[7] ? data.teamB.players[7].document : '',
      namePlayerB9: data.teamB.players[8] ? data.teamB.players[8].name : '',
      docTeamB9: data.teamB.players[8] ? data.teamB.players[8].document : '',
      namePlayerB10: data.teamB.players[9] ? data.teamB.players[9].name : '',
      docTeamB10: data.teamB.players[9] ? data.teamB.players[9].document : '',
      namePlayerB11: data.teamB.players[10] ? data.teamB.players[10].name : '',
      docTeamB11: data.teamB.players[10] ? data.teamB.players[10].document : '',
      namePlayerB12: data.teamB.players[11] ? data.teamB.players[11].name : '',
      docTeamB12: data.teamB.players[11] ? data.teamB.players[11].document : '',
      namePlayerB13: data.teamB.players[12] ? data.teamB.players[12].name : '',
      docTeamB13: data.teamB.players[12] ? data.teamB.players[12].document : '',
      namePlayerB14: data.teamB.players[13] ? data.teamB.players[13].name : '',
      docTeamB14: data.teamB.players[13] ? data.teamB.players[13].document : '',
      namePlayerB15: data.teamB.players[14] ? data.teamB.players[14].name : '',
      docTeamB15: data.teamB.players[14] ? data.teamB.players[14].document : '',
      namePlayerB16: data.teamB.players[15] ? data.teamB.players[15].name : '',
      docTeamB16: data.teamB.players[15] ? data.teamB.players[15].document : '',
      namePlayerB17: data.teamB.players[16] ? data.teamB.players[16].name : '',
      docTeamB17: data.teamB.players[16] ? data.teamB.players[16].document : '',
      namePlayerB18: data.teamB.players[17] ? data.teamB.players[17].name : '',
      docTeamB18: data.teamB.players[17] ? data.teamB.players[17].document : '',
      namePlayerB19: data.teamB.players[18] ? data.teamB.players[18].name : '',
      docTeamB19: data.teamB.players[18] ? data.teamB.players[18].document : '',
      namePlayerB20: data.teamB.players[19] ? data.teamB.players[19].name : '',
      docTeamB20: data.teamB.players[19] ? data.teamB.players[19].document : '',
    }

    this.generateWordDocument.generate(docData, wordOutputPath)

    this.PDFConverter.convert(wordOutputPath, pdfOutputPath)
  }
}
