Cypress.Commands.add('login', (email, password) => {
  cy.fixture('selectors').then((selectors) => {
    cy.get(selectors.loginEmail).type(email);
    cy.get(selectors.loginPassword).type(password);
    cy.get(selectors.loginButton).click();
  });
});

// Добавляем обработчик события uncaught:exception
Cypress.on('uncaught:exception', (err, runnable) => {
  // Пишем ошибку в консоль, но не останавливаем выполнение тестов
  console.error('Caught unhandled exception:', err.message);
  return false;
});
