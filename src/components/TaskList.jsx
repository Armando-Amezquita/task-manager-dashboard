import TaskCard from './TaskCard';
import './TaskList.css';

const TaskList = ({ tasks, users, onTaskClick }) => {
  if (tasks.length === 0) {
    return (
      <div className="task-list-empty">
        <p>No se encontraron tareas con los filtros aplicados.</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map(task => {
        const user = users?.find(u => u.id === task.userId);
        return (
          <TaskCard 
            key={task.id} 
            task={task} 
            user={user} 
            onClick={() => onTaskClick(task)}
          />
        );
      })}
    </div>
  );
};

export default TaskList;
