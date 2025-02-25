import { BayesClassifier } from 'natural'

const timeClassifier = (classifier: BayesClassifier) => {
  classifier.addDocument('qué hora es', 'get_time_or_date')
  classifier.addDocument('cuál es la hora', 'get_time_or_date')
  classifier.addDocument('a qué hora estamos', 'get_time_or_date')
  classifier.addDocument('qué día es hoy', 'get_time_or_date')
  classifier.addDocument('cuál es la fecha de hoy', 'get_time_or_date')
  classifier.addDocument('me puedes decir la hora', 'get_time_or_date')
  classifier.addDocument('dime la hora exacta', 'get_time_or_date')
  classifier.addDocument('cuál es la hora ahora', 'get_time_or_date')
  classifier.addDocument('a qué hora estamos ahora', 'get_time_or_date')
  classifier.addDocument('cuál es el día de hoy', 'get_time_or_date')
  classifier.addDocument('hoy es', 'get_time_or_date')
  classifier.addDocument('me dices la hora', 'get_time_or_date')
  classifier.addDocument('me dices la fecha de hoy', 'get_time_or_date')
}
export { timeClassifier }
