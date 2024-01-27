import React, { useState, useEffect } from 'react';
import Board from './Board';
import ResetButton from './ResetButton';
import './SinglePlayerGame.css';


const SinglePlayerGame = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (!xIsNext && !gameOver) {
      const timeoutId = setTimeout(() => {
        makeAIMove();
      }, 500);

      return () => clearTimeout(timeoutId);
    }
  }, [xIsNext, gameOver]);

  const playClickSound = () => {
    const audio = new Audio('../../pagetrans.mp3');
    audio.play();
  };

  const minimax = (board, player) => {
    const availableMoves = emptyIndices(board);
  
    if (calculateWinner(board) === 'X') {
      return { score: -1 };
    } else if (calculateWinner(board) === 'O') {
      return { score: 1 };
    } else if (availableMoves.length === 0) {
      return { score: 0 };
    }
  
    const moves = [];
  
    for (let i = 0; i < availableMoves.length; i++) {
      const move = {};
      move.index = availableMoves[i];
  
      const newBoard = board.slice();
      newBoard[availableMoves[i]] = player;
  
      if (player === 'O') {
        const result = minimax(newBoard, 'X');
        move.score = result.score;
      } else {
        const result = minimax(newBoard, 'O');
        move.score = result.score;
      }
  
      moves.push(move);
    }
  
    let bestMove;
    if (player === 'O') {
      let bestScore = -Infinity;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score > bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score < bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    }
  
    return moves[bestMove];
  };
  
  const emptyIndices = (board) => {
    return board.reduce((acc, value, index) => {
      if (value === null) {
        acc.push(index);
      }
      return acc;
    }, []);
  };

  const handleClick = (i) => {
    if (calculateWinner(squares) || squares[i] || gameOver) {
      return;
    }

    const newSquares = squares.slice();
    newSquares[i] = 'X';
    setSquares(newSquares);
    setXIsNext(false);

    if (!calculateWinner(newSquares) && !newSquares.includes(null)) {
      setGameOver(true);
    }
  };

  const makeAIMove = () => {
    if (gameOver) {
      return;
    }
  
    const bestMove = minimax(squares, 'O').index;
  
    const newSquares = squares.slice();
    newSquares[bestMove] = 'O';
    setSquares(newSquares);
  
    if (calculateWinner(newSquares) || !newSquares.includes(null)) {
      setGameOver(true);
    } else {
      setXIsNext(true);
    }
  };

  const resetBoard = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setGameOver(false);
  };

  const winner = calculateWinner(squares);
  const status = winner
    ? `Winner: ${winner}`
    : gameOver
    ? 'It\'s a draw!'
    : `Next player: ${xIsNext ? 'X' : 'O'}`;

  return (
    <div className='def'>
      <span className='abc'>
        Single Player Mode
      </span>
      <div className="status">{status}</div>
      <Board squares={squares} onClick={handleClick} />
      <div className='spmbuttons'>
        <ResetButton onClick={() => { resetBoard(); playClickSound(); }}></ResetButton>
        <button className='link' onClick={playClickSound}>
            <a href='/' className='underlineremove'>Main Menu</a>
        </button>

      </div>
    </div>
  );
};

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

export default SinglePlayerGame;
