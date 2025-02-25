import { BayesClassifier } from 'natural'

const timeDocuments = [
  'qué hora es',
  'cuál es la hora',
  'a qué hora estamos',
  'qué día es hoy',
  'cuál es la fecha de hoy',
  'me puedes decir la hora',
  'dime la hora exacta',
  'cuál es la hora ahora',
  'a qué hora estamos ahora',
  'cuál es el día de hoy',
  'hoy es',
  'me dices la hora',
  'me dices la fecha de hoy'
]

const timeClassifier = (classifier: BayesClassifier) => {
  timeDocuments.forEach(doc => classifier.addDocument(doc, 'get_time_or_date'))
}

export { timeClassifier }
