import { BayesClassifier } from 'natural'

const weatherClassifier = (classifier: BayesClassifier) => {
  classifier.addDocument('qué tiempo hace en Madrid', 'get_weather')
  classifier.addDocument('cómo está el clima en París', 'get_weather')
  classifier.addDocument('cuál es la temperatura en Nueva York', 'get_weather')
  classifier.addDocument('cómo va a estar el clima mañana', 'get_weather')
  classifier.addDocument(
    'dime el pronóstico del tiempo para hoy',
    'get_weather'
  )
  classifier.addDocument('cómo está el tiempo en la playa', 'get_weather')
  classifier.addDocument(
    'cómo va a estar el clima este fin de semana',
    'get_weather'
  )
  classifier.addDocument('qué clima se espera en Barcelona', 'get_weather')
  classifier.addDocument(
    'cómo está el clima en la ciudad de México',
    'get_weather'
  )
  classifier.addDocument('pronóstico del tiempo para hoy', 'get_weather')
  classifier.addDocument('cuál es la temperatura actual', 'get_weather')
  classifier.addDocument('cómo va el clima hoy', 'get_weather')
  classifier.addDocument(
    'cómo va a estar el clima el próximo lunes',
    'get_weather'
  )
}

export { weatherClassifier }
