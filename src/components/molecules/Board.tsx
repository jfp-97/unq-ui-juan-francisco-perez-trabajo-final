import { Dispatch, SetStateAction, useEffect, useState } from 'react'
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

interface BoardProps {
  boardSize: number
  countries: Pair<string>[]
  setGameOver: Dispatch<SetStateAction<boolean>>
  advanceTurn: () => void
  currentPlayerScored: () => void
}

const Board = ({
  boardSize,
  countries,
  setGameOver,
  advanceTurn,
  currentPlayerScored,
}: BoardProps) => {
  const [boardItems, setBoardItems] = useState<BoardItem[]>([])
  const [boardLocked, setBoardLocked] = useState(false)

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
      ) => {
        return boardItems.map((bi: BoardItem) =>
          bi.id === id || bi.id === pairId
            ? { ...bi, done: true, covered: false }
            : bi
        )
      }

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
    const mapCountriesToBoardItems = (countries: Pair<string>[]) =>
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
    setBoardItems(mapCountriesToBoardItems(countries))
  }, [countries])

  useEffect(() => {
    setGameOver(boardItems.length > 0 && boardItems.every((bi) => bi.done))
  })

  const isAwaitingPlay = (): boolean => {
    const uncoveredItems = boardItems.reduce(
      (result, bi: BoardItem) => result + (bi.covered ? 1 : 0),
      0
    )
    return uncoveredItems % 2 !== 0
  }
  const guessedRight = (boardItem: BoardItem): boolean =>
    !boardItems.find((bi) => bi.id === boardItem.pairId)?.covered

  const handleClick = (boardItem: BoardItem) => () => {
    if (boardLocked || !boardItem.covered) return

    boardItem.toggle()

    if (guessedRight(boardItem)) {
      currentPlayerScored()
      advanceTurn()
    } else if (isAwaitingPlay()) {
      setBoardLocked(true)
      setTimeout(() => {
        setBoardLocked(false)
        setBoardItems((boardItems) =>
          boardItems.map((bi: BoardItem) => ({ ...bi, covered: !bi.done }))
        )
        advanceTurn()
      }, 750)
    }
  }

  return (
    <div>
      <div className={`board board-${boardSize}`}>
        {boardItems.map((bi, index) => (
          <Card
            key={index}
            src={bi.src}
            covered={bi.covered}
            handleClick={handleClick(bi)}
          />
        ))}
      </div>
    </div>
  )
}

export default Board
