import React from 'react'
import renderer from 'react-test-renderer'

import Choices from './Choices'

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
    choices: { edges: [{
      node: {
        id: 'CHOICE_ID',
        made: false,
        text
      }
    }] },
    makeChoice: jest.fn()
  }
  expect(
    renderer.create(<Choices {...props} />).toJSON()
  ).toMatchSnapshot()
})
