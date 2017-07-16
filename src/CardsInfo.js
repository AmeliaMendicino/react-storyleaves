import React, { Component } from 'react';

class CardsInfo extends Component {
  render() {
    const types = this.props.cardTypes;
    let total = this.props.cards.length;

    return (
      <div>
        {types.map((type, index) => {
          return (
            <div key={index}>
              {type}:{' '}
              {this.props.cards.filter(card => card.type === type).length}
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

export default CardsInfo;
