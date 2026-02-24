# Hướng dẫn Deploy lên Vercel

Dự án này là một monorepo sử dụng Module Federation với 2 apps:

- **shell**: App chính (port 3000)
- **iam**: Remote app - Identity & Access Management (port 3001)

## Cách 1: Deploy từng app riêng (Khuyến nghị)

Với Module Federation, nên deploy từng app riêng để dễ quản lý và scale.

### Bước 1: Deploy Remote Apps trước

#### 1.1. Deploy iam

1. Truy cập [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New..." → "Project"
3. Import repository GitHub/GitLab/Bitbucket
4. **Root Directory**: Chọn `apps/iam`
5. **Framework Preset**: Chọn "Other" hoặc "Vite"
6. **Build Command**: `cd ../.. && pnpm install && pnpm --filter @workspace/iam build`
7. **Output Directory**: `dist`
8. **Install Command**: `cd ../.. && pnpm install`
9. Click "Deploy"
10. Ghi nhớ URL deploy (ví dụ: `https://iam-xxx.vercel.app`)

### Bước 2: Cập nhật Module Federation Config

Sau khi deploy remote apps, cần cập nhật URL trong `apps/shell/module-federation.config.ts`:

```typescript
const mfConfig = createModuleFederationConfig({
  name: "shell",
  remotes: {
    iam: "iam@https://iam-xxx.vercel.app/mf-manifest.json",
  },
  // ... rest of config
});
```

### Bước 3: Deploy shell app

1. Truy cập Vercel Dashboard
2. Import repository
3. **Root Directory**: `apps/shell`
4. **Build Command**: `cd ../.. && pnpm install && pnpm --filter @workspace/shell build`
5. **Output Directory**: `dist`
6. **Install Command**: `cd ../.. && pnpm install`
7. Click "Deploy"

## Cách 2: Sử dụng Environment Variables (Linh hoạt hơn)

Thay vì hardcode URL, có thể dùng environment variables:

### 1. Cập nhật module-federation.config.ts để dùng env

```typescript
const mfConfig = createModuleFederationConfig({
  name: "shell",
  remotes: {
    iam: `iam@${process.env.IAM_APP_URL || "http://localhost:3001"}/mf-manifest.json`,
  },
  // ... rest of config
});
```

### 2. Thêm Environment Variables trong Vercel

Trong Vercel Dashboard → Project Settings → Environment Variables:

- `IAM_APP_URL`: `https://iam-xxx.vercel.app`

## Các lưu ý quan trọng

1. **CORS**: Các remote apps cần enable CORS (đã cấu hình trong vercel.json)
2. **Build Order**: Remote apps phải được deploy trước shell
3. **Module Federation Manifest**: Đảm bảo `/mf-manifest.json` có thể truy cập công khai
4. **Node Version**: Vercel sẽ tự động detect từ `package.json` (`"engines": { "node": ">=20" }`)

## Kiểm tra sau khi deploy

1. Truy cập URL shell app
2. Mở DevTools → Network tab
3. Kiểm tra xem các remote modules có load thành công không
4. Kiểm tra console không có lỗi CORS

## Troubleshooting

### Lỗi CORS

- Đảm bảo các remote apps có headers CORS đúng (đã cấu hình trong vercel.json)

### Module không load được

- Kiểm tra URL trong module-federation.config.ts có đúng không
- Kiểm tra `/mf-manifest.json` có thể truy cập được không

### Build failed

- Đảm bảo Node version >= 20
- Kiểm tra pnpm version (đã set trong package.json: `"packageManager": "pnpm@10.18.1"`)
