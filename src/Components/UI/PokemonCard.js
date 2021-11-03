import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import cute from "../../cute.png";
import { addToDeck, removeFromDeck } from "../../Redux/deckAction.js";

const PokemonCard = (props, { myDeck, addToDeck, removeFromDeck }) => {
  const addCard = () => {
    if (props.myDeck.length < 30) {
      props.remove(props.pkc);
      props.addToDeck(props.pkc);
    } else {
      alert("You can only contain 30 cards");
    }
  };
  const removeCard = () => {
    props.removeFromDeck(props.pkc);
  };

  const [hp, setHp] = useState(0);
  const [strength, setStrength] = useState("");
  const [weak, setWeak] = useState("");
  const [happiness, setHappiness] = useState(0);

  const calStat = useCallback(() => {
    let dmg = 0;
    let hp = 0;
    let str = 0;
    let weakness = 0;
    let happiness = 0;
    if (!props.pkc.hp || props.pkc.hp.match(/[A-Za-z]/)) {
      hp = 0;
    } else if (props.pkc.hp) {
      if (props.pkc.hp >= 100) {
        hp = 100;
      } else if(props.pkc.hp < 100 && props.pkc.hp > 0){
        hp = props.pkc.hp;
      }else {
        hp = 0;
      }
    }

    if (!props.pkc.attacks) {
      str = 0;
    } else if (props.pkc.attacks) {
      for (let i = 0; i < props.pkc.attacks.length; i++) {
        if (/[0-9]/.test(props.pkc.attacks[i].damage)) {
          var dmgIndex = parseInt(
            props.pkc.attacks[i].damage.replace(/[^0-9]/, "")
          );
          dmg += dmgIndex;
        }
      }

      if (props.pkc.attacks.length > 2 || props.pkc.attacks.length < 1) {
        str = 0;
      } else {
        str = 50 * props.pkc.attacks.length;
      }
    }

    if (!props.pkc.weaknesses) {
      weakness = 0;
    } else if (props.pkc.weaknesses) {
      if (props.pkc.weaknesses.length === 1) {
        weakness = 100;
      } else {
        weakness = 0;
      }
    }
    happiness = Math.round((hp / 10 + dmg / 10 + 10 - weakness / 100) / 5);

    setHp(hp);
    setStrength(str);
    setWeak(weakness);
    setHappiness(happiness);
  }, [props.pkc.attacks, props.pkc.hp, props.pkc.weaknesses]);

  useEffect(() => {
    calStat();
  }, [calStat]);

  return (
    <div className="cardContainer">
      <div className="cardContent">
        <div>
          <img src={props.pkc.imageUrl} alt={props.pkc.id} />
        </div>
        <div className="pl-20 pokemonInfo">
          <div className="pokemonName">{props.pkc.name}</div>
          <div className="f20 powerBarContainer">
            <span>HP</span>{" "}
            <div className="powerBar">
              <span  id="hpStat" style={{ width: `${hp}%` }}></span>
            </div>
          </div>
          <div className="f20 powerBarContainer">
            <span>STR</span>{" "}
            <div className="powerBar">
              <span id="strStat" style={{ width: `${strength}%` }}></span>
            </div>
          </div>
          <div className="f20 powerBarContainer">
            <span>Weak</span>{" "}
            <div className="powerBar">
              <span id="weakStat" style={{ width: `${weak}%` }}></span>
            </div>
          </div>

          {[...Array(happiness)].map((val, i) => {
            return <img id="cuteIcon" src={cute} alt="cute" key={i} />;
          })}
        </div>
      </div>
      {props.showModal ? (
        <div className="handleCardButton hoverCursor" onClick={addCard}>
          Add
        </div>
      ) : (
        <div className="handleCardButton hoverCursor" onClick={removeCard}>
          X
        </div>
      )}
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    myDeck: state.deck,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToDeck: (card) => dispatch(addToDeck(card)),
    removeFromDeck: (card) => dispatch(removeFromDeck(card)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PokemonCard);
