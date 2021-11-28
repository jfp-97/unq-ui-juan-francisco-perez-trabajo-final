import './Card.css'

interface CardProps {
  src: string
  boardLocked: boolean
  covered: boolean
  handleClick: any
}

const Card = (props: CardProps) => {
  return (
    <div
      className='cardContainer'
      onClick={
        props.boardLocked
          ? () => {}
          : () => {
              props.handleClick()
            }
      }
    >
      {props.covered ? null : (
        <img className='cardContent' src={props.src} alt='asd' />
      )}
    </div>
  )
}

export default Card
