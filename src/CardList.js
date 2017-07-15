import React, { Component } from 'react';
import Card from './Card';
import CardForm from './CardForm';

class CardList extends Component {
  constructor(props) {
    super();

    this.state = {
      cards: props.cards || [],
      canEdit: true,
      activeCard: {}
    };
  }

  render() {
    return (
      <div>
        {this.state.cards.map((card, index) => {
          card.number = index + 1;

          let CardComponent = Card;
          let props = { toggleCard: () => this._toggleActiveCard(card) };

          if (this.state.activeCard === card) {
            CardComponent = CardForm;
            props.updateCard = name => (card.name = name);
            props.moveCard = newPosition => this._moveCard(card, newPosition);
            props.updateCardType = type => (card.type = type);
            props.deleteCard = () => this._deleteCard(card);
            props.cardTypes = this.props.cardTypes;
          }
          return <CardComponent key={card.number} {...card} {...props} />;
        })}
        <button onClick={() => this._addCard()}>Add card</button>
      </div>
    );
  }

  _toggleActiveCard(card) {
    if (card === this.state.activeCard) {
      card = {};
    }
    this.setState({ activeCard: card });
  }

  _moveCard(card, newPosition) {
    const cards = this.state.cards;

    let newIndex = newPosition - 1;
    let oldIndex = cards.indexOf(card);

    cards.splice(newIndex, 0, cards.splice(oldIndex, 1)[0]);
    this.setState({ cards: cards });
  }

  _addCard() {
    let card = { type: this.props.cardTypes[0] };
    this.setState({ cards: this.state.cards.concat([card]) });
    this._toggleActiveCard(card);
  }

  _deleteCard(card) {
    const cards = this.state.cards;
    let index = cards.indexOf(card);
    cards.splice(index, 1);
    this.setState({ cards: cards });
  }
}

export default CardList;
