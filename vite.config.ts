import vue from "@vitejs/plugin-vue";
import * as path from 'path'
import { defineConfig } from "vite";

import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [vue(), dts()],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "vue-dynamic-headless-forms",
      fileName: "vue-dynamic-headless-forms"
    },
    rollupOptions: {
      external: ["vue", "@vuelidate/core", "@vuelidate/validators"],
      output: {
        globals: {
          vue: "Vue",
          "@vuelidate/core": "@vuelidate/core",
          "@vuelidate/validators": "@vuelidate/validators"
        }
      }
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src")
    }
  }
});