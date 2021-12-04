import { useEffect, useState } from 'react'
import getCountries from '../../services/contentService'
import { Pair } from '../../types/pair'
import Board from '../molecules/Board'

const PlayView = () => {
  const [countries, setCountries] = useState<Pair<string>[]>([])
  const [gameOver, setGameOver] = useState<boolean>(false)

  const fetchCountries = () => {
    return getCountries(8)
      .then((countriesData) => setCountries(countriesData))
      .catch((error) => console.error(error))
  }

  useEffect(() => {
    fetchCountries()
  }, [])

  return (
    <div>
      <Board countries={countries} setGameOver={setGameOver} />
      {gameOver ? (
        <div>
          You win, well done!{'\n'}
          <div
            onClick={() => {
              fetchCountries().then(() => setGameOver(false))
            }}
          >
            Play again
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default PlayView
