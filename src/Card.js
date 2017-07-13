import React, { Component } from 'react';

class Card extends Component {
  render() {
    return (
      <div className="card" onClick={this.props.toggleCard}>
        {this.props.number}. {this.props.name} [{this.props.type}]
      </div>
    );
  }
}

export default Card;
