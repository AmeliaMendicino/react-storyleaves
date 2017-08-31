import React, { Component } from 'react';
import './Card.css';

class CardForm extends Component {
  componentDidMount() {
    this.textInput.focus();
  }

  render() {
    const {
      number,
      name,
      type,
      cardTypes,
      updateCard,
      updateCardType,
      moveCard,
      deleteCard,
      cardAction
    } = this.props;
    const toggleCard = cardAction;
    return (
      <div className="card">
        <input
          defaultValue={number}
          onBlur={event => {
            if (number !== Number(event.target.value)) {
              moveCard(event.target.value);
            }
          }}
          onKeyDown={event => {
            if (event.keyCode === 13) {
              event.preventDefault();
              if (number === Number(event.target.value)) {
                toggleCard();
              } else {
                event.target.blur();
                event.target.focus();
              }
            }
          }}
          type="number"
        />
        <input
          defaultValue={name}
          placeholder="Name"
          ref={input => (this.textInput = input)}
          onChange={event => updateCard(event.target.value)}
          onKeyDown={event => {
            if (event.keyCode === 13) {
              event.preventDefault();
              toggleCard();
            }
          }}
        />
        <select
          defaultValue={type}
          onChange={event => updateCardType(event.target.value)}
          onKeyUp={event => {
            if (event.keyCode === 13) {
              toggleCard();
            }
          }}
        >
          {cardTypes.map((cardType, index) => {
            return (
              <option key={index} value={cardType}>
                {cardType}
              </option>
            );
          })}
        </select>{' '}
        <button aria-label="Delete" onClick={deleteCard} tabIndex="-1">
          X
        </button>
      </div>
    );
  }
}

export default CardForm;
