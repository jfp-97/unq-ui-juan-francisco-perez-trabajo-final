import { Dispatch, SetStateAction, useState } from 'react'
import { useNavigate } from 'react-router'
import { Settings } from '../../App'
import Button from '../atoms/Button'
import './SettingsView.css'

interface SettingsViewProps {
  settings: Settings
  setSettings: Dispatch<SetStateAction<Settings>>
}

const SettingsView = ({ settings, setSettings }: SettingsViewProps) => {
  const [boardSize, setBoardSize] = useState(settings.boardSize)
  const [amountOfPlayers, setAmountOfPlayers] = useState(
    settings.amountOfPlayers
  )
  const navigate = useNavigate()

  return (
    <div className='settingsContainer'>
      <div className='selectContainer'>
        <div>Choose board size: </div>
        <select
          value={boardSize}
          onChange={(event) => {
            setBoardSize(parseInt(event.target.value))
          }}
        >
          <option value='4'>4x4</option>
          <option value='6'>6x6</option>
          <option value='8'>8x8</option>
        </select>
      </div>
      <div className='selectContainer'>
        <div>Choose amount of players: </div>
        <select
          value={amountOfPlayers}
          onChange={(event) => {
            setAmountOfPlayers(parseInt(event.target.value))
          }}
        >
          <option value='1'>1 player</option>
          <option value='2'>2 players</option>
        </select>
      </div>

      <Button
        text={'Play!'}
        handleClick={() => {
          setSettings({
            boardSize,
            amountOfPlayers,
          })
          navigate('/play')
        }}
      />
    </div>
  )
}

export default SettingsView
