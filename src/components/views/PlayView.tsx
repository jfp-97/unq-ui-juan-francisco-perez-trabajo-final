import { useEffect, useState } from 'react'
import { Settings } from '../../App'
import getCountries from '../../services/contentService'
import { Pair } from '../../types/pair'
import Button from '../atoms/Button'
import Board from '../molecules/Board'
import ScoreBoard from '../molecules/ScoreBoard'
import './PlayView.css'

interface PlayViewProps {
  settings: Settings
}

const PlayView = (props: PlayViewProps) => {
  const [countries, setCountries] = useState<Pair<string>[]>([])
  const [gameOver, setGameOver] = useState<boolean>(false)
  const [currentPlayer, setCurrentPlayer] = useState<number>(0)
  const boardSize = props.settings.boardSize
  const [scores, setScores] = useState<number[]>([0, 0])

  const advanceTurn = () => {
    setCurrentPlayer((current: number) => (current === 1 ? 0 : 1))
  }
  const currentPlayerScored = () => {
    setScores((scores) =>
      scores.map((score, index) => score + (index === currentPlayer ? 1 : 0))
    )
  }

  const fetchCountries = (size: number) => {
    return getCountries((size * size) / 2)
      .then((countriesData) => setCountries(countriesData))
      .catch((error) => console.error(error))
  }

  useEffect(() => {
    fetchCountries(boardSize)
  }, [boardSize])

  return (
    <div>
      {props.settings.amountOfPlayers > 1 ? (
        <ScoreBoard currentPlayer={currentPlayer} scores={scores} />
      ) : null}

      <Board
        boardSize={boardSize}
        countries={countries}
        setGameOver={setGameOver}
        advanceTurn={advanceTurn}
        currentPlayerScored={currentPlayerScored}
      />
      {gameOver ? (
        <div className='board-footer'>
          You win, well done!{'\n'}
          <Button
            handleClick={() => {
              fetchCountries(boardSize).then(() => setGameOver(false))
            }}
            text='Play again'
          />
        </div>
      ) : null}
    </div>
  )
}

export default PlayView
