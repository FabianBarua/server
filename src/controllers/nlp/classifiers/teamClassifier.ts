import { BayesClassifier } from 'natural'
import { ACTIONS } from '@/utils/constants'

const teamDocuments = [
  'quando vai ser o próximo jogo ',
  'qual a próxima partida',
  'quando joga o',
  'quando vai jogar'
]

const teamClassifier = (classifier: BayesClassifier) => {
  teamDocuments.forEach(doc => classifier.addDocument(doc, ACTIONS.get_nearest_game_for_team))
}

export { teamClassifier }
