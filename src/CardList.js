import React, { Component } from 'react';
import Card from './Card';
import CardForm from './CardForm';

class CardList extends Component {
  constructor() {
    super();

    this.state = {
      activeCard: {}
    };
  }

  render() {
    let addButton;
    if (this.props.canEdit) {
      addButton = (
        <button
          onClick={() => {
            let card = this.props.addCard();
            this._toggleActiveCard(card);
          }}
        >
          Add card
        </button>
      );
    }
    return (
      <div>
        {this.props.cards.map((card, index) => {
          card.number = index + 1;

          let CardComponent = Card;
          let props = { toggleCard: () => this._toggleActiveCard(card) };

          if (this.props.canEdit && this.state.activeCard === card) {
            CardComponent = CardForm;
            props.updateCard = name => (card.name = name);
            props.moveCard = newPosition =>
              this.props.moveCard(card, newPosition);
            props.updateCardType = type =>
              this.props.updateCardType(card, type);
            props.deleteCard = () => this.props.deleteCard(card);
            props.cardTypes = this.props.cardTypes;
          }
          return <CardComponent key={card.number} {...card} {...props} />;
        })}
        {addButton}
      </div>
    );
  }

  _toggleActiveCard(card) {
    if (card === this.state.activeCard) {
      card = {};
    }
    this.setState({ activeCard: card });
  }
}

export default CardList;
