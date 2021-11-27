import { Outlet } from 'react-router-dom'

const MainScreen = () => {
  return (
    <div>
      <div className='title'>Memory Game</div>
      <Outlet />
    </div>
  )
}

export default MainScreen
