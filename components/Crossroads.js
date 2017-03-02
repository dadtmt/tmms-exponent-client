import React, { PropTypes } from 'react'
import { View } from 'react-native'

import Crossroad from './Crossroad.js'

const Crossroads = ({ crossroads, makeChoice, resolveTest }) => <View>
  {
    crossroads.edges.map(({ node }) => <Crossroad
      key={node.id}
      {...node}
      makeChoice={makeChoice}
      resolveTest={resolveTest}
    />)
  }
</View>

Crossroads.propTypes = {
  crossroads: PropTypes.shape({
    edges: PropTypes.array.isRequired
  }).isRequired,
  makeChoice: PropTypes.func.isRequired,
  resolveTest: PropTypes.func.isRequired
}

export default Crossroads
