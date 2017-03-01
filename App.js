import Exponent from 'exponent'
import React, { Component } from 'react'
import {
  Button,
  Linking,
  StyleSheet,
  Text,
  View,
} from 'react-native'

import jwtDecoder from 'jwt-decode'

import { auth0CallbackUrl, auth0ClientId, auth0Domain } from './config'

let redirectUri
if (Exponent.Constants.manifest.xde) {
  redirectUri = auth0CallbackUrl
} else {
  redirectUri = `${Exponent.Constants.linkingUri}/redirect`
}

class App extends Component {

  state = {
    idToken: ''
  }

  componentDidMount() {
    Linking.addEventListener('url', this._handleAuth0Redirect)
  }

  _handleAuth0Redirect = async (event) => {
    if (!event.url.includes('+/redirect')) {
      return
    }
    Exponent.WebBrowser.dismissBrowser()
    const [, queryString] = event.url.split('#')
    const responseObj = queryString.split('&').reduce((map, pair) => {
      const [key, value] = pair.split('=')
      map[key] = value; // eslint-disable-line
      return map
    }, {})
    const encodedToken = responseObj.id_token
    const decodedToken = jwtDecoder(encodedToken)

    this.setState({
      idToken: encodedToken,
      decodedToken
    })
  }

  _toQueryString(params) {
    return '?' + Object.entries(params)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&')
  }

  _loginWithAuth0 = async () => {
    const redirectionURL = `https://${auth0Domain}/authorize` + this._toQueryString({
      client_id: auth0ClientId,
      response_type: 'token',
      scope: 'openid name',
      redirect_uri: redirectUri,
      state: redirectUri,
    })

    Exponent.WebBrowser.openBrowserAsync(redirectionURL)
  }

  render() {
    return (
        <View style={styles.container}>
          {
            this.state.idToken === ''
              ? <Button title='Login with Auth0' onPress={this._loginWithAuth0} />
            : <Text>Welcome {this.state.decodedToken.name}</Text>
          }
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default App
