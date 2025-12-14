import './ErrorMessage.css';

const ErrorMessage = ({ message }) => {
  return (
    <div className="error-container">
      <div className="error-icon">⚠️</div>
      <h2 className="error-title">Error al cargar los datos</h2>
      <p className="error-message">{message}</p>
      <button 
        className="error-retry-btn"
        onClick={() => window.location.reload()}
      >
        Reintentar
      </button>
    </div>
  );
};

export default ErrorMessage;

