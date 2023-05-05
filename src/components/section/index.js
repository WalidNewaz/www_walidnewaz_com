import React from 'react';
import { Link } from "gatsby";
import './style.css';

const Section = (props) => {
  return (
    <div className="section">
      <h2>{props.title}</h2>
      <img src={props.img} />
      <p>{props.description}</p>
      <div>
        <Link to={props.detailLink}>{props.detailLinkLabel}</Link>
      </div>
    </div>
  );
}

export default Section;