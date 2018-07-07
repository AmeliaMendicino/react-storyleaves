import React, { Component } from 'react';
import CardList from './CardList';
import { shuffle } from './gameFunctions.js';
//import { ListGroup, ListGroupItem } from "react-bootstrap";
//import { GameState } from "./GameState";

class StoryleavesSetup extends Component {
  constructor(props) {
    super();

    this.state = { cards: props.deck.cards };
  }

  render() {
    return (
      <div>
        <CardList canEdit={false} cards={this.state.cards} />
        <button
          onClick={() => this.setState({ cards: shuffle(this.state.cards) })}
        >
          Shuffle
        </button>
      </div>
    );
  }
}

export default StoryleavesSetup;
