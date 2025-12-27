import axios from 'axios'

const API_URL = '/api/goals/'

// Create new goal
const createGoal = async (goalData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL, goalData, config)

  return response.data
}

// Get user goals
// Get user goals
const getGoals = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  try {
    // 1. Try to fetch from Network (API)
    const response = await axios.get(API_URL, config)

    // 2. If successful, backup data to LocalStorage
    localStorage.setItem('offlineGoals', JSON.stringify(response.data))
    
    return response.data
  } catch (error) {
    // 3. If Network fails (Offline), try LocalStorage
    const offlineData = localStorage.getItem('offlineGoals')
    
    if (offlineData) {
        console.log('Network failed. Serving from LocalStorage (Offline Mode).')
        return JSON.parse(offlineData)
    }
    
    // If no cache exists either, throw the error as usual
    throw error
  }
}

// Delete user goal
const deleteGoal = async (goalId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.delete(API_URL + goalId, config)

  return response.data
}

const goalService = {
  createGoal,
  getGoals,
  deleteGoal,
}

export default goalService
