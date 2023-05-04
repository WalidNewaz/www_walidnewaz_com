import React from 'react';
import './style.css'; // Import the CSS file for this component

const WideCard = (props) => {
  return (
    <div className="wide-card">
      <img src={props.image} alt={props.title} />
      <div className="wide-card-body">
        <h3 className="wide-card-title">{props.title}</h3>
        <p className="wide-card-text">{props.description}</p>
      </div>
    </div>
  );
}

export default WideCard;
