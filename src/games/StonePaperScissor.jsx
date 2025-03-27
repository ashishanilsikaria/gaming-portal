import { useState } from 'react';
import { motion } from 'framer-motion';

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
  };

  const resetGame = () => {
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult(null);
    setScore({ player: 0, computer: 0 });
  };

  return (
    <div className="flex flex-col items-center space-y-8 p-8 bg-gray-900 rounded-xl shadow-2xl">
      <motion.h1 
        className="text-5xl font-bold text-primary text-center mb-8" 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }}
      >
        Stone Paper Scissor
      </motion.h1>

      <motion.div 
        className="flex justify-center space-x-12 items-center bg-gray-800 p-8 rounded-xl" 
        initial={{ scale: 0.8 }} 
        animate={{ scale: 1 }} 
        transition={{ duration: 0.5 }}
      >
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4 text-white">Player</h2>
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

      <motion.div 
        className="text-4xl font-bold text-center p-4 rounded-lg" 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 1 }}
      >
        {result === 'win' && <span className="text-green-500">You Win! 🎉</span>}
        {result === 'lose' && <span className="text-red-500">You Lose! 😢</span>}
        {result === 'draw' && <span className="text-yellow-500">It's a Draw! 🤝</span>}
      </motion.div>

      <div className="flex space-x-6">
        {choices.map((choice) => (
          <motion.button
            key={choice.name}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="btn btn-primary capitalize text-2xl p-6 rounded-xl bg-gray-700 hover:bg-gray-600 transition-colors"
            onClick={() => handleChoice(choice)}
          >
            {choice.emoji}
          </motion.button>
        ))}
      </div>

      <div className="text-2xl font-semibold text-white bg-gray-800 px-8 py-4 rounded-lg">
        Score: <span className="text-green-500">{score.player}</span> - <span className="text-red-500">{score.computer}</span>
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="btn btn-secondary text-lg px-8 py-3"
        onClick={resetGame}
      >
        Reset Game
      </motion.button>
    </div>
  );
}

export default StonePaperScissor; 