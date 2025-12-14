import { useMemo } from 'react';

export const useFilteredTasks = (tasks, filters) => {
  return useMemo(() => {
    if (!tasks || tasks.length === 0) return [];
    
    return tasks.filter(task => {
      const byStatus =
        filters.status === 'all' ||
        (filters.status === 'completed' && task.completed) ||
        (filters.status === 'pending' && !task.completed);

      const byUser =
        !filters.userId || task.userId === Number(filters.userId);

      const bySearch =
        !filters.search || 
        task.title.toLowerCase().includes(filters.search.toLowerCase());

      return byStatus && byUser && bySearch;
    });
  }, [tasks, filters]);
};
