import { BayesClassifier } from 'natural'
import { ACTIONS } from '@/utils/constants'

const teamClassifier = (classifier: BayesClassifier) => {
  classifier.addDocument(
    'quando vai ser o próximo jogo ',
    ACTIONS.get_nearest_game_for_team
  )
  classifier.addDocument(
    'qual a próxima partida',
    ACTIONS.get_nearest_game_for_team
  )
  classifier.addDocument('quando joga o', ACTIONS.get_nearest_game_for_team)
  classifier.addDocument('quando vai jogar', ACTIONS.get_nearest_game_for_team)
}

export { teamClassifier }
