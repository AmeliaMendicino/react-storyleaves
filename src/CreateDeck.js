import React, { Component } from 'react';
import DeckSaveForm from './DeckSaveForm';
import CardList from './CardList';
//import { GameState } from "./GameState";

class CreateDeck extends Component {
  constructor() {
    super();

    this.state = { cards: [] };
  }

  render() {
    return (
      <div>
        <CardList />
        <DeckSaveForm deck={this.props.deck} />
      </div>
    );
  }

  // TOOD: Add in save deck/update deck
}

export default CreateDeck;
