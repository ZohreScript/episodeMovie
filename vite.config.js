import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Rickmorthy/',
  // build: {
  //   rollupOptions: {
  //     input: {
  //       index: './index.html',
  //       'index-gPhvExwv.css': './dist/assets/index-gPhvExwv.css',
  //       'index-E-di4wEc.js': './dist/assets/index-E-di4wEc.js',
  //     }
  //   }
  // }
})
