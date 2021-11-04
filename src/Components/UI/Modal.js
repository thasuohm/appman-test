import React, { useCallback, useEffect, useRef, useState } from "react";
import PokemonCard from "./PokemonCard";
import search from "../../search.png";
import axios from "axios";
import { connect } from "react-redux";

const Modal = (props, { myDeck }) => {
  const [pokemonCard, setPokemonCard] = useState([]);
  const [keyword, setKeyword] = useState("");
  const removeExist = useCallback(
    (pkm) => {
      let pokemon = [...pkm];
      for (let i = 0; i < props.myDeck.length; i++) {
        pokemon = pokemon.filter((pk) => pk.id !== props.myDeck[i].id);
      }
      setPokemonCard(pokemon);
    },
    [props.myDeck]
  );

  const handleKeyWord = (e) => {
    setKeyword(e.target.value);
    const ele = [
      "psychic",
      "fighting",
      "fairy",
      "normal",
      "grass",
      "metal",
      "water",
      "lightning",
      "darkness",
      "colorless",
      "fire",
    ];

    if (
      ele.indexOf(e.target.value.toLowerCase()) !== -1 ||
      ele.indexOf(keyword.toLowerCase()) !== -1
    ) {
      getPokemon("type", e.target.value);
    } else {
      getPokemon("name", e.target.value);
    }
  };

  const getPokemon = useCallback((type, key) => {
    let url = `${process.env.REACT_APP_API_URL}/cards?limit=20&`;
    if (type && key) {
      url += type + "=" + key;
    }
    axios.get(url).then((res) => {
      removeExist(res.data.cards);
    });
  }, []);

  useEffect(() => {
    getPokemon();
  }, [getPokemon]);

  useEffect(() => {
    let outSide = (event) => {
      if (modalRef.current !== null) {
        if (!modalRef.current.contains(event.target)) {
          props.close();
        }
      }
    };

    document.addEventListener("mousedown", outSide);

    return () => {
      document.addEventListener("mousedown", outSide);
    };
  });

  let modalRef = useRef();

  const removeCard = (card) => {
    setPokemonCard(pokemonCard.filter((p) => p.id !== card.id));
  };

  return (
    <div className="modalContainer">
      <div className="modalContent" ref={modalRef}>
        <div className="searchBar">
          <input
            onChange={handleKeyWord}
            value={keyword}
            placeholder="Find pokemon"
          />
        </div>
        <img src={search} alt="searchIcon" className="searchIcon hoverCursor" />
        <div className="pokemonList">
          {pokemonCard.map((pkc) => {
            return (
              <PokemonCard
                key={pkc.id}
                pkc={pkc}
                showModal={true}
                remove={removeCard}
              />
            );
          })}
          {pokemonCard.length < 1 && (
            <div className="pl-20 pt-50 f30">Sorry, We have no result </div>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    myDeck: state.deck,
  };
};

export default connect(mapStateToProps)(Modal);
