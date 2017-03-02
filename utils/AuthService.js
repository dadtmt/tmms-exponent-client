import { AsyncStorage } from 'react-native'
import { EventEmitter } from 'events'

import { isTokenExpired } from './jwtHelper'

export default class AuthService extends EventEmitter {

  constructor() {
    super()
  }

  setToken(token) {
    this.idToken = token
    this.storeToken()
  }

  getToken() {
    return (this.idToken)
  }

  async storeToken() {
    await AsyncStorage.setItem('idToken', this.idToken)
  }

  async retrieveToken() {
    const token = await AsyncStorage.getItem('idToken')
    if (token) {
      if (!isTokenExpired(token)) {
        this.idToken = token
        this.emit('retrieveToken', this.idToken)
      }
    }
  }

  async logout() {
    this.idToken = null
    await AsyncStorage.setItem('idToken', null)
  }
}
