'use strict';

import React, { Component } from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import Card from './Card.js'
import SwipeCards from 'react-native-swipe-cards';
//Switch to this one https://github.com/alexbrillant/react-native-deck-swiper

class NoMoreCards extends Component {
  render() {
    return (
      <View>
        <Text style={styles.noMoreCardsText}>No more cards</Text>
      </View>
    )
  }
}

export default class App extends React.Component {
  state = {
    cards: [
      {handle: '@heyitsmmike', type: 'Instagrammer', followCount: '700', images: ['https://loremflickr.com/150/150/dog', 'https://loremflickr.com/150/150/dog']},
      {handle: '@damlaj', type: 'Instagrammer', followCount: '700', images: ['https://loremflickr.com/150/150/dog', 'https://loremflickr.com/150/150/dog']},
      {handle: '@skinnyspy', type: 'Instagrammer', followCount: '700', images: ['https://loremflickr.com/150/150/dog', 'https://loremflickr.com/150/150/dog']},
      {handle: '@iguser', type: 'Instagrammer', followCount: '700', images: ['https://loremflickr.com/150/150/dog', 'https://loremflickr.com/150/150/dog']},
      {handle: '@twerk2beats', type: 'Instagrammer', followCount: '700', images: ['https://loremflickr.com/150/150/dog', 'https://loremflickr.com/150/150/dog']},
      {handle: '@cityofjeremy', type: 'Instagrammer', followCount: '700', images: ['https://loremflickr.com/150/150/dog', 'https://loremflickr.com/150/150/dog']},
    ]
  };

  handleYup (card) {
    console.log(`Yup for ${card.text}`)
  }
  handleNope (card) {
    console.log(`Nope for ${card.text}`)
  }
  handleMaybe (card) {
    console.log(`Maybe for ${card.text}`)
  }
  render() {
    // If you want a stack of cards instead of one-per-one view, activate stack mode
    // stack={true}
    return (
      <SwipeCards
        cards={this.state.cards}
        renderCard={(cardData) => <Card {...cardData} />}
        renderNoMoreCards={() => <NoMoreCards />}
        handleYup={this.handleYup}
        handleNope={this.handleNope}
        handleMaybe={this.handleMaybe}
        hasMaybeAction
      />
    )
  }
}

const styles = StyleSheet.create({
  card: {
   alignItems: 'center',
   borderRadius: 5,
   overflow: 'hidden',
   borderColor: 'grey',
   backgroundColor: 'white',
   borderWidth: 1,
   elevation: 1,
 },
  noMoreCardsText: {
    fontSize: 22,
  },
  thumbnail: {
    width: 300,
    height: 300,
  },
  text: {
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 10
  },
})