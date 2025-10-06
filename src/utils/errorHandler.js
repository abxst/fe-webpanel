/**
 * Error Handler Utility
 * Hệ thống bắt lỗi chi tiết cho toàn bộ dự án
 */

/**
 * Check if debug mode is enabled
 */
const isDebugEnabled = () => {
  const debugEnv = process.env.REACT_APP_IS_DEBUG;
  return debugEnv === 'true' || debugEnv === true;
};

/**
 * Log lỗi chi tiết với thông tin đầy đủ
 * @param {Error} error - Đối tượng lỗi
 * @param {string} functionName - Tên hàm xảy ra lỗi
 * @param {string} fileName - Tên file xảy ra lỗi
 * @param {object} additionalInfo - Thông tin bổ sung (params, context, etc.)
 */
export function logError(error, functionName, fileName, additionalInfo = {}) {
  const errorInfo = {
    timestamp: new Date().toISOString(),
    file: fileName,
    function: functionName,
    errorMessage: error.message || 'Unknown error',
    errorName: error.name || 'Error',
    errorStack: error.stack || 'No stack trace available',
    additionalInfo: additionalInfo,
  };

  // Chỉ log nếu debug mode được bật
  if (isDebugEnabled()) {
    // Log chi tiết ra console với format dễ đọc
    console.group(`🔴 ERROR in ${fileName} > ${functionName}`);
    console.error('⏰ Timestamp:', errorInfo.timestamp);
    console.error('📄 File:', errorInfo.file);
    console.error('🔧 Function:', errorInfo.function);
    console.error('❌ Error Name:', errorInfo.errorName);
    console.error('💬 Error Message:', errorInfo.errorMessage);
    console.error('📊 Stack Trace:', errorInfo.errorStack);
    if (Object.keys(additionalInfo).length > 0) {
      console.error('ℹ️ Additional Info:', errorInfo.additionalInfo);
    }
    console.groupEnd();
  }

  // Có thể gửi lỗi lên server logging service
  // sendErrorToServer(errorInfo);

  return errorInfo;
}

/**
 * Wrapper cho async function với error handling tự động
 * @param {Function} fn - Async function cần wrap
 * @param {string} functionName - Tên hàm
 * @param {string} fileName - Tên file
 */
export function withErrorHandler(fn, functionName, fileName) {
  return async (...args) => {
    try {
      return await fn(...args);
    } catch (error) {
      logError(error, functionName, fileName, {
        arguments: args,
      });
      throw error; // Re-throw để caller có thể handle tiếp
    }
  };
}

/**
 * Try-catch helper với error logging
 * @param {Function} fn - Function cần thực thi
 * @param {string} functionName - Tên hàm
 * @param {string} fileName - Tên file
 * @param {Function} fallback - Callback khi có lỗi
 * @param {object} additionalInfo - Thông tin bổ sung
 */
export async function tryCatch(fn, functionName, fileName, fallback = null, additionalInfo = {}) {
  try {
    return await fn();
  } catch (error) {
    logError(error, functionName, fileName, additionalInfo);
    
    if (fallback) {
      return fallback(error);
    }
    
    throw error;
  }
}

/**
 * Error boundary helper cho React components
 */
export function getErrorMessage(error) {
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  if (error.message) {
    return error.message;
  }
  return 'Đã xảy ra lỗi không xác định';
}

/**
 * Log warning (không phải error nhưng cần chú ý)
 */
export function logWarning(message, functionName, fileName, additionalInfo = {}) {
  if (!isDebugEnabled()) return;

  console.group(`⚠️ WARNING in ${fileName} > ${functionName}`);
  console.warn('⏰ Timestamp:', new Date().toISOString());
  console.warn('📄 File:', fileName);
  console.warn('🔧 Function:', functionName);
  console.warn('💬 Message:', message);
  if (Object.keys(additionalInfo).length > 0) {
    console.warn('ℹ️ Additional Info:', additionalInfo);
  }
  console.groupEnd();
}

/**
 * Log info (thông tin debug)
 */
export function logInfo(message, functionName, fileName, additionalInfo = {}) {
  if (!isDebugEnabled()) return;

  console.group(`ℹ️ INFO in ${fileName} > ${functionName}`);
  console.info('⏰ Timestamp:', new Date().toISOString());
  console.info('📄 File:', fileName);
  console.info('🔧 Function:', functionName);
  console.info('💬 Message:', message);
  if (Object.keys(additionalInfo).length > 0) {
    console.info('ℹ️ Additional Info:', additionalInfo);
  }
  console.groupEnd();
}

