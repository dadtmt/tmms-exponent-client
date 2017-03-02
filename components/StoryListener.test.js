import React from 'react'
import renderer from 'react-test-renderer'

import StoryListener, {
  getCrossroadIdFromProps,
  getCurrentCrossroadFromData
} from './StoryListener'

describe('getCurrentCrossroadFromData', () => {
  it('return current crossroad', () => {
    const node = {
      id: 'SOME_ID',
      isReady: true
    }
    const data = {
      getPageEditor: {
        crossroads: {
          edges: [ { node } ]
        }
      }
    }
    expect(getCurrentCrossroadFromData(data)).toEqual(node)
  })
  it('return a default not ready crossroad', () => {
    const defaultCrossroad = {
      isReady: false
    }
    const data = {
      getPageEditor: {
        crossroads: {
          edges: []
        }
      }
    }
    expect(getCurrentCrossroadFromData(data)).toEqual(defaultCrossroad)
  })
})

describe('getCrossroadIdFromProps', () => {
  it('should return crossroadId', () => {
    const props = {
      data: {
        getPageEditor: {
          crossroads: {
            edges: [
              {
                node: {
                  id: 'SOME_ID'
                }
              }
            ]
          }
        }
      }
    }
    expect(getCrossroadIdFromProps(props)).toBe('SOME_ID')
  })
  it('should return falsy when edges empty', () => {
    const props = {
      data: {
        getPageEditor: {
          crossroads: {
            edges: []
          }
        }
      }
    }
    expect(getCrossroadIdFromProps(props)).toBeFalsy()
  })
  it('should return falsy when no getPageEditor', () => {
    const props = {
      data: {}
    }
    expect(getCrossroadIdFromProps(props)).toBeFalsy()
  })
})

describe('StoryListener', () => {
  it('renders loading', () => {
    const props = {
      data: {
        loading: true
      },
      makeChoice: jest.fn(),
      resolveTest: jest.fn()
    }
    expect(
      renderer.create(<StoryListener {...props} />).toJSON()
    ).toMatchSnapshot()
  })

  it('renders current page', () => {
    const text = {
      blocks: [
        {
          data: {},
          depth: 0,
          entityRanges: [],
          inlineStyleRanges: [],
          key: '4bkmd',
          text: 'some rich text',
          type: 'unstyled'
        }
      ],
      entityMap: {}
    }
    const props = {
      data: {
        getPageEditor: {
          crossroads: {
            edges:[
              {
                node: {
                  choices: { edges: [] },
                  id: 'SOME_ID',
                  testDices: { edges: [] },
                  text
                }
              }
            ]
          }
        },
        loading: false
      },
      makeChoice: jest.fn(),
      resolveTest: jest.fn()
    }
    expect(
      renderer.create(<StoryListener {...props} />).toJSON()
    ).toMatchSnapshot()
  })

})
