import { useEffect, useState } from 'react';

export const useFetch = (fetchFn) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    
    fetchFn()
      .then(setData)
      .catch(() => setError('Error al cargar los datos. Por favor, verifica tu conexión a internet.'))
      .finally(() => setLoading(false));
  }, [fetchFn]);

  return { data, loading, error };
};
