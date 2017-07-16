import React, { Component } from 'react';
import DeckSaveForm from './DeckSaveForm';
import CardList from './CardList';
import CardsInfo from './CardsInfo';
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

    props.deck.cardTypes = cardTypes;
    this.state = { cards: props.deck.cards, cardTypes };
  }

  render() {
    return (
      <div>
        <CardList
          cards={this.state.cards}
          cardTypes={this.state.cardTypes}
          updateCardType={this._updateCardType.bind(this)}
          addCard={this._addCard.bind(this)}
          deleteCard={this._deleteCard.bind(this)}
          moveCard={this._moveCard.bind(this)}
        />
        <DeckSaveForm deck={this.props.deck} />
        <CardsInfo
          cards={this.state.cards}
          cardTypes={this.state.cardTypes}
          updateCardTypes={this._updateCardTypes.bind(this)}
        />
      </div>
    );
  }

  _updateCardType(card, type) {
    card.type = type;
    this.setState({ cards: this.state.cards });
  }

  _addCard() {
    let card = { type: this.state.cardTypes[0] };
    this.setState({ cards: this.state.cards.concat([card]) });
    return card;
  }

  _deleteCard(card) {
    const cards = this.state.cards;
    let index = cards.indexOf(card);
    cards.splice(index, 1);
    this.setState({ cards: cards });
  }

  _moveCard(card, newPosition) {
    const cards = this.state.cards;

    let newIndex = newPosition - 1;
    let oldIndex = cards.indexOf(card);

    cards.splice(newIndex, 0, cards.splice(oldIndex, 1)[0]);
    this.setState({ cards: cards });
  }

  _updateCardTypes(types) {
    this.props.deck.cardTypes = types;
    this.setState({ cardTypes: types });
  }

  // TOOD: Add in save deck/update deck
}

export default CreateDeck;
