import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

export const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export const create = async (content) => {
  const newObject = {
    content, 
    votes: 0,
    id: getId()
  }
  const response = await axios.post(baseUrl, newObject)
  return response.data
}

