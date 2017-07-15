import React, { Component } from 'react';
import DeckSaveForm from './DeckSaveForm';
import CardList from './CardList';
//import { GameState } from "./GameState";

class CreateDeck extends Component {
  constructor(props) {
    super();
    let defaultCardTypes = [
      'Character',
      'Aspect',
      'Event',
      'Item',
      'Place',
      'Detail'
    ];
    let cardTypes = props.deck.cardTypes || defaultCardTypes;

    this.state = { cardTypes };
  }

  render() {
    return (
      <div>
        <CardList
          cards={this.props.deck.cards}
          cardTypes={this.state.cardTypes}
        />
        <DeckSaveForm deck={this.props.deck} />
      </div>
    );
  }

  // TOOD: Add in save deck/update deck
}

export default CreateDeck;
