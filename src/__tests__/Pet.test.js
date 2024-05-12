import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Pet from "../components/Pet";

const MALE_DOG = {
  id: "9e7cc723-d7f5-440d-8ead-c311e68014ee",
  type: "dog",
  gender: "male",
  age: 8,
  weight: 6,
  name: "Kennedy",
  isAdopted: false,
};

const FEMALE_CAT = {
  id: "86520b4b-7849-4462-b511-cddc7f416ad6",
  type: "cat",
  gender: "female",
  age: 7,
  weight: 6,
  name: "Cuddles",
  isAdopted: false,
};

const GENDER_ICON_MALE = "♂";
const GENDER_ICON_FEMALE = "♀";

describe("Rendering props", () => {
  test("renders the name", () => {
    render(<Pet pet={MALE_DOG} />);
    expect(screen.queryByText(MALE_DOG.name, { exact: false })).toBeInTheDocument();
  });

  test("renders the correct gender icon for male pets", () => {
    render(<Pet pet={{ ...FEMALE_CAT, gender: "male" }} />);
    expect(screen.getByText(GENDER_ICON_MALE)).toBeInTheDocument();
  });
  
  test("renders the correct gender icon for female pets", () => {
    render(<Pet pet={{ ...FEMALE_CAT, gender: "female" }} />);
    expect(screen.getByText(GENDER_ICON_FEMALE)).toBeInTheDocument();
  });

  test("renders the pet type", () => {
    render(<Pet pet={FEMALE_CAT} />);
    expect(screen.queryByText(FEMALE_CAT.type, { exact: false })).toBeInTheDocument();
  });

  it("renders the pet age", () => {
    render(<Pet pet={FEMALE_CAT} />);
    expect(screen.queryByText(FEMALE_CAT.age.toString(), { exact: false })).toBeInTheDocument();
  });

  it("renders the pet weight", () => {
    render(<Pet pet={FEMALE_CAT} />);
    expect(screen.queryByText(FEMALE_CAT.weight.toString(), { exact: false })).toBeInTheDocument();
  });
});

describe("Adopting a pet", () => {
  describe("Pet is not adopted yet", () => {
    test("only shows the adopt button", () => {
      render(<Pet pet={FEMALE_CAT} />);
      expect(screen.queryByText(/Adopt pet/)).toBeInTheDocument();
      expect(screen.queryByText(/Already adopted/)).not.toBeInTheDocument();
    });

    test("calls the `onAdoptPet` callback prop when the adopt button is clicked", () => {
      const onAdoptPet = jest.fn(); // Mock the onAdoptPet function
      render(<Pet pet={FEMALE_CAT} onAdoptPet={onAdoptPet} />);
    
      fireEvent.click(screen.getByText("Adopt pet")); // Click on the adopt pet button
    
      expect(onAdoptPet).toHaveBeenCalledWith(FEMALE_CAT.id); // Ensure onAdoptPet is called with the correct arguments
    });

    test("calls the `onAdoptPet` callback prop with the pet ID", () => {
      const onAdoptPet = jest.fn();
      render(<Pet pet={FEMALE_CAT} onAdoptPet={onAdoptPet} />);

      const button = screen.queryByText(/Adopt pet/);
      fireEvent.click(button);

      expect(onAdoptPet).toHaveBeenCalledWith(FEMALE_CAT.id);
    });
  });

  describe("Pet is already adopted", () => {
    test("only shows the already adopted button", () => {
      render(<Pet pet={{ ...FEMALE_CAT, isAdopted: true }} />);
      expect(screen.queryByText("Adopt pet")).not.toBeInTheDocument(); // Ensure the adopt pet button is not rendered
      expect(screen.getByText("Already adopted")).toBeInTheDocument(); // Ensure the already adopted button is rendered
    });
    
    test("does not call the `onAdoptPet` callback prop when the button is clicked", () => {
      const onAdoptPet = jest.fn(); // Mock the onAdoptPet function
      render(<Pet pet={{ ...FEMALE_CAT, isAdopted: true }} onAdoptPet={onAdoptPet} />);
    
      fireEvent.click(screen.getByText("Already adopted")); // Click on the already adopted button
    
      expect(onAdoptPet).not.toHaveBeenCalled(); // Ensure onAdoptPet is not called
    }); 
  });
});
