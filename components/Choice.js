import React, { PropTypes } from 'react'
import { StyleSheet,TouchableOpacity, View } from 'react-native'
import RichTextDisplay from './RichTextDisplay'

const Choice = ({ id, made, makeChoice, text }) =>
<View style={made ? styles.madeChoice : styles.choice}>
  <TouchableOpacity onPress={() => makeChoice({id})}>
    <RichTextDisplay rawContent={text} />
  </TouchableOpacity>
</View>

Choice.propTypes = {
  id: PropTypes.string.isRequired,
  made: PropTypes.bool.isRequired,
  makeChoice: PropTypes.func.isRequired,
  text: PropTypes.object.isRequired
}

const styles = StyleSheet.create({
  choice: {
    backgroundColor: '#ccc',
    marginBottom: 10,
    padding: 5
  },
  madeChoice: {
    backgroundColor: '#0057e5',
    marginBottom: 10,
    padding: 5
  }
})


export default Choice
