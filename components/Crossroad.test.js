import React from 'react'
import renderer from 'react-test-renderer'

import Crossroad from './Crossroad'

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
    choices: { edges: [] },
    id: 'SOME_ID',
    makeChoice: jest.fn(),
    resolveTest: jest.fn(),
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
  expect(
    renderer.create(<Crossroad {...props} />).toJSON()
  ).toMatchSnapshot()
})
