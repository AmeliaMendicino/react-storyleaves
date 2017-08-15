import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { GameState } from './GameState';

class DeckList extends Component {
  render() {
    return (
      <ListGroup>
        {this.props.decks.map((deck, index) =>
          <ListGroupItem
            onClick={() => {
              this.props.setDeck(deck);
              this.props.changeGameState(GameState.CREATE_DECK);
            }}
            key={index}
            header={deck.name}
          >
            {deck.description}
          </ListGroupItem>
        )}
      </ListGroup>
    );
  }
}

export default DeckList;
