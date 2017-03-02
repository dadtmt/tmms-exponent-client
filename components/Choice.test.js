import React from 'react'
import renderer from 'react-test-renderer'

import Choice from './Choice'

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
    id: 'SOME_ID',
    made: false,
    makeChoice: jest.fn(),
    text
  }
  expect(
    renderer.create(<Choice {...props} />).toJSON()
  ).toMatchSnapshot()
})
