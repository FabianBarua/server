import natural from 'natural'
import path from 'path'
import fs from 'fs'

function loadClassifier (): natural.BayesClassifier | null {
  const classifierPath = path.join(__dirname, 'classifier.json')

  if (!fs.existsSync(classifierPath)) {
    console.error('El archivo del clasificador no existe')
    return null
  }

  let classifier: natural.BayesClassifier | null = null

  natural.BayesClassifier.load(
    classifierPath,
    null,
    function (err, loadedClassifier) {
      if (err) {
        console.error('Error al cargar el clasificador:', err)
      } else {
        classifier = loadedClassifier as natural.BayesClassifier
      }
    }
  )

  return classifier as unknown as natural.BayesClassifier
}

export { loadClassifier }
