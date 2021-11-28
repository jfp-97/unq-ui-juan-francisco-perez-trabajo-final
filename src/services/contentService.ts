import axios from 'axios'
import { Pair } from '../types/pair'

interface Country {
  flags: { png: string }
}

const countries = (amount: number) => {
  return axios
    .get<Country[]>('https://restcountries.com/v3.1/all')
    .then((response): Pair<string>[] => {
      return [...response.data]
        .sort(() => Math.random() - Math.random())
        .slice(0, amount)
        .map((e) => {
          return { a: e.flags.png, b: e.flags.png }
        })
    })
}

export default countries
