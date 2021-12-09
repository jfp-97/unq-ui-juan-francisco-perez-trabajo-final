import Score from '../atoms/Score'
import './ScoreBoard.css'

interface ScoreBoardProps {
  currentPlayer: number
}

const ScoreBoard = (props: ScoreBoardProps) => {
  return (
    <div className='scoreBoardContainer'>
      <div className='currentPlayer'>
        Current turn:
        <div className='score-red currentPlayer'>
          Player {props.currentPlayer}
        </div>
      </div>
      <div className='scoreBoard'>
        <Score player={1} score={0} color={'green'} />
        <Score player={2} score={0} color={'red'} />
      </div>
    </div>
  )
}

export default ScoreBoard
