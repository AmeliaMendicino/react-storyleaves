import React, { Component } from 'react';
import './Card.css';

class CardForm extends Component {
  constructor(props) {
    super();

    this.state = {
      name: props.name,
      type: props.type,
      number: props.number
    };

    this.focus = this.focus.bind(this);
  }

  focus() {
    // Explicitly focus the text input using the raw DOM API
    this.textInput.focus();
  }

  componentDidMount() {
    this.focus();
  }

  render() {
    return (
      <div className="card">
        <input
          defaultValue={this.props.number}
          onBlur={event => {
            if (this.props.number !== Number(event.target.value)) {
              this.props.moveCard(this.props.id, event.target.value);
            }
          }}
          onKeyDown={event => {
            if (event.keyCode === 13) {
              event.preventDefault();
              if (this.props.number === Number(event.target.value)) {
                this.props.toggleCard();
              } else {
                event.target.blur();
                event.target.focus();
              }
            }
          }}
          type="number"
        />
        <input
          defaultValue={this.props.name}
          placeholder="Name"
          ref={input => (this.textInput = input)}
          onChange={event =>
            this.props.updateCard(this.props.id, event.target.value)}
          onKeyDown={event => {
            if (event.keyCode === 13) {
              event.preventDefault();
              this.props.toggleCard();
            }
          }}
        />
        [{this.props.type}]
      </div>
    );
  }
}

export default CardForm;
