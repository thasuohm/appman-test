import React from "react";
import { connect } from "react-redux";
import PokemonCard from "./PokemonCard";

const MyDeck = ({ myDeck }) => {
  return (
    <div className="myDeck">
      {myDeck.map((card) => {
        return (
          <div className="deckItem" key={card.id}>
            <PokemonCard showModal={false} pkc={card} key={card.id} />
          </div>
        );
      })}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    myDeck: state.deck,
  };
};

export default connect(mapStateToProps)(MyDeck);
