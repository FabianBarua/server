import { tv_template } from '@/views/templates/tv_template'
import { Message } from '@/utils/types'
import { simple_response_template } from '@/views/templates'

async function sendTVCommand ({
  command
}: {
  command: string | undefined | null

}): Promise<Message> {

  if (!command) {
    return await simple_response_template('Não entendi o comando da TV')
  }

  return await tv_template({ tvCommand: command })
}

export { sendTVCommand }
