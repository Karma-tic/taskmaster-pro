import { useDispatch } from 'react-redux'
import { deleteGoal } from '../features/goals/goalSlice'

function GoalItem({ goal }) {
  const dispatch = useDispatch()

  return (
    <div className='goal'>
      <div>{new Date(goal.createdAt).toLocaleString('en-US')}</div>
      <h2>{goal.text}</h2>
      
      {/* --- ADD THIS BLOCK --- */}
      {goal.imageUrl && (
        <img 
          src={goal.imageUrl} 
          alt="Goal attachment" 
          style={{ width: '100%', borderRadius: '10px', marginTop: '10px' }} 
        />
      )}
      {/* ---------------------- */}

      <button onClick={() => dispatch(deleteGoal(goal._id))} className='close'>
        X
      </button>
    </div>
  )
}

export default GoalItem