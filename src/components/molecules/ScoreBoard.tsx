import Score from '../atoms/Score'
import './ScoreBoard.css'

interface ScoreBoardProps {
  currentPlayer: number
  scores: number[]
  colors: string[]
}

const ScoreBoard = (props: ScoreBoardProps) => {
  return (
    <div className='scoreBoardContainer'>
      <div className='player'>
        Current turn:
        <div className={`player score-${props.colors[props.currentPlayer]}`}>
          Player {props.currentPlayer + 1}
        </div>
      </div>
      <div className='scoreBoard'>
        <Score player={1} score={props.scores[0]} color={props.colors[0]} />
        <Score player={2} score={props.scores[1]} color={props.colors[1]} />
      </div>
    </div>
  )
}

export default ScoreBoard
