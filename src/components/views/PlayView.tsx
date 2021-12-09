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
  const boardSize = props.settings.boardSize

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
        <ScoreBoard currentPlayer={1} />
      ) : null}

      <Board
        boardSize={boardSize}
        countries={countries}
        setGameOver={setGameOver}
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
