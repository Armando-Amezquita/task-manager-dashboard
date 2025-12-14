import './TaskCard.css';

const TaskCard = ({ task, user, onClick }) => {
  return (
    <div className="task-card" onClick={onClick}>
      <div className="task-card-header">
        <span className="task-id">#{task.id}</span>
        <span className={`task-status ${task.completed ? 'completed' : 'pending'}`}>
          {task.completed ? '✓' : '○'}
        </span>
      </div>
      <h3 className="task-title">{task.title}</h3>
      <div className="task-card-footer">
        <span className="task-user">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
          {user?.name || 'Usuario desconocido'}
        </span>
      </div>
    </div>
  );
};

export default TaskCard;
