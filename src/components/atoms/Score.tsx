import './Score.css'

interface ScoreProps {
  color: string
  player: number
  score: number
}

const Score = (props: ScoreProps) => {
  return (
    <div className={`score score-${props.color}`}>
      Player {props.player} score: {props.score}
    </div>
  )
}

export default Score
