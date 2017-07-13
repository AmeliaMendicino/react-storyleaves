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
          moveCard={this._moveCard.bind(this)}
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

  _moveCard(id, newPosition) {
    const cards = this.state.cards;

    let newIndex = newPosition - 1;
    let oldIndex = cards.findIndex(card => card.id === id);

    cards.splice(newIndex, 0, cards.splice(oldIndex, 1)[0]);
    this.setState({ cards: cards });
  }

  // TOOD: Add in save deck/update deck
}

export default CreateDeck;
