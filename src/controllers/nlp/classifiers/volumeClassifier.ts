import { ACTIONS } from '@/utils/constants'
import { BayesClassifier } from 'natural'

const volumeClassifier = (classifier: BayesClassifier) => {
  classifier.addDocument('coloca o volume no máximo', ACTIONS.set_volume)
  classifier.addDocument('aumenta o volume', ACTIONS.set_volume)
  classifier.addDocument('deixa o som alto', ACTIONS.set_volume)
  classifier.addDocument('som no máximo', ACTIONS.set_volume)
  classifier.addDocument('volume máximo', ACTIONS.set_volume)
  classifier.addDocument('ative o som mais alto', ACTIONS.set_volume)
  classifier.addDocument('configure o volume alto', ACTIONS.set_volume)
  classifier.addDocument('deixa o som potente', ACTIONS.set_volume)
  classifier.addDocument('som elevado', ACTIONS.set_volume)
  classifier.addDocument('volume alto', ACTIONS.set_volume)
}

export { volumeClassifier }
