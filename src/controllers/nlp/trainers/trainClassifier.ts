import natural from 'natural'
import path from 'path'

import { initClassifiers } from '@/controllers/nlp/classifiers'

// Función para entrenar el clasificador
function trainIntentClassifier (): natural.BayesClassifier {
  const classifier = new natural.BayesClassifier()

  initClassifiers(classifier)

  // Entrenamos el clasificador
  classifier.train()

  // Guardamos el clasificador entrenado
  const classifierPath = path.join(__dirname, 'classifier.json')
  classifier.save(classifierPath, function (err) {
    if (err) {
      console.error('Error al guardar el clasificador:', err)
    }
  })

  return classifier
}

export { trainIntentClassifier }
