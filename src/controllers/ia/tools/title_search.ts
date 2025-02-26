import { ContentEngine } from '@/services/ContentEngine'
import { ACTIONS, ROLES } from '@/utils/constants'
import { MovieSeriesSearchType } from '@/utils/types'

export const contentSearchSchema: MovieSeriesSearchType = {
  type: 'function',
  function: {
    name: ACTIONS.search_content,
    description:
      'Use esta função para pesquisar todos os tipos de filmes e séries, você só precisa do título e 10 palavras-chave que descrevam o filme ou série que você procura',
    parameters: {
      type: 'object',
      properties: {
        title: {
          type: 'string',
          description: 'título do filme ou série que você procura'
        },
        tenKeywords: {
          type: 'string', // Puedes definirlo como string para que se pase un texto o array
          description:
            'Extraia 10 palavras-chave relevantes para o filme. Não inclua explicações, contexto ou perguntas. Exemplo para o filme "Cars (2006)": "corrida automóveis Lightning McQueen Mater Rayo velocidade Piston Cup amizade aventura". Responda apenas com palavras-chave relacionadas à trama, personagens e temas principais.'
        }
      },
      required: ['title', 'tenKeywords']
    }
  }
}

export const searchContent = async (object: any) => {
  const { title, tenKeywords, index, page } = object

  let keywordsString = ''
  let titleString = ''

  try {
    titleString = title.replace(/"/g, '')
  } catch (error) {
    titleString = title
  }

  try {
    keywordsString = JSON.parse(tenKeywords).join(' ')
  } catch (error) {
    keywordsString = tenKeywords
  }

  const response = await ContentEngine({
    query: `${titleString} ${keywordsString}`,
    index,
    page
  })

  return {
    type: ACTIONS.search_content,
    content: response,
    role: ROLES.assistant
  }
}
