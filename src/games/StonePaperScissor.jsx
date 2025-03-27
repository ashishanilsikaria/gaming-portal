import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const choices = [
  { name: 'stone', emoji: '✊' },
  { name: 'paper', emoji: '✋' },
  { name: 'scissor', emoji: '✂️' }
];

function StonePaperScissor() {
  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState(null);
  const [score, setScore] = useState({ player: 0, computer: 0 });
  const [showModal, setShowModal] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [playerName, setPlayerName] = useState('Player');

  const getComputerChoice = () => {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
  };

  const determineWinner = (player, computer) => {
    if (player === computer) return 'draw';
    if (
      (player === 'stone' && computer === 'scissor') ||
      (player === 'paper' && computer === 'stone') ||
      (player === 'scissor' && computer === 'paper')
    ) {
      return 'win';
    }
    return 'lose';
  };

  const handleChoice = (choice) => {
    const computer = getComputerChoice();
    setPlayerChoice(choice);
    setComputerChoice(computer);

    const gameResult = determineWinner(choice.name, computer.name);
    setResult(gameResult);

    if (gameResult === 'win') {
      setScore(prev => ({ ...prev, player: prev.player + 1 }));
    } else if (gameResult === 'lose') {
      setScore(prev => ({ ...prev, computer: prev.computer + 1 }));
    }
    setShowModal(true);
  };

  const resetGame = useCallback(() => {
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult(null);
    setShowModal(false);
  }, []);

  useEffect(() => {
    let timer;
    if (showModal) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            clearInterval(timer);
            resetGame();
            return 3;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [showModal, resetGame]);

  return (
    <div className="game-container">
      <motion.h1 
        className="game-title" 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 1 }}
      >
        Stone Paper Scissor
      </motion.h1>

      <div className="flex space-x-4 mb-4">
        <motion.input
          type="text"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          className="input"
          placeholder="Player Name"
          whileFocus={{ scale: 1.05 }}
        />
      </div>

      <motion.div 
        className="flex justify-center space-x-12 items-center bg-gray-800 p-8 rounded-xl" 
        initial={{ scale: 0.8 }} 
        animate={{ scale: 1 }} 
        transition={{ duration: 0.5 }}
      >
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4 text-white">{playerName}</h2>
          <div className="w-40 h-40 bg-gray-700 rounded-lg flex items-center justify-center text-6xl shadow-lg">
            {playerChoice ? playerChoice.emoji : '❓'}
          </div>
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4 text-white">Computer</h2>
          <div className="w-40 h-40 bg-gray-700 rounded-lg flex items-center justify-center text-6xl shadow-lg">
            {computerChoice ? computerChoice.emoji : '❓'}
          </div>
        </div>
      </motion.div>

      <div className="text-2xl font-semibold mt-4">
        Score: {playerName} {score.player} - Computer {score.computer}
      </div>

      <div className="flex space-x-6 mt-4">
        {choices.map((choice) => (
          <motion.button
            key={choice.name}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="btn btn-primary capitalize text-2xl p-6 rounded-xl"
            onClick={() => handleChoice(choice)}
          >
            {choice.emoji}
          </motion.button>
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="btn btn-secondary mt-4"
        onClick={resetGame}
      >
        Reset Game
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
              <h2>Round Over!</h2>
              <p className="text-xl mb-4">
                {result === 'win' && `${playerName} wins!`}
                {result === 'lose' && 'Computer wins!'}
                {result === 'draw' && "It's a draw!"}
              </p>
              <p className="text-gray-600">
                Starting new round in {countdown} seconds...
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default StonePaperScissor; 