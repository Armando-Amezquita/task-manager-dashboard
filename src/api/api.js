const BASE_URL = 'https://jsonplaceholder.typicode.com';

export const fetchTodos = async () => {
  const response = await fetch(`${BASE_URL}/todos`);
  if (!response.ok) {
    throw new Error('Error al obtener las tareas');
  }
  return response.json();
};

export const fetchUsers = async () => {
  const response = await fetch(`${BASE_URL}/users`);
  if (!response.ok) {
    throw new Error('Error al obtener los usuarios');
  }
  return response.json();
};
