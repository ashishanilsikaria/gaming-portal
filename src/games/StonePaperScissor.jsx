import { useState } from 'react';
import { motion } from 'framer-motion';

const choices = ['stone', 'paper', 'scissor'];

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

    const gameResult = determineWinner(choice, computer);
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
    <div className="flex flex-col items-center space-y-8">
      <motion.h1 className="text-4xl font-bold text-primary text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        Stone Paper Scissor
      </motion.h1>

      <motion.div className="flex justify-center space-x-8 items-center" initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Player</h2>
          <div className="w-32 h-32 bg-gray-800 rounded-lg flex items-center justify-center text-4xl">
            {playerChoice ? '✊' : '?'}
          </div>
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Computer</h2>
          <div className="w-32 h-32 bg-gray-800 rounded-lg flex items-center justify-center text-4xl">
            {computerChoice ? '✊' : '?'}
          </div>
        </div>
      </motion.div>

      <motion.div className="text-3xl font-bold" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        {result === 'win' && 'You Win! 🎉'}
        {result === 'lose' && 'You Lose! 😢'}
        {result === 'draw' && "It's a Draw! 🤝"}
      </motion.div>

      <div className="flex space-x-4">
        {choices.map((choice) => (
          <motion.button
            key={choice}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="btn btn-primary capitalize"
            onClick={() => handleChoice(choice)}
          >
            {choice}
          </motion.button>
        ))}
      </div>

      <div className="text-xl">
        Score: Player {score.player} - Computer {score.computer}
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="btn btn-secondary"
        onClick={resetGame}
      >
        Reset Game
      </motion.button>
    </div>
  );
}

export default StonePaperScissor; 