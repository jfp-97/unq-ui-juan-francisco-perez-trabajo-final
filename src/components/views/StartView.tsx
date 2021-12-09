import { Dispatch, SetStateAction } from 'react'
import { useNavigate } from 'react-router-dom'
import { Settings } from '../../App'
import Button from '../atoms/Button'

interface StartViewProps {
  setSettings: Dispatch<SetStateAction<Settings>>
}

const StartView = ({ setSettings }: StartViewProps) => {
  const navigate = useNavigate()
  return (
    <div className='buttonContainer'>
      <Button
        text={'Quick game'}
        handleClick={() => {
          setSettings((s: Settings) => ({
            ...s,
            boardSize: 4,
            amountOfPlayers: 1,
          }))
          navigate('/play')
        }}
      />
      <Button
        text={'Personalized game'}
        handleClick={() => {
          navigate('/settings')
        }}
      />
    </div>
  )
}

export default StartView
