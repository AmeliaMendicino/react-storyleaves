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
    props.deck.cardTypes = props.deck.cardTypes || defaultCardTypes;
    props.deck.reshuffles = props.deck.reshuffles || 1;

    this.state = {
      deck: props.deck
    };
  }

  render() {
    return (
      <div>
        <CardList
          canEdit={true}
          cards={this.state.deck.cards}
          cardTypes={this.state.deck.cardTypes}
          updateCardName={this._updateCardName.bind(this)}
          updateCardType={this._updateCardType.bind(this)}
          addCard={this._addCard.bind(this)}
          deleteCard={this._deleteCard.bind(this)}
          moveCard={this._moveCard.bind(this)}
        />
        <DeckSaveForm
          deck={this.state.deck}
          updateDeckName={this._updateDeckName.bind(this)}
          updateDeckDescription={this._updateDeckDescription.bind(this)}
          updateReshuffles={this._updateReshuffles.bind(this)}
        />
        <div style={{ position: 'fixed', top: '1em', right: '1em' }}>
          <CardsInfo
            cards={this.state.deck.cards}
            cardTypes={this.state.deck.cardTypes}
            updateCardTypes={this._updateCardTypes.bind(this)}
          />
        </div>
        <button onClick={this._saveDeck.bind(this)}>Save</button>
      </div>
    );
  }

  _isDeckValid() {
    let isValid = true;
    let errors = [];

    // Decks must have at least 9 cards with 5 characters for normal-esque play
    let defaultRules = {
      minCards: 9,
      requiredCards: [{ type: this.state.deck.cardTypes[0], count: 5 }]
    };
    let rules = this.props.rules || defaultRules;

    if (rules.minCards && this.state.deck.cards.length < rules.minCards) {
      errors.push(`You must have at least ${rules.minCards} card(s)`);
      isValid = false;
    }

    if (rules.requiredCards) {
      for (let requirement of rules.requiredCards) {
        if (
          this.state.deck.cards.filter(card => card.type === requirement.type)
            .length < requirement.count
        ) {
          errors.push(
            `You must have at least ${requirement.count} ${requirement.type} card(s)`
          );
          isValid = false;
        }
      }
    }

    if (!this.state.deck.name) {
      errors.push('Please input deck name');
      isValid = false;
    }

    if (!this.state.deck.description) {
      errors.push('Please input deck description');
      isValid = false;
    }

    return { isValid, errors };
  }

  _saveDeck() {
    let { isValid, errors } = this._isDeckValid();
    if (!isValid) {
      alert(errors.join('\n'));
      return;
    }
  }

  _updateCardName(card, name) {
    card.name = name;
    this.setState({ deck: this.state.deck });
  }

  _updateCardType(card, type) {
    card.type = type;
    this.setState({ deck: this.state.deck });
  }

  _addCard() {
    let card = { type: this.state.deck.cardTypes[0] };
    this.setState({
      deck: { ...this.state.deck, cards: this.state.deck.cards.concat([card]) }
    });
    return card;
  }

  _deleteCard(card) {
    const cards = [...this.state.deck.cards];
    let index = cards.indexOf(card);
    cards.splice(index, 1);
    this.setState({
      deck: { ...this.state.deck, cards: cards }
    });
  }

  _moveCard(card, newPosition) {
    const cards = [...this.state.deck.cards];

    let newIndex = newPosition - 1;
    let oldIndex = cards.indexOf(card);

    cards.splice(newIndex, 0, cards.splice(oldIndex, 1)[0]);

    this.setState({ deck: { ...this.state.deck, cards: cards } });
  }

  _updateCardTypes(types) {
    this.setState({ deck: { ...this.state.deck, cardTypes: types } });
  }

  _updateReshuffles(number) {
    let reshuffles = this.state.deck.reshuffles + number;
    if (reshuffles < 0) {
      reshuffles = 0;
    }
    this.setState({ deck: { ...this.state.deck, reshuffles } });
  }

  _updateDeckName(name) {
    this.setState({ deck: { ...this.state.deck, name } });
  }

  _updateDeckDescription(description) {
    this.setState({ deck: { ...this.state.deck, description } });
  }
}

export default CreateDeck;
