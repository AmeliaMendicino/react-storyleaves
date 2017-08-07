import React, { Component } from 'react';
import {
  Popover,
  OverlayTrigger,
  Button,
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
    const popoverHoverFocus = (
      <Popover id="popover-positioned-top" title="Reshuffle Info">
        1 Reshuffle per 18 Cards Recommend.<br />
        Suggested: {Math.trunc(this.props.deck.cards.length / 18) || 1}
      </Popover>
    );

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

        <div>
          Reshuffles
          <OverlayTrigger
            trigger={['hover', 'focus']}
            placement="top"
            overlay={popoverHoverFocus}
          >
            <span className="glyphicon glyphicon-info-sign" aria-label="info" />
          </OverlayTrigger>
          <Button onClick={() => this.props.updateReshuffles(-1)}>
            <span className="glyphicon glyphicon-minus" aria-label="minus" />
          </Button>
          {` ${this.props.deck.reshuffles} `}
          <Button onClick={() => this.props.updateReshuffles(1)}>
            <span className="glyphicon glyphicon-plus" aria-label="add" />
          </Button>
        </div>
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
}

export default DeckSaveForm;
