# Hướng dẫn Error Handling

## Tổng quan

Dự án đã được tích hợp hệ thống bắt lỗi toàn diện với logging chi tiết. Mọi lỗi sẽ được ghi log với thông tin đầy đủ bao gồm:

## 🔧 Cấu hình Debug Mode

### Biến môi trường `REACT_APP_IS_DEBUG`

Trong file `.env`, bạn có thể bật/tắt debug mode:

```env
# Debug Mode (true/false)
REACT_APP_IS_DEBUG=true   # Bật debug - hiển thị tất cả logs
REACT_APP_IS_DEBUG=false  # Tắt debug - không hiển thị logs trong console
```

**Lưu ý:**
- ✅ `true` = Hiển thị tất cả logs (ERROR, WARNING, INFO) trong console
- ❌ `false` = Tắt tất cả logs trong console (production mode)
- 🔄 Sau khi thay đổi `.env`, cần **restart server** (`npm start`)

### Khi nào nên bật/tắt?

| Môi trường | IS_DEBUG | Lý do |
|------------|----------|-------|
| **Development** | `true` | Debug và theo dõi luồng thực thi |
| **Staging** | `true` | Test và tìm bugs trước khi deploy |
| **Production** | `false` | Tối ưu performance, không lộ thông tin nhạy cảm |

## 📋 Thông tin được log

Khi `REACT_APP_IS_DEBUG=true`, mọi lỗi sẽ được ghi log với thông tin đầy đủ bao gồm:
- ⏰ **Timestamp**: Thời gian xảy ra lỗi
- 📄 **File**: Tên file xảy ra lỗi
- 🔧 **Function**: Tên hàm xảy ra lỗi
- ❌ **Error Name**: Loại lỗi (Error, TypeError, NetworkError, v.v.)
- 💬 **Error Message**: Thông báo lỗi
- 📊 **Stack Trace**: Stack trace đầy đủ để debug
- ℹ️ **Additional Info**: Thông tin bổ sung (params, context, v.v.)

## Utility Functions

File: `src/utils/errorHandler.js`

### 1. `logError(error, functionName, fileName, additionalInfo)`

Log lỗi chi tiết với format đẹp trong console.

```javascript
import { logError } from '../../utils/errorHandler';

const FILE_NAME = 'app/example/Example.jsx';

function myFunction() {
  const FUNCTION_NAME = 'myFunction';
  
  try {
    // Your code here
  } catch (error) {
    logError(error, FUNCTION_NAME, FILE_NAME, {
      userId: userId,
      action: 'fetchData',
    });
  }
}
```

### 2. `logInfo(message, functionName, fileName, additionalInfo)`

Log thông tin debug quan trọng.

```javascript
import { logInfo } from '../../utils/errorHandler';

logInfo('User logged in successfully', FUNCTION_NAME, FILE_NAME, {
  username: 'john_doe',
  timestamp: Date.now(),
});
```

### 3. `logWarning(message, functionName, fileName, additionalInfo)`

Log cảnh báo (không phải error nhưng cần chú ý).

```javascript
import { logWarning } from '../../utils/errorHandler';

logWarning('API returned non-ok status', FUNCTION_NAME, FILE_NAME, {
  status: data.status,
  expectedStatus: 'ok',
});
```

## Best Practices

### 1. Đặt tên constants

Luôn khai báo `FILE_NAME` và `FUNCTION_NAME`:

```javascript
const FILE_NAME = 'app/my-component/MyComponent.jsx';

function MyComponent() {
  const handleClick = () => {
    const FUNCTION_NAME = 'handleClick';
    // ...
  };
}
```

### 2. Wrap async functions với try-catch

```javascript
const handleSubmit = async (event) => {
  const FUNCTION_NAME = 'handleSubmit';
  
  try {
    event.preventDefault();
    logInfo('Starting form submission', FUNCTION_NAME, FILE_NAME);
    
    const result = await apiFetch('/endpoint', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    
    logInfo('Form submitted successfully', FUNCTION_NAME, FILE_NAME, { result });
  } catch (error) {
    logError(error, FUNCTION_NAME, FILE_NAME, {
      formData: data,
      errorType: 'Form submission failed',
    });
    alert('Đã xảy ra lỗi. Vui lòng thử lại.');
  }
};
```

