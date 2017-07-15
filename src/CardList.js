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
            props.cardTypes = this.props.cardTypes;
          }
          return <CardComponent key={card.id} {...card} {...props} />;
        })}
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
}

export default CardList;
