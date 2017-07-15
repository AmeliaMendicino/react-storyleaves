import React, { Component } from 'react';
import DeckSaveForm from './DeckSaveForm';
import CardList from './CardList';
//import { GameState } from "./GameState";

class CreateDeck extends Component {
  render() {
    return (
      <div>
        <CardList
          cards={this.props.deck.cards}
          cardTypes={this.props.deck.cardTypes}
        />
        <DeckSaveForm deck={this.props.deck} />
      </div>
    );
  }

  // TOOD: Add in save deck/update deck
}

export default CreateDeck;
