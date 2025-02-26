import { fetchOllamaResponse } from '@/services/OllamaService'
import { ACTIONS, ROLES } from '@/utils/constants'
import { MovieSeriesSearchType } from '@/utils/types'
import { paramsInterface } from '@/utils/types'

export const contentExtractor = async ({
  text
}: {
  text: string
}): Promise<paramsInterface> => {
  const chatHistory = [
    {
      role: ROLES.system,
      content:
        'Eres una IA que responde de forma breve y directa. No debes opinar a menos que se te pida explícitamente.'
    },
    {
      role: ROLES.assistant,
      content:
        'Entendido. Responderé de forma breve y directa según las instrucciones proporcionadas.'
    },
    {
      role: ROLES.user,
      content: `${text}`
    }
  ]

  const tool: MovieSeriesSearchType = {
    type: 'function',
    function: {
      name: ACTIONS.search_content,
      description:
        'Use esta função para pesquisar todos os tipos de filmes e series, voce so precisa do título e 10 palavras-chave que descrevam o filme ou série que você procura',
      parameters: {
        type: 'object',
        properties: {
          title: {
            type: 'string',
            description: 'título do filme ou série que você procura'
          },
          tenKeywords: {
            type: 'string',
            description:
              ' Extrae 10 keywords relevantes para la película . No incluyas explicaciones, contexto o preguntas. Ejemplo para la película "Cars (2006)": "racing automóviles Lightning McQueen Mater Rayo velocidad Piston Cup amistad aventura". Solo responde con palabras clave relacionadas con la trama, personajes y temas principales.'
          }
        },
        required: ['title', 'tenKeywords']
      }
    }
  }

  const object = await fetchOllamaResponse({
    chatHistory: chatHistory,
    useTools: true,
    customTools: [tool]
  })

  const title = object.message.content
    ? object.message.content
    : JSON.stringify(
        object.message.tool_calls?.[0]?.function.arguments.title
      ) ?? ''

  const keywords = object.message.content
    ? object.message.content
    : JSON.stringify(
        object.message.tool_calls?.[0]?.function.arguments.tenKeywords
      ) ?? ''

  return {
    title,
    keywords
  }
}
