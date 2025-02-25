import { ACTIONS } from '@/utils/constants'
import { BayesClassifier } from 'natural'

const contentDocuments = [
  'quero assistir o filme',
  'quero ver o filme',
  'coloca o filme '
]

const contentClassifier = (classifier: BayesClassifier) => {
  contentDocuments.forEach(doc => classifier.addDocument(doc, ACTIONS.search_content))
}

export { contentClassifier }
