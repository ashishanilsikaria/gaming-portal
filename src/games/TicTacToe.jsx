import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [playerX, setPlayerX] = useState('Player X');
  const [playerO, setPlayerO] = useState('Player O');
  const [score, setScore] = useState({ X: 0, O: 0, Tie: 0 });
  const [showModal, setShowModal] = useState(false);

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

  const resetGame = useCallback(() => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setShowModal(false);
    setScore({ X: 0, O: 0, Tie: 0 });
  }, []);

  const resetBoard = useCallback(() => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setShowModal(false);
  }, []);

  const handleClick = (i) => {
    if (winner || board[i]) return;

    const newBoard = [...board];
    newBoard[i] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
    const gameWinner = calculateWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
      setScore((prevScore) => ({
        ...prevScore,
        [gameWinner]: prevScore[gameWinner] + 1,
      }));
      setShowModal(true);
    } else if (!newBoard.includes(null)) {
      setScore((prevScore) => ({
        ...prevScore,
        Tie: prevScore.Tie + 1,
      }));
      setShowModal(true);
    }
  };

  const renderSquare = (i) => (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`tic-tac-toe-square ${board[i] === 'X' ? 'x-mark' : ''} ${board[i] === 'O' ? 'o-mark' : ''} ${!board[i] ? (isXNext ? 'cursor-x' : 'cursor-o') : ''}`}
      onClick={() => handleClick(i)}
    >
      {board[i]}
    </motion.button>
  );

  return (
    <div className="game-container">
      <motion.h1 className="game-title" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        Tic Tac Toe
      </motion.h1>

      <div className="player-names">
        <motion.input
          type="text"
          value={playerX}
          onChange={(e) => setPlayerX(e.target.value)}
          className={`input player-input ${isXNext ? 'active' : ''}`}
          placeholder="Player X Name"
          whileFocus={{ scale: 1.05 }}
        />
        <motion.input
          type="text"
          value={playerO}
          onChange={(e) => setPlayerO(e.target.value)}
          className={`input player-input ${!isXNext ? 'active' : ''}`}
          placeholder="Player O Name"
          whileFocus={{ scale: 1.05 }}
        />
      </div>

      <motion.div className="tic-tac-toe-grid" initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </motion.div>

      <div className="text-2xl font-semibold mt-4">
        {winner ? `Winner: ${winner === 'X' ? playerX : playerO}` : ''}
      </div>

      <div className="score-table">
        <table>
          <thead>
            <tr>
              <th>{playerX}</th>
              <th>Tie</th>
              <th>{playerO}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{score.X}</td>
              <td>{score.Tie}</td>
              <td>{score.O}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="btn btn-secondary mt-4"
        onClick={resetGame}
      >
        Reset
      </motion.button>

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="game-over-modal"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="modal-content"
            >
              <h2 className="modal-title">Game Over!</h2>
              <p className="modal-winner">
                {!board.includes(null) ? "It's a Tie!" : `${winner === 'X' ? playerX : playerO} wins!`}
              </p>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="btn btn-secondary mt-4"
                onClick={resetBoard}
              >
                Play Again
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default TicTacToe; 