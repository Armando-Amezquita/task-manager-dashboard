import { useState } from 'react';
import { fetchTodos, fetchUsers } from '../api/api';
import { useFetch } from '../hooks/useFetch';
import { useFilteredTasks } from '../hooks/useFilteredTasks';
import TaskList from '../components/TaskList';
import Filters from '../components/Filters';
import StatsPanel from '../components/StatsPanel';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import TaskModal from '../components/TaskModal';
import './Dashboard.css';

const Dashboard = () => {
  const { data: tasks, loading: tasksLoading, error: tasksError } = useFetch(fetchTodos);
  const { data: users, loading: usersLoading, error: usersError } = useFetch(fetchUsers);

  const [filters, setFilters] = useState({
    status: 'all',
    userId: '',
    search: '',
  });

  const [selectedTask, setSelectedTask] = useState(null);

  const filteredTasks = useFilteredTasks(tasks, filters);

  const handleTaskClick = (task) => {
    setSelectedTask(task);
  };

  const handleCloseModal = () => {
    setSelectedTask(null);
  };

  const loading = tasksLoading || usersLoading;
  const error = tasksError || usersError;

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Panel Administrativo</h1>
      </header>
      
      <div className="dashboard-content">
        <Filters users={users} filters={filters} setFilters={setFilters} />
        <StatsPanel tasks={filteredTasks} users={users} />
        <TaskList 
          tasks={filteredTasks} 
          users={users} 
          onTaskClick={handleTaskClick}
        />
      </div>

      {selectedTask && (
        <TaskModal
          task={selectedTask}
          user={users.find(u => u.id === selectedTask.userId)}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Dashboard;
