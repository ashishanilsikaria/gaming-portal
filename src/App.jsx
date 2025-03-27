import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { motion } from "framer-motion";
import TicTacToe from "./games/TicTacToe";
import StonePaperScissor from "./games/StonePaperScissor";
import Game2048 from "./games/Game2048";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100">
        <nav className="bg-white/80 backdrop-blur-sm shadow-lg">
          <div className="container nav-container">
            <Link to="/" className="nav-logo text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300">
              🎮 Gaming Portal 🎮
            </Link>
            <div className="nav-links">
              <Link to="/tic-tac-toe" className="btn btn-primary hover:scale-105 hover:rotate-1 transition-all duration-300 cursor-tic-tac-toe">
                Tic Tac Toe
              </Link>
              <Link to="/stone-paper-scissor" className="btn btn-primary hover:scale-105 hover:-rotate-1 transition-all duration-300 cursor-stone-paper-scissor">
                Stone Paper Scissor
              </Link>
              <Link to="/2048" className="btn btn-primary hover:scale-105 hover:rotate-1 transition-all duration-300 cursor-2048">
                2048
              </Link>
            </div>
          </div>
        </nav>

        <main className="container py-8">
          <Routes>
            <Route
              path="/"
              element={
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="game-grid gap-6"
                >
                  <Link to="/tic-tac-toe" className="game-card hover:shadow-xl hover:scale-105 hover:-rotate-1 transition-all duration-300 bg-white/90 backdrop-blur-sm group cursor-tic-tac-toe">
                    <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300" />
                    <h2 className="text-2xl font-bold mb-2 group-hover:text-purple-600 transition-colors duration-300">Tic Tac Toe</h2>
                    <p className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300">Classic X's and O's game </p>
                  </Link>
                  <Link to="/stone-paper-scissor" className="game-card hover:shadow-xl hover:scale-105 hover:rotate-1 transition-all duration-300 bg-white/90 backdrop-blur-sm group cursor-stone-paper-scissor">
                    <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300" />
                    <h2 className="text-2xl font-bold mb-2 group-hover:text-purple-600 transition-colors duration-300">Stone Paper Scissor</h2>
                    <p className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300">Test your luck against the computer </p>
                  </Link>
                  <Link to="/2048" className="game-card hover:shadow-xl hover:scale-105 hover:-rotate-1 transition-all duration-300 bg-white/90 backdrop-blur-sm group cursor-2048">
                    <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300" />
                    <h2 className="text-2xl font-bold mb-2 group-hover:text-purple-600 transition-colors duration-300">2048</h2>
                    <p className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300">Slide and merge numbers to reach 2048 </p>
                  </Link>
                </motion.div>
              }
            />
            <Route path="/tic-tac-toe" element={<TicTacToe />} />
            <Route
              path="/stone-paper-scissor"
              element={<StonePaperScissor />}
            />
            <Route path="/2048" element={<Game2048 />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
