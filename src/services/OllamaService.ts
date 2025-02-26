import { TOOL_SCHEMAS } from '@/controllers/ia/tools'
import ollama, { Message, Tool } from 'ollama'

interface OllamaResponseProps {
  chatHistory: Message[]
  useTools?: boolean
  customTools?: Tool[]
  model?: string
}

export const fetchOllamaResponse = async ({
  chatHistory,
  useTools = true,
  customTools = [],
  model = 'max'
}: OllamaResponseProps) => {

  const response = await ollama.chat({
    model,
    messages: chatHistory,
    options: {
      temperature: 0
    },
    tools: useTools ? (customTools.length > 0 ? customTools : 
      TOOL_SCHEMAS
    ) : []
  })

  return response
}

export const fetchOllamaResponseStream = async ({
  chatHistory,
  useTools = true,
  customTools = [],
  model = 'max'
}: OllamaResponseProps) => {

  const response = await ollama.chat({
    model,
    messages: chatHistory,
    options: {
      temperature: 0
    },
    tools: useTools ? (customTools.length > 0 ? customTools : 
      TOOL_SCHEMAS
    ) : [],
    stream: true
  })

  return response
}