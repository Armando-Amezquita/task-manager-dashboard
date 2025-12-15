import { useState, useEffect, useMemo } from 'react';
import TaskCard from './TaskCard';
import Pagination from './Pagination';
import './TaskList.css';

const ITEMS_PER_PAGE = 12;

const TaskList = ({ tasks, users, onTaskClick, filters }) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Resetear a página 1 cuando cambian los filtros
  useEffect(() => {
    setCurrentPage(1);
  }, [filters.status, filters.userId, filters.search]);

  const paginatedTasks = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return tasks.slice(startIndex, endIndex);
  }, [tasks, currentPage]);

  const totalPages = Math.ceil(tasks.length / ITEMS_PER_PAGE);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (tasks.length === 0) {
    return (
      <div className="task-list-empty">
        <p>No se encontraron tareas con los filtros aplicados.</p>
      </div>
    );
  }

  return (
    <>
      <div className="task-list">
        {paginatedTasks.map(task => {
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
      
      {totalPages > 1 && (
        <div className="pagination-info">
          <p>
            Mostrando {paginatedTasks.length} de {tasks.length} tareas
            {filters.status !== 'all' || filters.userId || filters.search ? ' (filtradas)' : ''}
          </p>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </>
  );
};

export default TaskList;
