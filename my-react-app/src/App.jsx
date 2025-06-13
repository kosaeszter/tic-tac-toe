import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from "./pages/Home";
import PlayAI from  './pages/PlayAI'
import PlayFriend from "./pages/PlayFriend";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/play-ai" element={<PlayAI />} />
        <Route path="/play-friend" element={<PlayFriend />} />
      </Routes>
    </Router>
  )
}

export default App
