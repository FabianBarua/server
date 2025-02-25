import { BayesClassifier } from 'natural'
import { contentClassifier } from '@/controllers/nlp/classifiers/contentClassifier'
import { timeClassifier } from '@/controllers/nlp/classifiers/timeClassifier'
import { weatherClassifier } from '@/controllers/nlp/classifiers/weatherClassifier'
import { volumeClassifier } from '@/controllers/nlp/classifiers/volumeClassifier'
import { tvClassifier } from '@/controllers/nlp/classifiers/tvClassifier'
import { teamClassifier } from '@/controllers/nlp/classifiers/teamClassifier'
import { iaClassifier } from '@/controllers/nlp/classifiers/iaClassifier'

export const initClassifiers = (classifier: BayesClassifier) => {
  // Entrenamos el clasificador con las diferentes intenciones
  contentClassifier(classifier)
  timeClassifier(classifier)
  weatherClassifier(classifier)
  volumeClassifier(classifier)
  tvClassifier(classifier)
  teamClassifier(classifier)
  iaClassifier(classifier)
}
