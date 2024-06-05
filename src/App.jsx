import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import './App.css'
import Hand from './view/Hand';
import { dealerRound, newGame, nextCard, playerFinished } from '../actions';

function App() {
  const dispatch = useDispatch();
  const handOfDealer = useSelector((state) => state.dealer);
  const handOfPlayer = useSelector((state) => state.player);
  const isPlayerDone = useSelector((state) => state.isPlayerRoundDone);
  const isGameStarted = useSelector((state) => state.isGameStarted);
  const winner = useSelector((state) => state.roundWinner);
  const playerWin = useSelector((state) => state.playerWinnings);
  const dealerWin = useSelector((state) => state.dealerWinnings);

  const restartGame = () => {
    dispatch(newGame());
  }

  const getNewCard = () => {
    dispatch(nextCard());
  }

  const stopPlayer = () => {
    dispatch(playerFinished());
  }

  const playDealer = () => {
    dispatch(dealerRound());
  }

  return (
    <div className='container'>
      <h1>Simple Blackjack</h1>
      {isGameStarted ? <>
        <Hand cards={handOfDealer}></Hand>
        <h2>Dealer ({dealerWin}):</h2>
        <button disabled={!isPlayerDone || winner} onClick={playDealer}>Play Dealer</button>
        <h2>Player ({playerWin}):</h2>
        <Hand cards={handOfPlayer}></Hand>
        <button disabled={isPlayerDone} onClick={getNewCard}>Get New Card</button>
        <button disabled={isPlayerDone} onClick={stopPlayer}>Stop</button>
        <button onClick={restartGame}>New Game</button>
        {winner && (<p className='result'>{winner} won!</p>)}</> : <><button onClick={restartGame}>New Game</button></>}
    </div>
  )
}

export default App
