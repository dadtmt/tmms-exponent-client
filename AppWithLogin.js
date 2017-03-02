import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import App from './App'

const LOGIN_MUTATION = gql`
mutation LoginMutation($login: LoginUserWithAuth0Input!) {
  loginUserWithAuth0(input: $login) {
    user {
      id
      username
    }
  }
}
`

export default graphql(
  LOGIN_MUTATION,
  {
    props: ({ mutate }) => ({
      logUser: token => mutate({
        variables: {
          login: {
            idToken: token
          }
        }
      })
    })
  }
)(App)
