import React, { Component } from 'react';
import DeckSaveForm from './DeckSaveForm';
import CardList from './CardList';
//import { GameState } from "./GameState";

class CreateDeck extends Component {
  constructor(props) {
    super();

    this.state = { cards: props.deck.cards || [] };
  }

  render() {
    return (
      <div>
        <CardList
          cards={this.state.cards}
          updateCard={this._updateCard.bind(this)}
        />
        <DeckSaveForm deck={this.props.deck} />
      </div>
    );
  }

  _updateCard(id, name) {
    let card = this.state.cards.find(card => card.id === id);
    card.name = name;
    this.setState({ cards: this.state.cards });
  }

  // TOOD: Add in save deck/update deck
}

export default CreateDeck;
