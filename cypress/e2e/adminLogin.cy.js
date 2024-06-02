describe('Проверка логина в админку', () => {
  beforeEach(() => {
    cy.visit('http://qamid.tmweb.ru/admin');
  });

  it('Успешный логин с валидными данными', () => {
    cy.fixture('adminLogin').then((admin) => {
      cy.login(admin.validUser.email, admin.validUser.password);
      // Добавьте проверку на успешный логин, например, наличие элемента админки
    });
  });

  it('Неуспешный логин с невалидными данными', () => {
    cy.fixture('adminLogin').then((admin) => {
      cy.login(admin.invalidUser.email, admin.invalidUser.password);
      cy.fixture('selectors').then((selectors) => {
        cy.get(selectors.errorMessage).should('contain', 'Ошибка авторизации!');
      });
    });
  });
});
