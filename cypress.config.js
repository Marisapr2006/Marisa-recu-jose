const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://localhost:8080', // Asumiendo que el servidor corre en este puerto, ajustable si es necesario
    supportFile: false
  },
});
