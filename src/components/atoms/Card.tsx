import './Card.css'

interface CardProps {
  src: string
  covered: boolean
  handleClick: () => void
}

const Card = (props: CardProps) => {
  return (
    <div className='cardContainer' onClick={props.handleClick}>
      {props.covered ? null : (
        <img className='cardContent' src={props.src} alt='asd' />
      )}
    </div>
  )
}

export default Card
