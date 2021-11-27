import './Card.css'

interface CardProps {
  src: string
}

const Card = (props: CardProps) => {
  return <img className='card' src={props.src} alt='asd' />
}

export default Card
