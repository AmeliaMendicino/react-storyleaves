import React, { Component } from 'react';
import './Card.css';

class Card extends Component {
  constructor(props) {
    super();

    this.state = {
      name: props.name,
      type: props.type,
      number: props.number,
      isEditing: false
    };
  }

  render() {
    let card = (
      <p>
        {this.props.number}. {this.props.name} [{this.props.type}]
      </p>
    );
    if (this.state.isEditing) {
      card = (
        <p>
          {this.props.number}
          {'. '}
          <input
            defaultValue={this.props.name}
            placeholder="Name"
            onChange={event =>
              this.props.updateCard(this.props.id, event.target.value)}
            onKeyDown={event => {
              if (event.keyCode === 13) {
                event.preventDefault();
                event.target.blur();
              }
            }}
            ref={input => input && input.focus()}
          />
          [{this.props.type}]
        </p>
      );
    }

    return (
      <div
        className="card"
        onBlur={() => this.setState({ isEditing: false })}
        onClick={() => this.setState({ isEditing: true })}
      >
        {card}
      </div>
    );
  }
}

export default Card;
