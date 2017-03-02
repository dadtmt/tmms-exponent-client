import React, { PropTypes } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import RichTextDisplay from './RichTextDisplay'

const styleTestDice = (made, master) => {
  if (master) {
    return styles.master
  }
  if (made) {
    return styles.resolvedTestDice
  }

  return styles.TestDice
}

const TestDice = ({
  details,
  id,
  made,
  master,
  modifier,
  nbDices,
  nbSides,
  resolveTest,
  result,
  text
}) =>
<View style={styleTestDice(made, master)}>
  <TouchableOpacity onPress={() => { if(!master) { resolveTest({
    id
  })}}}>
    <RichTextDisplay rawContent={text} />
      <Text>Lancer les dés: {`${nbDices}D${nbSides}+${modifier}`}</Text>
      {
        (made || master) &&
          <View>
            <Text>Résultat: {result}</Text>
            <Text>Détails: {details}</Text>
          </View>
      }
  </TouchableOpacity>
</View>

TestDice.propTypes = {
  details: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  made: PropTypes.bool.isRequired,
  master: PropTypes.bool.isRequired,
  modifier: PropTypes.number.isRequired,
  nbDices: PropTypes.number.isRequired,
  nbSides: PropTypes.number.isRequired,
  resolveTest: PropTypes.func.isRequired,
  result: PropTypes.number.isRequired,
  text: PropTypes.object.isRequired
}

const styles = StyleSheet.create({
  TestDice: {
    backgroundColor: '#ccc',
    marginBottom: 10,
    padding: 5
  },
  master: {
    backgroundColor: '#f49242'
  },
  resolvedTestDice: {
    backgroundColor: '#0057e5',
    marginBottom: 10,
    padding: 5
  }
})


export default TestDice
