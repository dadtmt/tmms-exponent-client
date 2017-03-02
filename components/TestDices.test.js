import React from 'react'
import renderer from 'react-test-renderer'

import TestDices from './TestDices'

it('renders without crashing', () => {
  const props = {
    testDices: { edges: [] },
    resolveTest: jest.fn()
  }
  expect(
    renderer.create(<TestDices {...props} />).toJSON()
  ).toMatchSnapshot()
})
