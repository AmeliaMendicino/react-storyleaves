import React, { Component } from 'react';
import {
  Form,
  FormGroup,
  Col,
  FormControl,
  Button,
  ControlLabel
} from 'react-bootstrap';
//import { GameState } from "./GameState";

class DeckSaveForm extends Component {
  render() {
    return (
      <Form horizontal>
        <FormGroup controlId="formHorizontalDeckName">
          <Col componentClass={ControlLabel} sm={2}>
            Deck Name
          </Col>
          <Col sm={10}>
            <FormControl
              type="text"
              placeholder="Name"
              defaultValue={this.props.deck.name}
              inputRef={ref => {
                this.props.deck.name = ref;
              }}
            />
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalDeckDescription">
          <Col componentClass={ControlLabel} sm={2}>
            Deck Description
          </Col>
          <Col sm={10}>
            <FormControl
              componentClass="textarea"
              placeholder="Description"
              defaultValue={this.props.deck.description}
              inputRef={ref => {
                this.props.deck.description = ref;
              }}
            />
          </Col>
        </FormGroup>

        <FormGroup>
          <Col smOffset={2} sm={10}>
            <Button type="submit">Start Game</Button>
          </Col>
        </FormGroup>
      </Form>
    );
  }

  // TOOD: Add in save deck/update deck
}

export default DeckSaveForm;
