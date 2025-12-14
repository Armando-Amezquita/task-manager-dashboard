import { useMemo } from 'react';
import './StatsPanel.css';

const StatsPanel = ({ tasks, users }) => {
  const stats = useMemo(() => {
    const completed = tasks.filter(t => t.completed).length;
    const pending = tasks.length - completed;
    const completionRate = tasks.length > 0 ? Math.round((completed / tasks.length) * 100) : 0;

    const userProgress = users?.map(user => {
      const userTasks = tasks.filter(t => t.userId === user.id);
      const userCompleted = userTasks.filter(t => t.completed).length;
      const userRate = userTasks.length > 0 
        ? Math.round((userCompleted / userTasks.length) * 100) 
        : 0;
      
      return {
        ...user,
        total: userTasks.length,
        completed: userCompleted,
        rate: userRate
      };
    }) || [];

    return {
      total: tasks.length,
      completed,
      pending,
      completionRate,
      userProgress
    };
  }, [tasks, users]);

  return (
    <div className="stats-panel">
      <h2 className="stats-title">Estadísticas</h2>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-value">{stats.total}</div>
          <div className="stat-label">Total de Tareas</div>
        </div>

        <div className="stat-card stat-completed">
          <div className="stat-icon">✓</div>
          <div className="stat-value">{stats.completed}</div>
          <div className="stat-label">Completadas</div>
        </div>

        <div className="stat-card stat-pending">
          <div className="stat-icon">○</div>
          <div className="stat-value">{stats.pending}</div>
          <div className="stat-label">Pendientes</div>
        </div>

        <div className="stat-card stat-rate">
          <div className="stat-icon">%</div>
          <div className="stat-value">{stats.completionRate}%</div>
          <div className="stat-label">Tasa de Completación</div>
        </div>
      </div>

      {stats.userProgress.length > 0 && (
        <div className="user-progress-section">
          <h3 className="user-progress-title">Progreso por Usuario</h3>
          <div className="user-progress-list">
            {stats.userProgress.map(user => (
              <div key={user.id} className="user-progress-item">
                <div className="user-progress-header">
                  <span className="user-progress-name">{user.name}</span>
                  <span className="user-progress-rate">{user.rate}%</span>
                </div>
                <div className="user-progress-bar">
                  <div 
                    className="user-progress-fill" 
                    style={{ width: `${user.rate}%` }}
                  ></div>
                </div>
                <div className="user-progress-details">
                  <span>{user.completed}/{user.total} completadas</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StatsPanel;

