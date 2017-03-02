import React from 'react'
import { ApolloProvider } from 'react-apollo'

import makeApolloClient from './makeApolloClient'
import AppWithLogin from './AppWithLogin'
import AuthService from './utils/AuthService'

const auth = new AuthService()
const client = makeApolloClient(auth)
auth.retrieveToken()

const AppWithProvider = () => <ApolloProvider client={client}>
  <AppWithLogin auth={auth} />
</ApolloProvider>

export default AppWithProvider
