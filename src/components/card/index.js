import React from 'react';
import './style.css'; // Import the CSS file for this component

const Card = (props) => {
  return (
    <div className="card">
      <img src={props.image} alt={props.title} />
      <div className="card-body">
        <h3 className="card-title">{props.title}</h3>
        <p className="card-text">{props.description}</p>
      </div>
    </div>
  );
}

export default Card;