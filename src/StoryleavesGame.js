import React, { Component } from 'react';
import { GameState } from './GameState';
import DeckStartChoice from './DeckStartChoice';
import DeckList from './DeckList';
import CreateDeck from './CreateDeck';
import StoryleavesSetup from './StoryleavesSetup';
import { decks } from './decks';

class StoryleavesGame extends Component {
  constructor() {
    super();

    this.state = {
      actions: [],
      currentState: GameState.NEW_GAME,
      decks: decks,
      deck: { cards: [] }
    };
  }

  render() {
    let CurrentComponent;
    let props = { changeGameState: this._changeGameState.bind(this) };

    switch (this.state.currentState) {
      case GameState.PICK_DECK:
        CurrentComponent = DeckList;
        props.decks = this.state.decks;
        props.setDeck = this._setDeck.bind(this);
        break;
      case GameState.CREATE_DECK:
        CurrentComponent = CreateDeck;
        props.deck = this.state.deck;
        props.deckExists = this._deckExists.bind(this);
        break;
      case GameState.SETUP:
        CurrentComponent = StoryleavesSetup;
        break;
      case GameState.NEW_GAME:
      default:
        CurrentComponent = DeckStartChoice;
        break;
    }

    return (
      <div className="StoryleavesGame">
        <CurrentComponent {...props} />
      </div>
    );
  }

  _changeGameState(state) {
    this.setState({ currentState: state });
  }

  _setDeck(deck) {
    this.setState({ deck: deck });
  }

  _deckExists(deck) {
    // Check if the deck name is already taken. Maybe in the future we'll check author, too?
    return this.state.decks.filter(d => d.name === deck.name).length > 0;
  }
}

export default StoryleavesGame;
