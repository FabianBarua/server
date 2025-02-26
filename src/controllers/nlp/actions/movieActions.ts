// import { searchContent } from '@/core/tools/title_search'
// TODO: uncomment the following line

import { Message } from '@/utils/types'
import { simple_response_template } from '@/views/templates'

async function searchContentAction ({
  keywords = '',
  title = ''
}: {
  keywords: string
  title: string
}): Promise<Message> {

  console.log('searchContentAction', { keywords, title })
  
  return await simple_response_template('TODO')

  // TODO: return await searchContent({ title, tenKeywords: keywords })
}

export { searchContentAction }
