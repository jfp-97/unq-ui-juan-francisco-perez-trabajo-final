import { useEffect, useState } from 'react'
import getCountries from '../../services/contentService'
import { Pair } from '../../types/pair'
import Button from '../atoms/Button'
import Board from '../molecules/Board'
import './PlayView.css'

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
      {true || gameOver ? (
        <div className='board-footer'>
          You win, well done!{'\n'}
          <Button
            handleClick={() => {
              fetchCountries().then(() => setGameOver(false))
            }}
            text='Play again'
          />
        </div>
      ) : null}
    </div>
  )
}

export default PlayView
