import { Request, Response } from "express";
import { fetchOllamaResponseStream } from "@/services/OllamaService";
import {
  error_template,
  llama_template,
  simple_response_template,
} from "@/views/templates";
import { extractVariables } from "@/utils/helpers";
import { Message as OllamaMessage } from "ollama";
import { availableFunctions } from "./tools";
import { ACTIONS, ROLES } from "@/utils/constants";
import { streamResponseInterface, userMessage } from "@/utils/types";
import { v4 as uuid } from "uuid";
import { jsonrepair } from "jsonrepair";

const handleToolCalls = async (
  toolCalls: streamResponseInterface,
  prompt: string,
  chatHistory: OllamaMessage[],
  res: Response,
  messageUUID: string,
  userMessage: userMessage
) => {

  if (!toolCalls.name)
    return error_template({ error: "No tool name provided" });

  try {
    const functionToCall =
    availableFunctions[toolCalls.name as keyof typeof availableFunctions];
    toolCalls.parameters.res = res;
    toolCalls.parameters.userPrompt = prompt;
    toolCalls.parameters.chatHistory = chatHistory;
    toolCalls.parameters.messageUUID = messageUUID;
    toolCalls.parameters.userMessage = userMessage;
    return await functionToCall(toolCalls.parameters);

  } catch (error) {
    console.error(`An error occurred while processing your request ${error}`);
  }

  return error_template({
    error: "An error occurred while processing your request",
  });

};

export const llama = async (req: Request, res: Response): Promise<any> => {

  const messageUUID = uuid();
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  try {
    const { chatHistory, error, prompt } = extractVariables(req);

    const userMessage = {
      id: uuid(),
      content: chatHistory[chatHistory.length - 1]?.content,
      type: ACTIONS.simple_response,
      role: ROLES.user,
    } as userMessage;

    if (error) {
      res.write(
        `data: ${JSON.stringify({
          message: error_template({ error }),
          userMessage,
          done: true
        })}\n\n`
      );
      
      return res.end();
    }

    if (!Array.isArray(chatHistory) || chatHistory.length === 0) {
      res.write(
        `data: ${JSON.stringify({
          message: error_template({ error: "Chat history is empty" }),
          userMessage,
          done: true
        })}\n\n`
      );

      return res.end();
    }

    const chatHistoryFormatted = chatHistory.map((message) => ({
      role: message?.role || ROLES.user,
      content:
        "answer" in message.content
          ? message.content.answer
          : JSON.stringify(message.content),
    }));

    let responseStream = await fetchOllamaResponseStream({
      chatHistory: chatHistoryFormatted,
    });

    let finalResponse = {
      id: uuid(),
      role: "",
      content: "",
    };

    for await (const chunk of responseStream) {
      finalResponse.role = chunk.message.role;
      finalResponse.content += chunk.message.content;
      finalResponse.content = finalResponse.content.replace(
        /\\u[\dA-Fa-f]{4}/g,
        (match) => String.fromCharCode(parseInt(match.replace("\\u", ""), 16))
      );

      try {
        const json = JSON.parse(
          jsonrepair(finalResponse.content)
        ) as streamResponseInterface;

        if (json.name === ACTIONS.simple_response && json?.parameters?.answer) {
          res.write(
            `data: ${JSON.stringify({
              message: await simple_response_template(
                json.parameters.answer,
                finalResponse.id
              ),
              userMessage,
              done: chunk.done
            })}\n\n`
          );
        }
      } catch (error) {
        continue;
      }
    }

    const response = JSON.parse(jsonrepair(finalResponse.content)) as streamResponseInterface;
    
    if (response.name === ACTIONS.simple_response) {
      return res.end() as any;
    }

    const toolResponse = await handleToolCalls(
      response,
      prompt,
      chatHistoryFormatted,
      res,
      messageUUID,
      userMessage
    );

    console.log("toolResponse", toolResponse);

    const responseTemplate = await llama_template({
      type: toolResponse.type,
      content: toolResponse.content,
      role: ROLES.assistant,
    });

    res.write(
      `data: ${JSON.stringify({ message: responseTemplate, userMessage, done: true })}\n\n`
    );

    res.end();

  } catch (error) {
    console.error(error);
    res.write(
      `data: ${JSON.stringify({
        message: error_template({
          error: "An error occurred while processing your request",
        }),
        userMessage: null,
        done: true,
      })}\n\n`
    );
    res.end();
  }
};