// Pet.js

import React from "react";

const Pet = ({ pet }) => {
  return (
    <div className="card" data-testid="pet"> {/* Add data-testid="pet" here */}
      <div className="content">
        <span className="header">{`${pet.name} - ${pet.gender}`}</span>
        <div className="meta">
          <span className="date">{pet.type}</span>
        </div>
        <div className="description">
          <p>Age: {pet.age}</p>
          <p>Weight: {pet.weight}</p>
        </div>
      </div>
      <div className="extra content">
        <button className="ui primary button">Adopt pet</button>
      </div>
    </div>
  );
};

export default Pet;
