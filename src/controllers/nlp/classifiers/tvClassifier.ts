import { ACTIONS } from '@/utils/constants'
import { BayesClassifier } from 'natural'

const tvClassifier = (classifier: BayesClassifier) => {
  classifier.addDocument('desliga o televisor', ACTIONS.send_comand_tv)
  classifier.addDocument('desliga a televisão', ACTIONS.send_comand_tv)
  classifier.addDocument('desliga a tv', ACTIONS.send_comand_tv)
  classifier.addDocument('desliga a tv', ACTIONS.send_comand_tv)
  classifier.addDocument('desliga a televisão', ACTIONS.send_comand_tv)
}

export { tvClassifier }
