import { createStore } from "redux";

import deckReducer from "./deckReducer";
const store = createStore(deckReducer);

export default store;
