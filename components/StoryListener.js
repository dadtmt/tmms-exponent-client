import R from 'ramda'
import React, { Component, PropTypes } from 'react'
import { Text, View } from 'react-native'
import gql from 'graphql-tag'

import { pageEditorId } from '../config'
import Crossroads from './Crossroads'

const subscribeToCreateCrossroad = gql`
subscription SubscribeToCreateCrossroad($crossroadFilter:CrossroadSubscriptionFilter) {
  subscribeToCrossroad(mutations: [createCrossroad], filter:$crossroadFilter) {
    mutation
    edge {
      node {
        id
        isReady
        choices {
          edges {
            node {
              id
              text
              made
            }
          }
        }
        testDices{
          edges{
            node{
              id
              details
              nbDices
              nbSides
              made
              master
              modifier
              text
              result
            }
          }
        }
        text
      }
    }
  }
}
`

const subscribeToUpdateCrossroad = gql`
subscription SubscribeToUpdateCrossroad($currentCrossroad:CrossroadSubscriptionFilter) {
  subscribeToCrossroad(mutations: [updateCrossroad], filter:$currentCrossroad) {
    mutation
    edge {
      node{
        id
        isReady
        text
        choices{
          edges{
            node{
              id
              text
              made
            }
          }
        }
        testDices{
          edges{
            node{
              id
              details
              nbDices
              nbSides
              made
              master
              modifier
              text
              result
            }
          }
        }
      }
      }
    }
  }

`

const subscribeToCreateChoice = gql`
subscription SubscribeToCreateChoice($choiceFilter:ChoiceSubscriptionFilter) {
  subscribeToChoice(mutations: [createChoice], filter:$choiceFilter) {
    mutation
  	edge {
      node {
        id
        made
        text
      }
    }
  }
}
`

const subscribeToCreateTestDice = gql`
subscription SubscribeToCreateTestDice($testDiceFilter:TestDiceSubscriptionFilter) {
  subscribeToTestDice(mutations: [createTestDice], filter:$testDiceFilter) {
    mutation
  	edge {
      node{
        id
        details
        nbDices
        nbSides
        made
        master
        modifier
        text
        result
      }
    }
  }
}
`

export const getCurrentCrossroadFromData = R.pipe(
  R.pathOr([], ['getPageEditor', 'crossroads', 'edges']),
  R.head,
  R.propOr({ isReady: false }, 'node')
)

export const getCrossroadIdFromProps = R.pipe(
  R.pathOr([], ['data', 'getPageEditor', 'crossroads', 'edges']),
  R.head,
  R.path(['node', 'id'])
)

class StoryListener extends Component {

  componentWillReceiveProps(newProps) {
    const { data } = newProps
    const crossroadId = getCrossroadIdFromProps(newProps)
    const lastCrossroadId = getCrossroadIdFromProps(this.props)

    if(!this.newCrossroadSubscription) {
      this.newCrossroadSubscription = data.subscribeToMore({
        document: subscribeToCreateCrossroad,
        updateQuery: (prev, {subscriptionData}) => R.set(
          R.lensPath(['getPageEditor', 'crossroads', 'edges']),
          [subscriptionData.data.subscribeToCrossroad.edge]
        )(prev),
        variables: {
          crossroadFilter: {
            pageEditorId: {
              eq: pageEditorId
            }
          }
        }
      })
    }
    if (!R.isNil(crossroadId) && lastCrossroadId !== crossroadId) {
      this.newChoiceSuscription = data.subscribeToMore({
        document: subscribeToCreateChoice,
        updateQuery: (prev, {subscriptionData}) => R.over(
            R.lensPath(['getPageEditor', 'crossroads', 'edges']),
            R.over(
              R.lensIndex(0),
              R.over(
                R.lensPath(['node', 'choices', 'edges']),
                R.append(subscriptionData.data.subscribeToChoice.edge)
              )
            )
          )(prev),
        variables: {
          choiceFilter: {
            crossroadId: {
              eq: crossroadId
            }
          }
        }
      })
      this.newTestDiceSuscription = data.subscribeToMore({
        document: subscribeToCreateTestDice,
        updateQuery: (prev, {subscriptionData}) => R.over(
            R.lensPath(['getPageEditor', 'crossroads', 'edges']),
            R.over(
              R.lensIndex(0),
              R.over(
                R.lensPath(['node', 'testDices', 'edges']),
                R.append(subscriptionData.data.subscribeToTestDice.edge)
              )
            )
          )(prev),
        variables: {
          testDiceFilter: {
            crossroadId: {
              eq: crossroadId
            }
          }
        }
      })
      this.newUpdateCrossroadSuscription = data.subscribeToMore({
        document: subscribeToUpdateCrossroad,
        updateQuery: (prev, {subscriptionData}) => R.over(
            R.lensPath(['getPageEditor', 'crossroads', 'edges']),
            R.set(
              R.lensIndex(0),
              subscriptionData.data.subscribeToCrossroad.edge
            )
          )(prev),
        variables: {
          testDiceFilter: {
            crossroadId: {
              eq: crossroadId
            }
          }
        }
      })
    }
    if (!R.isNil(crossroadId) && lastCrossroadId !== crossroadId) {
      this.newTestDiceSuscription = data.subscribeToMore({
        document: subscribeToCreateTestDice,
        updateQuery: (prev, {subscriptionData}) => R.over(
            R.lensPath(['getPageEditor', 'crossroads', 'edges']),
            R.over(
              R.lensIndex(0),
              R.over(
                R.lensPath(['node', 'testDices', 'edges']),
                R.append(subscriptionData.data.subscribeToTestDice.edge)
              )
            )
          )(prev),
        variables: {
          testDiceFilter: {
            crossroadId: {
              eq: crossroadId
            }
          }
        }
      })
    }
  }

  render() {
    const { data, makeChoice, resolveTest } = this.props
    const { loading } = data
    const crossroads = R.pathOr(
      { edges: [] },
      ['getPageEditor', 'crossroads']
    )(data)
    const { isReady } = getCurrentCrossroadFromData(data)
    return (<View>
      {loading && <Text>Loading...</Text>}
      {isReady ? <Text>A toi de jouer!</Text> : <Text>Attends ton tour...</Text>}
      <Crossroads
        crossroads={crossroads}
        makeChoice={makeChoice}
        resolveTest={resolveTest}
      />
    </View>)
  }
}

StoryListener.propTypes = {
  data: PropTypes.object.isRequired,
  makeChoice: PropTypes.func.isRequired,
  resolveTest: PropTypes.func.isRequired
}

export default StoryListener
