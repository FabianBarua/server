import { Message } from "@/utils/types"
import { v4 as uuidv4 } from 'uuid';

export const llama_template = async ({
  type,
  content,
  role
}: Omit<Message, 'id'>): Promise<Message> => {
  return {
    id: uuidv4(),
    type,
    content,
    role
  };
};