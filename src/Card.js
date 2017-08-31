import React from 'react';

const Card = ({ cardAction, number, name, type }) => {
  return (
    <div className="card" onClick={cardAction}>
      {number}. {name} [{type}]
    </div>
  );
};

export default Card;
