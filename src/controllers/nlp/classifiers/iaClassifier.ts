import { ACTIONS } from '@/utils/constants'
import { BayesClassifier } from 'natural'

const iaDocuments = [
  'o que significa',
  'o que e',
  'como funciona',
  'como você funciona',
  'como você foi feito'
]

const iaClassifier = (classifier: BayesClassifier) => {
  iaDocuments.forEach(doc => classifier.addDocument(doc, ACTIONS.ia_response))
}

export { iaClassifier }
