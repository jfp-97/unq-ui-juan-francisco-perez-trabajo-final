import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import MainScreen from './components/screens/MainScreen'
import PlayView from './components/views/PlayView'
import SettingsView from './components/views/SettingsView'
import StartView from './components/views/StartView'

export interface Settings {
  boardSize: number
}

const App = () => {
  const [settings, setSettings] = useState<Settings>({ boardSize: 4 })
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainScreen />}>
            <Route index element={<StartView setSettings={setSettings} />} />
            <Route path='play' element={<PlayView settings={settings} />} />
            <Route
              path='settings'
              element={<SettingsView setSettings={setSettings} />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
