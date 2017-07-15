import React, { Component } from 'react';

class DeckInfo extends Component {
  render() {
    const types = this.props.deck.cardTypes;
    let total = this.props.deck.cards.length;

    return (
      <div>
        {types.map((type, index) => {
          return (
            <div key={index}>
              {type}:{' '}
              {this.props.deck.cards.filter(card => card.type === type).length}
            </div>
          );
        })}
        <div>
          Total: {total}
        </div>
      </div>
    );
  }
}

export default DeckInfo;
