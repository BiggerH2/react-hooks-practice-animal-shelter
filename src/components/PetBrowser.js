import React from "react";
import Pet from "./Pet";

function PetBrowser({ pets, onAdoptPet }) {
  return (
    <div className="ui cards">
      {pets.map((pet) => (
        <Pet
          key={pet.id}
          pet={pet}
          onAdoptPet={onAdoptPet}
          data-testid="pet" // Add data-testid here
        />
      ))}
    </div>
  );
}

export default PetBrowser;
