import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import TicTacToe from './games/TicTacToe';
import StonePaperScissor from './games/StonePaperScissor';
import Game2048 from './games/Game2048';

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <nav>
          <div className="container nav-container">
            <Link to="/" className="nav-logo">
              Gaming Portal
            </Link>
            <div className="nav-links">
              <Link to="/tic-tac-toe" className="btn btn-primary">Tic Tac Toe</Link>
              <Link to="/stone-paper-scissor" className="btn btn-primary">Stone Paper Scissor</Link>
              <Link to="/2048" className="btn btn-primary">2048</Link>
            </div>
          </div>
        </nav>

        <main className="container">
          <Routes>
            <Route path="/" element={
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="game-grid"
              >
                <Link to="/tic-tac-toe" className="game-card">
                  <h2>Tic Tac Toe</h2>
                  <p>Classic X's and O's game</p>
                </Link>
                <Link to="/stone-paper-scissor" className="game-card">
                  <h2>Stone Paper Scissor</h2>
                  <p>Test your luck against the computer</p>
                </Link>
                <Link to="/2048" className="game-card">
                  <h2>2048</h2>
                  <p>Slide and merge numbers to reach 2048</p>
                </Link>
              </motion.div>
            } />
            <Route path="/tic-tac-toe" element={<TicTacToe />} />
            <Route path="/stone-paper-scissor" element={<StonePaperScissor />} />
            <Route path="/2048" element={<Game2048 />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
