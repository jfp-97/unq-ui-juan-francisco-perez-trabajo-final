import { useEffect, useState } from 'react'
import countries from '../../services/contentService'
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
  const [uncovered, setUncovered] = useState(0)

  useEffect(() => {
    const getBoardItemPair = (
      aSrc: string,
      bSrc: string,
      index: number
    ): Pair<BoardItem> => {
      const aId: string = index + 'a'
      const bId: string = index + 'b'

      return {
        a: {
          id: aId,
          pairId: bId,
          src: aSrc,
          covered: true,
          done: false,
          toggle: () => {
            setBoardItems((old) =>
              old.some((bi: BoardItem) => bi.id === bId && !bi.covered)
                ? old.map((bi: BoardItem) =>
                    bi.id === aId || bi.id === bId ? { ...bi, done: true } : bi
                  )
                : old.map((bi: BoardItem) =>
                    bi.id === aId ? { ...bi, covered: false } : bi
                  )
            )
          },
        },
        b: {
          id: bId,
          pairId: aId,
          src: bSrc,
          covered: true,
          done: false,
          toggle: () => {
            setBoardItems((old) =>
              old.map((bi: BoardItem) =>
                bi.id === bId ? { ...bi, covered: false } : bi
              )
            )
            setBoardItems((old) =>
              old.some((bi: BoardItem) => bi.id === aId && !bi.covered)
                ? old.map((bi: BoardItem) =>
                    bi.id === aId || bi.id === bId ? { ...bi, done: true } : bi
                  )
                : old.map((bi: BoardItem) =>
                    bi.id === bId ? { ...bi, covered: false } : bi
                  )
            )
          },
        },
      }
    }

    countries(8)
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
    if (uncovered > 0) {
      setBoardLocked(true)
      setTimeout(() => {
        setBoardLocked(false)
        setBoardItems((old) =>
          old.map((bi: BoardItem) => ({
            ...bi,
            covered: bi.done ? false : old.some((bi2) => bi2.id === bi.pairId),
          }))
        )
        setUncovered(0)
      }, 2000)
    } else {
      setUncovered(uncovered + 1)
    }
  }

  return (
    <div className='board'>
      {boardItems.map((bi, index) => (
        <Card
          key={index}
          src={bi.src}
          boardLocked={boardLocked}
          covered={bi.covered}
          handleClick={handleClick(bi)}
        />
      ))}
    </div>
  )
}

export default Board
