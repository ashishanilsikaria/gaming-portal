import { useState, useEffect, useCallback } from 'react';
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
  const [playerName, setPlayerName] = useState('Mehul');

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

  const resetGame = useCallback(() => {
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult(null);
    setScore({ player: 0, computer: 0 });
  }, []);

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

      <div className="player-names">
        <motion.input
          type="text"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          className="input player-input active"
          placeholder="Player Name"
          whileFocus={{ scale: 1.05 }}
        />
      </div>
      
      <div className="choice-buttons">
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

      <motion.div
        className="choice-container"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="choice-box">
          <h2 className="text-2xl font-semibold mb-4 text-white">{playerName}</h2>
          <div className="choice-display">
            {playerChoice ? playerChoice.emoji : '❓'}
          </div>
        </div>
        <div className="choice-box">
          <h2 className="text-2xl font-semibold mb-4 text-white">Computer</h2>
          <div className="choice-display">
            {computerChoice ? computerChoice.emoji : '❓'}
          </div>
        </div>
      </motion.div>

      <div className="score-table">
        <table>
          <thead>
            <tr>
              <th>{playerName}</th>
              <th>Computer</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{score.player}</td>
              <td>{score.computer}</td>
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
    </div>
  );
}

export default StonePaperScissor; 