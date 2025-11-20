# Menu API Debug Guide

## Lỗi "Unexpected end of JSON input"

### Nguyên nhân

Lỗi này xảy ra khi API trả về response rỗng (không có body) nhưng client cố gắng parse JSON.

### Đã sửa

- ✅ **BaseApiClient**: Kiểm tra content-type trước khi parse JSON
- ✅ **PUT/PATCH methods**: Xử lý response rỗng
- ✅ **Menu API**: Cập nhật return types phù hợp

### Cách test

#### 1. Test trong Browser Console

```javascript
// Import test functions
import {
  testUpdateMenu,
  testCreateMenu,
  testReorderMenus,
} from "./lib/menu-api-test";

// Test update menu
testUpdateMenu();

// Test create menu
testCreateMenu();

// Test reorder menus
testReorderMenus();
```

#### 2. Test với Network Tab

1. Mở DevTools → Network tab
2. Thực hiện update menu
3. Kiểm tra response:
   - **Status**: 200 OK
   - **Content-Type**: application/json hoặc text/plain
   - **Response Body**: Có thể rỗng hoặc có data

#### 3. Test API trực tiếp

```bash
# Test update menu
curl -X PUT http://localhost:8000/api/v1/menus/1 \
  -H "Content-Type: application/json" \
  -d '{"label":"Updated Menu","icon":"settings","iconColor":"#FF0000"}'

# Test create menu
curl -X POST http://localhost:8000/api/v1/menus \
  -H "Content-Type: application/json" \
  -d '{"label":"New Menu","icon":"home","path":"/new-menu"}'
```

## Các lỗi thường gặp

### 1. Network Error

```
❌ Network Error: Unable to connect to server
```

**Giải pháp**: Kiểm tra admin-service có đang chạy không

### 2. CORS Error

```
❌ CORS Error: Cross-origin request blocked
```

**Giải pháp**: Kiểm tra CORS settings trong admin-service

### 3. 404 Not Found

```
❌ HTTP 404: Not Found
```

**Giải pháp**: Kiểm tra endpoint URL và method

### 4. 500 Internal Server Error

```
❌ HTTP 500: Internal Server Error
```

**Giải pháp**: Kiểm tra server logs và database connection

## Debug Steps

### 1. Kiểm tra BaseApiClient

```typescript
// Trong browser console
const client = new BaseApiClient();
client.getHealthStatus().then(console.log).catch(console.error);
```

### 2. Kiểm tra Menu API

```typescript
// Test từng method
menuApiClient.getMenus().then(console.log).catch(console.error);
menuApiClient
  .updateMenu(1, { label: "Test" })
  .then(console.log)
  .catch(console.error);
```

### 3. Kiểm tra Response

```typescript
// Kiểm tra response headers và body
fetch("http://localhost:8000/api/v1/menus/1", {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ label: "Test" }),
})
  .then((response) => {
    console.log("Status:", response.status);
    console.log("Headers:", response.headers.get("content-type"));
    return response.text();
  })
  .then((text) => {
    console.log("Response body:", text);
  })
  .catch(console.error);
```

## Monitoring

### Console Logs

BaseApiClient sẽ log tất cả requests:

```
🚀 API Request: PUT http://localhost:8000/api/v1/menus/1
✅ API Response: 200 http://localhost:8000/api/v1/menus/1
```

### Error Tracking

Tất cả errors được log với chi tiết:

```
❌ Request Error: HTTP 500: Internal Server Error
❌ Response Error: {"error":"Database connection failed"}
```
