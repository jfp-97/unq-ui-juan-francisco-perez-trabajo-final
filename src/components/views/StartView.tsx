import { useNavigate } from 'react-router-dom'
import Button from '../atoms/Button'

const StartView = () => {
  const navigate = useNavigate()
  return (
    <div className='buttonContainer'>
      <Button
        text={'Quick game'}
        handleClick={() => {
          navigate('/play')
        }}
      />
      <Button
        text={'Personalized game'}
        handleClick={() => {
          navigate('/play')
        }}
      />
    </div>
  )
}

export default StartView
