import { Dispatch, SetStateAction, useState } from 'react'
import { useNavigate } from 'react-router'
import { Settings } from '../../App'
import Button from '../atoms/Button'

interface SettingsViewProps {
  setSettings: Dispatch<SetStateAction<Settings>>
}

const SettingsView = ({ setSettings }: SettingsViewProps) => {
  const [size, setSize] = useState<number>(0)
  const navigate = useNavigate()

  return (
    <div>
      <select
        value={size}
        onChange={(event) => {
          const newSize = parseInt(event.target.value)
          setSize(newSize)
          setSettings((s: Settings) => ({ ...s, boardSize: newSize }))
        }}
      >
        <option value='4'>4x4</option>
        <option value='6'>6x6</option>
        <option value='8'>8x8</option>
      </select>

      <Button
        text={'Play!'}
        handleClick={() => {
          navigate('/play')
        }}
      />
    </div>
  )
}

export default SettingsView
