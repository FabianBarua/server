import { Request, Response } from 'express'
import { fetchOllamaResponse } from '@/services/OllamaService'
import {
  error_template,
  llama_template,
  simple_response_template
} from '@/views/templates'
import { extractVariables } from '@/utils/helpers'
import { Message as OllamaMessage } from 'ollama'
import { availableFunctions } from './tools'
import { ACTIONS, ROLES } from '@/utils/constants'
import { Message } from '@/utils/types'
import { v4 as uuid } from "uuid";

const handleToolCalls = async (
    toolCalls: any[] | null,
    prompt: string,
    chatHistory: OllamaMessage[]
  ) => {
    if (!toolCalls) return null;
  
    for (const tool of toolCalls) {
      const functionToCall =
        availableFunctions[tool.function.name as keyof typeof availableFunctions]
      try {
        tool.function.arguments.userPrompt = prompt
        tool.function.arguments.chatHistory = chatHistory
        return await functionToCall(tool.function.arguments)
      } catch {
        return error_template({ error: null })
      }
    }
    return null
  }

export const llama = async (req: Request, res: Response) => {
    
  try {
    
    const { chatHistory, error, prompt } = extractVariables(req)
    
    const userMessage = {
        id: uuid(),
        content: chatHistory[chatHistory.length - 1]?.content,
        type: ACTIONS.simple_response,
        role: ROLES.user,
      } as Message


    if (error) {
      return res.status(400).json(
        {
          message: error_template({ error }),
          userMessage
        }
      ) as any
    }


    if (!Array.isArray(chatHistory) || chatHistory.length === 0) {
      return res.status(400).json({
        message: error_template({ error: 'Chat history is empty' }),
        userMessage
      })
    }

    const chatHistoryFormatted = chatHistory.map((message) => {
      return {
        role: message?.role || ROLES.user,
        content: 'answer' in message.content ? message.content.answer : JSON.stringify(message.content)
      }
    })

    let response = await fetchOllamaResponse({ chatHistory:  chatHistoryFormatted })

    try {
      const parsedContent = JSON.parse(response.message.content)
      response.message.tool_calls = [
        {
          function: {
            name: parsedContent.name,
            arguments: parsedContent.parameters
          }
        }
      ]
      response.message.content = ''
    } catch (error) {}

    const toolResponse = response.message.tool_calls
    ? await handleToolCalls(
        response.message.tool_calls,
        prompt,
        chatHistoryFormatted
      )
    : null

    let simple = toolResponse ? toolResponse : await simple_response_template(response.message.content)
    
    const responseTemplate = await llama_template({
        type: simple.type,
        content: simple.content,
        role: ROLES.assistant
    })
    
    return res.json(
        {
            message: responseTemplate,
            userMessage
        }
    ) as any

  } catch (error) {
    console.error(error)
    res.status(500).json(
      {
        message:error_template({
            error: 'An error occurred while processing your request'
          }),
        userMessage: null
      }
    )
  }
}
