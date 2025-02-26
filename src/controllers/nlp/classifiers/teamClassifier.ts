import { BayesClassifier } from 'natural'
import { ACTIONS } from '@/utils/constants'

const teamDocuments = [
  'quando vai ser o próximo jogo ',
  'qual a próxima partida',
  'quando joga o',
  'quando vai jogar'
]

const TwoTeamsDocuments = [
  'quando vai ser o próximo jogo entre',
  'qual a próxima partida entre',
  'quando vai jogar o e o'
]

const teamClassifier = (classifier: BayesClassifier) => {
  teamDocuments.forEach(doc => classifier.addDocument(doc, ACTIONS.get_nearest_game_for_team))
  TwoTeamsDocuments.forEach(doc => classifier.addDocument(doc, ACTIONS.get_nearest_game_for_2_teams))
}

export { teamClassifier }
