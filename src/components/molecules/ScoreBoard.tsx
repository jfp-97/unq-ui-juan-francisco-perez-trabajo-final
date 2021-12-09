import Score from '../atoms/Score'
import './ScoreBoard.css'

interface ScoreBoardProps {
  currentPlayer: number
  scores: number[]
}

const ScoreBoard = (props: ScoreBoardProps) => {
  const colors = ['green', 'red']

  return (
    <div className='scoreBoardContainer'>
      <div className='currentPlayer'>
        Current turn:
        <div className={`currentPlayer score-${colors[props.currentPlayer]}`}>
          Player {props.currentPlayer + 1}
        </div>
      </div>
      <div className='scoreBoard'>
        <Score player={1} score={props.scores[0]} color={colors[0]} />
        <Score player={2} score={props.scores[1]} color={colors[1]} />
      </div>
    </div>
  )
}

export default ScoreBoard
