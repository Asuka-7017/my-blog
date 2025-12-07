import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    // ブラウザ環境をシミュレートする
    environment: 'jsdom',
    globals: true,
    setupFiles: [],
    // テストファイルのパターン
    include: ['**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    // 除外するファイル/フォルダ
    exclude: ['node_modules', 'dist', '.next', 'coverage'],
    alias: {
      '@': path.resolve(__dirname, `./src`),
    },
  },
})
