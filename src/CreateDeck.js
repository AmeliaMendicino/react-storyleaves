import React, { Component } from 'react';
import DeckSaveForm from './DeckSaveForm';
import CardList from './CardList';
import DeckInfo from './DeckInfo';
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
    this.state = { cardTypes };
  }

  render() {
    return (
      <div>
        <CardList
          cards={this.props.deck.cards}
          cardTypes={this.state.cardTypes}
        />
        <DeckSaveForm deck={this.props.deck} />
        <DeckInfo
          deck={this.props.deck}
          updateCardTypes={this._updateCardTypes.bind(this)}
        />
      </div>
    );
  }

  _updateCardTypes(types) {
    this.props.deck.cardTypes = types;
    this.setState({ cardTypes: types });
  }

  // TOOD: Add in save deck/update deck
}

export default CreateDeck;
