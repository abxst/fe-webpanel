export async function apiFetch(url, options = {}) {
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  const fullUrl = url.startsWith('http') ? url : `${BACKEND_URL}${url}`;
  const response = await fetch(fullUrl, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (response.status === 401) {
    window.location.href = '/login';
    return; // Stop further processing
  }

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response.json();
}
