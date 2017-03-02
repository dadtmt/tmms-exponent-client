import React, { PropTypes } from 'react'
import { StyleSheet, View } from 'react-native'

import Choices from './Choices'
import RichTextDisplay from './RichTextDisplay'
import TestDices from './TestDices'

const Crossroad = ({ text, choices, makeChoice, resolveTest, testDices }) =>
<View>
  <View style={styles.mainText} >
    <RichTextDisplay rawContent={text} />
  </View>
  <Choices choices={choices} makeChoice={makeChoice} />
  <TestDices testDices={testDices} resolveTest={resolveTest} />
</View>

Crossroad.propTypes = {
  choices: PropTypes.shape({
    edges: PropTypes.array.isRequired
  }).isRequired,
  makeChoice: PropTypes.func.isRequired,
  resolveTest: PropTypes.func.isRequired,
  testDices: PropTypes.shape({
    edges: PropTypes.array.isRequired
  }).isRequired,
  text: PropTypes.object.isRequired
}

const styles = StyleSheet.create({
  mainText: {
    marginBottom: 20
  }
})

export default Crossroad
