import { fetchOllamaResponse } from '@/services/OllamaService'
import { SearchEngine } from '@/services/SearchEngine'
import { ACTIONS, ROLES } from '@/utils/constants'
import { Message, MovieSeriesSearchType } from '@/utils/types'
import { simple_response_template } from '@/views/templates'
import fs from 'fs'

export const webSearchSchema: MovieSeriesSearchType = {
  type: 'function',
  function: {
    name: ACTIONS.web_search,
    description:
      'Use esta função para pesquisar qualquer coisa que precise na web no tempo presente ou passado, procurar hora, horário, data, etc.',
    parameters: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: 'A query to search in the web in the prompt language', 
        },
        pages: {
          type: 'number',
          description: 'The number of pages to search for the query, max 5',
        }
      },
      required: ['query', 'pages']
    }
  }
}

type MessageWithoutID = Omit<Message, 'id'>

export const webSearch = async (object: any) : Promise<MessageWithoutID> => {

  console.log('SEARCHING WEB')

  const { query, pages: pagesString, userPrompt, chatHistory } = object
   
  const pages = parseInt(pagesString) || 3

  if(!query) {
    return simple_response_template('Desculpe, não entendi o que você quer pesquisar')
  }

  const response = await SearchEngine({ query, pages })

  fs.writeFileSync('search_results.txt', response)
  

  chatHistory.push({
    role: ROLES.system,
    content: `Responda a pergunta: ${userPrompt}`
  });
  
  chatHistory.push({
    role: ROLES.system,
    content: `Pesquisando por: ${query}`
  });
  
  chatHistory.push({
    role: ROLES.system,
    content: `Resultados:\n${response}`
  });
  
  
    const iaResponse = await fetchOllamaResponse({
        chatHistory,
        model: 'deepseek-r1:7b',
        useTools: false
    })


    return {
        type: ACTIONS.search_content,
        content: {answer: iaResponse.message.content},
        role: ROLES.assistant
    }
}
