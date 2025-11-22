import { useState, useEffect } from 'react';
import axios from 'axios';
import Cards from './Cards';
import { BASE_URL } from "../config";

function Found() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    axios.get(`${BASE_URL}/LFPortal/cards`)
      .then(res => setCards(res.data))
      .catch(err => console.error("Error fetching cards:", err));
  }, []);
  const foundCards = cards.filter(card => card.item === "Lost");

  return (
    <div className="container">
      <h2 className="m-5 text-center">Lost Lists</h2>
      <div className="d-flex flex-wrap gap-4">
        {foundCards.map((card, index) => (
          <Cards
            key={index}
            image={card.image}
            productName={card.productName}
            id={card._id}
          />
        ))}
      </div>
    </div>
  );
}

export default Found;
