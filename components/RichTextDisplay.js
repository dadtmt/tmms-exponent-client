import React, { PropTypes } from 'react'
import { Text, View } from 'react-native'
import redraft from 'redraft'

let inlineKey = 0

const renderers = {
  blocks: {
    unstyled: (children) => children.map(
      (child, index) => <Text style={styles.unstyled} key={index} >{child}</Text>
    ),
    'header-one': (children) => children.map(
      (child, index) => <Text style={styles.h1} key={index} >{child}</Text>
    ),
    'header-two': (children) => children.map(
      (child, index) => <Text style={styles.h2} key={index} >{child}</Text>
    ),
    'unordered-list-item': (children) => children.map(
      (child, index) => <View style={{flexDirection: 'row'}} key={index} >
        <Text>{'\u2022'}</Text>
        <Text style={{flex: 1, paddingLeft: 5}}>{child}</Text>
      </View>
    )
  },
  inline: {
    BOLD: (children) => <Text style={styles.bold} key={inlineKey++} >{children}</Text>,
    ITALIC: (children) => <Text style={styles.italic} key={inlineKey++} >{children}</Text>,
    UNDERLINE: (children) => <Text style={styles.underline} key={inlineKey++} >{children}</Text>
  },
}

const RichTextDisplay = ({ rawContent }) => <View>
  {redraft(rawContent, renderers)}
</View>

RichTextDisplay.propTypes = {
  rawContent: PropTypes.object.isRequired
}

const styles = {
  bold: {
    fontWeight: 'bold'
  },
  h1: {
    fontSize: 40
  },
  h2: {
    fontSize: 25
  },
  italic: {
    fontStyle: 'italic'
  },
  underline: {
    textDecorationLine: 'underline'
  },
  unstyled: {
    fontSize: 15
  }
}

export default RichTextDisplay
