import { ACTIONS } from '@/utils/constants'
import { BayesClassifier } from 'natural'

const tvDocuments = [
  'desliga o televisor',
  'desliga a televisão',
  'desliga a tv',
  'desliga a tv',
  'desliga a televisão'
]

const tvClassifier = (classifier: BayesClassifier) => {
  tvDocuments.forEach(doc => classifier.addDocument(doc, ACTIONS.send_comand_tv))
}

export { tvClassifier }
