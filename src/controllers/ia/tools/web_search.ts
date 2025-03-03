import { fetchOllamaResponseStream } from '@/services/OllamaService'
import { SearchEngineResponse, SearchEngineStream } from '@/services/SearchEngine'
import { ACTIONS, ROLES } from '@/utils/constants'
import { Message, MovieSeriesSearchType } from '@/utils/types'
import { simple_response_template } from '@/views/templates'
import { web_search_template } from '@/views/templates/web_search_template'

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

  const { query, pages: pagesString, userPrompt, chatHistory, res, messageUUID, userMessage } = object
   
  console.log(`SEARCHING WEB ${query} ${pagesString}`)

  const pages = parseInt(pagesString) || 3

  if(!query) {
    return simple_response_template('Desculpe, não entendi o que você quer pesquisar')
  }
  
    const response : SearchEngineResponse[] = []

    for await (const result of SearchEngineStream({ query, pages })) {
      response.push(result)
      res.write(
        `data: ${JSON.stringify({
          message: await web_search_template(
            {
              id: messageUUID,
              answer: '',
              webs: response.map((result) => {
                return {
                  url: result.url,
                  title: result.title,
                  description: result.description
                }
              })
            }
          ),
          userMessage,
        })}\n\n`
      )
    }

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
      content: `Resultados:\n${JSON.stringify(response, null, 2)}`
    });

    const iaResponse = await fetchOllamaResponseStream({
        chatHistory,
        model: 'deepseek-r1:7b',
        useTools: false
    })

    let finalResponse = {
      id: messageUUID,
      role: "",
      content: "",
    };

    for await (const chunk of iaResponse) {
      finalResponse.role = chunk.message.role;
      finalResponse.content += chunk.message.content;
      finalResponse.content = finalResponse.content.replace(
        /\\u[\dA-Fa-f]{4}/g,
        (match) => String.fromCharCode(parseInt(match.replace("\\u", ""), 16))
      );
      try {
          res.write(
            `data: ${JSON.stringify({
              message: await web_search_template(
                {
                  id: messageUUID,
                  answer: finalResponse.content,
                  webs:  response.map((result) => (
                    {
                      url: result.url,
                      title: result.title,
                      description: result.description
                    }
                  ))
                }
              ),
              userMessage,
            })}\n\n`
          );
      } catch (error) {
        continue;
      }
    }

    return {
        type: ACTIONS.web_search,
        content: {
          answer: finalResponse.content,
          webs: response.map((result) => {
            return {
              url: result.url,
              title: result.title,
              description: result.description
            }
          })
        },
        role: ROLES.assistant
    }
}
