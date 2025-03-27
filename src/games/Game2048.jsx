import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function Game2048() {
  const [board, setBoard] = useState(Array(4).fill().map(() => Array(4).fill(0)));
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const initializeBoard = useCallback(() => {
    const newBoard = Array(4).fill().map(() => Array(4).fill(0));
    addNewTile(newBoard);
    addNewTile(newBoard);
    return newBoard;
  }, []);

  const addNewTile = useCallback((board) => {
    const emptyCells = [];
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (board[i][j] === 0) {
          emptyCells.push({ x: i, y: j });
        }
      }
    }
    if (emptyCells.length > 0) {
      const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      board[randomCell.x][randomCell.y] = Math.random() < 0.9 ? 2 : 4;
    }
  }, []);

  const moveTiles = useCallback((direction) => {
    if (gameOver) return;

    const newBoard = board.map(row => [...row]);
    let moved = false;

    const move = (row, col, nextRow, nextCol) => {
      if (newBoard[nextRow][nextCol] === 0) {
        newBoard[nextRow][nextCol] = newBoard[row][col];
        newBoard[row][col] = 0;
        return true;
      }
      if (newBoard[nextRow][nextCol] === newBoard[row][col]) {
        newBoard[nextRow][nextCol] *= 2;
        newBoard[row][col] = 0;
        setScore(prev => prev + newBoard[nextRow][nextCol]);
        return true;
      }
      return false;
    };

    if (direction === 'left' || direction === 'right') {
      for (let i = 0; i < 4; i++) {
        for (let j = direction === 'left' ? 1 : 2; direction === 'left' ? j < 4 : j >= 0; direction === 'left' ? j++ : j--) {
          if (newBoard[i][j] !== 0) {
            let currentCol = j;
            while (direction === 'left' ? currentCol > 0 : currentCol < 3) {
              const nextCol = direction === 'left' ? currentCol - 1 : currentCol + 1;
              if (move(i, currentCol, i, nextCol)) {
                moved = true;
                currentCol = nextCol;
              } else break;
            }
          }
        }
      }
    } else {
      for (let j = 0; j < 4; j++) {
        for (let i = direction === 'up' ? 1 : 2; direction === 'up' ? i < 4 : i >= 0; direction === 'up' ? i++ : i--) {
          if (newBoard[i][j] !== 0) {
            let currentRow = i;
            while (direction === 'up' ? currentRow > 0 : currentRow < 3) {
              const nextRow = direction === 'up' ? currentRow - 1 : currentRow + 1;
              if (move(currentRow, j, nextRow, j)) {
                moved = true;
                currentRow = nextRow;
              } else break;
            }
          }
        }
      }
    }

    if (moved) {
      addNewTile(newBoard);
      setBoard(newBoard);
      checkGameOver(newBoard);
    }
  }, [board, gameOver, addNewTile]);

  const checkGameOver = useCallback((board) => {
    // Check for empty cells
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (board[i][j] === 0) return;
      }
    }

    // Check for possible merges
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (j < 3 && board[i][j] === board[i][j + 1]) return;
        if (i < 3 && board[i][j] === board[i + 1][j]) return;
      }
    }

    setGameOver(true);
    setShowModal(true);
  }, []);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!gameOver) {
        switch (e.key) {
          case 'ArrowLeft':
            moveTiles('left');
            break;
          case 'ArrowRight':
            moveTiles('right');
            break;
          case 'ArrowUp':
            moveTiles('up');
            break;
          case 'ArrowDown':
            moveTiles('down');
            break;
          default:
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [moveTiles, gameOver]);

  useEffect(() => {
    let timer;
    if (showModal) {
      timer = setTimeout(() => {
        resetGame();
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [showModal]);

  const resetGame = useCallback(() => {
    setBoard(initializeBoard());
    setScore(0);
    setGameOver(false);
    setShowModal(false);
  }, [initializeBoard]);

  return (
    <div className="game-container">
      <h1 className="game-title">2048</h1>

      <div className="flex justify-between items-center w-full max-w-[400px] mx-auto mb-8">
        <div className="text-2xl font-semibold text-center">Score: {score}</div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn btn-secondary"
          onClick={resetGame}
        >
          Reset Game
        </motion.button>
      </div>

      <div className="game-2048-grid">
        {board.map((row, i) =>
          row.map((cell, j) => (
            <motion.div
              key={`tile-${i}-${j}-${cell}`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
              className={`tile tile-${cell}`}
            >
              {cell !== 0 && cell}
            </motion.div>
          ))
        )}
      </div>

      <div className="text-center text-gray-400 mt-8">
        Use arrow keys to move tiles
      </div>

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
              <h2>Game Over!</h2>
              <p className="text-xl mb-4">
                Final Score: {score}
              </p>
              <p className="text-gray-600">
                Starting new game in 3 seconds...
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Game2048; 