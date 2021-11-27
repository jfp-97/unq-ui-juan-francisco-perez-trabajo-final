import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import MainScreen from './components/screens/MainScreen'
import PlayView from './components/views/PlayView'
import StartView from './components/views/StartView'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainScreen />}>
            <Route index element={<StartView />} />
            <Route path='play' element={<PlayView />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