### 3. useEffect với error handling

```javascript
useEffect(() => {
  const FUNCTION_NAME = 'useEffect[fetchData]';
  
  const fetchData = async () => {
    try {
      logInfo('Fetching data', FUNCTION_NAME, FILE_NAME);
      const data = await apiFetch('/api/data');
      setData(data);
      logInfo('Data fetched successfully', FUNCTION_NAME, FILE_NAME, { 
        dataLength: data.length 
      });
    } catch (error) {
      logError(error, FUNCTION_NAME, FILE_NAME, {
        errorType: 'Failed to fetch data',
      });
    }
  };

  fetchData();
}, []);
```

### 4. API calls với logging

File `src/utils/api.js` đã được tích hợp error handling tự động:
- ✅ Log mỗi request
- ✅ Log response status
- ✅ Log errors với chi tiết đầy đủ
- ✅ Kiểm tra BACKEND_URL
- ✅ Handle 401 và redirect

## Console Output Format

Khi có lỗi, console sẽ hiển thị:

```
🔴 ERROR in app/login/Login.jsx > handleSubmit
  ⏰ Timestamp: 2025-10-06T10:30:45.123Z
  📄 File: app/login/Login.jsx
  🔧 Function: handleSubmit
  ❌ Error Name: Error
  💬 Error Message: Login failed with status: 401
  📊 Stack Trace: Error: Login failed...
  ℹ️ Additional Info: {
    status: 401,
    statusText: "Unauthorized",
    username: "john_doe"
  }
```

## Các file đã được cập nhật

✅ `src/utils/errorHandler.js` - Utility functions
✅ `src/utils/api.js` - API fetch với error handling
✅ `src/app/login/Login.jsx` - Login form
✅ `src/app/register/Register.jsx` - Register form
✅ `src/app/dashboard/Dashboard.jsx` - Dashboard với fetch user info và keys
✅ `src/app/add-key/AddKey.jsx` - Add key form
✅ `src/app/delete-key/DeleteKey.jsx` - Delete key form
✅ `src/app/reset-key/ResetKey.jsx` - Reset key form
✅ `src/app/layout/Sidebar.jsx` - Logout handler

## Testing

Để test error handling:

1. **Tắt backend** và thử login → Xem network error log
2. **Sai username/password** → Xem 401 error log
3. **Tạo key với số lượng lớn** → Xem request/response logs
4. **Mở DevTools Console (F12)** để xem logs chi tiết

## Lưu ý

- **Không commit** thông tin nhạy cảm trong logs (password, tokens)
- ✅ **Production**: Set `REACT_APP_IS_DEBUG=false` để tắt console logs
- ✅ **Development**: Set `REACT_APP_IS_DEBUG=true` để debug
- Có thể gửi logs lên server logging service (Sentry, LogRocket, etc.)

## 🚀 Quick Start

### 1. Cấu hình `.env`

```env
REACT_APP_BACKEND_URL=http://localhost:5000
REACT_APP_IS_DEBUG=true
```

### 2. Khởi động server

```bash
npm start
```

### 3. Mở DevTools Console (F12)

Bạn sẽ thấy logs chi tiết khi:
- Login/Register
- Fetch data
- Add/Delete/Reset keys
- Có lỗi xảy ra

### 4. Tắt debug trong Production

Trước khi deploy:
```env
REACT_APP_IS_DEBUG=false
```

Hoặc set environment variable trên server:
```bash
REACT_APP_IS_DEBUG=false npm run build
```

## Mở rộng

Để gửi logs lên server, thêm vào `errorHandler.js`:

```javascript
async function sendErrorToServer(errorInfo) {
  if (process.env.NODE_ENV === 'production') {
    try {
      await fetch('https://your-logging-service.com/log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(errorInfo),
      });
    } catch (err) {
      console.error('Failed to send error to server:', err);
    }
  }
}
```

Sau đó gọi trong `logError()`:
```javascript
// Có thể gửi lỗi lên server logging service
sendErrorToServer(errorInfo);
```

