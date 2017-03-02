import React, { PropTypes } from 'react'
import { View } from 'react-native'

import TestDice from './TestDice.js'

const TestDices = ({ testDices, resolveTest }) => <View>
  {
    testDices.edges.map(({ node }) => <TestDice
      key={node.id}
      {...node}
      resolveTest={resolveTest}
    />)
  }
</View>

TestDices.propTypes = {
  testDices: PropTypes.shape({
    edges: PropTypes.array.isRequired
  }).isRequired,
  resolveTest: PropTypes.func.isRequired
}

export default TestDices
