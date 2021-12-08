import { Outlet, useNavigate } from 'react-router-dom'

const MainScreen = () => {
  const navigate = useNavigate()

  return (
    <div>
      <div
        className='title'
        onClick={() => {
          navigate('/')
        }}
      >
        Memory Game
      </div>
      <Outlet />
    </div>
  )
}

export default MainScreen
