import React, { Component } from "react";
import Card from "./Card";
import axios from "axios";
import "./Deck.css";
class Deck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deck_id: null,
      drawn: [],
    };
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    const getId = async () => {
      const data = await axios.get(
        "https://deckofcardsapi.com/api/deck/new/shuffle"
      );

      this.setState({
        deck_id: data.data.deck_id,
      });
    };
    getId();
  }

  handleClick() {
    const getCard = async () => {
      let imgData = await axios.get(
        `https://deckofcardsapi.com/api/deck/${this.state.deck_id}/draw/`
      );

      if (imgData.data.success === false) {
        alert("NO Cards Left");
        return;
      }

      this.setState((state) => ({
        drawn: [
          ...state.drawn,
          {
            id: imgData.data.cards[0].code,
            imgUrl: imgData.data.cards[0].image,
            name: `${imgData.data.cards[0].value} of ${imgData.data.cards[0].suit}`,
          },
        ],
      }));
    };
    getCard();
  }

  render() {
    return (
      <div className="Deck">
        <h1 className="Deck-title">Card Dealer</h1>
        <h2 className="Deck-title subtitle">A little demo made with react</h2>
        <button className="deck-btn" onClick={this.handleClick}>
          Get New Card
        </button>
        <div className="Deck-cardarea">
          {this.state.drawn.map((ele) => (
            <Card imgInfo={ele} />
          ))}
        </div>
      </div>
    );
  }
}

export default Deck;
