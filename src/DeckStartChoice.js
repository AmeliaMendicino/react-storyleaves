import React, { Component } from 'react';
import { ButtonToolbar, Button } from 'react-bootstrap';
import { GameState } from './GameState';

class DeckStartChoice extends Component {
  render() {
    return (
      <ButtonToolbar>
        <Button
          bsStyle="primary"
          bsSize="large"
          onClick={() => this.props.changeGameState(GameState.CREATE_DECK)}
        >
          Create Deck
        </Button>
        <Button
          bsSize="large"
          onClick={() => this.props.changeGameState(GameState.PICK_DECK)}
        >
          Use Existing Deck
        </Button>
      </ButtonToolbar>
    );
  }
}

export default DeckStartChoice;
