import { Message } from "@/utils/types"
import { v4 as uuidv4 } from 'uuid';

interface llamaResponseInterface extends Omit<Message, 'id'> {
  id?: string
}

export const llama_template = async ({
  type,
  content,
  role,
  id
}: llamaResponseInterface): Promise<Message> => {

  const uuid = id || uuidv4()

  return {
    id: uuid,
    type,
    content,
    role
  };
};