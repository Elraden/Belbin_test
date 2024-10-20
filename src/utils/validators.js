export const validateName = (name) => {
  if (!name.trim()) {
    return 'Имя не может быть пустым';
  }
  return '';
};

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(email)) {
    return 'Введите корректный email';
  }
  return '';
};

export const validateRole = (role) => {
  if (!role.trim()) {
    return 'Роль не может быть пустой';
  }
  return '';
};
