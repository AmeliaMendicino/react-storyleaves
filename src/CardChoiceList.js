import React, { Component } from 'react';
import Card from './Card';

const CardChoiceList = ({ cards }) => {
  return (
    <div>
      {cards.map((card, index) => {
        <Card key={card.number} {...card} />;
      })}
    </div>
  );
};

export default CardChoiceList;
