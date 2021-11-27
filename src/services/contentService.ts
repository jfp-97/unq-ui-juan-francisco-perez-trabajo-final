import axios from 'axios'

const countries = (): string[] => {
  axios.get('https://restcountries.com/v3.1/all').then((response) => {
    console.log(response)
  })
  return [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Flag_of_Argentina.svg/1024px-Flag_of_Argentina.svg.png',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Flag_of_Argentina.svg/1024px-Flag_of_Argentina.svg.png',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Flag_of_Argentina.svg/1024px-Flag_of_Argentina.svg.png',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Flag_of_Argentina.svg/1024px-Flag_of_Argentina.svg.png',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Flag_of_Argentina.svg/1024px-Flag_of_Argentina.svg.png',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Flag_of_Argentina.svg/1024px-Flag_of_Argentina.svg.png',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Flag_of_Argentina.svg/1024px-Flag_of_Argentina.svg.png',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Flag_of_Argentina.svg/1024px-Flag_of_Argentina.svg.png',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Flag_of_Argentina.svg/1024px-Flag_of_Argentina.svg.png',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Flag_of_Argentina.svg/1024px-Flag_of_Argentina.svg.png',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Flag_of_Argentina.svg/1024px-Flag_of_Argentina.svg.png',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Flag_of_Argentina.svg/1024px-Flag_of_Argentina.svg.png',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Flag_of_Argentina.svg/1024px-Flag_of_Argentina.svg.png',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Flag_of_Argentina.svg/1024px-Flag_of_Argentina.svg.png',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Flag_of_Argentina.svg/1024px-Flag_of_Argentina.svg.png',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Flag_of_Argentina.svg/1024px-Flag_of_Argentina.svg.png',
  ]
}

export default countries
