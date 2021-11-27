import { useEffect, useState } from 'react'
import countries from '../../services/contentService'
import Card from '../atoms/Card'
import './Board.css'

const Board = () => {
  const [boardItems, setBoardItems] = useState<string[]>([])

  useEffect(() => {
    setBoardItems(countries())
  }, [])

  return (
    <div className='board'>
      {boardItems.map((bi) => (
        <Card src={bi} />
      ))}
    </div>
  )
}

export default Board
