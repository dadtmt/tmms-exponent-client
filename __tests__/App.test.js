import React from 'react'
import renderer from 'react-test-renderer'
import { EventEmitter } from 'events'

import App from '../App'

class fakeService extends EventEmitter {

}

const props = {
  auth: new fakeService(),
  logUser: jest.fn()
}

it('renders content', () => {
  expect(
    renderer.create(<App {...props} />).toJSON()
  ).toMatchSnapshot()
})
