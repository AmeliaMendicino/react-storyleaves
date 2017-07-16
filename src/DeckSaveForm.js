import React, { Component } from 'react';
import {
  Form,
  FormGroup,
  Col,
  FormControl,
  ControlLabel
} from 'react-bootstrap';
//import { GameState } from "./GameState";

class DeckSaveForm extends Component {
  constructor(props) {
    super();

    this.state = {
      name: props.deck.name || '',
      description: props.deck.description || ''
    };
  }

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
              value={this.state.name}
              onChange={this._updateName.bind(this)}
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
              value={this.state.description}
              onChange={this._updateDescription.bind(this)}
            />
          </Col>
        </FormGroup>
      </Form>
    );
  }

  _updateName(event) {
    let name = event.target.value;
    this.setState({ name });
    this.props.updateDeckName(name);
  }

  _updateDescription(event) {
    let description = event.target.value;
    this.setState({ description });
    this.props.updateDeckDescription(description);
  }

  // TOOD: Add in save deck/update deck
}

export default DeckSaveForm;
