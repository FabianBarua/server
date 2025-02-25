import { BayesClassifier } from 'natural'

const weatherDocuments = [
  'qué tiempo hace en Madrid',
  'cómo está el clima en París',
  'cuál es la temperatura en Nueva York',
  'cómo va a estar el clima mañana',
  'dime el pronóstico del tiempo para hoy',
  'cómo está el tiempo en la playa',
  'cómo va a estar el clima este fin de semana',
  'qué clima se espera en Barcelona',
  'cómo está el clima en la ciudad de México',
  'pronóstico del tiempo para hoy',
  'cuál es la temperatura actual',
  'cómo va el clima hoy',
  'cómo va a estar el clima el próximo lunes'
]

const weatherClassifier = (classifier: BayesClassifier) => {
  weatherDocuments.forEach(doc => classifier.addDocument(doc, 'get_weather'))
}

export { weatherClassifier }
