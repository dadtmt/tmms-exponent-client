import React from 'react'
import renderer from 'react-test-renderer'

import TestDice from './TestDice'

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
    details: 'details',
    id: 'SOME_ID',
    made: false,
    master: false,
    modifier: 0,
    nbDices: 1,
    nbSides: 6,
    resolveTest: jest.fn(),
    result: 6,
    text
  }
  expect(
    renderer.create(<TestDice {...props} />).toJSON()
  ).toMatchSnapshot()
})

it('renders made true', () => {
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
    details: 'details',
    id: 'SOME_ID',
    made: true,
    master: false,
    modifier: 0,
    nbDices: 1,
    nbSides: 6,
    resolveTest: jest.fn(),
    result: 6,
    text
  }
  expect(
    renderer.create(<TestDice {...props} />).toJSON()
  ).toMatchSnapshot()
})
