import React, { Component } from 'react';
import Card from './Card';
import CardForm from './CardForm';

class CardList extends Component {
  constructor() {
    super();

    this.state = { canEdit: true, activeCard: {} };
  }

  render() {
    return (
      <div>
        {this.props.cards.map((card, index) => {
          card.number = index + 1;
          let CardComponent = Card;
          if (this.state.activeCard === card) {
            CardComponent = CardForm;
          }
          return (
            <CardComponent
              key={card.id}
              {...card}
              updateCard={this.props.updateCard}
              moveCard={this.props.moveCard}
              toggleCard={() => this._toggleActiveCard(card)}
            />
          );
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
}

export default CardList;
