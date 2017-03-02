import React from 'react'
import renderer from 'react-test-renderer'
import ApolloClient from 'apollo-client'
import { ApolloProvider } from 'react-apollo'

import StoryListenerWithData, {
  isActive,
  isChoiceMade,
  isReady
} from './StoryListenerWithData'

const client = new ApolloClient({
  networkInterface: {
    subscribe: jest.fn()
  }
})

describe('isChoiceMade', () => {
  it('return true if choice is made', () => {
    const data = {
      getPageEditor: {
        crossroads: {
          edges: [
            {
              node: {
                choices: { edges: [
                  {
                    node: {
                      made: true
                    }
                  },
                  {
                    node: {
                      made: false
                    }
                  }
                ] }
              }
            }
          ]
        }
      }
    }
    expect(isChoiceMade(data)).toBeTruthy()
  })
  it('return false if choice is not made', () => {
    const data = {
      getPageEditor: {
        crossroads: {
          edges: [
            {
              node: {
                choices: { edges: [
                  {
                    node: {
                      made: false
                    }
                  },
                  {
                    node: {
                      made: false
                    }
                  }
                ] }
              }
            }
          ]
        }
      }
    }
    expect(isChoiceMade(data)).toBeFalsy()
  })
  it('return false if no current crossroads', () => {
    const data = {
      getPageEditor: {
        crossroads: {
          edges: []
        }
      }
    }
    expect(isChoiceMade(data)).toBeFalsy()
  })
  it('return false if loading', () => {
    const data = {
      loading: true
    }
    expect(isChoiceMade(data)).toBeFalsy()
  })
})

describe('isReady', () => {
  it('return true if is ready', () => {
    const data = {
      getPageEditor: {
        crossroads: {
          edges: [{
            node: {
              isReady: true
            }
          }]
        }
      }
    }
    expect(isReady(data)).toBeTruthy()
  })
  it('return false if is not ready', () => {
    const data = {
      getPageEditor: {
        crossroads: {
          edges: [{
            node: {
              isReady: false
            }
          }]
        }
      }
    }
    expect(isReady(data)).toBeFalsy()
  })
})

describe('isActive', () => {
  it('return true if is ready', () => {
    const data = {
      getPageEditor: {
        crossroads: {
          edges: [{
            node: {
              isReady: true
            }
          }]
        }
      }
    }
    expect(isActive(data)).toBeTruthy()
  })
  it('return false if is not ready', () => {
    const data = {
      getPageEditor: {
        crossroads: {
          edges: [{
            node: {
              isReady: false
            }
          }]
        }
      }
    }
    expect(isActive(data)).toBeFalsy()
  })
  it('return false if ready and choice is made', () => {
    const data = {
      getPageEditor: {
        crossroads: {
          edges: [{
            node: {
              choices: { edges: [
                {
                  node: {
                    made: true
                  }
                },
                {
                  node: {
                    made: false
                  }
                }
              ] },
              isReady: true
            }
          }]
        }
      }
    }
    expect(isActive(data)).toBeFalsy()
  })
  it('return false if is not ready and choice is not made', () => {
    const data = {
      getPageEditor: {
        crossroads: {
          edges: [{
            node: {
              choices: { edges: [
                {
                  node: {
                    made: false
                  }
                },
                {
                  node: {
                    made: false
                  }
                }
              ] },
              isReady: false
            }
          }]
        }
      }
    }
    expect(isActive(data)).toBeFalsy()
  })
})

describe('StoryListenerWithData', () => {
  it('renders correctly', () => {
    expect(
      renderer.create(
        <ApolloProvider client={client}>
          <StoryListenerWithData />
        </ApolloProvider>
      ).toJSON()
    ).toMatchSnapshot()
  })
})
