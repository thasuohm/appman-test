import * as type from "../actionTypes";

export const addToDeck = (card) => ({
  type: type.ADD_TO_DECK,
  payload: {
    card: card,
  },
});

export const removeFromDeck = (card) => ({
  type: type.REMOVE_FROM_DECK,
  payload: {
    card: card,
  },
});
