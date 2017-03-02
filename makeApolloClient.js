import addGraphQLSubscriptions from './addGraphQLSubscriptions'
import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { SubscriptionClient } from 'subscriptions-transport-ws'

import { scapholdUrl } from './config'

// creates a subscription ready Apollo Client instance
export default function makeApolloClient(auth) {
  const graphqlUrl = `https://${scapholdUrl}`
  const websocketUrl = `wss://${scapholdUrl}`
  const networkInterface = createNetworkInterface({ uri: graphqlUrl })
  networkInterface.use([{
    applyMiddleware(req, next) {
      if (!req.options.headers) {
        req.options.headers = {}
      }
      req.options.headers.authorization =
        auth.getToken()
          ? `Bearer ${auth.getToken()}` : null
      next()
    }
  }])
  const wsClient = new SubscriptionClient(websocketUrl)
  const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(networkInterface, wsClient)

  const clientGraphql = new ApolloClient({
    addTypename: true,
    dataIdFromObject: o => o.id,
    networkInterface: networkInterfaceWithSubscriptions,
    initialState: {},
  })
  return clientGraphql
}
