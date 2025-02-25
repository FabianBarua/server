import { ACTIONS } from '@/utils/constants'
import { BayesClassifier } from 'natural'

const volumeDocuments = [
  'coloca o volume no máximo',
  'aumenta o volume',
  'deixa o som alto',
  'som no máximo',
  'volume máximo',
  'ative o som mais alto',
  'configure o volume alto',
  'deixa o som potente',
  'som elevado',
  'volume alto'
]

const volumeClassifier = (classifier: BayesClassifier) => {
  volumeDocuments.forEach(doc => classifier.addDocument(doc, ACTIONS.set_volume))
}

export { volumeClassifier }
