import { useEffect, useState } from 'react'
import countries from '../../services/contentService'
import { Pair } from '../../types/pair'
import Card from '../atoms/Card'
import './Board.css'

interface BoardItem {
  pair?: BoardItem
  src: string
  covered: boolean
  toggle: () => void
}

const Board = () => {
  const [boardItems, setBoardItems] = useState<BoardItem[]>([])
  const [boardLocked, setBoardLocked] = useState(false)

  const shortLock = () => {
    setBoardLocked(true)
    setTimeout(() => {
      setBoardLocked(false)
    }, 2000)
  }

  const getBoardItemPair = (aSrc: string, bSrc: string): Pair<BoardItem> => {
    const pairA: BoardItem = {
      src: aSrc,
      covered: true,
      toggle: () => {},
    }
    const pairB: BoardItem = {
      src: bSrc,
      covered: true,
      toggle: () => {},
    }

    return {
      a: {
        ...pairA,
        pair: pairB,
        toggle: () => {
          if (boardLocked) return
          setBoardItems(
            boardItems.map((bi: BoardItem) =>
              bi.pair === pairB ? { ...bi, covered: false } : bi
            )
          )
        },
      },
      b: {
        ...pairB,
        pair: pairA,
      },
    }
  }

  useEffect(() => {
    countries(8).then((countries) => {
      setBoardItems(
        [...countries]
          .map(
            (countryPair: Pair<string>): Pair<BoardItem> =>
              getBoardItemPair(countryPair.a, countryPair.b)
          )
          .reduce(
            (arr: BoardItem[], elem) => arr.concat(elem.a).concat(elem.b),
            []
          )
          .sort(() => Math.random() - Math.random())
      )
    })
  }, [])

  const handleClick = (boardItem: BoardItem) => () => {
    boardItem.toggle()
    shortLock()
  }

  return (
    <div className='board'>
      {boardItems.map((bi, index) => (
        <Card
          key={index}
          src={bi.src}
          boardLocked={boardLocked}
          handleClick={handleClick(bi)}
        />
      ))}
    </div>
  )
}

export default Board
