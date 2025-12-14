import './Filters.css';

const Filters = ({ users, filters, setFilters }) => {
  const handleStatusChange = (e) => {
    setFilters(f => ({ ...f, status: e.target.value }));
  };

  const handleUserChange = (e) => {
    setFilters(f => ({ ...f, userId: e.target.value }));
  };

  const handleSearchChange = (e) => {
    setFilters(f => ({ ...f, search: e.target.value }));
  };

  const handleClearFilters = () => {
    setFilters({ status: 'all', userId: '', search: '' });
  };

  return (
    <div className="filters">
      <div className="filters-container">
        <div className="filter-group">
          <label htmlFor="status-filter">Estado</label>
          <select
            id="status-filter"
            className="filter-select"
            value={filters.status}
            onChange={handleStatusChange}
          >
            <option value="all">Todas</option>
            <option value="completed">Completadas</option>
            <option value="pending">Pendientes</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="user-filter">Usuario</label>
          <select
            id="user-filter"
            className="filter-select"
            value={filters.userId}
            onChange={handleUserChange}
          >
            <option value="">Todos los usuarios</option>
            {users?.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group filter-search">
          <label htmlFor="search-filter">Búsqueda</label>
          <input
            id="search-filter"
            className="filter-input"
            type="text"
            placeholder="Buscar por título..."
            value={filters.search}
            onChange={handleSearchChange}
          />
        </div>

        <button 
          className="filter-clear-btn"
          onClick={handleClearFilters}
          type="button"
        >
          Limpiar Filtros
        </button>
      </div>
    </div>
  );
};

export default Filters;
