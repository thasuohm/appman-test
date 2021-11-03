import * as type from "../actionTypes";

const INITIAL_STATE = { deck: [] };

const deckReducer = (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case type.ADD_TO_DECK:
      return { deck: [...state.deck, action.payload.card] };
    case type.REMOVE_FROM_DECK:
      return {
        deck: [...state.deck.filter((s) => s.id !== action.payload.card.id)],
      };
    default:
      return state;
  }
};

export default deckReducer;
