import { createStore } from "@reduxjs/toolkit";
import { _ } from "lodash";
import { getValueOfCards } from "../utils/blackJackUtils";

const initialState = {
  deck: [],
  player: [],
  dealer: [],
  isGameStarted: false,
  isPlayerRoundDone: false,
  roundWinner: null,
  playerWinnings: 0,
  dealerWinnings: 0
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case "NEW_GAME":
      let newDeck = [];
      for (let i = 0; i < 51; i++) {
        newDeck.push(i);
      }
      let shuffleDeck = _.shuffle(newDeck);
      console.log(shuffleDeck);
      return {
        ...state, player: [], dealer: [], deck: shuffleDeck, isGameStarted: true, isPlayerRoundDone: false, roundWinner: null
      };
    case "NEXT_CARD":
      let newPlayerHand = [...state.player, state.deck[state.deck.length - 1]];
      let newDeckAfterCard = state.deck.slice(0, state.deck.length - 1);
      if (getValueOfCards(newPlayerHand) > 21) {
        return { ...state, deck: newDeckAfterCard, isPlayerRoundDone: true, player: newPlayerHand, roundWinner: "Dealer", dealerWinnings: state.dealerWinnings + 1 }
      }
      return { ...state, deck: newDeckAfterCard, player: newPlayerHand };
    case "PLAYER_FINISHED":
      return { ...state, isPlayerRoundDone: true };
    case "DEALER_ROUND":
      let newDealerHand = [...state.dealer, state.deck[state.deck.length - 1]];
      let newDeckAfterDealerCard = state.deck.slice(0, state.deck.length - 1);
      if (getValueOfCards(newDealerHand) > 16 && getValueOfCards(newDealerHand) < 21) {
        if (getValueOfCards(state.player) > getValueOfCards(newDealerHand)) {
          return { ...state, deck: newDeckAfterDealerCard, isPlayerRoundDone: true, dealer: newDealerHand, roundWinner: "Player", playerWinnings: state.playerWinnings + 1 }
        } else {
          return { ...state, deck: newDeckAfterDealerCard, isPlayerRoundDone: true, dealer: newDealerHand, roundWinner: "Dealer", dealerWinnings: state.dealerWinnings + 1 }
        }
      }
      if (getValueOfCards(newDealerHand) > 21) {
        return { ...state, deck: newDeckAfterDealerCard, isPlayerRoundDone: true, dealer: newDealerHand, roundWinner: "Player", playerWinnings: state.playerWinnings + 1 }
      }
      return { ...state, deck: newDeckAfterDealerCard, dealer: newDealerHand };
    default:
      return state;
  }
}

export const store = createStore(reducer);
