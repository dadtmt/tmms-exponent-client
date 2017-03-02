import R from 'ramda'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import { pageEditorId } from '../config'
import StoryListener from '../components/StoryListener'

const GET_PAGE_EDITOR_QUERY = gql`
query GetPageEditor($pageEditorId: ID!) {
  getPageEditor(id: $pageEditorId) {
    id
    crossroads(first: 1, orderBy: {field:createdAt, direction:DESC}){
      edges{
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
}
`
const withData = graphql(
  GET_PAGE_EDITOR_QUERY,
  {
    options: {
      variables: { pageEditorId }
    }
  }
)

export const isChoiceMade = R.pipe(
  R.pathOr([], ['getPageEditor', 'crossroads', 'edges']),
  R.head,
  R.pathOr([], ['node', 'choices', 'edges']),
  R.map(R.path(['node', 'made'])),
  R.reduce(
    R.or,
    false
  )
)

export const isReady = R.pipe(
  R.pathOr([], ['getPageEditor', 'crossroads', 'edges']),
  R.head,
  R.pathOr(false, ['node', 'isReady'])
)

export const isActive = R.converge(
  R.and,
  [isReady, R.complement(isChoiceMade)]
)

const MAKE_CHOICE_MUTATION = gql`
mutation UpdateChoice($madeChoice: UpdateChoiceInput!) {
  updateChoice(input: $madeChoice){
    changedChoice {
      id
      made
      text
    }
  }
}
`

const withMakeChoice = graphql(
  MAKE_CHOICE_MUTATION,
  {
    props: ({ mutate, ownProps: { data } }) => ({
      makeChoice: choice => {
        if(isActive(data)) {
          mutate({
            variables: {
              madeChoice: {
                id: choice.id,
                made: true
              }
            }
          })
        }
      }
    })
  }
)

const RESOLVE_TEST_MUTATION = gql`
mutation ResolveTest($resolvedTest: UpdateTestDiceInput!) {
  updateTestDice(input: $resolvedTest){
    changedEdge {
      node {
        details
        id
        made
        master
        modifier
        nbDices
        nbSides
        result
      }
    }
  }
}
`

const withResolveTest = graphql(
  RESOLVE_TEST_MUTATION,
  {
    props: ({ mutate, ownProps: { data } }) => ({
      resolveTest: testDice => {
        if(isActive(data)) {
          mutate({
            variables: {
              resolvedTest: {
                id: testDice.id,
                made: true
              }
            }
          })
        }
      }
    })
  }
)

export default R.compose(
  withData,
  withMakeChoice,
  withResolveTest
)(StoryListener)
