import { logError, logInfo, logWarning } from './errorHandler';

const FILE_NAME = 'utils/api.js';

export async function apiFetch(url, options = {}) {
  const FUNCTION_NAME = 'apiFetch';
  
  try {
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
    
    if (!BACKEND_URL) {
      const error = new Error('REACT_APP_BACKEND_URL is not defined in environment variables');
      logError(error, FUNCTION_NAME, FILE_NAME, { url, options });
      throw error;
    }

    const fullUrl = url.startsWith('http') ? url : `${BACKEND_URL}${url}`;
    
    logInfo(`Making API request`, FUNCTION_NAME, FILE_NAME, {
      url,
      fullUrl,
      method: options.method || 'GET',
    });

    const response = await fetch(fullUrl, {
      ...options,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (response.status === 401) {
      logWarning('Unauthorized access, redirecting to login', FUNCTION_NAME, FILE_NAME, {
        url: fullUrl,
        status: response.status,
      });
      window.location.href = '/login';
      return; // Stop further processing
    }

    if (!response.ok) {
      const error = new Error(`API error: ${response.status} ${response.statusText}`);
      logError(error, FUNCTION_NAME, FILE_NAME, {
        url: fullUrl,
        status: response.status,
        statusText: response.statusText,
        method: options.method || 'GET',
      });
      throw error;
    }

    const data = await response.json();
    logInfo(`API request successful`, FUNCTION_NAME, FILE_NAME, {
      url: fullUrl,
      status: response.status,
    });

    return data;
  } catch (error) {
    // Log lỗi nếu chưa được log (network errors, parsing errors, etc.)
    if (!error.message.includes('API error')) {
      logError(error, FUNCTION_NAME, FILE_NAME, {
        url,
        options,
        errorType: 'Network or unexpected error',
      });
    }
    throw error;
  }
}
