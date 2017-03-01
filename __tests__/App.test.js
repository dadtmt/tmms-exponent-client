import React from 'react'
import renderer from 'react-test-renderer'

import App from '../App'

it('renders content', () => {
  expect(
    renderer.create(<App />).toJSON()
  ).toMatchSnapshot()
})
