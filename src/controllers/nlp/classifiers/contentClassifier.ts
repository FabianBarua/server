import { ACTIONS } from '@/utils/constants'
import { BayesClassifier } from 'natural'

const contentClassifier = (classifier: BayesClassifier) => {
  // ----------- SEARCH CONTENT -----------

  classifier.addDocument('quero assistir o filme', ACTIONS.search_content)
  classifier.addDocument('quero ver o filme', ACTIONS.search_content)
  classifier.addDocument('coloca o filme ', ACTIONS.search_content)
}

export { contentClassifier }
