import { render, screen } from "@testing-library/react";
import Modal from "./Components/UI/Modal";
import React from "react";
import { Provider } from "react-redux";
import store from "./Redux/store";
import App from "./App";
import { toBeInTheDocument, toHaveProperty } from "@testing-library/jest-dom";
import { fireEvent } from "@testing-library/dom";
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

test("is render correct pokemonCard", () => {
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

  const cute = screen.queryAllByAltText("cute");
  expect(cute).toHaveLength(5);
 
});

test("is wrong search", () => {
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

test("is calStat wrong", () => {
  let mockPokemon = {
    id: "002",
    name: "testStat",
    hp: "50aaa",
    attacks: [
      {
        cost: ["Psychic", "Colorless", "Colorless"],
        name: "Psychic Burst",
        text: "for test",
        damage: "asd+",
        convertedEnergyCost: 3,
      },
      {
        cost: ["Psychic", "Colorless", "Colorless"],
        name: "Psychic Burst2",
        text: "for test",
        damage: "asd+",
        convertedEnergyCost: 3,
      },
      {
        cost: ["Psychic", "Colorless", "Colorless"],
        name: "Psychic Burst3",
        text: "for test",
        damage: "asd+",
        convertedEnergyCost: 3,
      },
    ],
  };

  render(
    <Provider store={store}>
      <PokemonCard pkc={mockPokemon} />
    </Provider>
  );

  const hpCal = document.getElementById("hpStat");
  expect(hpCal.style).toHaveProperty("width", "0%");

  const strCal = document.getElementById("strStat");
  expect(strCal.style).toHaveProperty("width", "0%");

  const weakCal = document.getElementById("weakStat");
  expect(weakCal.style).toHaveProperty("width", "0%");

  const cute = screen.queryAllByAltText("cute");
  expect(cute).toHaveLength(2);
});
