import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'

const { REACT_APP_SUBGRAPH_URI, REACT_APP_BLOCKS_SUBGRAPH_URI, REACT_APP_GRAPH_NODE_HEALTH_URI } = process.env
console.log(process.env)

export const client = new ApolloClient({
  link: new HttpLink({
    uri: REACT_APP_SUBGRAPH_URI,
  }),
  cache: new InMemoryCache(),
  shouldBatch: true,
})

export const healthClient = new ApolloClient({
  link: new HttpLink({
    uri: REACT_APP_GRAPH_NODE_HEALTH_URI,
  }),
  cache: new InMemoryCache(),
  shouldBatch: true,
})

export const blockClient = new ApolloClient({
  link: new HttpLink({
    uri: REACT_APP_BLOCKS_SUBGRAPH_URI,
  }),
  cache: new InMemoryCache(),
})
