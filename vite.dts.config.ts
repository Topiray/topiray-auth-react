import { defineConfig } from 'vite'
import dts from 'rollup-plugin-dts'

export default defineConfig({
  plugins: [
    dts()
  ],
  build: {
    lib: {
      entry: './src/index.ts',
      name: 'TopirayAuthReact',
      formats: ['es'],
      fileName: () => 'index.d.ts'
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime']
    }
  }
})