import React, { useState } from "react";
import "./App.css";
import BottomBar from "./Components/UI/BottomBar";
import Modal from "./Components/UI/Modal";
import MyDeck from "./Components/UI/MyDeck";
import Title from "./Components/UI/Title";

const App = () => {
  const [showModal, setShowModal] = useState(false);
  const handleModal = (open) => {
    setShowModal(open);
  };

  return (
    <div className="App">
      <Title />
      {showModal && <Modal close={() => handleModal(false)} />}
      <MyDeck />
      <BottomBar
        openModal={() => {
          handleModal(true);
        }}
      />
    </div>
  );
};

export default App;
