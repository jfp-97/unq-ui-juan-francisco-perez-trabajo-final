import './Card.css'

interface CardProps {
  src: string
  covered: boolean
  handleClick: () => void
}

const Card = (props: CardProps) => {
  return (
    <div className={`card ${props.covered ? '' : 'active'}`}>
      <div className='cardWrapper'>
        <div className={'cardContainerCovered'} onClick={props.handleClick}>
          {
            <img
              className='cardContent'
              src='https://upload.wikimedia.org/wikipedia/commons/6/61/Flag.svg'
              alt='asd'
            />
          }
        </div>
        <div className={'cardContainerUncovered'} onClick={props.handleClick}>
          {<img className='cardContent' src={props.src} alt='asd' />}
        </div>
      </div>

      {/* <div
        className={
          props.covered ? 'cardContainerCovered' : 'cardContainerUncovered'
        }
        onClick={props.handleClick}
      >
        {props.covered ? (
          <img
            className='cardContent'
            src='https://upload.wikimedia.org/wikipedia/commons/6/61/Flag.svg'
            alt='asd'
          />
        ) : (
          <img className='cardContent' src={props.src} alt='asd' />
        )}
      </div> */}
    </div>
  )
}

export default Card
