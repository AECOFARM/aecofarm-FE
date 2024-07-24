// utils/api.ts
export const getRequest = async (url: string, headers: object = {}) => {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      ...headers,
    },
  });

  const result = await response.json();
  return result;
};

export const postRequest = async (url: string, data: object, headers: object = {}) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();
  return result;
};

export const patchRequest = async (url: string, data: FormData, headers: object = {}) => {
  const response = await fetch(url, {
    method: 'PATCH',
    headers: {
      ...headers,
    },
    body: data,
  });

  const result = await response.json();
  return result;
};

export const deleteRequest = async (url: string, headers: object = {}) => {
  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      ...headers,
    },
  });

  const result = await response.json();
  return result;
};
