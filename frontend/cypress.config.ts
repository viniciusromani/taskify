/* eslint-disable */
import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    supportFile: false,
    setupNodeEvents(on, config) {
      config.baseUrl = config.env.host;
      return config;
    },
  },
});
