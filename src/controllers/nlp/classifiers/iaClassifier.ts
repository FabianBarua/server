import { ACTIONS } from '@/utils/constants'
import { BayesClassifier } from 'natural'

const iaClassifier = (classifier: BayesClassifier) => {
  classifier.addDocument('o que significa', ACTIONS.ia_response)
  classifier.addDocument('o que e', ACTIONS.ia_response)
  classifier.addDocument('como funciona', ACTIONS.ia_response)
  classifier.addDocument('como você funciona', ACTIONS.ia_response)
  classifier.addDocument('como você foi feito', ACTIONS.ia_response)
}

export { iaClassifier }
