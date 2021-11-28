import { useEffect, useState } from 'react'
import getCountries from '../../services/contentService'
import { Pair } from '../../types/pair'
import Card from '../atoms/Card'
import './Board.css'

interface BoardItem {
  id: string
  pairId: string
  src: string
  covered: boolean
  done: boolean
  toggle: () => void
}

const Board = () => {
  const [boardItems, setBoardItems] = useState<BoardItem[]>([])
  const [boardLocked, setBoardLocked] = useState(false)
  const [awaitingPlay, setAwaitingPlay] = useState(false)

  useEffect(() => {
    const getBoardItemPair = (
      aSrc: string,
      bSrc: string,
      index: number
    ): Pair<BoardItem> => {
      const isPairUncovered = (boardItems: BoardItem[], pairId: string) =>
        boardItems.some((bi: BoardItem) => bi.id === pairId && !bi.covered)

      const setBothAsDone = (
        boardItems: BoardItem[],
        id: string,
        pairId: string
      ) =>
        boardItems.map((bi: BoardItem) =>
          bi.id === id || bi.id === pairId
            ? { ...bi, done: true, covered: false }
            : bi
        )

      const setSelfAsCovered = (boardItems: BoardItem[], id: string) =>
        boardItems.map((bi: BoardItem) =>
          bi.id === id ? { ...bi, covered: false } : bi
        )

      const handleToggle = (id: string, pairId: string) => () => {
        setBoardItems((boardItems) =>
          isPairUncovered(boardItems, pairId)
            ? setBothAsDone(boardItems, id, pairId)
            : setSelfAsCovered(boardItems, id)
        )
      }

      const aId: string = index + 'a'
      const bId: string = index + 'b'

      return {
        a: {
          id: aId,
          pairId: bId,
          src: aSrc,
          covered: true,
          done: false,
          toggle: handleToggle(aId, bId),
        },
        b: {
          id: bId,
          pairId: aId,
          src: bSrc,
          covered: true,
          done: false,
          toggle: handleToggle(bId, aId),
        },
      }
    }

    getCountries(8)
      .then((countries) => {
        setBoardItems(
          [...countries]
            .map(
              (countryPair: Pair<string>, index: number): Pair<BoardItem> =>
                getBoardItemPair(countryPair.a, countryPair.b, index)
            )
            .reduce(
              (arr: BoardItem[], elem) => arr.concat(elem.a).concat(elem.b),
              []
            )
            .sort(() => Math.random() - Math.random())
        )
      })
      .catch((error) => console.error(error))
  }, [])

  const handleClick = (boardItem: BoardItem) => () => {
    if (boardLocked || !boardItem.covered) return

    boardItem.toggle()

    if (awaitingPlay) {
      setBoardLocked(true)

      setTimeout(() => {
        setBoardLocked(false)
        setBoardItems((boardItems) =>
          boardItems.map((bi: BoardItem) => ({ ...bi, covered: !bi.done }))
        )
        setAwaitingPlay(false)
      }, 2000)
    } else {
      setAwaitingPlay(true)
    }
  }

  return (
    <div className='board'>
      {boardItems.map((bi, index) => (
        <Card
          key={index}
          src={bi.src}
          covered={bi.covered}
          handleClick={handleClick(bi)}
        />
      ))}
    </div>
  )
}

export default Board
