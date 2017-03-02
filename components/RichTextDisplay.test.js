import React from 'react'
import renderer from 'react-test-renderer'

import RichTextDisplay from './RichTextDisplay'

it('renders content', () => {
  const props = {
    rawContent: {
      blocks: [
        {
          data: {},
          depth: 0,
          entityRanges: [],
          inlineStyleRanges: [],
          key: '4bkmd',
          text: 'some rich text',
          type: 'unstyled'
        }
      ],
      entityMap: {}
    }
  }
  expect(
    renderer.create(<RichTextDisplay {...props} />).toJSON()
  ).toMatchSnapshot()
})

it('renders bulletlist', () => {
  const props = {
    rawContent: {
      'entityMap': {},
      'blocks': [
        {
          'key': '1madj',
          'text': 'this is a list:',
          'type': 'unstyled',
          'depth': 0,
          'inlineStyleRanges': [],
          'entityRanges': [],
          'data': {}
        },
        {
          'key': 'bd8au',
          'text': 'first item',
          'type': 'unordered-list-item',
          'depth': 0,
          'inlineStyleRanges': [],
          'entityRanges': [],
          'data': {}
        },
        {
          'key': '1ogut',
          'text': 'second item',
          'type': 'unordered-list-item',
          'depth': 0,
          'inlineStyleRanges': [],
          'entityRanges': [],
          'data': {}
        }
      ]
    }
  }
  expect(
    renderer.create(<RichTextDisplay {...props} />).toJSON()
  ).toMatchSnapshot()
})

it('renders rich text content', () => {
  const props = {
    rawContent: {
      'entityMap': {},
      'blocks': [
        {
          'key': 'cbm0g',
          'text': 'titre H1',
          'type': 'header-one',
          'depth': 0,
          'inlineStyleRanges': [],
          'entityRanges': [],
          'data': {}
        },
        {
          'key': '5tivm',
          'text': 'titre H2',
          'type': 'header-two',
          'depth': 0,
          'inlineStyleRanges': [],
          'entityRanges': [],
          'data': {}
        },
        {
          'key': '5n20d',
          'text': 'unstyled paragraph',
          'type': 'unstyled',
          'depth': 0,
          'inlineStyleRanges': [],
          'entityRanges': [],
          'data': {}
        },
        {
          'key': 'da4nc',
          'text': '',
          'type': 'unstyled',
          'depth': 0,
          'inlineStyleRanges': [],
          'entityRanges': [],
          'data': {}
        },
        {
          'key': 'b3dsv',
          'text': 'this is italic style and this is bold style and this is underline style and this is all styles',
          'type': 'unstyled',
          'depth': 0,
          'inlineStyleRanges': [
            {
              'offset': 8,
              'length': 13,
              'style': 'ITALIC'
            },
            {
              'offset': 84,
              'length': 10,
              'style': 'ITALIC'
            },
            {
              'offset': 84,
              'length': 10,
              'style': 'BOLD'
            },
            {
              'offset': 84,
              'length': 10,
              'style': 'UNDERLINE'
            }
          ],
          'entityRanges': [],
          'data': {}
        },
        {
          'key': '97hah',
          'text': '',
          'type': 'unstyled',
          'depth': 0,
          'inlineStyleRanges': [],
          'entityRanges': [],
          'data': {}
        },
        {
          'key': '68ht0',
          'text': 'h1 with styles',
          'type': 'header-one',
          'depth': 0,
          'inlineStyleRanges': [
            {
              'offset': 0,
              'length': 2,
              'style': 'ITALIC'
            },
            {
              'offset': 3,
              'length': 4,
              'style': 'BOLD'
            },
            {
              'offset': 8,
              'length': 6,
              'style': 'UNDERLINE'
            }
          ],
          'entityRanges': [],
          'data': {}
        }
      ]
    }
  }
  expect(
    renderer.create(<RichTextDisplay {...props} />).toJSON()
  ).toMatchSnapshot()
})
