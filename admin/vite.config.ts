import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// 建置到 admin/dist，由 server.js 在 /admin 提供；開發時把 API 轉到本機伺服器
export default defineConfig({
  base: '/admin/',
  plugins: [react()],
  server: { proxy: { '/api': 'http://127.0.0.1:3610', '/login': 'http://127.0.0.1:3610' } }
});
