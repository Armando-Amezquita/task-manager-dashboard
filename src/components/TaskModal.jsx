import './TaskModal.css';

const TaskModal = ({ task, user, onClose }) => {
  if (!task) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <button className="modal-close" onClick={onClose} aria-label="Cerrar">
          ×
        </button>
        
        <div className="modal-header">
          <h2>Detalle de Tarea</h2>
          <span className={`modal-status ${task.completed ? 'completed' : 'pending'}`}>
            {task.completed ? '✓ Completada' : '○ Pendiente'}
          </span>
        </div>

        <div className="modal-body">
          <div className="modal-section">
            <h3>Información de la Tarea</h3>
            <div className="modal-info">
              <div className="info-item">
                <span className="info-label">ID:</span>
                <span className="info-value">#{task.id}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Título:</span>
                <span className="info-value">{task.title}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Estado:</span>
                <span className="info-value">
                  {task.completed ? 'Completada' : 'Pendiente'}
                </span>
              </div>
            </div>
          </div>

          {user && (
            <div className="modal-section">
              <h3>Información del Usuario</h3>
              <div className="modal-info">
                <div className="info-item">
                  <span className="info-label">Nombre:</span>
                  <span className="info-value">{user.name}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Email:</span>
                  <span className="info-value">
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </span>
                </div>
                <div className="info-item">
                  <span className="info-label">Teléfono:</span>
                  <span className="info-value">
                    <a href={`tel:${user.phone}`}>{user.phone}</a>
                  </span>
                </div>
                <div className="info-item">
                  <span className="info-label">Empresa:</span>
                  <span className="info-value">{user.company?.name || 'N/A'}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button className="modal-btn" onClick={onClose}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;

