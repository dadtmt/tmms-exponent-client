import React, { PropTypes } from 'react'
import { View } from 'react-native'

import Choice from './Choice.js'

const Choices = ({ choices, makeChoice }) => <View>
  {
    choices.edges.map(({ node }) => <Choice
      key={node.id}
      {...node}
      makeChoice={makeChoice}
    />)
  }
</View>

Choices.propTypes = {
  choices: PropTypes.shape({
    edges: PropTypes.array.isRequired
  }).isRequired,
  makeChoice: PropTypes.func.isRequired
}

export default Choices
