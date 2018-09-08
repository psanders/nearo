import algoliasearch from 'algoliasearch';

const ALGOLIA_ID = "IVUNNPL7J8";
const ALGOLIA_SEARCH_KEY = "c7a59a9ddbe2354bf0d9a1cdfc7f5fe3";

const client = algoliasearch(ALGOLIA_ID, ALGOLIA_SEARCH_KEY);
const index = client.initIndex('posts');

export const doSearchAlgolia = (q, callback) => {

  console.log('Search for', q);

  index
    .search(q)
    .then(function(responses) {
      console.log(responses);
      callback(responses.hits, responses.nbHits);
    });
}
