import './Button.css'

interface ButtonProps {
  text: string
  handleClick: () => void
}

const Button = (props: ButtonProps) => {
  return (
    <div className='button' onClick={props.handleClick}>
      {props.text}
    </div>
  )
}

export default Button
