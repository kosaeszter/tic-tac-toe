import { useNavigate } from 'react-router-dom'
import '../App.css'

function Home() {
  const navigate = useNavigate()

  return (
    <>
       <div className="title">Who would you like to play with?</div>
             <div className="player-container">
      <div className="playermod" onClick={() => navigate('/settings', { state: { mode: 'ai' } })}>
        <div>PLAY WITH AI</div>
        <img className="playermode-img" src="/assets/robot.png" alt="" />
      </div>

      <div className="playermod" onClick={() => navigate('/settings', { state: { mode: 'friend' } })}>
        <div>PLAY WITH A FRIEND</div>
        <img className="playermode-img" src="/assets/multiplayer.png" alt="" />
      </div>
      </div>
    </>
  )
}

export default Home
