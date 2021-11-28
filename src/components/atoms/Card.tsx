import { useState } from 'react'
import './Card.css'

interface CardProps {
  src: string
  boardLocked: boolean
  handleClick: any
}

const Card = (props: CardProps) => {
  const [covered, setCovered] = useState(true)

  return (
    <div
      className='cardContainer'
      onClick={
        props.boardLocked
          ? () => {}
          : () => {
              props.handleClick()
              setCovered(!covered)
            }
      }
    >
      {covered ? null : (
        <img className='cardContent' src={props.src} alt='asd' />
      )}
    </div>
  )
}

export default Card
