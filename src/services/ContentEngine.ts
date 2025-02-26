import { MeiliSearch, SearchResponse } from 'meilisearch'

const client = new MeiliSearch({
  host: process.env.MEILISEARCH_HOST || 'http://localhost:7700',
  apiKey: process.env.MEILISEARCH_API_KEY || ''
})

const RESULTS_PER_PAGE = 10

interface SearchEngineProps {
  query: string
  page?: number
  index?: string
}

const indexesAvailable = ['movies']

export const ContentEngine = async ({
  query = '',
  page = 0,
  index = 'movies'
}: SearchEngineProps): Promise<SearchResponse> => {
  query = query.replace(/"/g, '')

  try {

    const searchQuery = query.toString()
    const searchPage = parseInt(page.toString() || '0')

    const indexSelected = indexesAvailable.includes(index) ? index : 'movies'

    const searchResponse = await client
      .index(indexSelected)
      .search(searchQuery, {
        limit: RESULTS_PER_PAGE,
        offset: searchPage * RESULTS_PER_PAGE
      })

    searchResponse.hits.sort((a, b) => {
      return (b._rankingScore || 0) - (a._rankingScore || 0)
    })

    return searchResponse
  } catch (error) {
    throw new Error('Error while searching')
  }
}
