import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import PetBrowser from "../components/PetBrowser";

const testPets = [
  {
    id: "5c142d9e-ea45-4231-8146-cccf71c704c0",
    type: "dog",
    gender: "male",
    age: 4,
    weight: 1,
    name: "Trident",
    isAdopted: false,
  },
  {
    id: "2c902312-dfa3-446f-8b4b-5e115170d807",
    type: "cat",
    gender: "male",
    age: 3,
    weight: 1,
    name: "Teddy",
    isAdopted: false,
  },
  {
    id: "6057de4f-6725-4b9f-a0b1-1f3bd3ad04a6",
    type: "cat",
    gender: "male",
    age: 2,
    weight: 5,
    name: "Hemingway",
    isAdopted: false,
  },
];

test("renders Pet components based on its props", () => {
  render(<PetBrowser pets={testPets} />);

  for (const pet of testPets) {
    expect(screen.queryByText(pet.name, { exact: false })).toBeInTheDocument();
  }
});

test("passes an `onAdoptPet` callback prop to its children Pet components", () => {
  const onAdoptPet = jest.fn(); // Mock the onAdoptPet function
  render(<PetBrowser pets={testPets} onAdoptPet={onAdoptPet} />);

  const adoptButtons = screen.getAllByText("Adopt pet"); // Get all adopt pet buttons
  adoptButtons.forEach(button => {
    fireEvent.click(button); // Click on each adopt pet button
  });

  expect(onAdoptPet).toHaveBeenCalledTimes(testPets.length); // Ensure onAdoptPet is called for each pet
});
