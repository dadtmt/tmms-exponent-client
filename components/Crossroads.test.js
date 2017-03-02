import React from 'react'
import renderer from 'react-test-renderer'

import Crossroads from './Crossroads'

it('renders without crashing', () => {
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
    crossroads: { edges: [{
      node: {
        id: 'SOME_ID',
        choices: { edges: [] },
        testDices: { edges: [{
          node: {
            details: 'details',
            id: 'SOME_ID',
            made: false,
            master: false,
            modifier: 0,
            nbDices: 1,
            nbSides: 6,
            result: 6,
            text
          }
        }] },
        text
      }
    }] },
    makeChoice: jest.fn(),
    resolveTest: jest.fn()
  }
  expect(
    renderer.create(<Crossroads {...props} />).toJSON()
  ).toMatchSnapshot()
})
