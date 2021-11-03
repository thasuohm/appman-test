import { render, screen } from "@testing-library/react";
import Modal from "./Components/UI/Modal";
import React from "react";
import { Provider } from "react-redux";
import store from "./Redux/store";
import App from "./App";
import { toBeInTheDocument, toHaveProperty } from "@testing-library/jest-dom";
import { fireEvent, queryByAttribute } from "@testing-library/dom";
import PokemonCard from "./Components/UI/PokemonCard";

test("is correct render", () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const title = screen.getByText(/Pokedex/);
  expect(title).toBeInTheDocument();
});

test("is render correct pokemon info", () => {
  let mockPokemon = {
    id: "001",
    name: "hello",
    hp: "200",
    attacks: [
      {
        cost: ["Psychic", "Colorless", "Colorless"],
        name: "Psychic Burst",
        text: "You may discard 2 Energy attached to Deoxys ex. If you do, this attack does 50 damage plus 20 more damage for each Energy attached to the Defending Pokémon.",
        damage: "50+",
        convertedEnergyCost: 3,
      },
    ],
    weaknesses: [
      {
        type: "Psychic",
        value: "×2",
      },
    ],
  };

  render(
    <Provider store={store}>
      <PokemonCard pkc={mockPokemon} />
    </Provider>
  );
  const pokemonCard = screen.getByText(/hello/);
  expect(pokemonCard).toBeInTheDocument();

  const hpCal = document.getElementById("hpStat");
  expect(hpCal.style).toHaveProperty("width", "100%");

  const strCal = document.getElementById("strStat");
  expect(strCal.style).toHaveProperty("width", "50%");

  const weakCal = document.getElementById("weakStat");
  expect(weakCal.style).toHaveProperty("width", "100%");
});

test("is search correctly", () => {
  render(
    <Provider store={store}>
      <Modal />
    </Provider>
  );
  const searchBox = screen.getByPlaceholderText(/Find pokemon/);
  expect(searchBox).toBeInTheDocument();

  fireEvent.change(searchBox, { target: { value: "fire" } });
  expect(searchBox.value).toBe("fire");
});
