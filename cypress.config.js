const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'xg6x33',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    //  Chrome как браузер по умолчанию
    browser: 'chrome'
    
  },
});
