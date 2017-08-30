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

    // Initialize the decks
    let allDecks = decks;
    let savedDecks = localStorage.getItem('decks');
    if (savedDecks && savedDecks !== 'undefined') {
      allDecks = JSON.parse(savedDecks);
    } else {
      localStorage.setItem('decks', JSON.stringify(allDecks));
    }

    this.state = {
      actions: [],
      currentState: GameState.NEW_GAME,
      decks: allDecks,
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
        props.getDeck = this._getDeck.bind(this);
        props.saveDeck = this._saveDeck.bind(this);
        break;
      case GameState.SETUP:
        CurrentComponent = StoryleavesSetup;
        props.deck = this.state.deck;
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

  _getDeck(deck) {
    // Check if the deck name is already taken. Maybe in the future we'll check author, too?
    return this.state.decks.find(d => d.name === deck.name);
  }

  _saveDeck(deck) {
    // Determine if we're overwriting a current deck
    const decks = [...this.state.decks];
    let index = decks.findIndex(savedDeck => savedDeck.name === deck.name);
    if (index !== -1) {
      decks.splice(index, 1);
    }
    decks.push(deck);

    // Update the local storage
    localStorage.setItem('decks', JSON.stringify(decks));
    this.setState({ decks });
    this._setDeck(deck);
  }
}

export default StoryleavesGame;
