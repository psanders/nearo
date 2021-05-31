import algoliasearch from 'algoliasearch'

const ALGOLIA_ID = "KM5M04U5PS"
const ALGOLIA_SEARCH_KEY = "05d1cc503cf7ebc5e7d2433a15b77bf4"
const client = algoliasearch(ALGOLIA_ID, ALGOLIA_SEARCH_KEY)
const index = client.initIndex('posts')

export const doSearchAlgolia = (q, callback) => {
  index
    .search(q)
    .then(responses => callback(responses.hits, responses.nbHits))
}
