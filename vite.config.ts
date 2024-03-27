import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],

  server:{
    host: '0.0.0.0',
    port: 4000
  },

  preview:{
    host: '0.0.0.0',
    port: 8500
  },
  envDir: "./.env",
  css:{
    preprocessorOptions:{
      scss: {
        additionalData: `@import "./sass/styles.scss";`
      }
    }
  }
})
