import { Tool } from 'ollama'
import { simple_response_template } from '@/views/templates'
import { ACTIONS } from '@/utils/constants'

export const simpleSchema: Tool = {
  type: 'function',
  function: {
    name: ACTIONS.simple_response,
    description:
      'Retorna uma resposta simples para a consulta.  saludos, despedidas, etc.',
    parameters: {
      type: 'object',
      properties: {
        answer: {
          type: 'string',
          description: 'A resposta direta para a consulta.'
        }
      },
      required: ['answer']
    }
  }
}

export const simpleFunction = async (object: any) => {
  return await simple_response_template(object.answer)
}
