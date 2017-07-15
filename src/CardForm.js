import React, { Component } from 'react';
import './Card.css';

class CardForm extends Component {
  componentDidMount() {
    this.textInput.focus();
  }

  render() {
    return (
      <div className="card">
        <input
          defaultValue={this.props.number}
          onBlur={event => {
            if (this.props.number !== Number(event.target.value)) {
              this.props.moveCard(event.target.value);
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
          onChange={event => this.props.updateCard(event.target.value)}
          onKeyDown={event => {
            if (event.keyCode === 13) {
              event.preventDefault();
              this.props.toggleCard();
            }
          }}
        />
        <select
          defaultValue={this.props.type}
          onChange={event => this.props.updateCardType(event.target.value)}
          onKeyUp={event => {
            if (event.keyCode === 13) {
              this.props.toggleCard();
            }
          }}
        >
          {this.props.cardTypes.map((cardType, index) => {
            return (
              <option key={index} value={cardType}>
                {cardType}
              </option>
            );
          })}
        </select>{' '}
        <button aria-label="Delete" onClick={this.props.deleteCard}>
          X
        </button>
      </div>
    );
  }
}

export default CardForm;
